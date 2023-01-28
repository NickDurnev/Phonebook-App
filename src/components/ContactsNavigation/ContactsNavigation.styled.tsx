import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { jelloHorizontal } from '../../config/animations';

export const NavWrap = styled.div`
  position: fixed;
  pointer-events: none;
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
  animation: ${jelloHorizontal} ${({ theme }) => theme.animationTimeFunction} 4s
    infinite alternate;
  animation-delay: 0s;

  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const RightIcon = styled(IoIosArrowForward)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.marksBgColor};
  animation: ${jelloHorizontal} ${({ theme }) => theme.animationTimeFunction} 4s
    infinite alternate;
  animation-delay: 0s;

  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;
