import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 15px 40px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgElementColor};
`;
