import styled from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';
import { device } from '../../config/deviceSizes';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px;
  width: 230px;
  height: 50px;
  background-color: ${({ theme }) => theme.linkActiveColor};
  border-radius: 4px;

  &>p {
    color: ${({ theme }) => theme.bgElementColor};
  }

  @media ${device.tablet} {
    width: 300px;
      font-size: 16px;
  }
`;

export const UserIcon = styled(BiUserCircle)`
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.bgElementColor};
  transition: color ${({ theme }) => theme.hoverTransition}${({ theme }) => theme.hoverTimeFunction};

  &:hover {
    color: ${({ theme }) => theme.bgElementHoverColor};
  }

  @media ${device.tablet} {
    width: 35px;
    height: 35px;
  }
`;

export const Icon = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
`;
