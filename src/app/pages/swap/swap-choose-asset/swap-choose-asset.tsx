import { useLocation, useNavigate } from 'react-router-dom';

import { SwapSelectors } from '@tests/selectors/swap.selectors';
import { Box } from 'leather-styles/jsx';
import get from 'lodash.get';

import { RouteUrls } from '@shared/route-urls';

import { Dialog } from '@app/ui/components/containers/dialog/dialog';
import { BigTitle } from '@app/ui/components/containers/headers/header';

import { useSwapContext } from '../swap.context';
import { SwapAssetList } from './components/swap-asset-list';

export function useSwapChooseAssetState() {
  const location = useLocation();
  const swapListType = get(location.state, 'swap') as string;
  return { swapListType };
}

export function SwapChooseAsset() {
  const { swappableAssetsFrom, swappableAssetsTo } = useSwapContext();
  const { swapListType } = useSwapChooseAssetState();
  const navigate = useNavigate();

  const isFromList = swapListType === 'from';

  const title = isFromList ? 'Choose asset to swap' : 'Choose asset to receive';

  return (
    <Dialog isShowing title={<BigTitle title={title} />} onClose={() => navigate(RouteUrls.Swap)}>
      {/* try replace below height with dialog and get rid of box */}
      <Box data-testid={SwapSelectors.ChooseAssetList} maxHeight={{ base: '80vh', md: '50vh' }}>
        <SwapAssetList assets={isFromList ? swappableAssetsFrom : swappableAssetsTo} />
      </Box>
    </Dialog>
  );
}