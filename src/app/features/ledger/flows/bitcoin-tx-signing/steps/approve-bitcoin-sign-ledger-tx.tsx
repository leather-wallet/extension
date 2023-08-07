import * as btc from '@scure/btc-signer';

import { getPsbtTxInputs, getPsbtTxOutputs } from '@shared/crypto/bitcoin/bitcoin.utils';

import { useLedgerTxSigningContext } from '@app/features/ledger/generic-flows/tx-signing/ledger-sign-tx.context';
import { ApproveLedgerOperationLayout } from '@app/features/ledger/generic-steps/approve-ledger-operation/approve-ledger-operation.layout';
import { useHasApprovedOperation } from '@app/features/ledger/hooks/use-has-approved-transaction';

export function ApproveBitcoinSignLedgerTx() {
  const hasApprovedOperation = useHasApprovedOperation();

  const context = useLedgerTxSigningContext();

  if (context.chain !== 'bitcoin') return null;
  console.log(context);

  // const recipients =

  return (
    <ApproveLedgerOperationLayout
      description="Verify the transaction details on your Ledger"
      details={
        [
          ...getPsbtTxInputs(context.transaction as unknown as btc.Transaction).map((input, i) => [
            `Input ${i + 1}`,
            input.witnessUtxo?.amount?.toString() + ' sats',
          ]),
          ...getPsbtTxOutputs(context.transaction as unknown as btc.Transaction).map(
            (output, i) => [`Output ${i + 1}`, output.amount?.toString() + ' sats']
          ),
        ] as [string, string][]
      }
      status={hasApprovedOperation ? 'approved' : 'awaiting-approval'}
    />
  );
}
