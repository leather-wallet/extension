import { useNavigate } from 'react-router-dom';

import { Box, styled } from 'leather-styles/jsx';

import { RouteUrls } from '@shared/route-urls';

import { AssetList } from '@app/features/asset-list/asset-list';
import { useConfigBitcoinSendEnabled } from '@app/query/common/remote-config/remote-config.query';
import { Card } from '@app/ui/layout/card/card';

export function ChooseCryptoAsset() {
  const navigate = useNavigate();
  const isBitcoinSendEnabled = useConfigBitcoinSendEnabled();
  // const toast = useToast();

  function navigateToSendForm(symbol: string, contractId?: string) {
    if (!isBitcoinSendEnabled) return navigate(RouteUrls.SendBtcDisabled);

    if (contractId) {
      // const { assetName } = getAssetStringParts(contractId);
      // const symbol = !info.symbol ? assetName : info.symbol.toLowerCase();
      return navigate(`${RouteUrls.SendCryptoAsset}/${symbol}/${contractId}`);
    }
    // toast.error('No contract id');
    // return navigate('..');

    return navigate(`${RouteUrls.SendCryptoAsset}/${symbol.toLowerCase()}`);
  }

  return (
    <Card
      header={
        <styled.h1 textStyle="heading.03" p="space.05">
          choose asset <br /> to send
        </styled.h1>
      }
    >
      <Box pb="space.04" px="space.05">
        <AssetList onClick={navigateToSendForm} variant="interactive" />
      </Box>
    </Card>
  );
}
