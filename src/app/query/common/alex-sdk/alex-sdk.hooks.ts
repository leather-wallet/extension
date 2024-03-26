import { useCallback, useState } from 'react';

import { AlexSDK, type Currency } from 'alex-sdk';
import BigNumber from 'bignumber.js';

import { logger } from '@shared/logger';
import { createMoney } from '@shared/models/money.model';
import { isDefined } from '@shared/utils';

import { convertAmountToFractionalUnit } from '@app/common/money/calculate-money';
import { pullContractIdFromIdentity } from '@app/common/utils';

import { useAlexLatestPricesQuery } from './latest-prices.query';
import { useAlexSwappableCurrencyQuery } from './swappable-currency.query';

export function useAlexSdKCurrencyPriceAsMoney() {
  const alexSDK = useState(() => new AlexSDK())[0];
  const { data: supportedCurrencies = [] } = useAlexSwappableCurrencyQuery(alexSDK);
  const { data: prices } = useAlexLatestPricesQuery(alexSDK);

  return useCallback(
    (principal: string) => {
      if (!prices) {
        logger.error('Latest prices could not be found');
        return createMoney(0, 'USD');
      }
      const tokenInfo = supportedCurrencies
        .filter(isDefined)
        .find(token => pullContractIdFromIdentity(token.contractAddress) === principal);
      const currency = tokenInfo?.id as Currency;
      const price = convertAmountToFractionalUnit(new BigNumber(prices[currency] ?? 0), 2);
      return createMoney(price, 'USD');
    },
    [prices, supportedCurrencies]
  );
}
