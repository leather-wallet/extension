import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { RouteUrls } from '@shared/route-urls';

import { useBtcCryptoCurrencyAssetBalance } from '@app/common/hooks/balance/btc/use-btc-crypto-currency-asset-balance';
import { useStxCryptoCurrencyAssetBalance } from '@app/common/hooks/balance/stx/use-stx-crypto-currency-asset-balance';
import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { Header } from '@app/components/header';
import { FullPageLoadingSpinner } from '@app/components/loading-spinner';
import { useCurrentAccountNativeSegwitIndexZeroSignerNullable } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';
import { useCurrentStacksAccount } from '@app/store/accounts/blockchain/stacks/stacks-account.hooks';

import { FundLayout } from './components/fund.layout';
import { FiatProvidersList } from './fiat-providers-list';

export function FundPage() {
  const navigate = useNavigate();
  const currentStxAccount = useCurrentStacksAccount();
  const bitcoinSigner = useCurrentAccountNativeSegwitIndexZeroSignerNullable();
  const btcCryptoCurrencyAssetBalance = useBtcCryptoCurrencyAssetBalance();
  const stxCryptoCurrencyAssetBalance = useStxCryptoCurrencyAssetBalance();
  const { currency } = useParams();

  const symbol = currency ?? 'STX';
  const address = symbol === 'BTC' ? bitcoinSigner?.address : currentStxAccount?.address;
  const balance = symbol === 'BTC' ? btcCryptoCurrencyAssetBalance : stxCryptoCurrencyAssetBalance;
  const blockchain = symbol === 'BTC' ? 'bitcoin' : 'stacks';

  useRouteHeader(<Header onClose={() => navigate(RouteUrls.FundChooseCurrency)} title=" " />);

  if (!address || !balance) return <FullPageLoadingSpinner />;

  return (
    <>
      <FundLayout blockchain={blockchain} symbol={symbol}>
        <FiatProvidersList address={address} symbol={symbol} />
      </FundLayout>
      <Outlet />
    </>
  );
}
