import { useEffect } from 'react';

import * as styled from './styles';

export const TOAST_TIMEOUT = 3000;

interface Props {
  message: string;
  deleteToast: () => void;
}

const Toast = ({ message, deleteToast }: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      deleteToast();
    }, TOAST_TIMEOUT);

    return () => {
      clearInterval(interval);
    };
  }, [deleteToast]);

  return (
    <styled.Container>
      <styled.Header>
        <styled.CloseButton onClick={deleteToast}>X</styled.CloseButton>
      </styled.Header>
      <styled.Message>{message}</styled.Message>
    </styled.Container>
  );
};

export default Toast;
