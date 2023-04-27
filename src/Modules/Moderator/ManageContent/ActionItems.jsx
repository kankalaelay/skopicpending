import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../Assets/css/home/post.module.css";
import { styled } from "@mui/material/styles";
import { Typography, Avatar, Divider } from "@mui/material";
import * as moderatorActions from "../../../store/actions/Moderator/moderatoractions";
import { Button } from "@mui/material";
import axios from "axios";
import * as Cookies from "js-cookie";

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

function ActionItems(props) {
  const data =
    useSelector((state) => state.ModeratorReducer.ActionItemsData) || [];

  const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const dispatch = useDispatch();

  console.log(data);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length !== 0) {
      dispatch(
        moderatorActions.fetchPrivateTagsData(
          `tenantID=${userDetails.userData.tenantId}`
        )
      );
    }
  }, []);

  const config = {
    headers: {
      "content-type": "x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Set-Cookie": Cookies.get("JSESSIONID"),
    },
    withCredentials: true,
  };
  let serverImageURL = "http://dev.skopic.com:9090/skopicimage/";

  const approveAction = (msgId, value, id, userId) => {
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
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/moderator-approve-deny`,
        formData,
        config
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    // let updatedPostData = [...data]
    // updatedPostData.splice(index, 1)
    // setData(updatedPostData)
  };

  const currStatus = (status) => {
    switch (status) {
      case "A":
        return { color: "green", status: "Approved" };
      default:
        return { color: "red", status: "Rejected" };
    }
  };

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

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
              <MessageTime>{item.createdDate}</MessageTime>
            </NameContainer>
            {/* <div>Reported By</div> */}
          </div>
          <div style={{ marginTop: "6px" }}>{item.message}</div>
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
              onClick={() =>
                approveAction(
                  item.messageId,
                  item.category,
                  item.tenantId,
                  item.userId
                )
              }
            >
              Allow
            </Button>
            <Button>Deny</Button>
          </div>
        </Container>
      ))}
    </>
  );
}
export default ActionItems;
