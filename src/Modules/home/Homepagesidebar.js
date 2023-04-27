import React, { useState, useEffect } from "react";
import styles from "../../Assets/css/home/Homepagesidebar.module.css";

import AddCommunity from "../../Assets/images/AddCommunity.png";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import * as feedactions from "../../store/actions/feedactions/feedActionCreator";
import * as SignInActions from "../../store/actions/SignInActions/SignInAction";

import PostMessageValidation from "../Reusuablecomponents/PostMessageValidation";
import Skeleton from "@material-ui/lab/Skeleton";
import FooterComponent from "../Reusuablecomponents/FooterComponent";

const Homepagesidebar = () => {
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const communityChange = useSelector(
    (state) => state.followReducer.changeCommunityData
  );
  const changeCommunityData = useSelector(
    (state) => state.followReducer.changeCommunityData
  );

  const [isCommunitySelected, setCommunityselected] = useState(null);
  const [isCommunity, setCommunity] = useState(null);

  const [isEditBio, setEditBio] = useState(null);
  const [isEditBioText, setEditBioText] = useState("");

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";
  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (changeCommunityData) {

  //         if (changeCommunityData && Object.keys(changeCommunityData).length !== 0) {
  //                 dispatch(feedactions.fetchFeedData('?startlimit=0'))
  //                 dispatch(SignInActions.fetchloginUser(''))
  //                 dispatch(feedactions.fetchcontirbutors(''))
  //                 dispatch(feedactions.fetchSettings(''))
  //                 dispatch(feedactions.fetchUserNames('@'));
  //         }
  //     }

  // }, [changeCommunityData])

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length !== 0) {
      if (userDetails.userData.shortBio) {
        setEditBioText(userDetails.userData.shortBio);
      } else {
        setEditBioText("Add a short message about yourself");
      }
    }
  }, [userDetails]);

  const onCommunitySelection = (id, name) => {
    setCommunityselected(id);
    if (isCommunitySelected !== id) {
      dispatch(feedactions.changeCommunity(name, id));

      setTimeout(() => {
        dispatch(feedactions.fetchFeedData("?startlimit=0"));
        dispatch(SignInActions.fetchloginUser(""));
        dispatch(feedactions.fetchcontirbutors(""));
      }, 500);
      window.scrollTo(0, 0);
    }
    setCommunity(id);
  };

  const oneditUpdate = () => {
    let editbio = "editBio";
    // let hideOriginalBio = "hideBio"
    if (document.getElementById(editbio).style.display === "block") {
      document.getElementById(editbio).style.display = "none";
      // document.getElementById(hideOriginalBio).style.display = "block"
      setEditBio(false);
    } else {
      setEditBio(true);

      document.getElementById(editbio).style.display = "block";
      // document.getElementById(hideOriginalBio).style.display = "none"
    }
  };

  return (
    <React.Fragment>
      {userDetails && Object.keys(userDetails).length !== 0 ? (
        <>
          <div className={styles.Profile}>
            {
              userDetails.userData.uimage ? (
                <>
                  <div className={styles.ProfileInfo}>
                    <div className={styles.Profileimg}>
                      <img
                        src={`${profileImagePath}${userDetails.userData.uimage}`}
                        alt="Profile"
                      />
                    </div>
                    <div className={styles.ProfileDetails}>
                      <div className={styles.profilename}>
                        <span>{userDetails.userData.shortDisplayName}</span>
                      </div>

                      <span className={styles.ProfileCounts}>
                        <p>
                          {" "}
                          {userDetails.userData.askcount} ASKS |{" "}
                          {userDetails.userData.sayCount} SAYS <br />{" "}
                          {userDetails.userData.updateCount} UPDATES |{" "}
                          {userDetails.userData.hashSayCount} TAGS
                        </p>
                      </span>
                    </div>
                  </div>
                  <Divider variant="fullWidth" />

                  <div className={styles.ProfileSummary}>
                    {userDetails.userData.shortBio ? (
                      <p onClick={() => oneditUpdate()} id="hideBio">
                        {isEditBioText}
                      </p>
                    ) : (
                      <p onClick={() => oneditUpdate()} id="hideBio">
                        {isEditBioText}
                      </p>
                    )}
                    <div id="editBio" className={styles.editBioTextArea}>
                      <PostMessageValidation
                        messageType={"editBio"}
                        Message={isEditBioText}
                        id={userDetails.userData.User_ID}
                        isEditBio={isEditBio}
                        setEditBio={setEditBio}
                      />
                    </div>
                  </div>
                </>
              ) : null
              // <Skeleton variant="rect" height={50} />
            }
          </div>
          <div className={`row container ${styles.communitycontainer}`}>
            {userDetails.userData.communityFollowNames ? (
              <>
                <h5 className={`h17 bold dark-gray ${styles.mycommunities}`}>
                  My Communities
                </h5>

                {userDetails.userData.communityFollowNames.map((result) => (
                  <div className={`crad-col ${styles.communitycard}`}>
                    <div
                      className={`card ${styles.CommunitySelction} ${
                        isCommunity === result.id
                          ? styles.communitySelected
                          : null
                      }`}
                      onClick={() =>
                        onCommunitySelection(
                          result.id,
                          result.userFollowCommunityName
                        )
                      }
                      id={`selectedCommunity${result.id}`}
                    >
                      <img
                        src={`${profileImagePath}${result.thumbnailLogo}`}
                        className="card-img-top"
                        alt="..."
                      />

                      <p>{result.userFollowCommunityName}</p>
                    </div>
                  </div>
                ))}

                {/* <div className={`card col-sm-5 ${styles.CommunitySelction}`}>
                                <img src={Community} className="card-img-top" alt="..." />

                                <p >Your selected new community </p>

                            </div>
                            <div className={`card col-sm-5 ${styles.CommunitySelction}`}>
                                <img src={Community} className="card-img-top" alt="..." />

                                <p>Your  new community</p>

                            </div> */}
                <div className={`card col-sm-5 ${styles.CommunitySelction}`}>
                  <a className={styles.CommunityImage}>
                    <img
                      src={AddCommunity}
                      alt="Community"
                      className={`card-img-top ${styles.AddCommunityimage}`}
                    />
                  </a>
                  <p>Follow or Start community </p>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <p>No Data</p>
      )}
      <div className={styles.footer}>
        <FooterComponent />
        <span>
          <p>Skopic @ 2021</p>
        </span>
        {/* <a > About |</a> */}

        {/* <Link to={{ pathname: '/About', state: { footerType: 'About' } }}>About |</Link>

                <Link to={{ pathname: '/PrivacyPolicy', state: { footerType: 'PrivacyPolicy' } }}>Privacy |</Link>
                <Link to={{ pathname: '/TermsofService', state: { footerType: 'TermsofService' } }}>Terms |</Link>
                <Link to={{ pathname: '/Blog', state: { footerType: 'Blog' } }}>Blog |</Link>
                <a >
                    Timeline |
                </a>
                <Link to="/Careers">Careers |</Link>
                <a>
                    Contact |
                </a>

                <Link to="/help">Help |</Link>
                <a>
                    Nearby Communities |
                </a>
                <Link to={{ pathname: '/UserGuidelines', state: { footerType: 'UserGuidelines' } }}>User Guidelines  |</Link>


                <Link to="/cookies">Cookies |</Link>


                <span>
                    <p>Skopic @ 2020</p>
                </span> */}
      </div>
    </React.Fragment>
  );
};

export default Homepagesidebar;
