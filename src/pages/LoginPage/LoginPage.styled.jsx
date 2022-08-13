import styled from 'styled-components';
import {
  InfoForm,
  InfoLabel,
  InfoInput,
  InfoButton,
} from '../../components/ContactEdit/ContactEdit.styled';
import { device } from 'deviceSizes';

export const Wrap = styled.div`
  position: relative;
  padding: 30px 0;
`;

export const Notification = styled.div`
  position: absolute;
  padding: 10px;
  background-color: #a54f4f;
  color: #fff;
  border-radius: 5px;
  top: 10px;
  right: 10px;
  z-index: 2;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
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

  & > button {
    margin-top: 20px;
  }
`;

export const UserLabel = styled(InfoLabel)``;

export const UserInput = styled(InfoInput)`
  margin-top: 10px;
`;

export const UserButton = styled(InfoButton)`
  margin-top: 20px;
`;
