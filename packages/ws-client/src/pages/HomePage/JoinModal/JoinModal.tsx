import { useState } from 'react';

import * as Styled from './styles';
import Modal from '../../../components/Modal';

interface Props {
  show: boolean;
  close: () => void;
  join: (code: string) => void;
}

const JoinModal = ({ show, close, join }: Props) => {
  const [code, setCode] = useState('');

  const handleJoin = () => {
    join(code);
    setCode('');
  };

  return (
    <Modal show={show} close={close}>
      <Styled.JoinModal>
        <Styled.Header>Enter Game Code</Styled.Header>
        <Styled.CodeInput
          type="text"
          placeholder="ex. abcd"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={4}
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'none'}
        />
        <Styled.JoinButton onClick={handleJoin}>Enter</Styled.JoinButton>
      </Styled.JoinModal>
    </Modal>
  );
};

export default JoinModal;
