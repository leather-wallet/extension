import { useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';

import { HIGH_FEE_WARNING_LEARN_MORE_URL_STX } from '@shared/constants';
import { RouteUrls } from '@shared/route-urls';

import { StxAvatar } from '@app/components/crypto-assets/stacks/components/stx-avatar';
import { EditNonceButton } from '@app/components/edit-nonce-button';
import { FeesRow } from '@app/components/fees-row/fees-row';
import { NonceSetter } from '@app/components/nonce-setter';
import { useCryptoCurrencyMarketData } from '@app/query/common/market-data/market-data.hooks';

import { AmountField } from '../../components/amount-field';
import { Footer } from '../../components/footer';
import { FormFieldsLayout } from '../../components/form-fields.layout';
import { MemoField } from '../../components/memo-field';
import { SelectedAssetField } from '../../components/selected-asset-field';
import { SendCryptoAssetFormLayout } from '../../components/send-crypto-asset-form.layout';
import { SendFiatValue } from '../../components/send-fiat-value';
import { SendMaxButton } from '../../components/send-max-button';
import { StacksRecipientField } from '../../family/stacks/components/stacks-recipient-field/stacks-recipient-field';
import { defaultSendFormFormikProps } from '../../send-form.utils';
import { useStxSendForm } from './use-stx-send-form';

export function StxSendForm() {
  const navigate = useNavigate();
  const stxMarketData = useCryptoCurrencyMarketData('STX');

  const {
    availableStxBalance,
    initialValues,
    onFormStateChange,
    previewTransaction,
    sendMaxBalance,
    stxFees,
    validationSchema,
  } = useStxSendForm();

  return (
    <SendCryptoAssetFormLayout>
      <Formik
        initialValues={initialValues}
        onSubmit={previewTransaction}
        validationSchema={validationSchema}
        {...defaultSendFormFormikProps}
      >
        {props => {
          onFormStateChange(props.values);
          return (
            <NonceSetter>
              <Form>
                <FormFieldsLayout>
                  <AmountField
                    balance={availableStxBalance}
                    switchableAmount={
                      <SendFiatValue marketData={stxMarketData} assetSymbol={'STX'} />
                    }
                    bottomInputOverlay={
                      <SendMaxButton
                        balance={availableStxBalance}
                        sendMaxBalance={sendMaxBalance.minus(props.values.fee).toString()}
                      />
                    }
                    autoComplete="off"
                  />
                  <SelectedAssetField icon={<StxAvatar />} name="Stacks" symbol="STX" />
                  <StacksRecipientField />
                  <MemoField />
                  <FeesRow fees={stxFees} isSponsored={false} mt="tight" />
                  <EditNonceButton
                    alignSelf="flex-end"
                    mb="extra-loose"
                    mt="base"
                    onEditNonce={() => navigate(RouteUrls.EditNonce)}
                  />
                </FormFieldsLayout>
                <Footer balance={availableStxBalance} url={HIGH_FEE_WARNING_LEARN_MORE_URL_STX} />
              </Form>
            </NonceSetter>
          );
        }}
      </Formik>
    </SendCryptoAssetFormLayout>
  );
}
