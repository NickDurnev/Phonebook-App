import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Title,
  Container,
  Form,
  Label,
  Input,
  Button,
} from '../RegistrationPage/RegistrationPage.styled';

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

export const StyledTitle = styled(Title)``;

export const StyledContainer = styled(Container)``;

export const StyledForm = styled(Form)``;

export const StyledLink = styled(Link)`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.bgElementColor};

  &:hover,
  &:focus {
    background-color: ${({ bgColor, theme }) =>
      bgColor ? theme.bgElementHoverColor : 'inherit'};
  }
`;

export const StyledLabel = styled(Label)``;

export const StyledInput = styled(Input)``;

export const StyledButton = styled(Button)``;
