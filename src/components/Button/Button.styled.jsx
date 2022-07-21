import styled from 'styled-components';

const Wrap = styled.button`
  padding: ${props => props.padding};
  color: ${({ theme }) => theme.elementColor};
  background-color: ${({ bgColor, theme }) =>
    bgColor ? theme.bgElementColor : 'inherit'};
  transition: background-color ${({ theme }) => theme.hoverTransition}
    ${({ theme }) => theme.hoverTimeFunction};

  &.positioned {
    position: ${props => props.position};
    top: ${props => props.positionY};
    right: ${props => props.positionX};
  }

  &:hover,
  &:focus {
    background-color: ${({ bgColor, theme }) =>
      bgColor ? theme.bgElementHoverColor : 'inherit'};
  }
`;

export default Wrap;
