import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button, Avatar } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import styles from '../../Assets/css/home/Feed.module.css'

import { InputTextarea } from 'primereact/inputtextarea';

import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import '../../Assets/css/Gobal.css'
import { useSelector, useDispatch } from 'react-redux'
import AboutMap from '../FooterComponents/AboutMap';
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'


const location = {
    address: '4125 Blackford Avenue, Suite 255 San Jose, CA 95117',
    lat: 37.3229763,
    lng: -121.9763862,
}

function Contact(props) {
    const userDetails = useSelector((state) => state.SignInReducer.userDetails)
    const [modalShow, setModalShow] = React.useState(false);
    const [isMessageText, setMessageText] = React.useState('');
    const [isEmail, setEmail] = React.useState('');
    const [isName, setName] = React.useState('');

    const dispatch = useDispatch();


    const onModalSelect = () => {
        setModalShow(false)
    }


    useEffect(() => {

        if (userDetails && Object.keys(userDetails).length !== 0) {
            setEmail(userDetails.userData.userEmail)
            setName(userDetails.userData.displayName)
        }


    }, [userDetails])

    const onTextChangeHandler = (e, messageType) => {
     
        if (messageType === "Name") {
            setName(e.target.value)
        }
        else if (messageType === "Email") {
            setEmail(e.target.value)
        }
        else {
            setMessageText(e.target.value)
        }
    }

    const onSubmit=()=>{
            dispatch(feedactions.getContactSubmit(`name=${isName}&email=${isEmail}&desc=${isMessageText}`)); 
            setMessageText('')
            alert("your message  has been sent  and you will receive a  response soon") 
        
    }

    return (
        <React.Fragment>
            <Modal
                {...props}
                size="md"

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div
                    className={styles.contactModalbgcolor}
                >
                    <Modal.Header closeButton
                    // className={classes.heading}
                    >
                        Contact


                    </Modal.Header>


                    <Modal.Body >
                        {
                            (userDetails && Object.keys(userDetails).length !== 0)
                                ?
                                <div className="p-fluid">
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Name:</label>
                                        <InputText id="firstname1" type="text" value={isName} className={styles.contactTextarea} onChange={(e) => onTextChangeHandler(e, "Name")} />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="lastname1">Email:</label>
                                        <InputText id="lastname1" type="email" value={isEmail} className={styles.contactTextarea} onChange={(e) => onTextChangeHandler(e, "Email")} />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="lastname1">Message:</label>

                                        <InputTextarea placeholder="Type your message" rows="3" value={isMessageText} className={styles.contactTextarea} onChange={(e) => onTextChangeHandler(e, "Message")} />
                                    </div>
                                </div>
                                :
                                <div className="p-fluid">
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Name:</label>
                                        <InputText id="firstname1" type="text"  className={styles.contactTextarea} placeholder="Your name" onChange={(e) => onTextChangeHandler(e, "Name")} />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="lastname1">Email:</label>
                                        <InputText id="lastname1" type="email"  className={styles.contactTextarea} placeholder="Your email" onChange={(e) => onTextChangeHandler(e, "Email")} />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="lastname1">Message:</label>

                                        <InputTextarea placeholder="Type your message" rows="3"  className={styles.contactTextarea} onChange={(e) => onTextChangeHandler(e, "Message")} />
                                    </div>
                                </div>
                        }
                        <div className={styles.sendtoContact}>
                            <button
                                className={`${styles.contactSend} ${isMessageText.length > 0 ? null : styles.contactSendButton}`}
                                autoCapitalize="none"
                                onClick={() => onSubmit()}
                            >Send
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                    <div className={styles.address}>
                        <p>Address: </p>
                        <AboutMap location={location} />
                        {/* <p onClick={() => setModalShow(true)}> 4125 Blackford Avenue, San Jose, CA 97117</p> */}
                    </div>
                    <div className={styles.address}>
                        <p>Telephone: </p>
                        <p className={styles.addressContact}> +1 (408) 230-0123, +1 (408) 799-2103</p>
                    </div>
                    <span>

                    </span>
                </div>

            </Modal>

        </React.Fragment >
    )
}
function FooterComponent() {

    const [modalShow, setModalShow] = React.useState(false);

    const onModalSelect = () => {
        setModalShow(false)
    }

    return (
        <div className='footer-links'>
            <Link to={{ pathname: '/About', state: { footerType: 'About' } }}>About</Link>
                  <span> |  </span> 
            <Link to={{ pathname: '/PrivacyPolicy', state: { footerType: 'PrivacyPolicy' } }}>Privacy</Link>
             <span> |  </span>
            <Link to={{ pathname: '/TermsofService', state: { footerType: 'TermsofService' } }}>Terms</Link>
             <span> |  </span>
            <Link to={{ pathname: '/Blog', state: { footerType: 'Blog' } }}>Blog</Link>
             <span> |  </span>
            <a>
                Timeline
            </a>
             <span> |  </span>
            <Link to="/Careers">Careers</Link>
             <span> |  </span>
            <a onClick={() => setModalShow(true)}>
                Contact
            </a>
             <span> |  </span>

            <Link to="/help">Help</Link>
             <span> |  </span>
            <Link to="/Googlemaps">Nearby Communities</Link>
             <span> |  </span>

            <Link to={{ pathname: '/UserGuidelines', state: { footerType: 'UserGuidelines' } }}>User Guidelines</Link>
             <span> |  </span>


            <Link to="/cookies">Cookies |</Link>



            <span>
                {/* <p>Skopic &#169; 2021</p> */}
            </span>

            <Contact
                show={modalShow}
                onHide={() => onModalSelect()}
                modalShow={modalShow}
                setModalShow={setModalShow}

            />
        </div>
    )
}

export default FooterComponent
