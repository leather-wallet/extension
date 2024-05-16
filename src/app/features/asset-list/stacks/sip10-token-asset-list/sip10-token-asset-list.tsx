import { Stack } from 'leather-styles/jsx';

import { isDefined } from '@shared/utils';

import { useFilteredSip10AccountCryptoAssetsWithDetails } from '@app/query/stacks/sip10/sip10-tokens.hooks';

import { Sip10TokenAssetItem } from './sip10-token-asset-item';

interface Sip10TokenAssetListProps {
  address: string;
  onClick?(symbol: string, contractId?: string): void;
}
export function Sip10TokenAssetList({ address, onClick }: Sip10TokenAssetListProps) {
  const assets = useFilteredSip10AccountCryptoAssetsWithDetails({
    address,
    filter: isDefined(onClick) ? 'all' : 'supported',
  });

  if (!assets.length) return null;

  return (
    <Stack>
      {assets.map(asset => (
        <Sip10TokenAssetItem asset={asset} key={asset.info.contractId} onClick={onClick} />
      ))}
    </Stack>
  );
}
