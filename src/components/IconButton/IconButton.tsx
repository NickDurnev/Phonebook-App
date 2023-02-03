import { ReactNode, FC } from 'react';
import Wrap from './IconButton.styled';

interface IProps {
  children: ReactNode;
  onClick?: () => void;
  width?: string;
}

const IconButton: FC<IProps> = ({ children, onClick, width = '100%' }) => (
  <Wrap type="button" onClick={onClick} width={width}>
    {children}
  </Wrap>
);

export default IconButton;
