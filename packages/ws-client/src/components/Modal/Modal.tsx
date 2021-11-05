import React from 'react';

import * as Styled from './styles';

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
    <Styled.Modal show={show} onClick={close}>
      <Styled.Container onClick={handleClick}>{children}</Styled.Container>
    </Styled.Modal>
  );
};

export default Modal;
