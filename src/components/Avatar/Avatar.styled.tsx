import styled from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';

interface IProps {
  width: string
}

export const Wrap = styled.div<IProps>`
  width: ${props => props.width};
`;

export const Icon = styled.img`
  width: 100%;
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const DefaultIcon = styled(BiUserCircle)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;
