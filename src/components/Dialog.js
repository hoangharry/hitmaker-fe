import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
export default function ExceedNotesDialog(props) {

    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Notes exceed time!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}