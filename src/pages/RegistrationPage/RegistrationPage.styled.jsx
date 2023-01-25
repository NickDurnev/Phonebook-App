import styled from 'styled-components';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  InfoForm,
  InfoLabel,
  InfoButton,
} from '../../components/ContactEdit/ContactEdit.styled';
import { device } from '../../config/deviceSizes';

export const Wrap = styled.div`
  padding: 30px 0;
  & button {
    margin-top: 20px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 24px;
`;

export const Container = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;

  @media ${device.mobileM} {
    width: 350px;
  }
`;

export const Form = styled(InfoForm)`
  margin-bottom: 0;

  width: 100%;
  border: 2px solid ${({ theme }) => theme.bgElementColor};
  border-radius: 5px;
`;

export const Label = styled(InfoLabel)`
  position: relative;
  & > button {
    margin: 0;
    position: absolute;
    top: 30px;
    right: 15px;
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

export const OnVisibleIcon = styled(AiOutlineEye)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const OffVisibleIcon = styled(AiOutlineEyeInvisible)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const Button = styled(InfoButton)`
  font-size: 16px;
  margin-top: 20px;
`;
