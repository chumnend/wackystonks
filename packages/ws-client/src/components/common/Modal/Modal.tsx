import React from 'react';
import styled from 'styled-components';

interface BackgroundProps {
  readonly show: boolean;
}

const Background = styled.div<BackgroundProps>`
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

const Container = styled.div`
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

interface Props {
  children: React.ReactNode;
  show: boolean;
  close: () => void;
}

const Modal = ({ children, show, close }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Background show={show} onClick={close}>
      <Container onClick={handleClick}>{children}</Container>
    </Background>
  );
};

export default Modal;
