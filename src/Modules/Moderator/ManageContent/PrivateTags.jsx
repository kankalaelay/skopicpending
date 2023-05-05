import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as moderatorActions from "../../../store/actions/Moderator/moderatoractions";
import { useState } from "react";
import styles from "../../../Assets/css/home/post.module.css";
import follow from "../../../Assets/images/follow.svg";
import unfollow from "../../../Assets/images/unfollow.svg";
import feedstyles from "../../../Assets/css/home/feedpost.module.css";

import ProfilePic from "../../../Assets/images/profileimage.png";
import LocationPin from "../../../Assets/images/locationpinchildpost.png";
import axios from "axios";
import * as Cookies from "js-cookie";
import like from "../../../Assets/images/like.svg";
import unlike from "../../../Assets/images/unlike.svg";

import style from "../../../Assets/css/Moderator/Managemembes.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ConfirmDialogDemo from "../ReusableModeratorComponents/Blockmembersmodal";
import * as childSayActions from "../../../store/actions/searchactions/childsayActionCreator";
import * as feedactions from "../../../store/actions/feedactions/feedActionCreator";
import PrivateTagsReducer from "../../../store/reducer/ModeratorReducer/PrivateTagsReducer";
import { styled } from "@mui/material/styles";
import { Typography, Avatar, Divider, Button } from "@mui/material";
import ChildSay from "../../Activity/Activites/ChildSay";
import ActivityPost from "../../Activity/ActivityPost";

const Container = styled("div")({
  backgroundColor: "#fff",
  margin: "20px",
  borderRadius: "20px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
});

const Status = styled("div")({
  width: "12px",
  height: "12px",
  borderRadius: "12px",
  alignSelf: "flex-end",
  marginBottom: "6px",
});

const UserName = styled("Typography")({
  fontSize: "16px",
  fontWeight: "700",
});

const MessageTime = styled("Typography")({
  fontSize: "12px",
});

const NameContainer = styled("div")({
  flex: 1,
  flexDirection: "column",
  display: "flex",
});

const PrivateTags = () => {
  const [isFeed, setFeed] = useState([]);
  const [isFollow, setFollow] = useState("");
  const [Message, setMessage] = useState("");
  const [editId, seteditId] = useState(-10);
  const [followingid, setfollowingId] = useState("");

  const [isOpen, setIsOpen] = useState();

  var followstatusparams = "";
  var likestatusparams = "";

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

  const data =
    useSelector((state) => state.PrivateTagsReducer.PrivateTagsData) || [];
  console.log("Data: ", data);
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);

  const { userData } = userDetails;

  // console.log(userData.tenantId)
  const dispatch = useDispatch();

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length !== 0) {
      dispatch(
        moderatorActions.fetchPrivateTagsData(
          `tenantID=${userDetails.userData.tenantId}&limiter=pri&startlimit=10`
        )
      );
    }
  }, []);

  //  data is in crossword 206 id

  const [isBreadCount, setBreadCount] = useState(0);

  useEffect(() => {
    // setBreadCount(data.prevBreadLength)
  });

  var childsayid = "";
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

  const followunfollow = (id, followstatus) => {
    // props.updateList(id, followstatus);
    let followstatusparams = `?messageID=${id}&&${followstatus}`;
    dispatch(feedactions.fetchFollowData(followstatusparams));
  };

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
  // <p>{data?.PrivateTagsData?.privateTagList[0]?.displayName}</p>
  //  <p>{data?.PrivateTagsData?.privateTagList[0]?.Message}</p>

  const currStatus = (status) => {
    switch (status) {
      case "A":
        return { color: "green", status: "Approved" };
      default:
        return { color: "red", status: "Rejected" };
    }
  };

  return (
    <>
      {data.map((item) => (
        <Container>
          <div style={{ display: "flex" }}>
            <Avatar
              src={`${profileImagePath}${item.msg_usr_image_s}`}
              className={styles.avatar}
              variant="square"
            />
            <NameContainer>
              <UserName>{item.displayName}</UserName>
              <MessageTime>{item.locName}</MessageTime>
            </NameContainer>
            {/* <div>Reported By</div> */}
          </div>
          <div style={{ marginTop: "6px" }}>{item.Message}</div>
          <div style={{ marginTop: "6px" }}>
            {item.followCount} followers. {item.hashTagType}
          </div>
          <Status
            style={{
              backgroundColor: currStatus(item.msg_message_status_s).color,
            }}
          />
          <Divider variant="fullWidth" />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                fontSize: "small",
                color: "inherit",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={() => {
                seteditId(item.messageId == editId ? -10 : item.messageId);
              }}
            >
              say
            </Button>

            <Button
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                fontSize: "small",
                color: "inherit",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={() =>
                followunfollow(
                  item.messageId,
                  item.userFollowStatus == "1" ? "isFollow=0" : "isFollow=1"
                )
              }
            >
              {item.userFollowStatus == "1" ? "unfollow" : "Follow"}
            </Button>

            <span
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                fontSize: "small",
                color: "black",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={""}
            >
              invite
            </span>
          </div>
          {item.messageId == editId && (
            <ChildSay item={{ ...item, id: item.messageId }} />
          )}

          {/* {item.User_ID == followingid&& (
            <ActivityPost item={{...item,id:item.User_ID}}
          )} */}
        </Container>
      ))}
    </>
  );
};

export default PrivateTags;
