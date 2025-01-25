import Toast from '../Toast';
import { IMessage } from '../ToastProvider';

import * as Styled from './styles';

interface Props {
  messages: IMessage[];
  deleteMessage: (id: number) => void;
  position?: string;
}

const ToastList = ({ messages, deleteMessage, position = 'topright' }: Props) => {
  return (
    <Styled.Container position={position}>
      {messages.map((m) => (
        <Toast key={m.id} message={m.message} deleteToast={() => deleteMessage(m.id)} />
      ))}
    </Styled.Container>
  );
};

export default ToastList;
