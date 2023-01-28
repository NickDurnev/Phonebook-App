import styled from 'styled-components';
import InputMask from 'react-input-mask';
import RingLoader from 'react-spinners/RingLoader';

export const Form = styled.form`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${({theme}) => theme.bgColor};
`;

export const Label = styled.label`
  display: block;
  font-weight: ${({theme}) => theme.mainTextFontWeight};
  color: ${({theme}) => theme.textColor};
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
  color: #a7a3a3a9;
  border-color: ${({theme}) => theme.bgElementColor};
  background-color: ${({theme}) => theme.bgColor};
  transition: border-color ${({theme}) => theme.hoverTransition} ${({theme}) => theme.hoverTimeFunction};
  transition: color 1000ms ${({theme}) => theme.hoverTimeFunction};
  &:hover,
  &:focus {
    border-color: ${({theme}) => theme.bgElementHoverColor};
    color: inherit;
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
  color: #a7a3a3a9;
  border-color: ${({theme}) => theme.bgElementColor};
  background-color: ${({theme}) => theme.bgColor};
  transition: border-color ${({theme}) => theme.hoverTransition} ${({theme}) => theme.hoverTimeFunction};
  transition: color 1000ms ${({theme}) => theme.hoverTimeFunction};
  &:hover,
  &:focus {
    border-color: ${({theme}) => theme.bgElementHoverColor};
    color: inherit;
  }
`

export const StyledButton = styled.button`
  width: 120px;
  padding: 10px;
  margin-right: 5px;
  margin-left: auto;
  margin-right: auto;
  color: ${({theme}) => theme.elementColor};
  background-color: ${({theme}) => theme.bgElementColor};
  transition: background-color ${({theme}) => theme.hoverTransition} ${({theme}) => theme.hoverTimeFunction};
  &:hover,
  &:focus {
    background-color: ${({theme}) => theme.bgElementHoverColor};
  }
`;

export const Loader = styled(RingLoader)`
  margin-left: 5px;
`;
