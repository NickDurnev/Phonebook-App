import styled from 'styled-components';

interface IProps {
  padding: string
  bgColor: boolean
}

const Wrap = styled.button<IProps>`
  padding: ${props => props.padding};
  color: ${({ theme }) => theme.elementColor};
  background-color: ${({ bgColor, theme }) =>
    bgColor ? theme.bgElementColor : 'inherit'};
  transition: background-color ${({ theme }) => theme.hoverTransition} ${({ theme }) => theme.hoverTimeFunction};

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animationDuration} ${({ theme }) => theme.animationTimeFunction};
  }

  &:hover,
  &:focus {
    background-color: ${({ bgColor, theme }) =>
      bgColor ? theme.bgElementHoverColor : 'inherit'};
  }
`;

export default Wrap;
