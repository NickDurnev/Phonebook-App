import styled from 'styled-components';

export const Wrap = styled.div`

  & > p {
    margin-bottom: 10px;
  }

  & button + button {
    margin-left: 50px;
  }

  & > button {
    display: block;
    margin-left: auto;
  }
`;
