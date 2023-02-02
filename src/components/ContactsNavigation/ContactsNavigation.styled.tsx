import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { jelloHorizontal } from '../../config/animations';
import { device } from '../../config/deviceSizes';

interface IProps {
  page: number;
}

export const NavWrap = styled.div<IProps>`
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: ${({ page }) => (page === 1 ? 'flex-end' : 'space-between')};

  @media ${device.tablet} {
    width: 95%;
  }

   @media ${device.laptop} {
    width: 65%;
  }
`;

export const LeftIcon = styled(IoIosArrowBack)`
  width: 50px;
  height: 50px;

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

  @media ${device.tablet} {
    width: 100%;
    height: auto;
  }
`;

export const RightIcon = styled(IoIosArrowForward)`
  width: 50px;
  height: 50px;

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

  @media ${device.tablet} {
    width: 100%;
    height: auto;
  }
`;
