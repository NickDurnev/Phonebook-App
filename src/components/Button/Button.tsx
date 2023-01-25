import { forwardRef, ReactNode } from 'react';
import Wrap from './Button.styled';

export interface IButton {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
  padding: string,
  bgColor?: boolean
}

const Button: React.FC<IButton> = forwardRef(
  ({ children, onClick, padding = '5px', bgColor = true }, ref) => (
    <Wrap
      type="button"
      onClick={onClick}
      padding={padding}
      bgColor={bgColor}
      ref={ref}
    >
      {children}
    </Wrap>
  )
);

export default Button;
