import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { bytesToHex, signatureVrsToRsv } from '@stacks/common';
import { serializeCV } from '@stacks/transactions';
import { LedgerError } from '@zondax/ledger-stacks';
import get from 'lodash.get';

import { UnsignedMessage, whenSignableMessageOfType } from '@shared/signature/signature-types';
import { delay, isError } from '@shared/utils';

import { useScrollLock } from '@app/common/hooks/use-scroll-lock';
import { appEvents } from '@app/common/publish-subscribe';
import {
  getStacksAppVersion,
  prepareLedgerDeviceStacksAppConnection,
  signLedgerStacksStructuredMessage,
  signLedgerStacksUtf8Message,
  useActionCancellableByUser,
} from '@app/features/ledger/utils/stacks-ledger-utils';
import { useCurrentStacksAccount } from '@app/store/accounts/blockchain/stacks/stacks-account.hooks';
import { StacksAccount } from '@app/store/accounts/blockchain/stacks/stacks-account.models';
import { Dialog } from '@app/ui/components/containers/dialog/dialog';
import { Header } from '@app/ui/components/containers/headers/header';

import { useLedgerAnalytics } from '../../hooks/use-ledger-analytics.hook';
import { useLedgerNavigate } from '../../hooks/use-ledger-navigate';
import { useVerifyMatchingLedgerStacksPublicKey } from '../../hooks/use-verify-matching-stacks-public-key';
import { checkLockedDeviceError, useLedgerResponseState } from '../../utils/generic-ledger-utils';
import {
  LedgerMessageSigningContext,
  LedgerMsgSigningProvider,
} from './ledger-stacks-sign-msg.context';
import { useUnsignedMessageType } from './use-message-type';

interface LedgerSignMsgData {
  account: StacksAccount;
  unsignedMessage: UnsignedMessage;
}
interface LedgerSignMsgDataProps {
  children({ account, unsignedMessage }: LedgerSignMsgData): React.JSX.Element;
}
function LedgerSignMsgData({ children }: LedgerSignMsgDataProps) {
  const account = useCurrentStacksAccount();
  const unsignedMessage = useUnsignedMessageType();
  if (!unsignedMessage || !account) return null;
  return children({ account, unsignedMessage });
}

type LedgerSignMsgProps = LedgerSignMsgData;
function LedgerSignStacksMsg({ account, unsignedMessage }: LedgerSignMsgProps) {
  useScrollLock(true);
  const navigate = useNavigate();

  const location = useLocation();
  const ledgerNavigate = useLedgerNavigate();
  const ledgerAnalytics = useLedgerAnalytics();
  const verifyLedgerPublicKey = useVerifyMatchingLedgerStacksPublicKey();

  const [latestDeviceResponse, setLatestDeviceResponse] = useLedgerResponseState();
  const canUserCancelAction = useActionCancellableByUser();

  const [awaitingDeviceConnection, setAwaitingDeviceConnection] = useState(false);

  const chain = 'stacks';

  async function signMessage() {
    const stacksApp = await prepareLedgerDeviceStacksAppConnection({
      setLoadingState: setAwaitingDeviceConnection,
      onError(e) {
        if (isError(e) && checkLockedDeviceError(e)) {
          setLatestDeviceResponse({ deviceLocked: true } as any);
          return;
        }
        ledgerNavigate.toErrorStep(chain);
      },
    });

    const versionInfo = await getStacksAppVersion(stacksApp);
    ledgerAnalytics.trackDeviceVersionInfo(versionInfo);
    setLatestDeviceResponse(versionInfo);
    if (versionInfo.deviceLocked) {
      setAwaitingDeviceConnection(false);
      return;
    }

    ledgerNavigate.toDeviceBusyStep(`Verifying public key on Ledger…`);
    await verifyLedgerPublicKey(stacksApp);

    try {
      ledgerNavigate.toConnectionSuccessStep('stacks');
      await delay(1000);
      ledgerNavigate.toAwaitingDeviceOperation({ hasApprovedOperation: false });

      const resp = await whenSignableMessageOfType(unsignedMessage)({
        async utf8(msg) {
          return signLedgerStacksUtf8Message(stacksApp)(msg, account.index);
        },
        async structured(domain, msg) {
          return signLedgerStacksStructuredMessage(stacksApp)(
            bytesToHex(serializeCV(domain)),
            bytesToHex(serializeCV(msg)),
            account.index
          );
        },
      });

      // Assuming here that public keys are wrong. Alternatively, we may want
      // to proactively check the key before signing
      if (resp.returnCode === LedgerError.DataIsInvalid) {
        ledgerNavigate.toDevicePayloadInvalid();
        return;
      }

      if (resp.returnCode === LedgerError.TransactionRejected) {
        ledgerNavigate.toOperationRejectedStep(`Message signing operation rejected`);
        ledgerAnalytics.messageSignedOnLedgerRejected();
        appEvents.publish('ledgerStacksMessageSigningCancelled', { unsignedMessage });
        return;
      }
      if (resp.returnCode !== LedgerError.NoErrors) {
        throw new Error('Some other error');
      }
      ledgerNavigate.toAwaitingDeviceOperation({ hasApprovedOperation: true });
      await delay(1000);

      ledgerAnalytics.messageSignedOnLedgerSuccessfully();

      appEvents.publish('ledgerStacksMessageSigned', {
        messageSignatures: {
          signature: signatureVrsToRsv(resp.signatureVRS.toString('hex')),
          publicKey: account.stxPublicKey,
        },
        unsignedMessage,
      });

      await stacksApp.transport.close();
    } catch (e) {
      ledgerNavigate.toDeviceDisconnectStep();
    }
  }

  const allowUserToGoBack = get(location.state, 'goBack');

  const ledgerContextValue: LedgerMessageSigningContext = {
    message: unsignedMessage,
    signMessage,
    latestDeviceResponse,
    awaitingDeviceConnection,
  };

  return (
    <LedgerMsgSigningProvider value={ledgerContextValue}>
      <Dialog
        onGoBack={allowUserToGoBack ? () => navigate(-1) : undefined}
        isShowing
        header={
          <Header
            variant="dialog"
            isWaitingOnPerformedAction={awaitingDeviceConnection || canUserCancelAction}
          />
        }
        onClose={ledgerNavigate.cancelLedgerAction}
      >
        <Outlet />
      </Dialog>
    </LedgerMsgSigningProvider>
  );
}

export function LedgerSignMsgContainer() {
  return <LedgerSignMsgData>{props => <LedgerSignStacksMsg {...props} />}</LedgerSignMsgData>;
}
