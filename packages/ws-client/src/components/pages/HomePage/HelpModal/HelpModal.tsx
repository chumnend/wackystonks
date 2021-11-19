import * as Styled from './styles';
import Modal from '../../../common/Modal';

interface Props {
  show: boolean;
  close: () => void;
}

const HelpModal = ({ show, close }: Props) => {
  return (
    <Modal show={show} close={close}>
      <Styled.HelpModal>How To Play</Styled.HelpModal>
    </Modal>
  );
};

export default HelpModal;
