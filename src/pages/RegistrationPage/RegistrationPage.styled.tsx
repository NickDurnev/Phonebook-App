import styled from 'styled-components';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  Form,
  Label,
} from '../../generalStyles.styled';
import { StyledButton } from '../../generalStyles.styled';

export const Wrap = styled.div`
  padding: 30px 0;
  & button {
    margin-top: 20px;
  }
`;

export const StyledForm = styled(Form)`
  margin-bottom: 0;

  width: 100%;
  border: 2px solid ${({ theme }) => theme.bgModalColor};
  border-radius: 10px;
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

export const OnVisibleIcon = styled(AiOutlineEye)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};

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
  transition: transform ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const Button = styled(StyledButton)`
  font-size: 16px;
  margin-top: 20px;
`;
