import styled from 'styled-components';
import {
  InfoForm,
  InfoLabel,
  InfoInput,
  InfoButton,
} from '../../components/ContactEdit/ContactEdit.styled';
import { device } from 'deviceSizes';

export const Wrap = styled.div`
  padding: 30px 0;
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
