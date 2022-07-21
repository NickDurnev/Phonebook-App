import styled from 'styled-components';
import InputMask from 'comigo-tech-react-input-mask';
import RingLoader from 'react-spinners/RingLoader';

export const Form = styled.form`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${props => props.theme.bgColor};
`;

export const Label = styled.label`
  display: block;
  font-weight: ${props => props.theme.mainTextFontWeight};
  color: ${props => props.theme.textColor};
  text-align: center;

  & + & {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const Input = styled(InputMask)`
  display: block;
  margin-top: 5px;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  font-weight: 500;
  border: solid 1px;
  border-radius: 5px;
  color: #a7a3a3a9;
  border-color: ${props => props.theme.bgElementColor};
  background-color: ${props => props.theme.bgColor};
  transition: border-color ${props => props.theme.hoverTransition}
    ${props => props.theme.hoverTimeFunction};
  transition: color 1000ms ${props => props.theme.hoverTimeFunction};

  &:hover,
  &:focus {
    border-color: ${props => props.theme.bgElementHoverColor};
    color: inherit;
  }
`;

export const Button = styled.button`
  width: 120px;
  padding: 10px;
  margin-right: 5px;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme.elementColor};
  background-color: ${props => props.theme.bgElementColor};
  transition: background-color ${props => props.theme.hoverTransition}
    ${props => props.theme.hoverTimeFunction};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.bgElementHoverColor};
  }
`;

export const Loader = styled(RingLoader)`
  margin-left: 5px;
`;
