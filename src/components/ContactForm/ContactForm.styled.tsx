import styled from 'styled-components';
import InputMask from 'react-input-mask';
import RingLoader from 'react-spinners/RingLoader';

export const Wrap = styled.div`
  & > button {
    margin-left: 85%;
  }
`;

export const Form = styled.form`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgModalColor};
`;

export const Label = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.mainTextFontWeight};
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  & + & {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  display: block;
  margin-top: 5px;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  font-weight: 500;
  text-transform: capitalize;
  border: solid 1px;
  border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.bgElementColor};
  background-color: transparent;
  transition: border-color ${({ theme }) => theme.hoverTransition}${({ theme }) => theme.hoverTimeFunction};
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.bgElementHoverColor};
  }
`;

export const MaskedInput = styled(InputMask)`
  display: block;
  margin-top: 5px;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  font-weight: 500;
  text-transform: capitalize;
  border: solid 1px;
  border-radius: 5px;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.bgElementColor};
  background-color: transparent;
  transition: border-color ${({ theme }) => theme.hoverTransition}${({ theme }) => theme.hoverTimeFunction};
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.bgElementHoverColor};
  }
`;

export const Loader = styled(RingLoader)`
  margin-left: 5px;
`;
