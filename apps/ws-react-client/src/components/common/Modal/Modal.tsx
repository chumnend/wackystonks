import React from 'react';

import { Background, Container } from './styles';

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
