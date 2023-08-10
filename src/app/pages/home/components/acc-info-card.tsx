import { FiArrowDown, FiArrowRight, FiArrowRightCircle, FiArrowUp, FiPlus } from 'react-icons/fi';

import { Box, Container, Flex, Separator, Text } from '@radix-ui/themes';

import { useCurrentAccountDisplayName } from '@app/common/hooks/account/use-account-names';
import { useTotalBalance } from '@app/common/hooks/balance/use-total-balance';
import { LButton } from '@app/components/button/button';
import { useCurrentAccountNativeSegwitIndexZeroSigner } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';
import { useCurrentStacksAccount } from '@app/store/accounts/blockchain/stacks/stacks-account.hooks';

import AccessibleIcon from './accessible-icon';

export function AccInfoCard() {
  const name = useCurrentAccountDisplayName();
  const account = useCurrentStacksAccount();
  const nativeSegwitSigner = useCurrentAccountNativeSegwitIndexZeroSigner();
  const btcAddress = nativeSegwitSigner.address;
  const totalBalance = useTotalBalance({ btcAddress, stxAddress: account?.address || '' });

  const actions = [
    { label: 'Deposit', icon: <FiPlus /> },
    { label: 'Send', icon: <FiArrowUp /> },
    { label: 'Receive', icon: <FiArrowDown /> },
    { label: 'Swap', icon: <FiArrowRightCircle /> },
  ];
  return (
    <Container
      size="1"
      p="5"
      style={{ background: 'var(--brown-3)', borderRadius: 'var(--radius-5)' }}
    >
      <Flex direction="column" gap="4">
        <LButton color="gray" highContrast variant="ghost">
          <Flex align="center" justify="between" grow="1">
            <Text size="3" weight="medium">
              {name}
            </Text>
            <Box>
              <AccessibleIcon label="account">
                <FiArrowRight />
              </AccessibleIcon>
            </Box>
          </Flex>
        </LButton>

        <Text size="8" weight="bold">
          {totalBalance?.totalUsdBalance}
        </Text>
        <Separator my="4" size="4" />

        <Flex justify="between" gap="5">
          {actions.map(action => (
            <LButton variant="ghost" color="gray" highContrast key={action.label}>
              <Flex gap="2" direction="column" align="center">
                <AccessibleIcon label={action.label}>{action.icon}</AccessibleIcon>
                <Text weight="medium">{action.label}</Text>
              </Flex>
            </LButton>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
