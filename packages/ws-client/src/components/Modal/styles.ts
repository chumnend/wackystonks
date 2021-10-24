import styled from 'styled-components';

interface ModalProps {
  readonly show: boolean;
}

export const Modal = styled.div<ModalProps>`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.15);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  padding: 1rem;
  position: fixed;
  z-index: 999;
  background: #fff;
  width: 60%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
