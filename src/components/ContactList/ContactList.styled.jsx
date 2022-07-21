import styled from 'styled-components';

export const Container = styled.div`
  .contactsList {
    max-width: 500px;
    margin-right: auto;
    margin-left: auto;
  }

  .contact-item-enter {
    transform: translateX(-200px);
    opacity: 0;
  }

  .contact-item-enter-active {
    transform: translateX(0px);
    opacity: 1;
    transition: all 300ms linear;
  }

  .contact-item-exit {
    transform: translateX(0px);
    opacity: 1;
  }

  .contact-item-exit-active {
    transform: translateX(-200px);
    opacity: 0;
    transition: all 300ms linear;
  }

  & li + li {
    margin-top: 10px;
  }
`;
