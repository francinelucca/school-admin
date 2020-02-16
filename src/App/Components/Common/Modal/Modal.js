import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



class ModalComponent extends React.Component {

    render() {
        const { isVisible, handleClose, title, renderBody } = this.props;
        return (
        
        <Modal show={isVisible} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderBody()}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

        )
    }
}

export default ModalComponent;