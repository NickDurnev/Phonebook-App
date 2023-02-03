import styled from 'styled-components';
import { StyledButton } from '../../generalStyles.styled';

export const Wrap = styled.div`
  padding: 30px 0;

  & p {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
  }
`;

export const SubmitButton = styled(StyledButton)`
 font-size: 16px;
  margin-top: 20px;
`;
