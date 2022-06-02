import { ComponentStory, Meta } from '@storybook/react';
import { Tokens, TokensProps } from './tokens';

export default {
  component: Tokens,
  title: 'Tokens',
} as Meta;

const Template: ComponentStory<typeof Tokens> = ({
  welcomeMessage,
}: TokensProps) => <Tokens welcomeMessage={welcomeMessage} />;

export const Primary = Template.bind({});
Primary.args = {
  welcomeMessage: 'hi from storybook',
};
