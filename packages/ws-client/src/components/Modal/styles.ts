import styled from 'styled-components';

interface Props {
  readonly show: boolean;
}

export const Modal = styled.div<Props>`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.15);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  width: min(24em, 95vw);
  height: auto;
  padding: 1rem;
  box-shadow: 2px 5px 10px rgb(0, 0, 0, 0.12);
  border-radius: 5px;
  background: #fff;
  animation: popup 0.3s;

  @keyframes popup {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;
