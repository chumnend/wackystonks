import { useState } from 'react';

import Modal from '../../../common/Modal';
import Button from '../../../common/Button';
import Flex from '../../../common/Flex';

interface Props {
  show: boolean;
  close: () => void;
  join: (code: string, name: string) => void;
}

const JoinModal = ({ show, close, join }: Props) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleJoin = () => {
    if (name.length === 0 || code.length < 4) {
      return;
    }
    join(code, name);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <Flex direction="column" alignItems="center">
        <h3>Join A Game</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter desired name"
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'none'}
        />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ex. abcd"
          maxLength={4}
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'none'}
        />
        <Flex justifyContent="center" alignItems="center">
          <Button variant="primary" onClick={handleJoin} text="Join" />
          <Button variant="primary" onClick={close} text="Back" />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default JoinModal;
