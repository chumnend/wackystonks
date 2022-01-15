import { useState } from 'react';

import Modal from '../../../common/Modal';
import Button from '../../../common/Button';
import Flex from '../../../common/Flex';

interface Props {
  show: boolean;
  close: () => void;
  start: (name: string) => void;
}

const StartModal = ({ show, close, start }: Props) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.length === 0) {
      return;
    }
    start(name);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <Flex direction="column" alignItems="center">
        <h3>Enter your name</h3>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter desired name"
            autoComplete={'off'}
            autoCorrect={'off'}
            autoCapitalize={'none'}
          />
        </label>
        <Flex justifyContent="center" alignItems="center">
          <Button variant="primary" onClick={handleStart} text="Enter" />
          <Button variant="primary" onClick={close} text="Back" />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default StartModal;
