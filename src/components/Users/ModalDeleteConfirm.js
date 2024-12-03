import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ModalDeleteConfirm = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete USer</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure to delete user: <span className="text-danger">{props.dataModal.email}</span></p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteConfirm;