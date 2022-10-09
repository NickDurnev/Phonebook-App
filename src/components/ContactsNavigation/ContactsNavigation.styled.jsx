import styled, { css } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { jelloHorizontal } from 'animations';

const attentionAnimation = css`
  ${jelloHorizontal} ${({ theme }) => theme.longAnimationDuration}
    ${({ theme }) => theme.animationTimeFunction}
`;

export const NavWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: 60%;
`;

export const LeftIcon = styled(IoIosArrowBack)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.marksBgColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }

  animation: ${({ active }) => (active === true ? attentionAnimation : 'none')};
  animation-fill-mode: forwards;
`;

export const RightIcon = styled(IoIosArrowForward)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.marksBgColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }

  animation: ${({ active }) => active && attentionAnimation};
  animation-fill-mode: forwards;
`;
