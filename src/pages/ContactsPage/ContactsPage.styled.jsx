import styled, { css } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { device } from 'deviceSizes';
import { slideInTop, slideInBottom } from 'animations';

const enterAnimation = css`
  ${slideInTop} ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction}
`;

const exitAnimation = css`
  ${slideInBottom} ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction}
`;

export const Container = styled.div`
  position: relative;
  padding: 10px;
  overflow: hidden;

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

export const PositionedWrap = styled.div`
  position: absolute;
  top: 0;
  left: 100px;
  width: 200px;
  & > button + button {
    margin-left: 10px;
  }
`;

export const PositionedButton = styled.button`
  width: 90px;
  height: 100px;
  padding: 60px 5px 10px 5px;
  background-color: ${({ theme }) => theme.marksBgColor};
  color: ${({ theme }) => theme.textColor};
  transform: translateY(-30px);
  text-transform: uppercase;
  font-weight: 600;
`;

export const AllContactsButton = styled(PositionedButton)`
  animation: ${({ favorite }) => (favorite ? exitAnimation : enterAnimation)};
  animation-fill-mode: forwards;
`;

export const FavoriteContactsButton = styled(PositionedButton)`
  animation: ${({ favorite }) => (favorite ? enterAnimation : exitAnimation)};
  animation-fill-mode: forwards;
`;

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

export const ButtonWrap = styled.div`
  margin: 10px auto;

  & > button {
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const FetchMarker = styled.div`
  width: 5px;
  height: 5px;
`;
