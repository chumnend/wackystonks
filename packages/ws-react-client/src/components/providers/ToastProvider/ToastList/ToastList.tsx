import Toast from '../Toast';
import { IMessage } from '../ToastProvider';

import * as Styled from './styles';

interface Props {
  messages: IMessage[];
  deleteMessage: (id: number) => void;
}

const ToastList = ({ messages, deleteMessage }: Props) => {
  return (
    <Styled.Container>
      {messages.map((m) => (
        <Toast key={m.id} message={m.message} deleteToast={() => deleteMessage(m.id)} />
      ))}
    </Styled.Container>
  );
};

export default ToastList;
