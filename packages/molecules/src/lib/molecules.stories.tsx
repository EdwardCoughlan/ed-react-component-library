// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import { Molecules } from './molecules';

export default {
  component: Molecules,
  title: 'Molecules',
} as Meta;

const Template: Story = () => <Molecules />;

export const Primary = Template.bind({});
Primary.args = {};
