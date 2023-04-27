import React from 'react'
import {Modal ,Button} from "react-bootstrap";
import "../../Assets/css/MessageModal/MessageModal.css"

function MessageModal(props) {

    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="MessageModal"
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="title">
            <p>
              {props.message}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        </Modal.Body>
      </Modal>
    );
  }
  export default MessageModal
