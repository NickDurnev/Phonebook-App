import styled from 'styled-components';
import { Input } from '../ContactForm/ContactForm.styled';

export const Wrap = styled.div`
  padding: 20px;
  &>button {
    margin-left:85%;
  }
`
export const EmailInput = styled(Input)`
  text-transform: none;
`;
