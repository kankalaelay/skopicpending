import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Avatar } from '@material-ui/core';
import { Modal } from 'react-bootstrap';


import aboutASK from '../../Assets/images/aboutask.png';
import updateComposer from '../../Assets/images/updateComposer.png';
import tagPost from '../../Assets/images/tagPost.svg';




import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



import styles from '../../Assets/css/home/Feed.module.css'


import * as feedactions from '../../store/actions/feedactions/feedActionCreator'

import PostingOptionsModal from '../Reusuablecomponents/PostingOptionsModal'
import LocationTag from "../Reusuablecomponents/LocationTag.jsx"
import AsksModal from "../home/AsksModal.jsx"
import CalendarComponent from "../Reusuablecomponents/CalendarComponent"
import AutoCompleteTextField from "../Reusuablecomponents/AutoCompleteTextField"




export default function UpdateTagPostDataModal(props) {
    const userDetails = useSelector((state) => state.SignInReducer.userDetails)
    // const usernameData = useSelector((state) => state.followReducer.usernameData)
    const hashType = useSelector((state) => state.followReducer.hashType)


    const updatePostData = useSelector((state) => state.followReducer.updatePostData)
    const hashData = useSelector((state) => state.followReducer.hashData)


    const [isTagorUpdateText, setTagorUpdateText] = useState("");
    const [isPostOption, setPostOption] = useState("")
    const [isAdditionalCount, setAdditionalCount] = useState(false)
    const [isCharcount, setCharCount] = useState(0)
    const [setLocationSelect, isLocationSelect] = useState("")
    const [isLat, setLat] = useState("")
    const [isLng, setLng] = useState("")
    const [postingOption, setPostingOption] = useState("")
    const [isUserNameData, setUserNameData] = useState([])
    const [isPlaceholderText, setPlaceholderText] = useState("")
    const [isTagType, setTagType] = useState(null)
    const [isTagValid, setTagValid] = useState("")
    const [isUpdateTagValid, setUpdateTagValid] = useState("")
    const [isTenantId, setTenantId] = useState([])
    const [isDefaultTenantId, setDefaultTenantID] = useState([])
    const [isCharCountValid,setCharCountValid]=useState(true)
    const dispatch = useDispatch();



    useEffect(() => {

        if (props.modalShow) {
            setTagorUpdateText("")
            setPostOption("")
            setAdditionalCount("")
            setCharCount(0)
            setTagType(null)
            setTagValid("")

        }

        if (props.isModalType === "UPDATE") {
            setPlaceholderText("What important UPDATE do you want to share?")
        }
        else {
            setPlaceholderText("How do you want to TAG your activity?")
        }



        // if (hashType != "Available" || hashType != "SKIP") {
        //     dispatch(feedactions.getPostTag(`rtrValue=${hashType}`));             
        // }






    }, [props.modalShow])

    useEffect(() => {

        if (hashType) {
            if (hashType === "Available") {
                setTagValid("This #TAG already exists")
            }
            else if (hashType === "SKIP") {
                setTagValid("#TAG missing")
            }
            else {
                setTagValid(null)

                dispatch(feedactions.fetchFeedData('?startlimit=0'))

                props.setModalShow(false)

            }
            setCharCount(0)

        }


    }, [hashType])

    useEffect(() => {
        if (hashData) {
            if (hashData === "New Hash") {
                setTagValid("You can't create new #TAG here ")
            }
            else {
                setTagValid(null)
                // alert("Your update has bee shared")
                setTimeout(() => {
                    dispatch(feedactions.fetchFeedData('?startlimit=0'))

                }, 500);

                props.setModalShow(false)

            }
            setCharCount(0)

        }


    }, [hashData])


    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length !== 0) {
            // console.log(userDetails.userData.tenantId)
            setDefaultTenantID([userDetails.userData.tenantId])

        }


    }, [userDetails])

    var selectedTenantIds = isDefaultTenantId.concat(isTenantId)

    var inputDataLen;


    const ignoreSpaceandUrls = (mstrData, txtId) => {
        let inputData = mstrData;
        inputDataLen = inputData.length;
        let inputText = document.getElementById(txtId).value;
        inputText = inputText.replace(/\n/g, " ");
        let strArray = inputText.split(" ");
        let validlettercount = 0;
        let inputletters;
        for (inputletters = 0; inputletters < strArray.length; inputletters++) {
            if (strArray[inputletters].indexOf("http://") == -1
                && strArray[inputletters].indexOf("www.") == -1
                && strArray[inputletters].indexOf("https://") == -1
                && strArray[inputletters].indexOf("HTTP://") == -1
                && strArray[inputletters].indexOf("WWW.") == -1
                && strArray[inputletters].indexOf("HTTPS://") == -1) {
                validlettercount = validlettercount + strArray[inputletters].length;
            } else if (strArray[inputletters].indexOf("http://")
                && strArray[inputletters].indexOf("www.")
                && strArray[inputletters].indexOf("https://")
                && strArray[inputletters].indexOf("HTTP://")
                && strArray[inputletters].indexOf("WWW.")
                && strArray[inputletters].indexOf("HTTPS://")) {
                validlettercount = validlettercount + strArray[inputletters].length;
            }
        }
        inputDataLen = validlettercount;
    }



    const textChangeHandler = (e, id) => {

        // if(usernameData)
        // {
        //     // setUserNameData(usernameData)
        //     console.log(isUserNameData)

        // } 

        let inputValue = id;
        let letterCounter;
        let letterCountAdd;

        var TotalLetters;
        if (isAdditionalCount) {
            letterCounter = "letterCounter";
            letterCountAdd = "letterCounterAdding"
            TotalLetters = 280
        }
        else {
            letterCounter = "letterCounter140";
            letterCountAdd = "letterCounterAdding140"
            TotalLetters = 140
        }

        let letters = document.getElementById(inputValue).value;

        setTagorUpdateText(e.target.value);
        ignoreSpaceandUrls(letters, inputValue);
        if (document.getElementById(letterCounter && letterCountAdd) !== null) {
            setCharCount(inputDataLen)
            if (inputDataLen > TotalLetters) {
                document.getElementById(letterCountAdd).style.color = "red"
                document.getElementById("postSubmitButton").disabled = true
                document.getElementById("postSubmitButton").style.opacity = "0.4"

                    setCharCountValid(false)
            }
            else {
                document.getElementById(letterCountAdd).style.color = "black"
                document.getElementById("postSubmitButton").disabled = false
                document.getElementById("postSubmitButton").style.opacity = "2"
                setCharCountValid(true)
            }

        }

        if (inputDataLen === 0) {
            document.getElementById("postSubmitButton").disabled = true
            document.getElementById("postSubmitButton").style.opacity = "0.4"
        }

    };

    console.log(props.isModalType)
    const onTagSelection = (switchType) => {
        setTagType(switchType)
    }

    const postUpdateTagHandler = (e) => {
        // e.preventDefault();
        // let formData = new FormData();
        let lnglat;


        if (isLat !== "" & isLng !== "") {
            lnglat = isLat + "," + isLng
        }
        else {
            lnglat = ""
        }
        if (isCharcount <= 280 && isCharCountValid) {
            if (props.isModalType === "TAG") {
                dispatch(feedactions.getHashCheck(`description=${isTagorUpdateText}&ident=${isTagType}&userLoc=&msgLoc=${lnglat}&locName=${setLocationSelect}`));
            }
            else {
                dispatch(feedactions.fetchHash(`message=${isTagorUpdateText}&ident=impupdate&updateReminderTime=&jsReminderTime=&timeZone=IST&userLoc=&msgLoc=${lnglat}&locName=${setLocationSelect}&reqTenantIds=${selectedTenantIds}&msgType=I`));
                dispatch(feedactions.getModeratingCommunitys())
            }

            setLat("")
            setLng("")
            isLocationSelect("")

            setTagorUpdateText("")
            setTagType(null)
        }



        // setLat("")
        // setLng("")
        // isLocationSelect("")

        // setTagorUpdateText("")
        // setTagType(null)

        // setTagValid("")
        // setPostOption("")

        // return () => clearTimeout(timer);
    };



    const isSubmitHandler = () => {
        if (isTagType === "NewTag" || isTagType === "PrivateTag" || props.isModalType === "UPDATE") {
            if (isTagorUpdateText === "") {
                return false;
            } else {
                return true;
            }
        }
    };
    const isEnabled = isSubmitHandler();
    const onAddSelection = () => {
        if (isCharcount <= 280) {
            document.getElementById("postSubmitButton").disabled = false
            document.getElementById("postSubmitButton").style.opacity = "2"
            setCharCountValid(true)
        }
        setAdditionalCount(true)
    }
    var profileImagePath = "http://dev.skopic.com:9090/skopicimage";




    return (
        <React.Fragment>
            <Modal
                {...props}
                size="md"
                className={styles.modal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div
                    className={styles.modalbgcolor}
                >
                    <Modal.Header closeButton>

                        {
                            (props.isModalType === "UPDATE")
                                ?
                                <img src={updateComposer} alt="UpdateComposer" className={styles.updateComposericon} />
                                :
                                (props.isModalType === "TAG")
                                    ?
                                    <div className={styles.tagDiv}>
                                        <img src={tagPost} alt="tagComposer" />
                                        <div>
                                            <button id="NewTag" className={`${styles.publicSwitch} ${isTagType === "NewTag" ? styles.onPublicSwitchSelect : null}`} onClick={() => onTagSelection("NewTag")}>Public</button>
                                            <button id="PrivateTag" className={`${styles.privateSwitch} ${isTagType === "PrivateTag" ? styles.onPrivateSwitchSelect : null}`} onClick={() => onTagSelection("PrivateTag")}>Private</button>
                                        </div>
                                    </div>
                                    :
                                    null
                        }
                    </Modal.Header>


                    <Modal.Body className={styles.modalbody}>
                        {
                            (userDetails && Object.keys(userDetails).length !== 0)
                                ?
                                <div className={styles.profilenameandimage}>
                                    <div><Avatar src={`${profileImagePath}${userDetails.userData.uimage}`} className={styles.profileavatar} /></div>
                                    <div className={styles.profilename}>
                                        <p>{userDetails.userData.shortDisplayName}</p>
                                        <div className={styles.postdropdown}>
                                            <PostingOptionsModal tenantName={userDetails.userData.tenantName} pimage={userDetails.userData.tenantLogoThumbnail} setPostingOption={setPostingOption} isPostOption={props.isModalType} setTenantId={setTenantId} />
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                        <textarea placeholder={isPlaceholderText} className={styles.asksaytextarea} value={isTagorUpdateText} id="post" onChange={(e) => textChangeHandler(e, "post")} />
                        {/* <AutoCompleteTextField/> */}

                        <span className={styles.errorMessage}>{isTagValid}</span>

                        <div className={styles.updatecount}></div>
                        <div className={styles.locationtagandcharcount}>
                            <div>

                                <LocationTag isPostings={true} isLocationSelect={isLocationSelect} setLat={setLat} setLng={setLng} />

                                {
                                    (props.isModalType === "UPDATE")
                                        ?
                                        <CalendarComponent />
                                        // <CustomDateTimePicker/>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                {
                                    (isAdditionalCount)
                                        ?
                                        <>
                                            <label id={`letterCounterAdding`} className={`${isCharcount > 280 ? styles.overCount : null}`}>{isCharcount}</label>
                                            <label id={`letterCounter`}>/280</label>
                                        </>
                                        :
                                        <span className={styles.initialcount}>
                                            <label id={`letterCounterAdding140`}>{isCharcount}</label>
                                            <label id={`letterCounter140`}>/140 </label>
                                        </span>
                                }

                                {
                                    (!isAdditionalCount)
                                        ?
                                        < AddCircleOutlineIcon onClick={onAddSelection} className={styles.additionalcountadd} />
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalfooter}>
                        <Button
                            id="postSubmitButton"
                            onClick={postUpdateTagHandler}
                            disabled={!isEnabled}
                            className={`${props.isModalType === "UPDATE" ? styles.updateSubmit : props.isModalType === "TAG" ? styles.tagSubmit : null} ${!isEnabled ? styles.postbuttondisable : null}`}
                        >POST
                        </Button>

                    </Modal.Footer>
                </div>
                <div className={styles.aboutAskInfo}>
                    <img src={aboutASK} alt="aboutupdate" className={styles.updateinfoicon} />
                    {
                        (props.isModalType === "TAG")
                            ?
                            <div className={styles.askAbout}>
                                <h6>
                                    Why create TAG
                                </h6>
                                <span>
                                    Share and Organize an Activity, Topic, or a Group within your Community. (EX: Share and learn matters concerning #Stanford-PreMed students.)
                                </span>
                                <h6>
                                    Follow the TAG
                                </h6>
                                <span>
                                    Share, Learn, and Stay Connected with your favorite Activities, Topics, and Groups.
                                </span>

                            </div>
                            :
                            (props.isModalType === "UPDATE")
                                ?
                                <div className={styles.askAbout}>
                                    <h6>
                                        Why create UPDATE
                                    </h6>
                                    <span>
                                        Share important events or incidents or a critical deadline to notify your entire community. (EX: Neighborhood Association Meeting today at 6PM. Please come over to Joe Pisani Community Center.)
                                    </span>
                                    <h6>
                                        Notify your Community in real time
                                    </h6>
                                    <span>
                                        UPDATEs are broadcasted via Skopic, email, mobile, and watch.
                                    </span>

                                </div>
                                :
                                null
                    }
                </div>
            </Modal>

        </React.Fragment >
    );
}
