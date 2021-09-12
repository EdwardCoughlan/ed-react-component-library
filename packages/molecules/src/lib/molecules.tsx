import { Atoms } from '@edwardcoughlan/atoms';
import cn from 'classnames';
import classes from './molecules.module.scss';

export function Molecules(): JSX.Element {
  return (
    <div className={cn(classes.molecules)}>
      <Atoms welcomeMessage="Hi from molecules" />
    </div>
  );
}

export default Molecules;
