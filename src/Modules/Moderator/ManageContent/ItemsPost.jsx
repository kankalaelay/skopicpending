import React, { useState, useEffect } from "react";
import style from "../../../Assets/css/Moderator/Itempost.module.css";
import ProfilePic from "../../../Assets/images/profileimage.png";
import LocationPin from "../../../Assets/images/locationpinchildpost.png";
import axios from "axios";
import * as Cookies from "js-cookie";
import { set } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import * as ActionItems from "./ActionItems";
import * as ActionItemsData from "../../../store/reducer/ModeratorReducer/ModeratorReducer";

const ItemPost = (props) => {
  const [data, setData] = useState("");

  const dispatch = useDispatch();
  let ActionItemsData = useSelector(
    (state) => state.ModeratorReducer.moderatingCommunitysData
  );
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);

  const config = {
    headers: {
      "content-type": "x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Set-Cookie": Cookies.get("JSESSIONID"),
    },
    withCredentials: true,
  };
  let serverImageURL = "http://dev.skopic.com:9090/skopicimage/";

  const approveAction = (msgId, value, id, userId, index) => {
    let messageType = "";
    let paramValue = messageType;

    if (value === "Message") {
      messageType = "msg";
    } else if (value === "New moderator") {
      messageType = "user";
    } else if (value === "Request to unblock community") {
      messageType = "unblockReq";
    } else if (value === "Request to follow community") {
      messageType = "followreq";
    }
    if (messageType === "user" || messageType === "unblockReq") {
      paramValue = messageType + "_" + userId + "_" + id + "_" + "1";
    } else {
      paramValue = messageType + "_" + msgId + "_" + "1";
    }

    let formData = new FormData();
    formData.append("approveIds", paramValue);
    axios.post(
      `http://dev.skopic.com:9090/skopicportal/jsonuser/moderatorApproveDeny`,
      formData,
      config
    );

    let updatedPostData = [...data];
    updatedPostData.splice(index, 1);
    setData(updatedPostData);
  };

  const disapproveAction = (msgId, value, id, userId, index) => {
    let messageType = "";
    let paramValue = messageType;
    if (value === "Message") {
      messageType = "msg";
    } else if (value === "New moderator") {
      messageType = "user";
    } else if (value === "Request to unblock community") {
      messageType = "unblockReq";
    } else if (value === "Request to follow community") {
      messageType = "followreq";
    }
    if (messageType === "user" || messageType === "unblockReq") {
      paramValue = messageType + "_" + userId + "_" + id + "_" + "0";
    } else {
      paramValue = messageType + "_" + msgId + "_" + "0";
    }
    let formData = new FormData();
    formData.append("approveIds", paramValue);
    axios.post(
      `http://dev.skopic.com:9090/skopicportal/jsonuser/moderatorApproveDeny`,
      formData,
      config
    );

    let updatedPostData = [...data];
    updatedPostData.splice(index, 1);
    setData(updatedPostData);
  };

  const IngnoreAction = (id, index) => {
    let messageType = "abs";
    let paramValue = messageType + "_" + id + "_" + "1";
    let formData = new FormData();
    formData.append("approveIds", paramValue);
    axios.post(
      `http://dev.skopic.com:9090/skopicportal/jsonuser/moderatorApproveDeny`,
      formData,
      config
    );

    let updatedPostData = [...data];
    updatedPostData.splice(index, 1);
    setData(updatedPostData);
  };

  const RemoveAction = (id, index) => {
    let messageType = "abs";
    let paramValue = messageType + "_" + id + "_" + "0";
    let formData = new FormData();
    formData.append("approveIds", paramValue);
    axios.post(
      `http://dev.skopic.com:9090/skopicportal/jsonuser/moderatorApproveDeny`,
      formData,
      config
    );

    let updatedPostData = [...data];
    updatedPostData.splice(index, 1);
    setData(updatedPostData);
  };

  return (
    <>
      {ActionItemsData && ActionItemsData.length !== 0
        ? ActionItemsData.restrictions.map((result, i) => (
            <div className={style.ItemPost} key={i}>
              {result.category === "Report abuse" ? (
                <div className={style.PostInfo}>
                  <div className={style.PostProfile}>
                    <div className={style.PostProfileImage}>
                      <img
                        src={`${serverImageURL}${result.createdByImage}`}
                        alt="ProfilePic"
                      />
                    </div>
                    <div className={style.PostProfileInfo}>
                      <h6 className={style.PostName}>{result.createdByName}</h6>
                      <span className={style.PostTime}>
                        {result.createdDate}
                      </span>
                      {result.locName === "" ? null : (
                        <>
                          &#8226;
                          <span className={style.PostLoacation}>
                            <img src={LocationPin} alt="LocationIcon" />
                            {result.locName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={style.PosReportInfo}>
                    <p>
                      Reported by<b> {result.displayName}</b>{" "}
                      {result.reason !== null ? (
                        <span>
                          as <b>{result.reason}</b>
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={style.PostProfile}>
                  <div className={style.PostProfileImage}>
                    <img
                      src={`${serverImageURL}${result.userImage}`}
                      alt="ProfilePic"
                    />
                  </div>
                  <div className={style.PostProfileInfo}>
                    <h6 className={style.PostName}>{result.displayName}</h6>
                    <span className={style.PostTime}>{result.createdDate}</span>
                    {result.locName === "" ? null : (
                      <>
                        &#8226;
                        <span className={style.PostLoacation}>
                          <img src={LocationPin} alt="LocationIcon" />
                          {result.locName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className={style.Message}>
                <p dangerouslySetInnerHTML={{ __html: result.message }}></p>
                {result.Keyword_ID == "OpenASK" ? (
                  <sapn className={style.PostIdendiferASK}></sapn>
                ) : result.Keyword_ID == "OpenSAY" ||
                  result.messageType == "#SAY" ? (
                  <sapn className={style.PostIdendiferSAY}></sapn>
                ) : result.Keyword_ID == "impupdate" ? (
                  <sapn className={style.PostIdendiferUPDATE}></sapn>
                ) : result.Keyword_ID == "hashTAG" ? (
                  <span className={style.PostIdendiferTAG}></span>
                ) : null}
              </div>
              <hr />

              <div className={style.PostActionItems}>
                <div className={style.PostActionButtons}>
                  {result.category == "Report abuse" ? (
                    <>
                      <button
                        className={style.PostButton}
                        onClick={() => IngnoreAction(result.messageId, i)}
                      >
                        Ignore{" "}
                      </button>{" "}
                      <button
                        className={style.PostButton}
                        onClick={() => RemoveAction(result.messageId, i)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={style.PostButton}
                        onClick={() =>
                          approveAction(
                            result.messageId,
                            result.category,
                            result.tenantId,
                            result.userId,
                            i
                          )
                        }
                      >
                        Allow
                      </button>{" "}
                      <button
                        className={style.PostButton}
                        onClick={() =>
                          disapproveAction(
                            result.messageId,
                            result.category,
                            result.tenantId,
                            result.userId,
                            i
                          )
                        }
                      >
                        Deny
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};
export default ItemPost;
