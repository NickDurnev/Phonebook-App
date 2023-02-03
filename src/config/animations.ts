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

export const jelloHorizontal = keyframes`
 0% {
    transform: scale3d(1, 1, 1);
  }
  5% {
    transform: scale3d(1.25, 0.75, 1);
  }
  7% {
    transform: scale3d(0.75, 1.25, 1);
  }
  9% {
    transform: scale3d(1.15, 0.85, 1);
  }
  11% {
    transform: scale3d(0.95, 1.05, 1);
  }
  13% {
    transform: scale3d(1.05, 0.95, 1);
  }
  18% {
    transform: scale3d(1, 1, 1);
  }
`;
