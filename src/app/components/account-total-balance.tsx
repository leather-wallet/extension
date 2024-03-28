import { memo } from 'react';

import { css } from 'leather-styles/css';
import { Box, type BoxProps, styled } from 'leather-styles/jsx';

import { useTotalBalance } from '@app/common/hooks/balance/use-total-balance';

import { shimmerStyles } from '../../shared/shimmer-styles';

interface AccountTotalBalanceProps extends BoxProps {
  btcAddress: string;
  stxAddress: string;
}

export function AccountBalanceShimmer({ ...rest }) {
  return (
    <Box
      width="30px"
      height="30px"
      bgColor="ink.non-interactive"
      data-state="loading"
      borderRadius="sm"
      className={css({
        '&[data-state=loading]': {
          display: 'inline-block',
          WebkitMask: 'linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300% 100%',
          backgroundRepeat: 'no-repeat',
          animation: 'shimmer 1.5s infinite',
          color: 'ink.text-subdued',
        },
      })}
      {...rest}
    />
  );
}

export const AccountTotalBalance = memo(({ btcAddress, stxAddress }: AccountTotalBalanceProps) => {
  const { totalUsdBalance, isLoading, isInitialLoading } = useTotalBalance({
    btcAddress,
    stxAddress,
  });

  if (!totalUsdBalance) return null;

  if (isInitialLoading) {
    return <AccountBalanceShimmer />;
  }

  return (
    <styled.span
      className={css(shimmerStyles)}
      fontWeight={500}
      textStyle="label.02"
      data-state={isLoading ? 'loading' : undefined}
    >
      {totalUsdBalance}
    </styled.span>
  );
});
