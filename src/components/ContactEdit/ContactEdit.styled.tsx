import styled from 'styled-components';
import { Input } from '../ContactForm/ContactForm.styled';

export const Wrap = styled.div`
  padding: 10px 20px;
  &>button {
    margin-left:92%;
  }
`
export const EmailInput = styled(Input)`
  text-transform: none;
`;
