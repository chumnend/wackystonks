import Modal from '../../../common/Modal';

interface Props {
  show: boolean;
  close: () => void;
}

const HelpModal = ({ show, close }: Props) => {
  return (
    <Modal show={show} close={close}>
      <h1>How To Play</h1>
    </Modal>
  );
};

export default HelpModal;
