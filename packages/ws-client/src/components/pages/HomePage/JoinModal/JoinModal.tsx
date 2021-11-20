import { useState } from 'react';
import styled from 'styled-components';

import Modal from '../../../common/Modal';
import Button from '../../../common/Button';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h3`
  text-align: center;
`;

const InputBar = styled.input`
  width: 30%;
  height: 2.75rem;
  margin: 1.5rem auto;
  padding: 4px 10px;
  font-size: 1.2rem;
`;

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
      <Flex>
        <Header>Enter Game Code</Header>
        <InputBar
          type="text"
          placeholder="ex. abcd"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={4}
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'none'}
        />
        <Button variant="primary" onClick={handleJoin} text="Enter" />
      </Flex>
    </Modal>
  );
};

export default JoinModal;
