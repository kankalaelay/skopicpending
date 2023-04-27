import React from "react";
// import styles from '../../Assets/css/home/post.module.css'
import Avatar from "@material-ui/core/Avatar";

// import saysoutlineimage from '../../Assets/images/saysoutline.png'
// import follow from '../../Assets/images/followicon.png'
import dropdownarrow from "../../Assets/images/dropdownarrow.png";
import location from "../../Assets/images/userlocationtag.png";
import dot from "../../Assets/images/dot.png";
import smallike from "../../Assets/images/smallike.png";
// import like from '../../Assets/images/like.png'
import feedstyles from "../../Assets/css/home/feedpost.module.css";
import deleteicon from "../../Assets/images/deleteicon.png";
import edit from "../../Assets/images/edit.png";
import unlike from "../../Assets/images/unlike.png";

import ReusuableDeleteDialogmodal from "../Reusuablecomponents/ReusuableDeleteModal";

import styles from "../../Assets/css/home/post.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as feedactions from "../../store/actions/feedactions/feedActionCreator";
import PostMessageValidation from "../Reusuablecomponents/PostMessageValidation";
import SimpleDialogDemo from "../Reusuablecomponents/CustomizedDialogs";
import { CircularProgress } from "@material-ui/core";

function Childsay(props) {
  const userChildSayData = useSelector(
    (state) => state.childSayReducer.userChildSayData
  );

  const isLoaded = useSelector((state) => state.childSayReducer.isLoaded);

  // const [isliked, setLiked] = React.useState(false)
  // var profileimagelocalPath = "http://localhost:8080/skopicimage";
  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";
  const dispatch = useDispatch();
  var likestatusparams = "";

  const onChildLikeUnlikeSelection = (id, cache) => {
    let likedid = `00${id}`;
    let unlikedid = `01${id}`;
    // console.log(likedid,"",unlikedid)

    if (cache === "cacheUpdate") {
      document.getElementById(likedid).style.display = "none";
      document.getElementById(unlikedid).style.display = "block";
      // setLiked(true)
    }
    likestatusparams = `?id=${id}&&cacheStatus=${cache}`;
    dispatch(feedactions.fetchVoteUpStatus(likestatusparams));
  };

  const onEditSelection = (id) => {
    let editTextArea = `edittext${id}`;
    let hideOriginalMessage = `hide${id}`;

    if (document.getElementById(editTextArea).style.display === "block") {
      document.getElementById(editTextArea).style.display = "none";
      document.getElementById(hideOriginalMessage).style.display = "block";
    } else {
      document.getElementById(editTextArea).style.display = "block";
      document.getElementById(hideOriginalMessage).style.display = "none";
    }
  };

  return (
    <React.Fragment>
      {isLoaded ? (
        userChildSayData && Object.keys(userChildSayData).length !== 0 ? (
          userChildSayData.childSAYsMessageList ? (
            userChildSayData.childSAYsMessageList.map((childresult) => (
              <div key={`childSayKey${childresult.id}`} id={childresult.id}>
                <div className={styles.postedcomment}>
                  <Avatar
                    src={`${profileImagePath}${childresult.uimage}`}
                    variant="square"
                    className={styles.childsayprofileimage}
                  />

                  <div className={styles.profileimagetext}>
                    <div className={styles.childsaysprofileandfdropdown}>
                      <span className={feedstyles.profilename}>
                        {childresult.mainuserdata.displayName}
                        {
                          <div className={feedstyles.profilehover}>
                            <div
                              className={feedstyles.profilehoverimageandcount}
                            >
                              <Avatar
                                src={`${profileImagePath}${childresult.mainuserdata.uimage}`}
                                className={styles.avatar}
                              />
                              <div>
                                <p className={feedstyles.profilehovername}>
                                  {childresult.mainuserdata.displayName}
                                </p>
                                <p className={feedstyles.profilecount}>
                                  ASK {childresult.mainuserdata.askcount} | SAY{" "}
                                  {childresult.mainuserdata.saycount} | UPDATE{" "}
                                  {childresult.mainuserdata.updatecount} | TAG{" "}
                                  {childresult.mainuserdata.hashtagcount}
                                </p>
                              </div>
                            </div>
                            <p className={feedstyles.profilehovername}>
                              {childresult.mainuserdata.shortBio}
                            </p>
                          </div>
                        }
                      </span>

                      <div className={feedstyles.feeddropdown}>
                        <button
                          className={`${feedstyles.feeddropdownbutton} ${styles.childsaydropdowwbutton}`}
                        >
                          <img src={dropdownarrow} alt="dropdown" />
                        </button>
                        <div className={feedstyles.feeddropdownlinks}>
                          <ul>
                            <li>
                              {/* <span>
                                                        <img src={edit} />
                                            Edit
                                                </span> */}
                              <a
                                onClick={() => onEditSelection(childresult.id)}
                              >
                                <img src={edit} />
                                Edit
                              </a>
                            </li>
                            <li>
                              <span>
                                <ReusuableDeleteDialogmodal
                                  type={"SAY"}
                                  id={childresult.id}
                                />
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className={styles.childsaytextandcolorlabel}>
                      <div>
                        <p id={`hide${childresult.id}`}>
                          {childresult.Message}
                        </p>
                        <span
                          className={feedstyles.edittextarea}
                          id={`edittext${childresult.id}`}
                        >
                          <PostMessageValidation
                            id={childresult.id}
                            Message={childresult.Message}
                            messageType={"feedTextArea"}
                          />
                        </span>
                      </div>
                      <div className={styles.childsaycount}>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.likeandlikecount}>
                  <span className={styles.spandisplay}>
                    <div className={styles.likeunlike}>
                      {childresult.UserLikeStatus === "Active" ? (
                        <>
                          <a
                            onClick={() =>
                              onChildLikeUnlikeSelection(
                                childresult.id,
                                "cacheUpdate"
                              )
                            }
                            id={`00${childresult.id}`}
                          >
                            <img src={smallike} alt="smalllike" />
                            Like
                          </a>
                          <a
                            className={feedstyles.childlikedisplay}
                            id={`01${childresult.id}`}
                          >
                            <img src={unlike} alt="unlike" />
                            Like
                          </a>
                        </>
                      ) : (
                        <a className={feedstyles.childUnlike}>
                          <img src={unlike} alt="unlike" />
                          Like
                        </a>
                      )}
                    </div>
                    <img src={dot} alt="dot" className={styles.dot} />
                    <div>
                      {childresult.voteUp !== 0 ? (
                        <SimpleDialogDemo
                          voteUp={childresult.voteUp}
                          id={childresult.id}
                          isVoteup={"true"}
                        />
                      ) : (
                        <span className={styles.followcount}>
                          {childresult.voteUp} likes
                        </span>
                      )}
                    </div>
                    {/* <a className={styles.nooflikes}>{childresult.voteUp} like</a> */}
                  </span>

                  <span className={styles.spandisplay}>
                    <p className={styles.childsaytime}>
                      {childresult.Message_Time}
                    </p>
                    <span className={styles.locationandtime}>
                      {childresult.locName ? (
                        <>
                          <img src={dot} alt="dot" />
                          <img src={location} alt="location" />
                        </>
                      ) : (
                        ""
                      )}
                      {childresult.locName}
                    </span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No Say Data</p>
          )
        ) : (
          <p>No Say Data</p>
        )
      ) : (
        <CircularProgress className={feedstyles.Loader} />
      )}
    </React.Fragment>
  );
}

export default Childsay;
