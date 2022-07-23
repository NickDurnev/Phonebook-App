import styled from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px;
  width: 300px;
  height: 50px;
  background-color: ${({ theme }) => theme.bgUserManuColor};
  border-radius: 4px;
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
`;

export const Icon = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
`;
