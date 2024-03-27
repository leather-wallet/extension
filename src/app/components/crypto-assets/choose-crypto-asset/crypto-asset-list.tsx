import { useLocation } from 'react-router-dom';

import type { AllTransferableCryptoAssetBalances } from '@shared/models/crypto-asset-balance.model';
import { StacksFungibleTokenAsset } from '@shared/models/crypto-asset.model';
import { RouteUrls } from '@shared/route-urls';

import { useWalletType } from '@app/common/use-wallet-type';
import { BitcoinNativeSegwitAccountLoader } from '@app/components/account/bitcoin-account-loader';
import { BitcoinBalanceLoader } from '@app/components/balance/bitcoin-balance-loader';
import { Brc20TokensLoader } from '@app/components/brc20-tokens-loader';
import { Brc20TokenAssetList } from '@app/components/crypto-assets/bitcoin/brc20-token-asset-list/brc20-token-asset-list';
import { BtcAvatarIcon } from '@app/ui/components/avatar/btc-avatar-icon';

import { CryptoCurrencyAssetItemLayout } from '../crypto-currency-asset/crypto-currency-asset-item.layout';
import { CryptoAssetListItem } from './crypto-asset-list-item';
import { CryptoAssetListLayout } from './crypto-asset-list.layout';

interface CryptoAssetListProps {
  cryptoAssetBalances: AllTransferableCryptoAssetBalances[];
  onItemClick(cryptoAssetBalance: AllTransferableCryptoAssetBalances): void;
}
export function CryptoAssetList({ cryptoAssetBalances, onItemClick }: CryptoAssetListProps) {
  const { pathname } = useLocation();
  const { whenWallet } = useWalletType();

  return (
    <CryptoAssetListLayout>
      <BitcoinNativeSegwitAccountLoader current>
        {signer => (
          <BitcoinBalanceLoader address={signer.address}>
            {balance => (
              <CryptoCurrencyAssetItemLayout
                assetBalance={balance}
                icon={<BtcAvatarIcon />}
                onClick={() => onItemClick(balance)}
              />
            )}
          </BitcoinBalanceLoader>
        )}
      </BitcoinNativeSegwitAccountLoader>
      {cryptoAssetBalances.map(cryptoAssetBalance => (
        <CryptoAssetListItem
          onClick={() => onItemClick(cryptoAssetBalance)}
          assetBalance={cryptoAssetBalance}
          key={
            cryptoAssetBalance.asset.name ??
            (cryptoAssetBalance.asset as StacksFungibleTokenAsset).contractAssetName
          }
        />
      ))}
      {whenWallet({
        software:
          pathname !== RouteUrls.FundChooseCurrency ? (
            <BitcoinNativeSegwitAccountLoader current>
              {() => (
                <Brc20TokensLoader>
                  {brc20Tokens => <Brc20TokenAssetList brc20Tokens={brc20Tokens} />}
                </Brc20TokensLoader>
              )}
            </BitcoinNativeSegwitAccountLoader>
          ) : null,
        ledger: null,
      })}
    </CryptoAssetListLayout>
  );
}
