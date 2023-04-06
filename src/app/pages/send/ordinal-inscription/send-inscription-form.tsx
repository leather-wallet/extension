import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Flex } from '@stacks/ui';
import { Form, Formik } from 'formik';

import { logger } from '@shared/logger';
import { OrdinalSendFormValues } from '@shared/models/form.model';
import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { BaseDrawer } from '@app/components/drawer/base-drawer';
import { ErrorLabel } from '@app/components/error-label';
import { OrdinalIcon } from '@app/components/icons/ordinal-icon';
import { InscriptionPreview } from '@app/components/inscription-preview-card/components/inscription-preview';
import { getNumberOfInscriptionOnUtxo } from '@app/query/bitcoin/ordinals/ordinals-aware-utxo.query';

import { InscriptionPreviewCard } from '../../../components/inscription-preview-card/inscription-preview-card';
import { RecipientField } from '../send-crypto-asset-form/components/recipient-field';
import { CollectibleAsset } from './components/collectible-asset';
import { useInscriptionSendState } from './send-inscription-container';
import { useGenerateSignedOrdinalTx } from './use-generate-ordinal-tx';
import { useOrdinalInscriptionFormValidationSchema } from './use-ordinal-inscription-form-validation-schema';

export const recipeintFieldName = 'recipient';

export function SendInscriptionForm() {
  const [currentError, setShowError] = useState<null | string>(null);
  const navigate = useNavigate();
  const { inscription, utxo, recipient } = useInscriptionSendState();

  const validationSchema = useOrdinalInscriptionFormValidationSchema();
  const [isLoading, setIsLoading] = useState(false);
  const analytics = useAnalytics();

  const { coverFeeFromAdditionalUtxos } = useGenerateSignedOrdinalTx(utxo);

  async function reviewTransaction(values: OrdinalSendFormValues) {
    const resp = coverFeeFromAdditionalUtxos(values);

    if (Number(inscription.offset) !== 0) {
      setShowError('Sending inscriptions at non-zero offsets is unsupported');
      return;
    }

    try {
      const numInscriptionsOnUtxo = await getNumberOfInscriptionOnUtxo(utxo.txid, utxo.vout);
      if (numInscriptionsOnUtxo !== 1) {
        setShowError('Sending inscription from utxo with multiple inscriptions is unsupported');
        return;
      }
    } catch (error) {
      void analytics.track('ordinals_dot_com_unavailable', { error });
      setShowError('Unable to establish if utxo has multiple inscriptions.');
      return;
    }

    if (!resp) return logger.error('Attempted to generate raw tx, but no tx exists');

    const { hex } = resp;
    return navigate(RouteUrls.SendOrdinalInscriptionReview, {
      state: { fee: resp.fee, inscription, utxo, recipient: values.recipient, tx: hex },
    });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ [recipeintFieldName]: recipient, inscription }}
      onSubmit={async values => {
        try {
          setIsLoading(true);
          await reviewTransaction(values);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <Form>
        <BaseDrawer title="Send" enableGoBack isShowing onClose={() => navigate(RouteUrls.Home)}>
          <Box mt="extra-loose" px="extra-loose">
            <InscriptionPreviewCard
              image={<InscriptionPreview inscription={inscription} />}
              subtitle="Ordinal inscription"
              title={inscription.title}
            />
            <Box mt={['base', 'extra-loose', '100px']}>
              <Flex flexDirection="column" mt="loose" width="100%">
                <CollectibleAsset icon={<OrdinalIcon />} name="Ordinal inscription" />
                <RecipientField
                  name={recipeintFieldName}
                  label="To"
                  placeholder="Enter recipient address"
                />
              </Flex>
            </Box>
            {currentError && (
              <ErrorLabel textAlign="left" mb="base-loose">
                {currentError}
              </ErrorLabel>
            )}
            <Button
              mb="extra-loose"
              mt="tight"
              type="submit"
              borderRadius="10px"
              height="48px"
              width="100%"
              isLoading={isLoading}
            >
              Continue
            </Button>
          </Box>
        </BaseDrawer>
      </Form>
    </Formik>
  );
}
