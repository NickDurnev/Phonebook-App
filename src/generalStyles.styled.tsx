import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { device } from './config/deviceSizes';

export const Title = styled.h1`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 24px;
`;

export const Container = styled.div`
  width: 350px;
  padding:25px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.bgModalColor};
  border-radius: 10px;

  @media ${device.tablet} {
    width: 400px;
  }
`;

export const Form = styled.form`
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.bgModalColor};
  border-radius:5px;

  & p {
    margin-top:5px;
    color: ${({ theme }) => theme.bgElementColor};
    font-size: 12px;
  }

  & p::before {
    display: inline;
    content: '⚠  ';
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.mainTextFontWeight};
  color: ${({ theme }) => theme.textColor};
  text-align: center;

  & + & {
    margin-top: 20px;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-right: 5px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgElementColor};
  transition: background-color ${({ theme }) => theme.hoverTransition} ${({ theme }) => theme.hoverTimeFunction};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.bgElementHoverColor};
  }
`;

export const CloseIcon = styled(IoMdClose)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.textColor};
  transition: color ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.bgElementColor};
  }
`;

export const Input = styled.input`
  display: block;
  margin-top: 10px;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  font-weight: 500;
  text-transform: none;
  border: solid 1px;
  border-radius: 5px;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.bgElementColor};
  background-color: transparent;
  transition: border-color ${({ theme }) => theme.hoverTransition} ${props => props.theme.hoverTimeFunction};
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.bgElementHoverColor};
  }
`;