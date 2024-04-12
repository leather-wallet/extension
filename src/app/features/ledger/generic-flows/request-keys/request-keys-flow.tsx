import { Outlet, useNavigate } from 'react-router-dom';

import { useScrollLock } from '@app/common/hooks/use-scroll-lock';
import { Dialog } from '@app/ui/components/containers/dialog/dialog';
import { DialogHeader } from '@app/ui/components/containers/headers/dialog-header';

import { LedgerRequestKeysContext, LedgerRequestKeysProvider } from './ledger-request-keys.context';

interface RequestKeysFlowProps {
  context: LedgerRequestKeysContext;
  isActionCancellableByUser: boolean;
  onCancelConnectLedger?(): void;
}
export function RequestKeysFlow({
  context,
  isActionCancellableByUser,
  onCancelConnectLedger,
}: RequestKeysFlowProps) {
  const navigate = useNavigate();
  useScrollLock(true);

  return (
    <LedgerRequestKeysProvider value={context}>
      <Dialog
        isShowing
        header={<DialogHeader isWaitingOnPerformedAction={isActionCancellableByUser} />}
        // clean this up
        onClose={
          isActionCancellableByUser
            ? () => null
            : onCancelConnectLedger
              ? onCancelConnectLedger
              : () => navigate('../')
        }
      >
        <Outlet />
      </Dialog>
    </LedgerRequestKeysProvider>
  );
}
