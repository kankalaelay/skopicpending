import React, { useEffect, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import "./invitations.css"
import gmail from "../../../Assets/images/gmail.svg"
import facebook from "../../../Assets/images/fb.svg"
import { useSelector } from 'react-redux'
import axios from "axios"
import MessageModal from "../../utils/messageModal"
import { set } from 'js-cookie';
function Invitation(props) {

    const userDetails = useSelector((state) => state.SignInReducer.userDetails)


    const [mail, setMail] = useState("")
    const [subject, setSubject] = useState("")
    const [textmsg, setTextmsg] = useState("")
    const [errormsg, seterrormsg] = useState("")
    const [closeInvites, setCloseInvites] = useState(null)
    const [messageShow, setMessageShow] = useState(false)
    const [email, setemail] = useState([])

    const emailChange = (e) => {
        setMail(e.target.value)
    }
    const handleKeyDown = (evt) => {
        if ([' ', ';', ','].includes(evt.key)) {
            evt.preventDefault();

            var emails = mail.trim();

            if (emails) {
                setemail([...email, emails])
                setMail("")
            }
        }
    }
    useEffect(() => {
        if (props.invite) {

            setSubject(`Invitation to join ${userDetails.userData.tenantName} via Skopic`)
            setTextmsg(` Hi,
        I request you to join  ${userDetails.userData.tenantName}  on Skopic. It is quick and easy to Sign Up.
        Click the link below to join ${userDetails.userData.tenantName}.
        http://dev.skopic.com:9090/skopicportal/user/communityurl.html?tid=${userDetails.userData.tenantId}
        Thank you
        ${userDetails.userData.displayName}
        `)
        }

    }, [props.invite, userDetails])

    const closeHandler = () => {
        setMail("")
        setemail([])
    }
    const onInviteHandler = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data', "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        }

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            if (email.length > 0) {

                axios.get(
                    `http://dev.skopic.com:9090/skopicportal/user/inviteFriend.html?inviteEmailID=${email}&inviteMessage=${textmsg}&inviteSubject=${subject}&reInviteActivity=&reInviteId=`,
                    config
                )
                    .then((res) => {
                        seterrormsg(res.data)
                    })
            }
            else {
                axios.get(
                    `http://dev.skopic.com:9090/skopicportal/user/inviteFriend.html?inviteEmailID=${mail}&inviteMessage=${textmsg}&inviteSubject=${subject}&reInviteActivity=&reInviteId=`,
                    config
                )
                    .then((res) => {
                        seterrormsg(res.data)
                    })
            }
        }
        setMail("")
        setemail([])
    }
    const handleDelete = (toBeRemoved) => {
        setemail(email.filter(email => email !== toBeRemoved))
    }
    const isSumbitHandler = () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) || email.length > 0) {
            return true
        }
        else {
            return false;
        }
    }
    const closeInviteHandler = () => {
        setCloseInvites(props.onHide)
        setMessageShow(true)
    }
    const isEnabaled = isSumbitHandler()
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="InviteStyles"
            >
                <div className='Invitation-modal'>
                    <Modal.Header closeButton onClick={closeHandler}>
                        <Modal.Title id="contained-modal-title-vcenter" className="title">
                            Invite members
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onInviteHandler}>
                            <div className="Invitaion">
                                <div className="InvitationEmail">
                                    Email:
                                    <input type="email" value={mail} onChange={emailChange} onKeyDown={handleKeyDown} maxLength="50" />

                                    {email.map
                                        (mail => <div key={mail} className="multipleEmail"> {mail} <button
                                            type="button"
                                            className="button"
                                            onClick={() => handleDelete(mail)}
                                        >
                                            &times;
                                        </button></div>)
                                    }
                                </div>
                                <div className="InvitationSubject">
                                    Subject:
                                    <input type="text" value={subject} />
                                </div>
                                <div className="InvitationTextaera">
                                    <label>Message:</label>
                                    <div>
                                        <textarea rows="4" cols="50" defaultValue={textmsg} />
                                    </div>
                                </div>
                                <button type="submit" className="Invite" onClick={closeInviteHandler} disabled={!isEnabaled}>Invite</button>
                            </div>
                        </form>
                        <p className="Change">or</p>
                        <a href="http://dev.skopic.com:9090/skopicportal/gmail/getGmailContactRedirectUrl.html?contacts=true" trgaet="_blank">
                            <button className="GmailContacts">
                                <img src={gmail} alt="gmailIcon" />
                                <span> Invite Gmail contacts</span>
                            </button>
                        </a>
                        <button className="FacebookContacts">

                            <img src={facebook} alt="facebookIcon" />
                            <span>Share on Facebook</span>
                        </button>
                    </Modal.Body>
                </div>
            </Modal>

            <MessageModal
                show={messageShow}
                onHide={() => setMessageShow(false)}
                message={errormsg}
            />
        </>
    );
}
export default Invitation
