// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, Meta } from '@storybook/react';
import { AtomsProps } from '..';
import { Atoms } from './atoms';

export default {
  component: Atoms,
  title: 'Atoms',
} as Meta;

const Template: ComponentStory<typeof Atoms> = ({
  welcomeMessage,
}: AtomsProps) => <Atoms welcomeMessage={welcomeMessage} />;

export const Primary = Template.bind({});
Primary.args = {
  welcomeMessage: 'hi from storybook',
};
