import { useQuery } from '@tanstack/react-query';
import { AlexSDK } from 'alex-sdk';

export function useAlexLatestPricesQuery(alexSDK: AlexSDK) {
  return useQuery(['alex-latest-prices'], async () => alexSDK.getLatestPrices(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryDelay: 1000 * 60,
    staleTime: 1000 * 60 * 10,
  });
}
