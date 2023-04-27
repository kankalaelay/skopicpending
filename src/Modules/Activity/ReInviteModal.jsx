import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../home/Invitations/invitations.css";
import axios from "axios";
import * as Cookies from "js-cookie";
function ReInvite(props) {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.request({});
  // }, [data]);

  return (
    <>
      {data && data.length !== 0 ? (
        <div>
          {data.map((result) => (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="InviteStyles"
            >
              <Modal.Header closeButton>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="title"
                >
                  Invite members
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{result.subject}</div>
              </Modal.Body>
            </Modal>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default ReInvite;

//onClick={closeInviteHandler}  disabled={!isEnabaled}
//onSubmit={onInviteHandler}
//onClick={closeHandler}
