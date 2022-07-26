import styled from 'styled-components';
import { device } from 'deviceSizes';

const List = styled.ul`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px;

  @media ${device.mobileM} {
    padding: 10px;
  }

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
  }

  & > li {
    margin: 10px;
    cursor: pointer;
  }
  & img {
    max-width: 64px;
    transform: scale(1);
    transition: transform ${({ theme }) => theme.animationDuration}
      ${({ theme }) => theme.animationTimeFunction};
  }

  & img:hover,
  & img:focus {
    transform: scale(1.2);
  }
`;

export default List;
