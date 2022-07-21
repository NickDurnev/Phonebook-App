import styled from 'styled-components';
import { Input, Button } from '../ContactForm/ContactForm.styled';
import {
  Backdrop,
  Modal,
} from 'components/AgreementModal/AgreementModal.styled';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

export const InfoBackdrop = styled(Backdrop)``;

export const InfoModal = styled(Modal)`
  & button + button {
    margin: 0;
  }
`;

export const InfoForm = styled.form`
  min-width: 350px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgColor};

  & p {
    color: ${({ theme }) => theme.bgElementColor};
    font-size: 12px;
  }

  & p::before {
    display: inline;
    content: '⚠  ';
  }

  & > button {
    margin-top: 20px;
  }
`;

export const InfoLabel = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.mainTextFontWeight};
  color: ${({ theme }) => theme.textColor};
  text-align: center;

  & + & {
    margin-top: 20px;
  }
`;

export const Icon = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 128px;
`;

export const EditIcon = styled(AiFillEdit)`
  position: absolute;
  top: 107px;
  left: 60px;
  width: 24px;
  height: 24px;
  color: #f5f5f5;
`;

export const CloseIcon = styled(IoMdClose)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.textColor};
  transition: color ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.bgElementColor};
  }
`;

export const InfoInput = styled(Input)``;
export const InfoButton = styled(Button)``;
