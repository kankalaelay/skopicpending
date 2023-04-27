// import React, { useState, useEffect } from 'react'
import React, { useState, useRef, useEffect, useCallback } from "react";

import Avatar from "@material-ui/core/Avatar";
import saysoutlineimage from "../../Assets/images/noofsays.svg";
import follow from "../../Assets/images/follow.svg";
import unfollow from "../../Assets/images/unfollow.svg";

import dropdownarrow from "../../Assets/images/dropdownarrow.png";
import location from "../../Assets/images/userlocationtag.png";
import dot from "../../Assets/images/dot.png";
import like from "../../Assets/images/like.svg";
import unlike from "../../Assets/images/unlike.svg";

import edit from "../../Assets/images/edit.svg";
import share from "../../Assets/images/share.svg";
import deleteicon from "../../Assets/images/deleteicon.png";
import rating from "../../Assets/images/rating.png";
import privateinvite from "../../Assets/images/privateinvite.png";
import sendanemail from "../../Assets/images/sendemail.svg";
import report from "../../Assets/images/report.svg";

import profileimage from "../../Assets/images/profileimage.png";
import locationpinchildpost from "../../Assets/images/locationpinchildpost.png";

import styles from "../../Assets/css/home/post.module.css";
import feedstyles from "../../Assets/css/home/feedpost.module.css";

import { Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as childSayActions from "../../store/actions/searchactions/childsayActionCreator";
import * as feedactions from "../../store/actions/feedactions/feedActionCreator";
import SimpleDialogDemo from "../Reusuablecomponents/CustomizedDialogs";

import Childsay from "./childsay";
import ReusuableDeleteDialogmodal from "../Reusuablecomponents/ReusuableDeleteModal";
import ReusuableReportDialogmodal from "../Reusuablecomponents/ReusuableReportDialogmodal";
import PostMessageValidation from "../Reusuablecomponents/PostMessageValidation";
import ReusuableSendaMailModal from "../Reusuablecomponents/ReusuableSendaMailModal";
import PrivateTags from "../Moderator/ManageContent/PrivateTags";

const FeedPost = (props) => {
  //for getting user follow or not status
  const followStatusData = useSelector(
    (state) => state.followReducer.followData
  );
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);

  const [isFeed, setFeed] = useState([]);
  const [isFollow, setFollow] = useState("");
  const [isDeletePost, setDeletePost] = useState(false);
  const [isDeletePostId, setDeletePostId] = useState();


  const loader = useRef(null);
  const dispatch = useDispatch();

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (props.data.totalfeedsizeincommunity !== props.data.breadCountLength) {
        if (target.isIntersecting) {
          // dispatch(feedactions.fetchFeedData(`?startlimit=${props.data.breadCountLength}${props.filtertype}`))
          // if(props.listdata)
          // {
          //     setFeed(oldFeed=>[...oldFeed,this.props.listdata])
          //     console.log(isFeed)
          // }
        }
      }
    },
    [props.data]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    if (isDeletePost) {
      // console.log(isDeletePostId)
      document.getElementById(isDeletePostId).style.display = "none";
    }
  }, [isDeletePost]);

  var followstatusparams = "";
  var likestatusparams = "";
  var childsayid;

  const onSayClick = (id, e) => {
    childsayid = `childsay${id}`;
    e.preventDefault();
    if (document.getElementById(childsayid).style.display === "block") {
      document.getElementById(childsayid).style.display = "none";
    } else {
      dispatch(childSayActions.fetchChildSayData(`?id=${id}`));

      document.getElementById(childsayid).style.display = "block";
    }
  };
  //to perfor this follow unfollow actions
  const followunfollow = (id, followstatus) => {
    var followid = `1${id}`;
    var unfollowid = `0${id}`;
    // let FeedDataDelete = `FeedDataDelete${id}`
    if (followstatus === "isFollow=1") {
      document.getElementById(followid).style.display = "none";
      document.getElementById(unfollowid).style.display = "block";
      setFollow("followed");
    } else {
      setFollow("unfollowed");
      document.getElementById(unfollowid).style.display = "none";
      document.getElementById(followid).style.display = "block";
      // document.getElementById(FeedDataDelete).style.display = "none"
    }
    followstatusparams = `?messageID=${id}&&${followstatus}`;
    dispatch(feedactions.fetchFollowData(followstatusparams));
  };

  //to perform like option
  const onLikeUnlikeSelection = (id, cache) => {
    var likedid = `like${id}`;
    var unlikedid = `unlike${id}`;
    var countid = `uncount${id}`;
    var likedcountid = `counted${id}`;

    // console.log(countid, "", likedcountid)

    if (cache === "cacheUpdate") {
      document.getElementById(likedid).style.display = "none";
      document.getElementById(unlikedid).style.display = "block";
      // document.getElementById(countid).style.display = "none"
      // document.getElementById(likedcountid).style.display = "block"
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

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";
  // var profileimagelocalPath = "http://localhost:8080/skopicimage";

  return (
    <React.Fragment>
      <div id="feedScroll">
        {props.data &&
        Object.keys(props.data).length !== 0 &&
        userDetails &&
        Object.keys(userDetails).length !== 0 ? (
          props.listdata ? (
            props.listdata.map((result) =>
              props.value === 1 ? (
                result.followStatus === "Y" ||
                result.followStatus === "inactive" ? (
                  //this is for following data
                  <div
                    className={styles.post}
                    key={`followingfeed${result.id}`}
                    id={`FeedDataDelete${result.id}`}
                  >
                    <div className={styles.avatardetails}>
                      <div className={styles.avatardetails}>
                        <Avatar
                          src={`${profileImagePath}${result.mainuserdata.uimage}`}
                          className={styles.avatar}
                          variant="square"
                        />
                        <div>
                          <span className={feedstyles.profilename}>
                            {result.mainuserdata.displayName}
                            {
                              <div className={feedstyles.profilehover}>
                                <div
                                  className={
                                    feedstyles.profilehoverimageandcount
                                  }
                                >
                                  <Avatar
                                    src={`${profileImagePath}${result.mainuserdata.uimage}`}
                                    className={styles.avatar}
                                  />
                                  <div>
                                    <p className={feedstyles.profilehovername}>
                                      {result.mainuserdata.displayName}
                                    </p>
                                    <p className={feedstyles.profilecount}>
                                      ASK {result.mainuserdata.askcount} | SAY{" "}
                                      {result.mainuserdata.saycount} | UPDATE{" "}
                                      {result.mainuserdata.updatecount} | TAG{" "}
                                      {result.mainuserdata.hashtagcount}
                                    </p>
                                  </div>
                                </div>
                                <p className={feedstyles.profilehovername}>
                                  {result.mainuserdata.shortBio}
                                </p>
                              </div>
                            }
                          </span>
                          {result.locName ? (
                            <div className={styles.locationandtime}>
                              <span className={feedstyles.profiletime}>
                                {result.Message_Time}
                              </span>{" "}
                              <span className={styles.locationDet}>
                                <img src={location} alt="location" />
                                {result.locName}
                              </span>
                            </div>
                          ) : (
                            <div className={styles.locationandtime}>
                              <span className={feedstyles.profiletime}>
                                {result.Message_Time}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={feedstyles.feeddropdown}>
                        <button className={feedstyles.feeddropdownbutton}>
                          <img src={dropdownarrow} alt="dropdown" />
                        </button>
                        <div className={feedstyles.feeddropdownlinks}>
                          {result.message_type === "A" ||
                          result.Keyword_ID === "OpenASK" ||
                          result.message_type === "H" ||
                          result.Keyword_ID === "hashTAG" ||
                          result.message_type === "X" ||
                          result.message_type === "I" ||
                          result.message_type === "S" ||
                          result.Keyword_ID === "impupdate" ||
                          result.Keyword_ID === "OpenSAY" ? (
                            result.User_ID !== userDetails.userData.User_ID &&
                            userDetails.userData.moderatorStatus === "0" ? (
                              <ul className={feedstyles.askdropdown}>
                                <li>
                                  <span>
                                    {/* <img src={report} />  */}
                                    {/* Report */}
                                    <ReusuableReportDialogmodal
                                      id={result.id}
                                      param={"AskorSay"}
                                    />
                                  </span>
                                </li>
                                <li>
                                  {/* <span> <img src={sendanemail} /> Send email to {result.displayName} </span> */}
                                  <ReusuableSendaMailModal
                                    displayName={
                                      result.mainuserdata.displayName
                                    }
                                    id={result.id}
                                  />
                                </li>
                                {result.message_type === "H" ||
                                result.Keyword_ID === "hashTAG" ||
                                result.message_type === "X" ? (
                                  <li>
                                    <span>
                                      <img src={rating} />
                                      Ratings
                                    </span>
                                  </li>
                                ) : null}
                              </ul>
                            ) : userDetails.userData.moderatorStatus === "1" &&
                              result.User_ID !==
                                userDetails.userData.User_ID ? (
                              <ul>
                                <li>
                                  <span>
                                    {/* <img src={deleteicon} /> */}
                                    <ReusuableDeleteDialogmodal
                                      type={result.Keyword_ID}
                                      id={result.id}
                                      setDeletePost={setDeletePost}
                                      setDeletePostId={setDeletePostId}
                                    />
                                  </span>
                                </li>
                                <li>
                                  {/* <span> <img src={sendanemail} /> Send email to {result.displayName} </span> */}
                                  <ReusuableSendaMailModal
                                    displayName={
                                      result.mainuserdata.displayName
                                    }
                                    id={result.id}
                                  />
                                </li>
                                {result.message_type === "H" ||
                                result.Keyword_ID === "hashTAG" ||
                                result.message_type === "X" ? (
                                  <li>
                                    <span>
                                      <img src={rating} />
                                      Ratings
                                    </span>
                                  </li>
                                ) : null}
                              </ul>
                            ) : (
                              <ul>
                                {result.message_type === "H" ||
                                result.Keyword_ID === "hashTAG" ? (
                                  <li>
                                    <span>
                                      {" "}
                                      <img src={share} /> Share
                                    </span>
                                  </li>
                                ) : null}
                                <li>
                                  <a onClick={() => onEditSelection(result.id)}>
                                    <img src={edit} />
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <span>
                                    {/* <img src={deleteicon} /> */}
                                    <ReusuableDeleteDialogmodal
                                      type={result.Keyword_ID}
                                      id={result.id}
                                      setDeletePost={setDeletePost}
                                      setDeletePostId={setDeletePostId}
                                    />
                                  </span>
                                </li>
                              </ul>
                            )
                          ) : (
                            //                     :
                            //                     (result.message_type === "H" || result.Keyword_ID === "hashTAG")
                            //                         ?
                            //                         <ul>
                            //                             <li>
                            //                                 <span> <img src={share} /> Share</span>

                            //                             </li>
                            //                             <li>
                            //                                 <span>
                            //                                     <img src={rating} />
                            //    Ratings
                            //    </span>
                            //                             </li>

                            //                             <li>
                            //                                 <a onClick={() => onEditSelection(result.id)}>
                            //                                     <img src={edit} />
                            //    Edit
                            //     </a>
                            //                             </li>
                            //                             <li>
                            //                                 <span>
                            //                                     {/* <img src={deleteicon} /> */}
                            //                                     <ReusuableDeleteDialogmodal type={"tag"} id={result.id} />
                            //                                 </span>
                            //                             </li>

                            //                         </ul>

                            //                         :
                            //                         ((result.message_type === "I" || result.message_type === "S" || result.Keyword_ID === "impupdate" || result.Keyword_ID === "OpenSAY") && result.User_ID === userDetails.userData.User_ID)
                            //                             ?
                            //                             <ul>
                            //                                 <li>
                            //                                     <a onClick={() => onEditSelection(result.id)}>
                            //                                         <img src={edit} />
                            //    Edit
                            //     </a>
                            //                                 </li>
                            //                                 <li>
                            //                                     <a>
                            //                                         {/* <img src={deleteicon} /> */}
                            //                                         {
                            //                                             (result.Keyword_ID === "OpenSAY" || result.Keyword_ID === "S")
                            //                                                 ?
                            //                                                 <ReusuableDeleteDialogmodal type={"SAY"} id={result.id} />
                            //                                                 :
                            //                                                 <ReusuableDeleteDialogmodal type={"Update"} id={result.id} />

                            //                                         }
                            //                                     </a>
                            //                                 </li>

                            //                             </ul>
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className={feedstyles.messagehidden}
                        dangerouslySetInnerHTML={{ __html: result.Message }}
                        id={`hide${result.id}`}
                      ></p>
                      {/* <textarea className={feedstyles.edittextarea}>{result.Message}</textarea> */}
                      <span
                        className={feedstyles.edittextarea}
                        id={`edittext${result.id}`}
                      >
                        <PostMessageValidation
                          id={result.id}
                          Message={result.Message}
                          messageType={"feedTextArea"}
                          filtertype={props.filtertype}
                        />
                      </span>
                    </div>
                    <div className={styles.followerandcount}>
                      {result.message_type === "A" ||
                      result.Keyword_ID === "OpenASK" ||
                      result.message_type === "H" ||
                      result.Keyword_ID === "hashTAG" ? (
                        <div>
                          <SimpleDialogDemo
                            followCount={result.followCount}
                            followData={result.follweduserprofile}
                            id={result.id}
                          />

                          {/* <a className={styles.followcount} onClick={()=>onFollowersSelection()}>{result.followCount} followers</a> */}
                        </div>
                      ) : result.voteUp ? (
                        <div>
                          <SimpleDialogDemo
                            voteUp={result.voteUp}
                            id={result.id}
                            likesData={result.likeduserprofile}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.followcount}>
                            {result.voteUp} likes
                          </span>
                        </div>
                      )}
                      {result.message_type === "A" ||
                      result.Keyword_ID === "OpenASK" ? (
                        <div className={styles.askcount}>
                          {result.childcotentreadcount}
                        </div>
                      ) : result.message_type === "S" ||
                        result.Keyword_ID === "OpenSAY" ? (
                        <div className={styles.saycount}></div>
                      ) : result.message_type === "I" ||
                        result.Keyword_ID === "impupdate" ? (
                        <div className={styles.updatecount}></div>
                      ) : result.message_type === "H" ||
                        result.Keyword_ID === "hashTAG" ||
                        result.message_type === "X" ? (
                        <div className={styles.tagcount}>
                          {result.childcotentreadcount}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <Divider variant="fullWidth" />
                    {result.message_type === "A" ||
                    result.message_type === "H" ||
                    result.message_type === "X" ||
                    result.Keyword_ID === "OpenASK" ||
                    result.Keyword_ID === "hashTAG" ? (
                      <div className={styles.saysandfollow}>
                        <div className={styles.noOfsays}>
                          <a onClick={(e) => onSayClick(result.id, e)}>
                            <img src={saysoutlineimage} alt="numberof says" />
                            {/* <img src-={dots} alt="saysdots"/> */}

                            {result.sayCount === 1 || result.postCount === 1 ? (
                              <span>{result.sayCount} SAY</span>
                            ) : (
                              <span>{result.sayCount} SAYs</span>
                            )}
                          </a>
                        </div>
                        {result.followStatus === "inactive" ? (
                          <>
                            <div
                              className={`${feedstyles.noOffollows}`}
                              id={`1${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(result.id, "isFollow=1")
                                }
                              >
                                <img src={follow} alt="follow" />
                                <span>Follow</span>
                              </a>
                            </div>
                            <div
                              className={`${styles.noOffollows} ${feedstyles.unfollowdisplay} `}
                              id={`0${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(result.id, "isFollow=0")
                                }
                              >
                                <img src={unfollow} alt="unfollow" />
                                <span>UnFollow</span>
                              </a>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={`${styles.noOffollows} `}
                              id={`0${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(result.id, "isFollow=0")
                                }
                              >
                                <img src={unfollow} alt="unfollow" />
                                <span>UnFollow</span>
                              </a>
                            </div>
                            <div
                              className={`${feedstyles.noOffollows} ${feedstyles.followdisplay}`}
                              id={`1${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(result.id, "isFollow=1")
                                }
                              >
                                <img src={follow} alt="follow" />
                                <span>Follow</span>
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className={styles.likeunlike}>
                        {result.UserLikeStatus === "Active" ? (
                          <>
                            <a
                              onClick={() =>
                                onLikeUnlikeSelection(result.id, "cacheUpdate")
                              }
                              id={`like${result.id}`}
                            >
                              <img src={like} alt="like" />
                              Like
                            </a>
                            <a
                              className={feedstyles.likedisplay}
                              id={`unlike${result.id}`}
                            >
                              <img src={unlike} alt="unlike" />
                              Like
                            </a>
                          </>
                        ) : (
                          <a>
                            <img src={unlike} alt="unlike" />
                            Like
                          </a>
                        )}
                      </div>
                    )}
                    {/* .......................childsaydata ......................*/}

                    <div
                      className={styles.childsayselection}
                      id={`childsay${result.id}`}
                    >
                      <PostMessageValidation
                        id={result.id}
                        type={"childSay"}
                        userImageSrc={`${profileImagePath}${result.mainuserdata.uimage}`}
                      />

                      {/* <div className={styles.comment}>
                                                <Avatar src={profileimage} variant="square" />

                                                <input className={styles.commentinput} placeholder="Say something..." type="text" />
                                                <a><img src={locationpinchildpost} /></a>
                                            </div>
                                            <div>
                                                <button className={styles.childpost}>POST</button>
                                            </div> */}
                      <Childsay id={result.id} key={result.id} />
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                //this is for all data
                <>
                  <div
                    className={styles.post}
                    key={`allfeed${result.id}`}
                    id={`FeedDataDelete${result.id}`}
                  >
                    <div className={styles.avatardetails}>
                      <div className={styles.avatardetails}>
                        <Avatar
                          src={`${profileImagePath}${result.mainuserdata.uimage}`}
                          className={styles.avatar}
                          variant="square"
                        />
                        <div>
                          <span className={feedstyles.profilename}>
                            {result.mainuserdata.displayName}
                            {
                              <div className={feedstyles.profilehover}>
                                <div
                                  className={
                                    feedstyles.profilehoverimageandcount
                                  }
                                >
                                  <Avatar
                                    src={`${profileImagePath}${result.mainuserdata.uimage}`}
                                    className={styles.avatar}
                                  />
                                  <div>
                                    <p className={feedstyles.profilehovername}>
                                      {result.mainuserdata.displayName}
                                    </p>
                                    <p className={feedstyles.profilecount}>
                                      ASK {result.mainuserdata.askcount} | SAY{" "}
                                      {result.mainuserdata.saycount} | UPDATE{" "}
                                      {result.mainuserdata.updatecount} | TAG{" "}
                                      {result.mainuserdata.hashtagcount}
                                    </p>
                                  </div>
                                </div>
                                <p className={feedstyles.profilehovername}>
                                  {result.mainuserdata.shortBio}
                                </p>
                              </div>
                            }
                          </span>
                          {result.locName ? (
                            <div className={styles.locationandtime}>
                              <span className={feedstyles.profiletime}>
                                {result.Message_Time}
                              </span>{" "}
                              <span className={styles.locationDet}>
                                <img src={location} alt="location" />
                                {result.locName}
                              </span>
                            </div>
                          ) : (
                            <div className={styles.locationandtime}>
                              <span className={feedstyles.profiletime}>
                                {result.Message_Time}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={feedstyles.feeddropdown}>
                        <button className={feedstyles.feeddropdownbutton}>
                          <img src={dropdownarrow} alt="dropdown" />
                        </button>
                        <div className={feedstyles.feeddropdownlinks}>
                          {result.message_type === "A" ||
                          result.Keyword_ID === "OpenASK" ||
                          result.message_type === "H" ||
                          result.Keyword_ID === "hashTAG" ||
                          result.message_type === "X" ||
                          result.message_type === "I" ||
                          result.message_type === "S" ||
                          result.Keyword_ID === "impupdate" ||
                          result.Keyword_ID === "OpenSAY" ? (
                            result.User_ID !== userDetails.userData.User_ID &&
                            userDetails.userData.moderatorStatus === "0" ? (
                              <ul className={feedstyles.askdropdown}>
                                <li>
                                  <span>
                                    {/* <img src={report} />  */}
                                    {/* Report */}
                                    <ReusuableReportDialogmodal
                                      id={result.id}
                                      param={"AskorSay"}
                                    />
                                  </span>
                                </li>
                                <li>
                                  {/* <span> <img src={sendanemail} /> Send email to {result.displayName} </span> */}
                                  <ReusuableSendaMailModal
                                    displayName={
                                      result.mainuserdata.displayName
                                    }
                                    id={result.id}
                                  />
                                </li>
                                {result.message_type === "H" ||
                                result.Keyword_ID === "hashTAG" ||
                                result.message_type === "X" ? (
                                  <li>
                                    <span>
                                      <img src={rating} />
                                      Ratings
                                    </span>
                                  </li>
                                ) : null}
                              </ul>
                            ) : userDetails.userData.moderatorStatus === "1" &&
                              result.User_ID !==
                                userDetails.userData.User_ID ? (
                              <ul>
                                <li>
                                  <span>
                                    {/* <img src={deleteicon} /> */}
                                    <ReusuableDeleteDialogmodal
                                      type={result.Keyword_ID}
                                      id={result.id}
                                      setDeletePost={setDeletePost}
                                      setDeletePostId={setDeletePostId}
                                    />
                                  </span>
                                </li>
                                <li>
                                  {/* <span> <img src={sendanemail} /> Send email to {result.displayName} </span> */}
                                  <ReusuableSendaMailModal
                                    displayName={
                                      result.mainuserdata.displayName
                                    }
                                    id={result.id}
                                  />
                                </li>
                                {result.message_type === "H" ||
                                result.Keyword_ID === "hashTAG" ||
                                result.message_type === "X" ? (
                                  <li>
                                    <span>
                                      <img src={rating} />
                                      Ratings
                                    </span>
                                  </li>
                                ) : null}
                              </ul>
                            ) : (
                              <ul>
                                {result.message_type === "H" ||
                                result.Keyword_ID === "hashTAG" ||
                                result.message_type === "X" ? (
                                  <li>
                                    <span>
                                      {" "}
                                      <img src={share} /> Share
                                    </span>
                                  </li>
                                ) : null}
                                <li>
                                  <a onClick={() => onEditSelection(result.id)}>
                                    <img src={edit} />
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <span>
                                    {/* <img src={deleteicon} /> */}
                                    <ReusuableDeleteDialogmodal
                                      type={result.Keyword_ID}
                                      id={result.id}
                                      setDeletePost={setDeletePost}
                                      setDeletePostId={setDeletePostId}
                                    />
                                  </span>
                                </li>
                              </ul>
                            )
                          ) : (
                            //                     :
                            //                     (result.message_type === "H" || result.Keyword_ID === "hashTAG")
                            //                         ?
                            //                         <ul>
                            //                             <li>
                            //                                 <span> <img src={share} /> Share</span>

                            //                             </li>
                            //                             <li>
                            //                                 <span>
                            //                                     <img src={rating} />
                            //    Ratings
                            //    </span>
                            //                             </li>

                            //                             <li>
                            //                                 <a onClick={() => onEditSelection(result.id)}>
                            //                                     <img src={edit} />
                            //    Edit
                            //     </a>
                            //                             </li>
                            //                             <li>
                            //                                 <span>
                            //                                     {/* <img src={deleteicon} /> */}
                            //                                     <ReusuableDeleteDialogmodal type={"tag"} id={result.id} />
                            //                                 </span>
                            //                             </li>

                            //                         </ul>

                            //                         :
                            //                         ((result.message_type === "I" || result.message_type === "S" || result.Keyword_ID === "impupdate" || result.Keyword_ID === "OpenSAY") && result.User_ID === userDetails.userData.User_ID)
                            //                             ?
                            //                             <ul>
                            //                                 <li>
                            //                                     <a onClick={() => onEditSelection(result.id)}>
                            //                                         <img src={edit} />
                            //    Edit
                            //     </a>
                            //                                 </li>
                            //                                 <li>
                            //                                     <a>
                            //                                         {/* <img src={deleteicon} /> */}
                            //                                         {
                            //                                             (result.Keyword_ID === "OpenSAY" || result.Keyword_ID === "S")
                            //                                                 ?
                            //                                                 <ReusuableDeleteDialogmodal type={"SAY"} id={result.id} />
                            //                                                 :
                            //                                                 <ReusuableDeleteDialogmodal type={"Update"} id={result.id} />

                            //                                         }
                            //                                     </a>
                            //                                 </li>

                            //                             </ul>
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className={feedstyles.messagehidden}
                        dangerouslySetInnerHTML={{ __html: result.Message }}
                        id={`hide${result.id}`}
                      ></p>
                      {/* <textarea className={feedstyles.edittextarea}>{result.Message}</textarea> */}
                      <span
                        className={feedstyles.edittextarea}
                        id={`edittext${result.id}`}
                      >
                        <PostMessageValidation
                          id={result.id}
                          Message={result.Message}
                          messageType={"feedTextArea"}
                          filtertype={props.filtertype}
                        />
                      </span>
                    </div>
                    <div className={styles.followerandcount}>
                      {result.message_type === "A" ||
                      result.Keyword_ID === "OpenASK" ||
                      result.message_type === "H" ||
                      result.Keyword_ID === "hashTAG" ||
                      result.message_type === "X" ? (
                        <div>
                          <SimpleDialogDemo
                            followCount={result.followCount}
                            followData={result.follweduserprofile}
                            id={result.id}
                            status={followStatusData}
                            isFollow={isFollow}
                          />
                        </div>
                      ) : (
                        <div id={result.id}>
                          <SimpleDialogDemo
                            voteUp={result.voteUp}
                            likesData={result.likeduserprofile}
                            id={result.id}
                          />
                        </div>
                      )}
                      {result.message_type === "A" ||
                      result.Keyword_ID === "OpenASK" ? (
                        <div className={styles.askcount}>
                          {result.childcotentreadcount}
                        </div>
                      ) : result.message_type === "S" ||
                        result.Keyword_ID === "OpenSAY" ? (
                        <div className={styles.saycount}></div>
                      ) : result.message_type === "I" ||
                        result.Keyword_ID === "impupdate" ? (
                        // <div className={styles.updatecount}></div>
                        <></>
                      ) : result.message_type === "H" ||
                        result.Keyword_ID === "hashTAG" ||
                        result.message_type === "X" ? (
                        <div className={styles.tagcount}>
                          <p>{result.childcotentreadcount}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <Divider variant="fullWidth" />
                    {result.message_type === "A" ||
                    result.message_type === "H" ||
                    result.message_type === "X" ||
                    result.Keyword_ID === "OpenASK" ||
                    result.Keyword_ID === "hashTAG" ? (
                      <div className={styles.saysandfollow}>
                        <div className={styles.noOfsays}>
                          <a onClick={(e) => onSayClick(result.id, e)}>
                            <img src={saysoutlineimage} alt="numberof says" />
                            {/* <img src-={dots} alt="saysdots"/> */}

                            {result.sayCount === 1 || result.postCount === 1 ? (
                              <span>{result.sayCount} SAY</span>
                            ) : (
                              <span>{result.sayCount} SAYs</span>
                            )}
                          </a>
                        </div>
                        {result.followStatus === "inactive" ||
                        result.followStatus === "N" ? (
                          <>
                            <div
                              className={`${feedstyles.noOffollows}`}
                              id={`1${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(
                                    result.id,
                                    "isFollow=1",
                                    result.followCount
                                  )
                                }
                              >
                                <img src={follow} alt="follow" />
                                <span>Follow</span>
                              </a>
                            </div>
                            <div
                              className={`${styles.noOffollows} ${feedstyles.unfollowdisplay} `}
                              id={`0${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(
                                    result.id,
                                    "isFollow=0",
                                    result.followCount
                                  )
                                }
                              >
                                <img src={unfollow} alt="unfollow" />
                                <span>UnFollow</span>
                              </a>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={`${styles.noOffollows} `}
                              id={`0${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(result.id, "isFollow=0")
                                }
                              >
                                <img src={unfollow} alt="unfollow" />
                                <span>UnFollow</span>
                              </a>
                            </div>
                            <div
                              className={`${feedstyles.noOffollows} ${feedstyles.followdisplay}`}
                              id={`1${result.id}`}
                            >
                              <a
                                className={styles.followtext}
                                onClick={() =>
                                  followunfollow(result.id, "isFollow=1")
                                }
                              >
                                <img src={follow} alt="follow" />
                                <span>Follow</span>
                              </a>
                            </div>
                          </>
                        )}
                        {result.hashTagType === "private" ? (
                          <div className={feedstyles.priavteinvite}>
                            <img src={privateinvite} alt="Private Invite" />
                            <a>Invite</a>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div className={styles.likeunlike}>
                        {result.UserLikeStatus === "Active" ? (
                          <>
                            <a
                              onClick={() =>
                                onLikeUnlikeSelection(result.id, "cacheUpdate")
                              }
                              id={`like${result.id}`}
                            >
                              <img src={like} alt="like" />
                              Like
                            </a>
                            <a
                              className={feedstyles.likedisplay}
                              id={`unlike${result.id}`}
                            >
                              <img src={unlike} alt="unlike" />
                              Like
                            </a>
                          </>
                        ) : (
                          <a>
                            <img src={unlike} alt="unlike" />
                            Like
                          </a>
                        )}
                      </div>
                    )}
                    {/* .......................childsaydata ......................*/}

                    <div
                      className={styles.childsayselection}
                      id={`childsay${result.id}`}
                    >
                      <PostMessageValidation
                        id={result.id}
                        type={"childSay"}
                        userImageSrc={`${profileImagePath}${result.mainuserdata.uimage}`}
                      />
                      {/* <div className={styles.comment}>
                                            <Avatar src={profileimage} variant="square" />

                                            <input className={styles.commentinput} placeholder="Say something..." type="text" />
                                            <a><img src={locationpinchildpost} /></a>
                                        </div>
                                        <div>
                                            <button className={styles.childpost}>POST</button>
                                        </div> */}
                      <Childsay id={result.id} key={result.id} />
                    </div>
                  </div>
                </>
              )
            )
          ) : (
            <p className={feedstyles.nodata}>No data found</p>
          )
        ) : (
          ""
        )}
      </div>
      <div ref={loader} />
      <PrivateTags />
    </React.Fragment>
  );
};

export default FeedPost;
