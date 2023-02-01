import { Flex, Spinner, Stack, StackProps, color, useMediaQuery } from '@stacks/ui';
import { truncateMiddle } from '@stacks/ui-utils';
import { SettingsSelectors } from '@tests-legacy/integration/settings.selectors';

import { useBitcoinFeature } from '@app/common/hooks/use-bitcoin-feature';
import { Caption, CaptionSeparatorDot } from '@app/components/typography';

import { AccountActiveCheckmark } from './account-active-checkmark';

interface AccountListItemLayoutProps extends StackProps {
  isLoading: boolean;
  isActive: boolean;
  index: number;
  stxAddress: string;
  btcAddress: string;
  accountName: JSX.Element;
  avatar: JSX.Element;
  balanceLabel: JSX.Element;
  onSelectAccount(): void;
}
export function AccountListItemLayout(props: AccountListItemLayoutProps) {
  const {
    index,
    isLoading,
    isActive,
    stxAddress,
    btcAddress,
    accountName,
    avatar,
    balanceLabel,
    onSelectAccount,
    children = null,
    ...rest
  } = props;

  const [isNarrowViewport] = useMediaQuery('(max-width: 400px)');
  const { isBitcoinEnabled } = useBitcoinFeature();
  return (
    <Flex
      width="100%"
      key={`account-${index}`}
      data-testid={SettingsSelectors.AccountIndex.replace('[index]', `${index}`)}
      cursor="pointer"
      position="relative"
      onClick={onSelectAccount}
      {...rest}
    >
      <Stack isInline alignItems="center" spacing="base">
        {avatar}
        <Stack spacing="base-tight">
          <Flex>
            {accountName}
            {isActive && isNarrowViewport && <AccountActiveCheckmark index={index} ml="tight" />}
          </Flex>
          <Stack alignItems="center" spacing="6px" isInline whiteSpace="nowrap">
            <Caption>{truncateMiddle(stxAddress, isNarrowViewport ? 3 : 4)}</Caption>
            {isBitcoinEnabled && (
              <>
                <CaptionSeparatorDot />
                <Caption>{truncateMiddle(btcAddress, 5)}</Caption>
              </>
            )}
            {balanceLabel}
          </Stack>
        </Stack>
      </Stack>
      {isLoading && (
        <Spinner
          position="absolute"
          right={0}
          top="calc(50% - 8px)"
          color={color('text-caption')}
          size="18px"
        />
      )}
      {isActive && !isNarrowViewport && (
        <AccountActiveCheckmark index={index} position="absolute" right={0} top="calc(50% - 8px)" />
      )}
      {children}
    </Flex>
  );
}
