import { useQuery } from '@tanstack/react-query';
import { AlexSDK } from 'alex-sdk';

export function useAlexSwappableCurrencyQuery(alexSDK: AlexSDK) {
  return useQuery(['alex-swappable-currencies'], async () => alexSDK.fetchSwappableCurrency(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryDelay: 1000 * 60,
    staleTime: 1000 * 60 * 10,
  });
}
