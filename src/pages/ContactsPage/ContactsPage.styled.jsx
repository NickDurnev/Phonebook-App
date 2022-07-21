import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const Container = styled.div`
  position: relative;
  padding: 20px;
`;

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
  }
`;
