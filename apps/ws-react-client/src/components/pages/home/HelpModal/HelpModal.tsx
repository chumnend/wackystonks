import Modal from '../../../common/Modal';
import Flex from '../../../common/Flex';

interface Props {
  show: boolean;
  close: () => void;
}

const HelpModal = ({ show, close }: Props) => {
  return (
    <Modal show={show} close={close}>
      <Flex direction="column" alignItems="center">
        <h3>How To Play</h3>
      </Flex>
    </Modal>
  );
};

export default HelpModal;
