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

const NameInput = styled.input`
  width: 60%;
  height: 2.75rem;
  margin: 1.5rem auto 0.25em;
  padding: 4px 10px;
  font-size: 1.2rem;
`;

const CodeInput = styled.input`
  width: 30%;
  height: 2.75rem;
  margin: 0.25rem auto 1.5rem;
  padding: 4px 10px;
  font-size: 1.2rem;
`;

interface Props {
  show: boolean;
  close: () => void;
  join: (code: string, name: string) => void;
}

const JoinModal = ({ show, close, join }: Props) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleJoin = () => {
    join(code, name);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <Flex>
        <Header>Join A Game</Header>
        <NameInput
          type="text"
          placeholder="Enter desired name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'none'}
        />
        <CodeInput
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
