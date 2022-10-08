import { keyframes } from 'styled-components';

export const slideInTop = keyframes`
 0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(-10px);
    opacity: 1;
  }
`;

export const slideInBottom = keyframes`
 0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(-50px);
    opacity: 1;
  }
`;
