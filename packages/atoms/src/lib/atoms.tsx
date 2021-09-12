import cn from 'classnames';
import { useState } from 'react';
import classes from './atoms.module.scss';

export interface AtomsProps {
  welcomeMessage?: string;
}

export const Atoms = ({
  welcomeMessage = 'Welcome to Atoms!',
}: AtomsProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={cn(classes.background, isHovered ? classes.hovered : '')}
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)}
    >
      <h1>{welcomeMessage}</h1>
    </div>
  );
};
export default Atoms;
