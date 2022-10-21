import { FC } from 'react';
import { Tokens } from '@edwardcoughlan/tokens';
import cn from 'classnames';
import classes from './components.module.scss';

export const Components: FC = () => (
  <div className={cn(classes.molecules)}>
    <Tokens welcomeMessage="Hi from molecules" />
  </div>
);

export default Components;
