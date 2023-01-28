import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { device } from '../config/deviceSizes';

export const Container = styled.div`
  position: relative;
  margin: auto;
  max-width: 100vw;

  box-shadow: ${props => props.theme.boxShadow};
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};

  @media ${device.laptop} {
    max-width: 60vw;
    min-height: 100vh;
  }

  & > h1,
  h2 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textColor};
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
    & > button {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;
