import type { BtcCryptoAssetInfo, CryptoAssetBalance, MarketData } from '@leather-wallet/models';

import { baseCurrencyAmountInQuote } from '@app/common/money/calculate-money';
import { i18nFormatCurrency } from '@app/common/money/format-money';
import { capitalize } from '@app/common/utils';
import { CryptoAssetItemLayout } from '@app/components/crypto-asset-item/crypto-asset-item.layout';
import { BtcAvatarIcon } from '@app/ui/components/avatar/btc-avatar-icon';

interface BtcCryptoAssetItemProps {
  assetInfo: BtcCryptoAssetInfo;
  balance: CryptoAssetBalance;
  isLoading: boolean;
  marketData: MarketData;
  onClick?(symbol: string): void;
  rightElement?: React.ReactNode;
}
export function BtcCryptoAssetItem({
  assetInfo,
  balance,
  isLoading,
  marketData,
  onClick,
  rightElement,
}: BtcCryptoAssetItemProps) {
  const availableBalanceAsFiat = i18nFormatCurrency(
    baseCurrencyAmountInQuote(balance.availableBalance, marketData)
  );

  return (
    <CryptoAssetItemLayout
      balance={balance}
      fiatBalance={availableBalanceAsFiat}
      icon={<BtcAvatarIcon />}
      isLoading={isLoading}
      name={capitalize(assetInfo.name)}
      onClick={onClick}
      rightElement={rightElement}
      symbol={assetInfo.symbol}
    />
  );
}
