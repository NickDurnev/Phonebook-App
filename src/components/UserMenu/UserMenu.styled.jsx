import styled from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';
import { device } from '../../config/deviceSizes';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 5px;
  width: 300px;
  height: 50px;
  background-color: ${({ theme }) => theme.linkActiveColor};
  border-radius: 4px;

  @media ${device.mobileM} {
    width: 250px;
  }
`;

export const UserIcon = styled(BiUserCircle)`
  width: 35px;
  height: 35px;
  color: ${({ theme }) => theme.bgElementColor};
  transition: color ${({ theme }) => theme.hoverTransition}
    ${({ theme }) => theme.hoverTimeFunction};

  &:hover {
    color: ${({ theme }) => theme.bgElementHoverColor};
  }

  @media ${device.mobileM} {
    width: 28px;
    height: 28px;
  }
`;

export const Icon = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
`;
