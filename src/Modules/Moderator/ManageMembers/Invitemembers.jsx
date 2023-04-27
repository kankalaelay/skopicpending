import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "../../../Assets/css/Moderator/InviteMembers.css"
import gmail from "../../../Assets/images/gmail.svg"


import * as moderatorActions from '../../../store/actions/Moderator/moderatoractions';



function Invitemembers() {

    const data = useSelector(state => state.ModeratorReducer.InviteMembersdata)
    const dispatch = useDispatch()

  

    


    const moderatingCommunitysData = useSelector((state) => state.ModeratorReducer.moderatingCommunitysData)

    console.log({moderatingCommunitysData})
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

        setSubject(`Invitation to join ${userDetails.userData.tenantName} via Skopic`)
        setTextmsg(` Hi,
     I request you to join  ${userDetails.userData.tenantName}  on Skopic. It is quick and easy to Sign Up.
         Click the link below to join ${userDetails.userData.tenantName}.
         http://dev.skopic.com:9090/skopicportal/user/communityurl.html?tid=${userDetails.userData.tenantId}
        Thank you
     ${userDetails.userData.displayName}
         `)


    }, [userDetails])

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


            axios.get(
                ` http://dev.skopic.com:9090/skopicportal/user/inviteFriend?inviteEmailID=${mail}&inviteMessage=${textmsg}&inviteSubject=${subject}`,
                config
            )
                .then((res) => {
                    seterrormsg(res.data)
                    
                })

            // else {
            //     axios.get(
            //         `http://dev.skopic.com:9090/skopicportal/user/inviteFriend.html?inviteEmailID=${mail}&inviteMessage=${textmsg}&inviteSubject=${subject}&reInviteActivity=&reInviteId=`,
            //         config
            //     )
            //         .then((res) => {
            //             seterrormsg(res.data)
            //         })
            // }

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
    // const closeInviteHandler = () => {
    //     setCloseInvites(props.onHide)
    //     setMessageShow(true)
    // }
    const isEnabaled = isSumbitHandler()
    return (
        <>

            <div className='background-for-whole'>

                <form onSubmit={onInviteHandler}>
                    <div className="Invitaion InviteStyles">
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
                        <p>{errormsg}</p>
                        <button type="submit" onClick={onInviteHandler} className="Invite" disabled={!isEnabaled}>Invite</button>

                        
                            <button className="GmailContacts">
                            <a href="http://localhost:8080/skopicportal/gmail/redirectToGmailContacts.html" >
                                <img src={gmail} alt="gmailIcon" />
                                <span> Invite Gmail contacts</span>
                                </a>
                            </button>
                      
                  
                        {/* <button type="submit" className="Invite"  disabled={!isEnabaled}>Invite</button> */}

                        {/* <button type="submit" onClick={''} className="Invite" disabled={!isEnabaled}>Invite via Gmail</button> */}
                    </div>
                </form>
            </div>

        </>
    );
};


export default Invitemembers;