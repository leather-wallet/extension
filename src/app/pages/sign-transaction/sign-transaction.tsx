import { memo, useCallback } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Stack } from '@stacks/ui';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { useFeeSchema } from '@app/common/validation/use-fee-schema';
import { LoadingKeys, useLoading } from '@app/common/hooks/use-loading';
import { useNextTxNonce } from '@app/common/hooks/account/use-next-tx-nonce';
import { HighFeeDrawer } from '@app/features/high-fee-drawer/high-fee-drawer';
import { PopupHeader } from '@app/pages/sign-transaction/components/popup-header';
import { PageTop } from '@app/pages/sign-transaction/components/page-top';
import { ContractCallDetails } from '@app/pages/sign-transaction/components/contract-call-details/contract-call-details';
import { ContractDeployDetails } from '@app/pages/sign-transaction/components/contract-deploy-details/contract-deploy-details';
import { PostConditions } from '@app/pages/sign-transaction/components/post-conditions/post-conditions';
import { StxTransferDetails } from '@app/pages/sign-transaction/components/stx-transfer-details/stx-transfer-details';
import { PostConditionModeWarning } from '@app/pages/sign-transaction/components/post-condition-mode-warning';
import { TransactionError } from '@app/pages/sign-transaction/components/transaction-error/transaction-error';
import {
  useTransactionRequestState,
  useUpdateTransactionBroadcastError,
} from '@app/store/transactions/requests.hooks';
import {
  useLocalTransactionInputsState,
  useTransactionBroadcast,
} from '@app/store/transactions/transaction.hooks';
import { useFeeEstimationsState } from '@app/store/transactions/fees.hooks';

import { FeeForm } from './components/fee-form';
import { SubmitAction } from './components/submit-action';
import { UnauthorizedErrorMessage } from './components/transaction-error/error-messages';

function SignTransactionBase(): JSX.Element | null {
  useNextTxNonce();
  const transactionRequest = useTransactionRequestState();
  const { setIsLoading, setIsIdle } = useLoading(LoadingKeys.SUBMIT_TRANSACTION);
  const handleBroadcastTransaction = useTransactionBroadcast();
  const setBroadcastError = useUpdateTransactionBroadcastError();
  const [, setFeeEstimations] = useFeeEstimationsState();
  const [, setTxData] = useLocalTransactionInputsState();
  const feeSchema = useFeeSchema();

  useRouteHeader(<PopupHeader />);

  const onSubmit = useCallback(
    async values => {
      // Using the same pattern here as is used in the send tokens
      // form, but maybe we can get rid of global form state when
      // we refactor transaction signing?
      setTxData({
        amount: '',
        fee: values.fee,
        memo: '',
        recipient: '',
      });
      setIsLoading();
      await handleBroadcastTransaction();
      setIsIdle();
      setFeeEstimations([]);
      return () => {
        setBroadcastError(null);
        setTxData(null);
      };
    },
    [
      handleBroadcastTransaction,
      setBroadcastError,
      setFeeEstimations,
      setIsIdle,
      setIsLoading,
      setTxData,
    ]
  );

  if (!transactionRequest) return null;
  // This renders when a user has not properly signed out of an app
  // and attempts to perform a transaction
  if (!handleBroadcastTransaction) return <UnauthorizedErrorMessage />;

  return (
    <Stack spacing="loose">
      <PageTop />
      <PostConditionModeWarning />
      <TransactionError />
      <PostConditions />
      {transactionRequest.txType === 'contract_call' && <ContractCallDetails />}
      {transactionRequest.txType === 'token_transfer' && <StxTransferDetails />}
      {transactionRequest.txType === 'smart_contract' && <ContractDeployDetails />}
      <Formik
        initialValues={{ fee: '' }}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={yup.object({
          fee: feeSchema(),
        })}
      >
        {() => (
          <>
            <FeeForm />
            <SubmitAction />
            <HighFeeDrawer />
          </>
        )}
      </Formik>
    </Stack>
  );
}

export const SignTransaction = memo(SignTransactionBase);
