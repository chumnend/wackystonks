import React, { useState, createContext, useContext } from 'react';

import ToastList from './ToastList';

interface ContextState {
  addMessage: (message: string) => void;
}

export const ToastContext = createContext({} as ContextState);
export const useToast = () => useContext(ToastContext);

export interface IMessage {
  id: number;
  message: string;
}

interface Props {
  position?: string;
  children: React.ReactNode;
}

const ToastProvider = ({ children, position = 'topright' }: Props) => {
  const [id, setId] = useState<number>(1);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const addMessage = (message: string): void => {
    // create new message
    const newMessage = {
      id,
      message,
    };

    // update id
    setId(() => id + 1);

    // add to message list
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
  };

  const deleteMessage = (id: number): void => {
    const updatedMessages = messages.filter((m) => m.id !== id);
    setMessages(updatedMessages);
  };

  const toastValues = {
    addMessage,
  };

  return (
    <ToastContext.Provider value={toastValues}>
      <ToastList messages={messages} deleteMessage={deleteMessage} position={position} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
