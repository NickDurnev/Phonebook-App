import styled from 'styled-components';
import { device } from '../../config/deviceSizes';

export const List = styled.ul`
  position: absolute;
  top: 45px;
  right: 20px;
  width: 128px;
  padding: 10px;
  background-color: ${({ theme }) => theme.listItemBcgColor};

  @media ${device.mobileM} {
    top: 45px;
    width: 108px;
    right: 15px;
  }

  &.drop-enter {
    opacity: 0;
    transform: translateY(-100px);
  }

  &.drop-enter-active {
    transform: translateY(0px);
    opacity: 1;
    transition: all ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
  }

  &.drop-exit {
    opacity: 1;
    transform: translateY(0px);
  }

  &.drop-exit-active {
    opacity: 0;
    transform: translateY(-100px);
    transition: all ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
  }

  & > li + li {
    margin-top: 10px;
  }
`;

export default List;
