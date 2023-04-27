import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Avatar } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import bg1 from "../../Assets/images/Golfing-Couple-v2.jpg";
import Invite from "../../Assets/images/Invitemember.png";
import Crown from "../../Assets/images/moderatorcrown.png";
import compose from "../../Assets/images/compose.png";
import aboutASK from "../../Assets/images/aboutask.svg";
import { CookieConfig } from "../../Utils/CookieConfig";

import styles from "../../Assets/css/home/Feed.module.css";
import Invitation from "./Invitations/Invitations";

import * as feedactions from "../../store/actions/feedactions/feedActionCreator";

import PostingOptionsModal from "../Reusuablecomponents/PostingOptionsModal";
import ToggleSwitch from "../Reusuablecomponents/ToggleSwitch";
import LocationTag from "../Reusuablecomponents/LocationTag.jsx";
import AsksModal from "./AsksModal.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import { TrendingUpOutlined } from "@material-ui/icons";
import PrimaryModeratorCrown from "../../Assets/images/PrimaryModeratorCrown.svg";
import SecondaryModeratorCrown from "../../Assets/images/SecondaryModeratorCrown.svg";
// import { setLanguage } from 'react-geocode';
import PhotoPreview from "../../Components/PhotoPreview";

const useStyles = makeStyles({
  heading: {
    fontSize: 16,
    color: "#000000a1",
    paddingBottom: 0,
  },
});
function AskSayPostDataModal(props) {
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  // const usernameData = useSelector((state) => state.followReducer.usernameData)

  const AskCanAns = useSelector((state) => state.followReducer.sayData);
  const saysCanAns = useSelector((state) => state.followReducer.askData);

  const [askorSayText, setAskorSayText] = useState("");
  const [SaysShow, setSaysShow] = useState(false);
  const [isPostOption, setPostOption] = useState("");
  const [isAdditionalCount, setAdditionalCount] = useState(false);
  const [isValidCount, setValidCount] = useState(true);
  const [isCharcount, setCharCount] = useState(0);
  const [setLocationSelect, isLocationSelect] = useState("");
  const [isLat, setLat] = useState("");
  const [isLng, setLng] = useState("");
  const [postingOption, setPostingOption] = useState("");
  const [isNewHash, setNewHashMessage] = useState("");

  // const [isUserNameData, setUserNameData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.modalShow) {
      setAskorSayText("");
      setPostOption("");
      setAdditionalCount("");
      setCharCount(0);
      setNewHashMessage("");
    }
    // if (AskCanAns && Object.keys(AskCanAns).length > 0 || saysCanAns && Object.keys(saysCanAns).length > 0) {
    //     if(AskCanAns.messageList||saysCanAns.messageList){
    //         setSaysShow(true)
    //     }
    // }
  }, [props.modalShow]);

  useEffect(() => {
    if (AskCanAns && Object.keys(AskCanAns).length > 0) {
      if (AskCanAns.status === "New Hash") {
        setNewHashMessage("You can't create new #TAG here");
        props.setModalShow(true);
      } else {
        props.setModalShow(false);
        dispatch(feedactions.fetchFeedData("?startlimit=0"));
      }
      if (AskCanAns.messageList) {
        setSaysShow(true);
      }
    }
  }, [AskCanAns]);

  useEffect(() => {
    if (saysCanAns && Object.keys(saysCanAns).length > 0) {
      if (saysCanAns.status === "New Hash") {
        setNewHashMessage("You can't create new #TAG here");
        props.setModalShow(true);
      } else {
        props.setModalShow(false);
        dispatch(feedactions.fetchFeedData("?startlimit=0"));
      }
      if (saysCanAns.messageList) {
        if (saysCanAns.messageList.length > 0) {
          setSaysShow(true);
        }
      }
    }
  }, [saysCanAns]);

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
      if (
        strArray[inputletters].indexOf("http://") == -1 &&
        strArray[inputletters].indexOf("www.") == -1 &&
        strArray[inputletters].indexOf("https://") == -1 &&
        strArray[inputletters].indexOf("HTTP://") == -1 &&
        strArray[inputletters].indexOf("WWW.") == -1 &&
        strArray[inputletters].indexOf("HTTPS://") == -1
      ) {
        validlettercount = validlettercount + strArray[inputletters].length;
      } else if (
        strArray[inputletters].indexOf("http://") &&
        strArray[inputletters].indexOf("www.") &&
        strArray[inputletters].indexOf("https://") &&
        strArray[inputletters].indexOf("HTTP://") &&
        strArray[inputletters].indexOf("WWW.") &&
        strArray[inputletters].indexOf("HTTPS://")
      ) {
        validlettercount = validlettercount + strArray[inputletters].length;
      }
    }
    inputDataLen = validlettercount;
  };

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
      letterCountAdd = "letterCounterAdding";
      TotalLetters = 280;
    } else {
      letterCounter = "letterCounter140";
      letterCountAdd = "letterCounterAdding140";
      TotalLetters = 140;
    }

    let letters = document.getElementById(inputValue).value;

    setAskorSayText(e.target.value);
    ignoreSpaceandUrls(letters, inputValue);
    if (document.getElementById(letterCounter && letterCountAdd) !== null) {
      setCharCount(inputDataLen);
      if (inputDataLen > TotalLetters) {
        document.getElementById(letterCountAdd).style.color = "red";
        document.getElementById("postSubmitButton").disabled = true;
        document.getElementById("postSubmitButton").style.opacity = "0.4";
        setValidCount(false);
      } else {
        document.getElementById(letterCountAdd).style.color = "black";
        document.getElementById("postSubmitButton").disabled = false;
        document.getElementById("postSubmitButton").style.opacity = "2";
        setValidCount(true);
      }
      // if (document.getElementById("postSubmitButton").disabled = true) {
      //     setValidCount(false)

      // }
      // else {
      //     setValidCount(true)

      // }
    }
  };

  const postAskHandler = (e) => {
    e.preventDefault();
    // let formData = new FormData();
    let lnglat;
    let TotalLetters = 280;
    if (isPostOption === "ASK") {
      if ((isLat !== "") & (isLng !== "")) {
        lnglat = isLat + "," + isLng;
      } else {
        lnglat = "";
      }
      if (isCharcount && isCharcount <= TotalLetters && isValidCount) {
        dispatch(
          feedactions.fetchSayAskData(
            `Message=${askorSayText}&userLoc=&msgLoc=${lnglat}&locName=${setLocationSelect}&posttype=${postingOption}`
          )
        );
        setLat("");
        setLng("");
        isLocationSelect("");

        setAskorSayText("");
      }
    } else {
      let saylatlng;
      if ((isLat !== "") & (isLng !== "")) {
        saylatlng = isLat + "," + isLng;
      } else {
        saylatlng = "";
      }
      if (isCharcount && isCharcount <= TotalLetters && isValidCount) {
        dispatch(
          feedactions.fetchAskSayData(
            `Message=${askorSayText}&userLoc=&msgLoc=${saylatlng}&locName=${setLocationSelect}&onlyASK=YES&posttype=${postingOption}`
          )
        );
        // formData.append("onlyASK", "YES");
        setLat("");
        setLng("");
        isLocationSelect("");

        setAskorSayText("");
      }
    }

    // setLat("")
    // setLng("")
    // isLocationSelect("")

    // setAskorSayText("")

    // setPostOption("")

    // return () => clearTimeout(timer);
  };

  const isSubmitHandler = () => {
    if (isPostOption === "ASK" || isPostOption === "SAY") {
      if (askorSayText === "") {
        return false;
      } else {
        return true;
      }
    }
  };
  const isEnabled = isSubmitHandler();
  const onAddSelection = () => {
    if (isCharcount <= 280) {
      document.getElementById("postSubmitButton").disabled = false;
      document.getElementById("postSubmitButton").style.opacity = "2";
    }
    setAdditionalCount(true);
    setValidCount(true);
  };
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
        <div className={styles.modalbgcolor}>
          <Modal.Header
            closeButton
            // className={classes.heading}
          >
            {isPostOption === "ASK" ? (
              <h6 className={styles.asksayselection}>
                what would you like to ASK?
              </h6>
            ) : isPostOption === "SAY" ? (
              <h6 className={styles.asksayselection}>
                what would you like to SAY?
              </h6>
            ) : (
              <h6 className={styles.asksayselection}>
                Do you want to ASK or SAY
              </h6>
            )}
          </Modal.Header>

          <ToggleSwitch
            leftLabel="ASK"
            rightLabel="SAY"
            setPostOption={setPostOption}
          />

          <Modal.Body className={styles.modalbody}>
            {userDetails && Object.keys(userDetails).length !== 0 ? (
              <div className={styles.profilenameandimage}>
                <div>
                  <Avatar
                    src={`${profileImagePath}${userDetails.userData.uimage}`}
                    className={styles.profileavatar}
                  />
                </div>
                <div className={styles.profilename}>
                  <p>{userDetails.userData.shortDisplayName}</p>
                  <div className={styles.postdropdown}>
                    <PostingOptionsModal
                      tenantName={userDetails.userData.tenantName}
                      pimage={userDetails.userData.tenantLogoThumbnail}
                      setPostingOption={setPostingOption}
                      isPostOption={isPostOption}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <textarea
              placeholder={`${
                isPostOption === "ASK"
                  ? "What would you like to ASK?"
                  : isPostOption === "SAY"
                  ? "What would you like to SAY"
                  : "What's on your mind?"
              }`}
              className={styles.asksaytextarea}
              value={askorSayText}
              id="post"
              onChange={(e) => textChangeHandler(e, "post")}
            />
            <span className={styles.hashValidationMessage}>{isNewHash}</span>

            <div className={styles.locationtagandcharcount}>
              <div>
                <a>
                  {userDetails && Object.keys(userDetails).length !== 0 ? (
                    <>
                      <LocationTag
                        isPostings={true}
                        isLocationSelect={isLocationSelect}
                        setLat={setLat}
                        setLng={setLng}
                        id={userDetails.userData.User_ID}
                      />
                      <p>{userDetails.User_ID}</p>
                    </>
                  ) : null}
                </a>
              </div>
              <div>
                {isAdditionalCount ? (
                  <>
                    <label
                      id={`letterCounterAdding`}
                      className={`${
                        isCharcount > 280 ? styles.overCount : null
                      }`}
                    >
                      {isCharcount}
                    </label>
                    <label id={`letterCounter`}>/280</label>
                  </>
                ) : (
                  <span className={styles.initialcount}>
                    <label id={`letterCounterAdding140`}>{isCharcount}</label>
                    <label id={`letterCounter140`}>/140 </label>
                  </span>
                )}

                {!isAdditionalCount ? (
                  <AddCircleOutlineIcon
                    onClick={onAddSelection}
                    className={styles.additionalcountadd}
                  />
                ) : null}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.modalfooter}>
            <Button
              id="postSubmitButton"
              onClick={postAskHandler}
              disabled={!isEnabled}
              className={`${styles.PostSubmit} ${
                isPostOption === "ASK"
                  ? styles.askpost
                  : isPostOption === "SAY"
                  ? styles.saypost
                  : null
              } ${!isEnabled ? styles.postbuttondisable : null}`}
            >
              POST
            </Button>

            {/* <Button onClick={props.onHide}>Close</Button> */}
          </Modal.Footer>
        </div>
        {isPostOption === "ASK" || isPostOption === "SAY" ? null : (
          <div className={styles.postSelectionWarning}>
            <p>
              You must select ASK or SAY in order to start writing your post
            </p>
          </div>
        )}
        <div className={styles.aboutAskInfo}>
          <img
            src={aboutASK}
            alt="aboutask"
            className={styles.aboutAskInfoicon}
          />

          {isPostOption === "ASK" ? (
            <div className={styles.askAbout}>
              <h6>Why create ASK</h6>
              <span>
                ASK something relevant and pressing to you or your community.
                (EX: Can I take AP college board exam without taking an AP class
                at my school?)
              </span>
              <h6>ASK your Community</h6>
              <span>
                Review all matching results to see if you can find your best
                answer, if not move it to open pool for your peers to answer.
              </span>
            </div>
          ) : isPostOption === "SAY" ? (
            <div className={styles.askAbout}>
              <h6>Why create SAY</h6>
              <span>
                Share your knowledge or express your thoughts to benefit your
                community. (EX: Ms. Peck teaches Calculus great. Her tests and
                grading are tough, but she offers one make up test.)
              </span>
              <h6>Build your community knowledge</h6>
              <span>
                Your SAY could be the best answer yours peers may be looking
                for, so keep sharing your knowledge and thoughts.
              </span>
            </div>
          ) : null}
        </div>
      </Modal>

      <AsksModal
        show={SaysShow}
        onHide={() => setSaysShow(false)}
        isPostOption={isPostOption}
        setSaysShow={setSaysShow}
      />
    </React.Fragment>
  );
}

