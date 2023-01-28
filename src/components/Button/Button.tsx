import { forwardRef, ReactNode } from 'react';
import Wrap from './Button.styled';

interface IProps {
  children: ReactNode;
  onClick: () => void;
  padding?: string;
  bgColor?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IProps>(
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
