import cn from 'classnames';
import { useState } from 'react';
import classes from './tokens.module.scss';

export type TokensProps = {
  welcomeMessage?: string;
};

export const Tokens = ({ welcomeMessage = 'Welcome to Eds Tokens!' }: TokensProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false); return (
    <div className={cn(classes.background, isHovered ? classes.hovered : '')} onMouseEnter={(): void => setIsHovered(true)} onMouseLeave={(): void => setIsHovered(false)}>
      {' '}
      <h1>{welcomeMessage}</h1>
    </div>
  );
};
export default Tokens;
