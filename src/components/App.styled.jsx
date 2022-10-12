import styled from 'styled-components';
import { device } from 'config/deviceSizes';

export const Container = styled.div`
  position: relative;
  margin: auto;
  max-width: 100vw;

  box-shadow: ${props => props.theme.boxShadow};
  text-align: center;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgColor};

  @media ${device.laptop} {
    max-width: 60vw;
    min-height: 100vh;
  }

  & > h1,
  h2 {
    margin-bottom: 10px;
    color: ${props => props.theme.textColor};
  }
`;
