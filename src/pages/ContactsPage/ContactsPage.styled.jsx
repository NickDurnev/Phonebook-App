import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { device } from 'deviceSizes';

export const Container = styled.div`
  position: relative;
  padding: 20px;

  @media ${device.mobileM} {
    padding-top: 50px;
  }
  & > button {
    position: absolute;
    top: 20px;
    right: 20px;
    @media ${device.mobileM} {
      position: absolute;
      padding: 10px 10px;
      top: 10px;
      right: 15px;
    }
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
  }
`;
