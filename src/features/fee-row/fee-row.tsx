import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { useFormikContext } from 'formik';
import { Box, color, Stack, Text } from '@stacks/ui';

import { stacksValue } from '@common/stacks-utils';
import { TransactionFormValues } from '@common/transactions/transaction-utils';
import { openInNewTab } from '@common/utils/open-in-new-tab';
import { ErrorLabel } from '@components/error-label';
import { Tooltip } from '@components/tooltip';
import { WarningLabel } from '@components/warning-label';
import { LoadingRectangle } from '@components/loading-rectangle';
import { SpaceBetween } from '@components/space-between';
import { Caption } from '@components/typography';
import { Estimations } from '@models/fees-types';
import { useFeeEstimationsState } from '@store/transactions/fees.hooks';
import { SendFormSelectors } from '@tests/page-objects/send-form.selectors';

import { TransactionFee } from './components/transaction-fee';
import { FeeEstimateItem } from './components/fee-estimate-item';
import { FeeEstimateSelect } from './components/fee-estimate-select';
import { CustomFeeField } from './components/custom-fee-field';

const feesInfo =
  'Higher fees increase the likelihood of your transaction getting confirmed before others. Click to learn more.';
const url = 'https://hiro.so/questions/fee-estimates';

interface FeeRowProps {
  feeEstimationsError: boolean;
}

export function FeeRow(props: FeeRowProps): JSX.Element {
  const { feeEstimationsError } = props;
  const { errors, setFieldValue, values } = useFormikContext<TransactionFormValues>();
  const [fieldWarning, setFieldWarning] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [feeEstimations] = useFeeEstimationsState();
  const [selected, setSelected] = useState(Estimations.Middle);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    // Check for query error on mount and fallback
    // to the custom input if needed
    if (feeEstimationsError) {
      setSelected(Estimations.Custom);
      setIsCustom(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handles using the fee estimations selector or custom input
  const handleSelectedItem = useCallback(
    (index: number) => {
      if (!feeEstimations) return;
      if (selected !== index) setSelected(index);
      if (index === Estimations.Custom) {
        setFieldValue('fee', '');
        setIsCustom(true);
      } else {
        setFieldValue(
          'fee',
          stacksValue({
            fixedDecimals: true,
            value: feeEstimations[index].fee,
            withTicker: false,
          })
        );
        setFieldWarning('');
        setIsCustom(false);
      }
      setIsOpen(false);
    },
    [feeEstimations, selected, setFieldValue]
  );

  return (
    <Stack spacing="base">
      <SpaceBetween position="relative">
        <Stack alignItems="center" isInline>
          {!feeEstimationsError ? <Caption>Fees</Caption> : <Caption>Enter a custom fee</Caption>}
          {!feeEstimationsError ? (
            <Stack _hover={{ cursor: 'pointer' }}>
              <FeeEstimateItem index={selected} onClick={() => setIsOpen(true)} />
              <FeeEstimateSelect
                items={feeEstimations}
                onClick={handleSelectedItem}
                setIsOpen={setIsOpen}
                visible={isOpen}
              />
            </Stack>
          ) : null}
          <Tooltip label={feesInfo} placement="bottom">
            <Stack>
              <Box
                _hover={{ cursor: 'pointer' }}
                as={FiInfo}
                color={color('text-caption')}
                onClick={() => openInNewTab(url)}
                size="14px"
              />
            </Stack>
          </Tooltip>
        </Stack>
        {isCustom ? (
          <CustomFeeField setFieldWarning={setFieldWarning} />
        ) : !values.fee ? (
          <LoadingRectangle width="50px" height="10px" />
        ) : (
          <Suspense fallback={<></>}>
            <Caption>
              <TransactionFee fee={values.fee} />
            </Caption>
          </Suspense>
        )}
      </SpaceBetween>
      {errors.fee && (
        <ErrorLabel data-testid={SendFormSelectors.InputCustomFeeFieldErrorLabel}>
          <Text lineHeight="18px" textStyle="caption">
            {errors.fee}
          </Text>
        </ErrorLabel>
      )}
      {!errors.fee && fieldWarning && <WarningLabel>{fieldWarning}</WarningLabel>}
    </Stack>
  );
}
