import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { device } from '../config/deviceSizes';

export const Background = styled.div`
  background: hsla(211, 66%, 87%, 1);
  background: linear-gradient(
    180deg,
    hsla(211, 66%, 87%, 1) 0%,
    hsla(348, 67%, 88%, 1) 50%,
    hsla(272, 26%, 72%, 1) 100%
  );
  width: 100vw;
`;

export const Container = styled.div`
  position: relative;
  margin: auto;
  max-width: 100vw;

  box-shadow: ${props => props.theme.boxShadow};
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  background-color: transparent;

  @media ${device.laptop} {
    max-width: 70vw;
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
    background-color: ${({ theme }) => theme.bgElementColor};
    font-family: 'NeutralFace', sans-serif;
    & > button {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;
