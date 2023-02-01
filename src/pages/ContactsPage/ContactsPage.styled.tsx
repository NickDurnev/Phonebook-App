import styled, { css } from 'styled-components';
import { device } from '../../config/deviceSizes';
import { slideInTop, slideInBottom } from '../../config/animations';

interface IProps {
  favorite: boolean;
}

const enterAnimation = css`
  ${slideInTop} ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction}`;

const exitAnimation = css`
  ${slideInBottom} ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction}`;

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

export const Wrap = styled.div`
  margin-top:100px;

  & button {
    margin-top:20px;
    margin-bottom:30px;
  }
`;

export const PositionedWrap = styled.div`
  position: absolute;
  top: 0;
  left: 30px;
  width: 140px;
  @media ${device.tablet} {
    left: 100px;
    width: 200px;
  }
  & > button + button {
    margin-left: 10px;
  }
`;

export const PositionedButton = styled.button`
  width: 60px;
  height: 65px;
  padding: 50px 5px 10px 5px;
  background-color: ${({ theme }) => theme.linkActiveColor};
  color: ${({ theme }) => theme.bgElementColor};
  transform: translateY(-20px);
  font-family: 'NeutralFace',sans-serif;
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 500;
  @media ${device.tablet} {
    width: 90px;
    height: 100px;
    padding: 60px 5px 10px 5px;
    transform: translateY(-30px);
    font-size: 12px;
    font-weight: 600;
  }
`;

export const AllContactsButton = styled(PositionedButton) <IProps>`
  animation: ${({ favorite }) => (favorite ? exitAnimation : enterAnimation)};
  animation-fill-mode: forwards;
`;

export const FavoriteContactsButton = styled(PositionedButton) <IProps>`
  animation: ${({ favorite }) => (favorite ? enterAnimation : exitAnimation)};
  animation-fill-mode: forwards;
`;

export const ButtonWrap = styled.div`
  margin: 10px auto;

  & > button {
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
  }
`;

