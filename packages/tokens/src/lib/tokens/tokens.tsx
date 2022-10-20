import cn from 'classnames';
import { FC, useState } from 'react';
import classes from './tokens.module.scss';

export type TokensProps = {
  welcomeMessage?: string;
};

export const Tokens: FC<TokensProps> = ({
  welcomeMessage = 'Welcome to Eds Tokens!',
}: TokensProps) => {
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
export default Tokens;
