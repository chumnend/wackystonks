import React from 'react';

import * as Styled from './styles';

interface Props {
  children: React.ReactNode;
  show: boolean;
  close: () => void;
}

const Modal = ({ children, show, close }: Props) => {
  return (
    <Styled.Modal show={show} onClick={close}>
      <Styled.Container onClick={(event) => event.stopPropagation()}>{children}</Styled.Container>
    </Styled.Modal>
  );
};

export default Modal;
