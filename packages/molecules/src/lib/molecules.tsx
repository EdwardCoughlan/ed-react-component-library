import './molecules.module.scss';
import { Atoms } from '@edwardcoughlan/atoms';

/* eslint-disable-next-line */
export interface MoleculesProps {}

export function Molecules(): JSX.Element {
  return <Atoms welcomeMessage="Hi from molecules" />;
}
