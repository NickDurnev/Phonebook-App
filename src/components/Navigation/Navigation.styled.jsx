import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavLink = styled(BaseNavLink)`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.elementColor};
  text-decoration: none;
  text-transform: uppercase;
  &.active {
    color: ${({ theme }) => theme.linkActiveColor};
    &:before {
      content: '';
      background: ${({ theme }) => theme.linkActiveColor};
      display: block;
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 3px;
      transition: all 0.3s ease-in-out;
    }
  }
  & + & {
    margin-left: 30px;
  }
`;
