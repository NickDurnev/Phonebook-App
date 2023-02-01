import styled from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Form, StyledButton, Label } from '../../generalStyles.styled';

import { device } from '../../config/deviceSizes';

export const Wrap = styled.div`
  position: relative;
  padding: 30px 0;
  & > button {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 16px;
  }
`;

export const StyledForm = styled(Form)`
  margin-top:30px;
`;

export const StyledLink = styled(Link)`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.bgElementColor};
`;

export const StyledLabel = styled(Label)`
  position: relative;
  & > button {
    margin: 0;
    position: absolute;
    top: 30px;
    right: 15px;
  }
`;

export const LoginButton = styled(StyledButton)`
  font-size: 16px;
  margin-top: 20px;
`;

export const UserIcon = styled(BiUserCircle)`
  width: 90px;
  height: 90px;
  color: ${({ theme }) => theme.bgElementColor};
  transition: color ${({ theme }) => theme.hoverTransition}${({ theme }) => theme.hoverTimeFunction};

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
  width: 100px;
`;
