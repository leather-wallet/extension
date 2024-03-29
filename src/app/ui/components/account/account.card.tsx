import { ReactNode } from 'react';

import { SettingsSelectors } from '@tests/selectors/settings.selectors';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { Link } from '@app/ui/components/link/link';
import { ChevronDownIcon } from '@app/ui/icons';

interface AccountCardProps {
  name: string;
  balance: string;
  children: ReactNode;
  switchAccount: ReactNode;
  toggleSwitchAccount(): void;
}

export function AccountCard({
  name,
  balance,
  switchAccount,
  toggleSwitchAccount,
  children,
}: AccountCardProps) {
  return (
    <Flex
      direction="column"
      border={{ base: 'active', sm: 'unset' }}
      rounded="md"
      px={{ base: 'space.05', sm: '0' }}
      pt={{ base: 'space.05', md: '0' }}
    >
      <Link
        _before={{ bg: 'transparent' }}
        _hover={{ color: 'ink.action-primary-hover' }}
        data-testid={SettingsSelectors.SwitchAccountTrigger}
        onClick={toggleSwitchAccount}
        variant="text"
      >
        <Flex>
          <styled.p data-testid={SettingsSelectors.CurrentAccountDisplayName} textStyle="label.01">
            {name}
          </styled.p>
          <Box mt="space.01" ml="space.02">
            <ChevronDownIcon variant="small" />
          </Box>
        </Flex>
      </Link>
      <Flex flexDir={{ base: 'column', md: 'row' }} justify="space-between">
        <styled.h1 textStyle="heading.02" mb="space.05" mt="space.04">
          {balance}
        </styled.h1>
        {switchAccount}
        {children}
      </Flex>
    </Flex>
  );
}
