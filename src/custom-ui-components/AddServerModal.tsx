import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ServerCreateForm from '../../ui-components/ServerCreateForm';

  interface AddServerModalProps {
    show: boolean;
    handleClose: () => void;
    userEmail: string;
  }

  const AddServerModal: React.FC<AddServerModalProps> = ({ show, handleClose }) => {
    return (
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Sandbox</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ServerCreateForm overrides={{
              baseUrl: {
                style: { display: 'none' },
                labelHidden: true
              },
              publicIP: {
                style: { display: 'none' },
                labelHidden: true
              },
              ecsTaskName: {
                style: { display: 'none' },
                labelHidden: true
              },
              status: {
                style: { display: 'none' },
                labelHidden: true
              },
              configuration: {
                style: { display: 'none' },
                labelHidden: true
              }
            }} onSuccess={handleClose} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
}

export default AddServerModal;