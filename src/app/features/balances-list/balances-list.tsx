import { Box, Stack, StackProps } from '@stacks/ui';
import { HomePageSelectorsLegacy } from '@tests-legacy/page-objects/home.selectors';

import { useBtcAssetBalance } from '@app/common/hooks/balance/btc/use-btc-balance';
import { useStxBalance } from '@app/common/hooks/balance/stx/use-stx-balance';
import { CryptoCurrencyAssetItem } from '@app/components/crypto-assets/crypto-currency-asset/crypto-currency-asset-item';
import { StxAvatar } from '@app/components/crypto-assets/stacks/components/stx-avatar';
import { BtcIcon } from '@app/components/icons/btc-icon';
import { LoadingSpinner } from '@app/components/loading-spinner';
import { useBrc20TokensByAddressQuery } from '@app/query/bitcoin/ordinals/brc20-tokens.query';
import { useConfigBitcoinEnabled } from '@app/query/common/hiro-config/hiro-config.query';
import {
  useStacksFungibleTokenAssetBalancesAnchoredWithMetadata,
  useStacksUnanchoredCryptoCurrencyAssetBalance,
} from '@app/query/stacks/balance/stacks-ft-balances.hooks';

import { Collectibles } from '../collectibles/collectibles';
import { BitcoinFungibleTokenAssetList } from './components/bitcoin-fungible-tokens-asset-list';
import { StacksFungibleTokenAssetList } from './components/stacks-fungible-token-asset-list';

interface BalancesListProps extends StackProps {
  address: string;
}
export function BalancesList({ address, ...props }: BalancesListProps) {
  const { data: stxUnachoredAssetBalance } = useStacksUnanchoredCryptoCurrencyAssetBalance(address);
  const stacksFtAssetBalances = useStacksFungibleTokenAssetBalancesAnchoredWithMetadata(address);
  const isBitcoinEnabled = useConfigBitcoinEnabled();
  const { stxEffectiveBalance, stxEffectiveUsdBalance } = useStxBalance();
  const { btcAddress, btcAssetBalance, btcUsdBalance } = useBtcAssetBalance();
  const { data: brc20Tokens } = useBrc20TokensByAddressQuery(btcAddress);

  // Better handle loading state
  if (!stxUnachoredAssetBalance) return <LoadingSpinner />;

  return (
    <Stack
      pb="extra-loose"
      spacing="loose"
      data-testid={HomePageSelectorsLegacy.BalancesList}
      {...props}
    >
      {isBitcoinEnabled && (
        <CryptoCurrencyAssetItem
          assetBalance={btcAssetBalance}
          usdBalance={btcUsdBalance}
          icon={<Box as={BtcIcon} />}
          address={btcAddress}
        />
      )}
      <CryptoCurrencyAssetItem
        assetBalance={stxEffectiveBalance}
        usdBalance={stxEffectiveUsdBalance}
        address={address}
        icon={<StxAvatar {...props} />}
      />
      <StacksFungibleTokenAssetList assetBalances={stacksFtAssetBalances} />
      <BitcoinFungibleTokenAssetList brc20Tokens={brc20Tokens?.result.list} />
      <Collectibles />
    </Stack>
  );
}
