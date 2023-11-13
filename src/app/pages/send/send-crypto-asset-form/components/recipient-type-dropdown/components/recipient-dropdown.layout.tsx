import { ReactNode, useRef } from 'react';

import { Box, Stack } from 'leather-styles/jsx';

import { useOnClickOutside } from '@app/common/hooks/use-onclickoutside';

import { RecipientDropdownItem } from './recipient-dropdown-item';

interface RecipientDropdownLayoutProps {
  children: ReactNode;
  onSetIsSelectVisible(value: boolean): void;
  selectedItem: number;
}
export function RecipientDropdownLayout({
  children,
  onSetIsSelectVisible,
  selectedItem,
}: RecipientDropdownLayoutProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => onSetIsSelectVisible(false));

  return (
    <Box>
      <RecipientDropdownItem index={selectedItem} onSelectItem={() => onSetIsSelectVisible(true)} />
      <Stack
        bg="accent.background-primary"
        borderRadius="8px"
        boxShadow="high"
        flexDirection="column"
        minWidth="100px"
        overflow="hidden"
        p="space.01"
        position="absolute"
        ref={ref}
        top="40px"
        zIndex={9999}
      >
        {children}
      </Stack>
    </Box>
  );
}
