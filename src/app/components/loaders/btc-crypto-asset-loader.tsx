import type { BtcCryptoAssetInfo, CryptoAssetBalance, MarketData } from '@leather-wallet/models';

import { BTC_DECIMALS } from '@shared/constants';

import { useGetBitcoinBalanceByAddress } from '@app/query/bitcoin/balance/btc-balance.hooks';
import { useCryptoCurrencyMarketDataMeanAverage } from '@app/query/common/market-data/market-data.hooks';

const btcCryptoAssetInfo: BtcCryptoAssetInfo = {
  decimals: BTC_DECIMALS,
  hasMemo: false,
  name: 'bitcoin',
  symbol: 'BTC',
};

interface BtcCryptoAssetLoaderProps {
  address: string;
  children(
    assetInfo: BtcCryptoAssetInfo,
    balance: CryptoAssetBalance,
    marketData: MarketData,
    isInitialLoading: boolean
  ): React.ReactNode;
}
export function BtcCryptoAssetLoader({ address, children }: BtcCryptoAssetLoaderProps) {
  const marketData = useCryptoCurrencyMarketDataMeanAverage('BTC');
  const { balance, isInitialLoading } = useGetBitcoinBalanceByAddress(address);
  return children(btcCryptoAssetInfo, { availableBalance: balance }, marketData, isInitialLoading);
}
