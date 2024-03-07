import { Meta, StoryObj } from '@storybook/react';
import { Box, Circle, Flex } from 'leather-styles/jsx';

import { Button } from '@app/ui/components/button/button';
import { Callout } from '@app/ui/components/callout/callout';
import { Flag } from '@app/ui/components/flag/flag';
import { ItemInteractive } from '@app/ui/components/item/item-interactive';
import { ItemLayout } from '@app/ui/components/item/item.layout';

import { Approver } from './approver';

const meta: Meta<typeof Approver> = {
  component: Approver,
  tags: ['autodocs'],
  title: 'Feature/Approver',

  render: ({ children, ...args }) => (
    <Flex maxW="390px" h="680px" border="1px solid lightgrey" overflowY="auto">
      <Approver {...args}>{children}</Approver>
    </Flex>
  ),
};

export default meta;

type Story = StoryObj<typeof Approver>;

export const ExampleOne: Story = {
  args: {
    children: (
      <>
        <Approver.Header title="Some prompt that breaks two lines" requester="gamma.io" />
        <Callout title="Some callout">Hey watch out for this sketchy app</Callout>
        <Approver.Section>
          <Approver.Subheader>Example flag content</Approver.Subheader>
          <Flag img={<Circle size="40px" backgroundColor="ink.border-default" />} align="top">
            <Box width="90%" height="16px" backgroundColor="ink.border-default" />
            <Box width="75%" height="12px" backgroundColor="ink.border-default" mt="space.02" />
          </Flag>
        </Approver.Section>
        <Approver.Section>
          <Approver.Subheader>Example rich content with avatar</Approver.Subheader>
          <ItemLayout
            titleLeft="Michelly token"
            titleRight="100 MICA"
            captionLeft="SIP-10"
            captionRight="$894,891"
            flagImg={<Circle size="40px" backgroundColor="ink.border-default" />}
          />
        </Approver.Section>
        <Approver.Advanced>
          <Approver.Section>
            <Approver.Subheader>In the advanced section</Approver.Subheader>
            <ItemInteractive onClick={() => {}} mt="space.03" mb="space.03">
              <ItemLayout
                titleLeft="Pressable"
                titleRight="Mr. Clicky"
                captionLeft="Interactive item"
                captionRight="Click me"
                flagImg={<Circle size="40px" backgroundColor="ink.border-default" />}
              />
            </ItemInteractive>
          </Approver.Section>
          <Approver.Section>
            <Approver.Subheader>Inputs & Outputs</Approver.Subheader>
            <Flag align="top" img={<Circle size="40px" backgroundColor="ink.border-default" />}>
              <Box width="100%" height="20px" backgroundColor="ink.border-default" />
            </Flag>
          </Approver.Section>
          <Approver.Section>
            <Approver.Subheader>Transaction raw data</Approver.Subheader>
            <Flag align="top" img={<Circle size="40px" backgroundColor="ink.border-default" />}>
              <Box width="100%" height="20px" backgroundColor="ink.border-default" />
            </Flag>
          </Approver.Section>
          <Approver.Section>
            <Approver.Subheader>Additional info</Approver.Subheader>
            <Flag align="top" img={<Circle size="40px" backgroundColor="ink.border-default" />}>
              <Box width="100%" height="20px" backgroundColor="ink.border-default" />
            </Flag>
          </Approver.Section>
        </Approver.Advanced>

        <Approver.Actions
          actions={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Approve</Button>
            </>
          }
        />
      </>
    ),
  },
};

export const ActionsAlignToBottom: Story = {
  args: {
    children: (
      <>
        <Approver.Header
          title="Action align to bottom of page"
          requester="even when there's no content to push it there"
        />

        <Approver.Actions
          actions={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Approve</Button>
            </>
          }
        />
      </>
    ),
  },
};
