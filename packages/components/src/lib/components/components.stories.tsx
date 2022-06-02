import { Story, Meta } from '@storybook/react';
import { Components } from './components';

export default {
  component: Components,
  title: 'Components',
} as Meta;

const Template: Story = () => <Components />;

export const Primary = Template.bind({});
Primary.args = {};
