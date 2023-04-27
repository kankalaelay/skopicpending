import React, { useState } from "react";
// import profileImg from "../../Assets/images/profileImg.png"
import Edit from "../../Assets/images/edit.png";
import Delete from "../../Assets/images/deleteicon.png";
// import Paper from "../../Assets/images/paper.svg"
import DownArrow from "../../Assets/images/UpButton.png";
// import dot from "../../Assets/images/dot.png";
// import location from "../../Assets/images/userlocationtag.png";
import saysoutlineimage from "../../Assets/images/saysoutline.png";
import follow from "../../Assets/images/followicon.png";
import unfollow from "../../Assets/images/unfollowtagicon.png";
import like from "../../Assets/images/like.png";
import unlike from "../../Assets/images/unlike.png";
import * as feedactions from "../../store/actions/feedactions/feedActionCreator";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import ChildSay from "./Activites/ChildSay";

function ActivityPost(props) {
  const dispatch = useDispatch();
  let profileImagePath = "http://dev.skopic.com:9090/skopicimage";
  const [currentId, setCurrentId] = useState(-10);
  const [editId, setEditID] = useState(-10);
  const [childSayId, setChildSayId] = useState(-10);
  const openDropdwn = (id) => {
    let newId = id === currentId ? -10 : id;
    setCurrentId(newId);
  };
  const followunfollow = (id, followstatus, fcount) => {
    props.updateList(id, followstatus);
    let followstatusparams = `?messageID=${id}&&${followstatus}`;
    dispatch(feedactions.fetchFollowData(followstatusparams));
  };

  const onLikeUnlikeSelection = (id, cache) => {
    props.likeUnlike(id);
    let likestatusparams = `?id=${id}&&cacheStatus=${cache}`;
    dispatch(feedactions.fetchVoteUpStatus(likestatusparams));
  };
  const updateMessage = (id, message) => {
    props.updateMessage(id, message);
    cancelEdit();
  };
  const cancelEdit = () => {
    setEditID(-10);
  };
  // console.log(props.listData)
  return (
    <>
      {props.listData.map((result) => (
        <div className="post-1" key={result.id}>
          <div className="profile-info">
            {result.Keyword_ID === "hashTagFollow" ? (
              <>
                <img
                  src={`${profileImagePath}${result.uimage}`}
                  alt="profileImage"
                />
                <div>
                  <p>{result.displayName}</p>
                  <span className="MessgeDetils">
                    {result.Message_Time} in {result.Tenant_name}
                    {/* {(result.locName==="")?null: result.locName} */}
                  </span>
                </div>
              </>
            ) : (
              <>
                <img
                  src={`${profileImagePath}${result.userDetails.uimage}`}
                  alt="profileImage"
                />
                <div>
                  <p>{result.userDetails.displayName}</p>
                  <span className="MessgeDetils">
                    {result.Message_Time} in {result.Tenant_name}
                    {/* {(result.locName==="")?null: result.locName} */}
                  </span>
                </div>
              </>
            )}

            <img
              src={DownArrow}
              alt="DownArrow"
              className="postsDownArrow"
              onClick={() => {
                openDropdwn(result.id);
              }}
            />
            {currentId === result.id && (
              <div className="inner-dropdown">
                <div
                  onClick={() => {
                    setEditID(result.id);
                    setCurrentId(-10);
                  }}
                >
                  <img src={Edit} alt="Editpng" />
                  Edit the post
                </div>
                <div
                  onClick={() =>
                    props.delete ? props.delete(result.id) : null
                  }
                >
                  <img src={Delete} alt="Editpng" />
                  Delete this post
                </div>
              </div>
            )}
          </div>

          <div className="discrpition">
            {/* <span dangerouslySetInnerHTML={{ __html: result.Message }} /> */}
            <EditMessage
              editId={editId}
              id={result.id}
              message={result.Message}
              updateMessage={updateMessage}
              cancelEdit={cancelEdit}
            />
          </div>

          <div className="PostCounts">
            {result.Keyword_ID === "hashTagFollow" ||
            result.Keyword_ID === "actASK" ? (
              <>
                {" "}
                <span className="PostCounts--Follow">
                  {result.followCount} followers{" "}
                </span>
              </>
            ) : (
              <>
                {" "}
                <span>{result.voteUp} Likes</span>
              </>
            )}
          </div>
          <div className="PostActions">
            {result.Keyword_ID === "hashTagFollow" ||
            result.Keyword_ID === "actASK" ? (
              <>
                <div className="PostActions--Following">
                  <div
                    style={{ cursor: "pointer", marginTop: "5px" }}
                    onClick={() =>
                      setChildSayId(result.id === childSayId ? -10 : result.id)
                    }
                  >
                    <img src={saysoutlineimage} alt="ChildSay" />{" "}
                    {result.sayCount} SAY
                  </div>
                  <div style={{ cursor: "pointer", marginTop: "5px" }}>
                    {result.followStatus === "Active" ||
                    result.followStatus === "Y" ? (
                      <div id={`1${result.id}`}>
                        <img src={unfollow} alt="UnFolow" />
                        <span
                          onClick={() =>
                            followunfollow(result.id, "isFollow=0")
                          }
                        >
                          UnFollow{" "}
                        </span>
                      </div>
                    ) : (
                      <div id={`0${result.id}`}>
                        <img src={follow} alt="Folow" />
                        <span
                          onClick={() =>
                            followunfollow(result.id, "isFollow=1")
                          }
                        >
                          {" "}
                          Follow{" "}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      textTransform: "none",
                      color: "#000",
                      border: "none",
                    }}
                    variant="outlined"
                    startIcon={
                      result.UserLikeStatus === "Active" ? (
                        <img src={like} alt="Unlike" />
                      ) : (
                        <img src={unlike} alt="Like" />
                      )
                    }
                    onClick={() =>
                      result.UserLikeStatus === "Active"
                        ? onLikeUnlikeSelection(result.id, "cacheUpdate")
                        : null
                    }
                  >
                    Like
                  </Button>
                </div>
              </>
            )}
          </div>
          {childSayId === result.id && <ChildSay item={result} />}
        </div>
      ))}
    </>
  );
}

const EditMessage = (props) => {
  const [message, setMessage] = useState(props.message);
  const { editId, id, updateMessage, cancelEdit } = props;
  return (
    <>
      {editId === id ? (
        <>
          <textarea
            defaultValue={message}
            style={{ width: "100%" }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            onClick={() => updateMessage(id, message)}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={cancelEdit}>
            Cancel
          </Button>
        </>
      ) : (
        <Typography>{message}</Typography>
      )}
    </>
  );
};

export default ActivityPost;
