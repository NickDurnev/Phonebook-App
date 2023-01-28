import styled from 'styled-components';

interface IProps {
  width: string;
}

const Wrap = styled.button<IProps>`
  width: ${({ width }) => width};
  padding: 0;
  pointer-events: auto;
  color: inherit;
  background-color: inherit;
`;

export default Wrap;
