import { CryptoAssetItemLayout } from '@app/components/crypto-asset-item/crypto-asset-item.layout';
import { StacksAssetAvatar } from '@app/components/stacks-asset-avatar';
import type { Sip10AccountCryptoAssetWithDetails } from '@app/query/models/crypto-asset.model';

import { parseSip10TokenCryptoAssetBalance } from './sip10-token-asset-item.utils';

interface Sip10TokenAssetItemProps {
  asset: Sip10AccountCryptoAssetWithDetails;
  onClick?(symbol: string, contractId?: string): void;
}
export function Sip10TokenAssetItem({ asset, onClick }: Sip10TokenAssetItemProps) {
  const { avatar, fiatBalance, imageCanonicalUri, title } =
    parseSip10TokenCryptoAssetBalance(asset);

  return (
    <CryptoAssetItemLayout
      balance={asset.balance}
      fiatBalance={fiatBalance}
      caption={asset.info.symbol}
      icon={
        <StacksAssetAvatar
          color="white"
          gradientString={avatar}
          imageCanonicalUri={imageCanonicalUri}
        >
          {title[0]}
        </StacksAssetAvatar>
      }
      name={asset.info.name}
      onClick={onClick}
      symbol={asset.info.symbol}
    />
  );
}