function Feed() {
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const Tag = useSelector((state) => state.TagDisplayReducer.displayTag);

  const [open, setOpen] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [invitesShow, setInvitesShow] = React.useState(false);
  const [invite, setInvite] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

  const imageServerURL = "http://dev.skopic.com:9090/skopicimage";
  // console.log("userDetails", userDetails);

  const onInvitesSelction = () => {
    setInvitesShow(true);
    setInvite(true);
  };

  const onModalSelect = () => {
    setModalShow(false);
  };
  const showPreview = (e) => {
    if (e.target.tagName == "DIV") {
      setPreviewModal(!previewModal);
    }
  };

  return (
    <React.Fragment>
      {userDetails && Object.keys(userDetails).length !== 0 ? (
        <>
          <div
            className={styles.feed}
            style={{
              backgroundImage: `url(${imageServerURL}${userDetails.userData.tenantLogo})`,
            }}
            onClick={(e) => showPreview(e)}
          >
            <span className={styles.crown}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31">
                                <g id="Group_1490" data-name="Group 1490" transform="translate(-247 -60)">
                                    <rect id="Rectangle_1051" data-name="Rectangle 1051" width="31" height="31" rx="15.5" transform="translate(247 60)" opacity="0.499" />
                                    <g id="Group_1477" data-name="Group 1477" transform="translate(23960 4698)">
                                        <g id="Layer_2" data-name="Layer 2" transform="translate(-23708 -4630)">
                                            <g id="Layer_1" data-name="Layer 1" transform="translate(0 0)">
                                                <path id="Path_412" data-name="Path 412" d="M128.326,14.333a2.26,2.26,0,0,1-.5-.968,1.995,1.995,0,0,1,3.855-1.025,1.522,1.522,0,0,0,.093.326v.565a4.837,4.837,0,0,1-.2.6,2.018,2.018,0,0,1-1.211,1.037l-.157.051a.572.572,0,0,0-.126.009,1.972,1.972,0,0,1-.8-.035A2.127,2.127,0,0,1,128.326,14.333Z" transform="translate(-110.779 -9.417)" fill="#fec031" />
                                                <path id="Path_413" data-name="Path 413" d="M85.985,27.124a2.127,2.127,0,0,0,.968.561,1.972,1.972,0,0,0,.8.035.584.584,0,0,0,.126-.009c-.092.7-.2,1.4-.354,2.089a10.961,10.961,0,0,1-1.239,3.341.223.223,0,0,1-.033.039H78.93V26.207a1.986,1.986,0,0,0,1.424-.6,2.678,2.678,0,0,0,.5,1.2,3.094,3.094,0,0,0,1.7,1.248,3.208,3.208,0,0,0,2.978-.511,3,3,0,0,0,.461-.42Z" transform="translate(-68.438 -22.208)" fill="#fcf286" />
                                                <path id="Path_414" data-name="Path 414" d="M20.76,26.545V33.51H13.448a9.367,9.367,0,0,1-1.008-2.362,16.334,16.334,0,0,1-.4-1.7c-.086-.464-.142-.931-.211-1.4a1.014,1.014,0,0,1,.133,0,2.031,2.031,0,0,0,1.151-.166,2.927,2.927,0,0,0,.6-.417,3.139,3.139,0,0,0,1.462.931,3.21,3.21,0,0,0,3.208-.734A3.257,3.257,0,0,0,19.352,26a.167.167,0,0,1,.108.058,1.994,1.994,0,0,0,1.288.481Z" transform="translate(-10.259 -22.547)" fill="#febf2f" />
                                                <path id="Path_415" data-name="Path 415" d="M23.895,83H31.2v3.191a.215.215,0,0,0,.039.157c-.036.062-.086.044-.133.044H24.585c-.421,0-.693-.364-.694-.931C23.887,84.631,23.892,83.814,23.895,83Z" transform="translate(-20.715 -71.969)" fill="#faa741" />
                                                <path id="Path_416" data-name="Path 416" d="M78.917,86.437c-.044-.039-.039-.1-.039-.157V83.09h7.316v2.541c0,.465-.25.8-.593.808-.473.008-.948,0-1.421,0H79.07A.838.838,0,0,1,78.917,86.437Z" transform="translate(-68.394 -72.047)" fill="#fec030" />
                                                <path id="Path_417" data-name="Path 417" d="M3.466,14.992a3.645,3.645,0,0,1-.614.427,2.031,2.031,0,0,1-1.151.166,1.013,1.013,0,0,0-.133,0,2.769,2.769,0,0,1-.779-.374,2,2,0,0,1-.713-2.09,1.925,1.925,0,0,1,1.611-1.474,1.972,1.972,0,0,1,2.26,1.5,1.949,1.949,0,0,1-.4,1.742C3.519,14.925,3.5,14.961,3.466,14.992Z" transform="translate(-0.011 -10.077)" fill="#faa741" />
                                                <path id="Path_418" data-name="Path 418" d="M80.417,3.446a1.986,1.986,0,0,1-1.417.6V.047a1.926,1.926,0,0,1,1.67.9,1.976,1.976,0,0,1-.086,2.308C80.533,3.325,80.45,3.364,80.417,3.446Z" transform="translate(-68.499 -0.044)" fill="#fec031" />
                                                <path id="Path_419" data-name="Path 419" d="M65.9.027V4.015a1.994,1.994,0,0,1-1.288-.481c-.032-.027-.06-.061-.108-.058a1.538,1.538,0,0,0-.209-.274,1.945,1.945,0,0,1-.386-1.329A1.994,1.994,0,0,1,65.215.144,1.462,1.462,0,0,1,65.9.027Z" transform="translate(-55.408 -0.023)" fill="#faa741" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg> */}
              {userDetails && Object.keys(userDetails).length !== 0 ? (
                userDetails.userData.moderatorStatus === "1" ||
                userDetails.userData.isAdmin === "1" ? (
                  <img
                    src={`${
                      userDetails.userData.isCurrentCommunityPm === "1"
                        ? PrimaryModeratorCrown
                        : SecondaryModeratorCrown
                    }`}
                  />
                ) : null
              ) : null}
            </span>

            <div className={styles.container}>
              {userDetails.userData.tenantName ? (
                <div className={styles.moderator}>
                  <p>{userDetails.userData.tenantName}</p>
                </div>
              ) : null}

              <div className={styles.prospectimagesdiv}>
                <a className={styles.invitebutton} onClick={onInvitesSelction}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.878"
                    height="15.779"
                    viewBox="0 0 15.878 15.779"
                  >
                    <g
                      id="Group_1924"
                      data-name="Group 1924"
                      transform="translate(-6714.617 -3413.368)"
                    >
                      <path
                        id="Path_435"
                        data-name="Path 435"
                        d="M34.165,26.211a3.831,3.831,0,1,0-5.059,0A6.11,6.11,0,0,0,25.5,31.795c0,.726.376,1.728,2.179,2.379a11.545,11.545,0,0,0,3.957.6c4.533,0,6.135-1.6,6.135-2.98A6.11,6.11,0,0,0,34.165,26.211ZM31.635,21a2.329,2.329,0,1,1-2.329,2.329A2.329,2.329,0,0,1,31.635,21Zm0,12.27c-2.73,0-4.633-.776-4.633-1.477a4.633,4.633,0,0,1,9.266,0C36.268,32.5,34.365,33.272,31.635,33.272Z"
                        transform="translate(6689.117 3394.369)"
                        fill="#373334"
                      />
                      <path
                        id="Path_436"
                        data-name="Path 436"
                        d="M72.931,19.277H71.9V18.25a.751.751,0,0,0-.751-.751.726.726,0,0,0-.751.751v1.027H69.35a.751.751,0,0,0-.751.751.726.726,0,0,0,.751.751H70.4v1.052a.726.726,0,0,0,.751.751.751.751,0,0,0,.751-.751V20.779h1.027a.726.726,0,0,0,.751-.751A.751.751,0,0,0,72.931,19.277Z"
                        transform="translate(6656.813 3395.87)"
                        fill="#373334"
                      />
                    </g>
                  </svg>
                  Invite
                </a>
              </div>
            </div>
            <Invitation
              show={invitesShow}
              onHide={() => setInvitesShow(false)}
              invite={invite}
            />
          </div>

          <div className={styles.filterinput}>
            <div className={styles.post}>
              <input
                className={styles.postinput}
                placeholder="      ASK or SAY something..."
                type="text"
                onClick={() => setModalShow(true)}
              />
              {/* <button className={styles.postbutton} onClick={handleClickOpen}>Post</button> */}

              <AskSayPostDataModal
                show={modalShow}
                onHide={() => onModalSelect()}
                modalShow={modalShow}
                setModalShow={setModalShow}
              />

              <svg
                id="noun_compose_72548"
                xmlns="http://www.w3.org/2000/svg"
                width="15.426"
                height="15.435"
                viewBox="0 0 15.426 15.435"
              >
                <path
                  id="Path_432"
                  data-name="Path 432"
                  d="M16.3,3.5,15.249,4.553a.315.315,0,0,1-.448,0l-1.78-1.78a.316.316,0,0,1,0-.45l1.051-1.052a.713.713,0,0,1,1.009,0L16.3,2.492A.716.716,0,0,1,16.3,3.5ZM14.42,5.3,8.6,11.122a.272.272,0,0,1-.448.085l-1.78-1.78a.318.318,0,0,1,0-.45l5.82-5.824a.318.318,0,0,1,.448,0l1.78,1.781C14.545,5.058,14.545,5.26,14.42,5.3ZM7.612,11.944l-2.525.865-.047.016a.239.239,0,0,1-.222-.064.235.235,0,0,1-.062-.222l.015-.046.865-2.527.016-.047A.229.229,0,0,1,5.7,9.851a.239.239,0,0,1,.337,0l1.691,1.692a.239.239,0,0,1,0,.336.21.21,0,0,1-.068.048ZM9.328,3.731H2.679V14.9h11.17V8.253a.8.8,0,0,1,1.6,0V15.7a.8.8,0,0,1-.8.8H1.881a.8.8,0,0,1-.8-.8V2.934a.8.8,0,0,1,.8-.8H9.328a.8.8,0,1,1,0,1.6Z"
                  transform="translate(-1.083 -1.063)"
                  fill="#707070"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <PhotoPreview
            open={previewModal}
            handleClose={() => setPreviewModal(false)}
            tenantId={userDetails.userData.tenantId}
          />
        </>
      ) : null}
    </React.Fragment>
  );
}

export default Feed;
