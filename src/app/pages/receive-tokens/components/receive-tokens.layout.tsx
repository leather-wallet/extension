import { FiCopy } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Flex, Text, color } from '@stacks/ui';

import { AddressDisplayer } from '@app/components/address-displayer/address-displayer';
import { BaseDrawer } from '@app/components/drawer/base-drawer';
import { Title } from '@app/components/typography';

import { QrCode } from './address-qr-code';

interface ReceiveTokensLayoutProps {
  address: string;
  accountName: string;
  onCopyAddressToClipboard(address: string): void;
}
export function ReceiveTokensLayout(props: ReceiveTokensLayoutProps) {
  const { address, accountName, onCopyAddressToClipboard } = props;
  const navigate = useNavigate();

  return (
    <BaseDrawer title="Receive" isShowing onClose={() => navigate(-1)}>
      <Flex alignItems="center" flexDirection="column" pb={['loose', '48px']} px="loose">
        <Text color={color('text-caption')} mb="tight" textAlign="left">
          Share your account's unique address to receive tokens or collectibles. Including a memo is
          not required.
        </Text>
        <Box mt="extra-loose" mx="auto">
          <QrCode principal={address} />
        </Box>
        <Flex alignItems="center" flexDirection="column">
          {accountName && (
            <Title fontSize={3} lineHeight="1rem" mt="loose">
              {accountName}
            </Title>
          )}
          <Flex maxWidth="280px" flexWrap="wrap" justifyContent="center" lineHeight={1.8} mt="base">
            <AddressDisplayer address={address} />
          </Flex>
          <Button
            borderRadius="10px"
            height="40px"
            mode="tertiary"
            onClick={() => onCopyAddressToClipboard(address)}
            mt="base"
          >
            <FiCopy />
            <Text ml="tight">Copy address</Text>
          </Button>
        </Flex>
      </Flex>
    </BaseDrawer>
  );
}
