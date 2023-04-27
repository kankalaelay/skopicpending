import {
  CircularProgress,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import axios from "axios";
import * as Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import like from "../../../Assets/images/like.png";
import unlike from "../../../Assets/images/unlike.png";
import Edit from "../../../Assets/images/edit.png";
import Delete from "../../../Assets/images/deleteicon.png";
import { Button } from "../../../Components/StyledComponents";
import { CookieConfig } from "../../../Utils/CookieConfig";
import * as feedactions from "../../../store/actions/feedactions/feedActionCreator";

const Name = styled(Typography)({
  fontWeight: "500",
  fontSize: "16px",
  flex: 1,
});

const Message = styled(Typography)({
  fontSize: "14px",
});

const LikeContainer = styled(Typography)({
  fontSize: "14px",
  color: "#878585",
});

var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

const ChildSay = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [postMessage, setPostMessage] = useState("");
  const [childSays, setChildSays] = useState([]);
  const { id, uimage, image, Keyword_ID, locName } = props.item;
  const [reFetchChildSay, setReFetchChildSay] = useState(false);
  let userDetails = useSelector((state) => state.SignInReducer.userDetails);
  console.log("userDetails", userDetails);
  console.log("props", props);

  useEffect(() => {
    axios
      .request({
        url: `http://dev.skopic.com:9090/skopicportal/jsonuser/childSays.html?id=${id}`,
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setChildSays(res.data.childSAYsMessageList);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [reFetchChildSay]);

  const postChildSay = () => {
    let formdata = new FormData();
    formdata.append("Parent_ID", id);
    formdata.append("Message", postMessage);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonmessage/message-say-bottom?userLoc=${""}&msgLoc=${""}&locName=${locName}`,
        formdata,
        CookieConfig
      )
      .then((res) => {
        setPostMessage(() => "");
        document.getElementById("input").value = "";
        setReFetchChildSay(() => !reFetchChildSay);
      })
      .catch((err) => {});
  };

  const likeChildSay = (id, cache) => {
    let likestatusparams = `?id=${id}&&cacheStatus=${cache}`;
    dispatch(feedactions.fetchVoteUpStatus(likestatusparams));
    const newSays = [...childSays];
    const modifiedSays = newSays.find((x) => x.id === id);
    modifiedSays.voteUp = modifiedSays.voteUp - 1 + 2;
    modifiedSays.UserLikeStatus = "InActive";
    setChildSays(newSays);
  };

  const deleteChildSay = (id) => {
    console.log("id", id);
    const newChildSays = [...childSays];
    const index = newChildSays.findIndex((x) => x.id === id);
    console.log("index", index);
    if (index > -1) {
      newChildSays.splice(index, 1);
      setChildSays(newChildSays);
    }
    let formdata = new FormData();
    formdata.append("messageID", id);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonmessage/deleteMessageByUser.html`,
        formdata,
        CookieConfig
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  const updateMessage = (id, message) => {
    const newData = [...childSays];
    const modifiedData = newData.find((x) => x.id === id);
    modifiedData.Message = message;
    setChildSays(newData);
    console.log(modifiedData);
    let formdata = new FormData();
    formdata.append("messageID", id);
    formdata.append("message", message);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonmessage/update-message?userLoc=${""}&msgLoc=${""}&locName=${
          modifiedData.locName
        }`,
        formdata,
        CookieConfig
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex" }}>
        <Avatar
          src={`${profileImagePath}${Keyword_ID === "actASK" ? image : uimage}`}
          variant="square"
          style={{ borderRadius: "5px" }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            borderRadius: "20px",
            border: "1px solid #707070",
            marginLeft: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <input
            style={{
              flex: 1,
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#F3F2F0",
            }}
            id="input"
            onChange={(e) => setPostMessage(e.target.value)}
            placeholder="Say something..."
          />
          <LocationOnIcon />
        </div>
      </div>
      {postMessage && (
        <Button
          style={{
            textTransform: "none",
            borderRadius: "20px",
            marginTop: "10px",
            marginLeft: "50px",
          }}
          variant="contained"
          onClick={postChildSay}
        >
          Post
        </Button>
      )}
      <Tile
        childSays={childSays}
        likeChildSay={likeChildSay}
        deleteChildSay={deleteChildSay}
        updateMessage={updateMessage}
      />
    </div>
  );
};

const Tile = (props) => {
  const { childSays, deleteChildSay, likeChildSay, updateMessage } = props;
  return (
    <>
      {childSays.map((item) => (
        <ChildTile
          item={item}
          deleteChildSay={deleteChildSay}
          likeChildSay={likeChildSay}
          updateMessage={updateMessage}
        />
      ))}
    </>
  );
};

const ChildTile = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editSay, setEditSay] = useState(false);
  const { item, deleteChildSay, likeChildSay, updateMessage } = props;
  const [message, setMessage] = useState(item.Message);
  console.log(item)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteSay = (id) => {
    handleClose();
    deleteChildSay(id);
  };
  const openEditSay = (id) => {
    handleClose();
    setEditSay(true);
  };
  return (
    <>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Avatar
          src={`${profileImagePath}${item.uimage}`}
          variant="square"
          style={{ borderRadius: "5px" }}
        />
        <div
          style={{
            flex: 1,
            borderRadius: "20px",
            border: "1px solid #707070",
            marginLeft: "10px",
            padding: "10px",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div style={{ display: "flex" }}>
            <Name>{item.displayName}</Name>
            <div>
              <IconButton onClick={handleClick} size="small">
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => openEditSay(item.id)}>
                  <img
                    src={Edit}
                    alt="Editpng"
                    style={{ marginRight: "6px" }}
                  />{" "}
                  Edit Post
                </MenuItem>
                <MenuItem onClick={() => deleteSay(item.id)}>
                  <img
                    src={Delete}
                    alt="Editpng"
                    style={{ marginRight: "6px" }}
                  />{" "}
                  Delete Post
                </MenuItem>
              </Menu>
            </div>
          </div>
          {editSay ? (
            <>
              <textarea
                defaultValue={message}
                style={{ width: "100%" }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    updateMessage(item.id, message);
                    setEditSay(false);
                  }}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditSay(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Message>{item.Message}</Message>
          )}
        </div>
      </div>
      <div
        style={{
          marginLeft: "70px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Button
            startIcon={
              <img
                src={item.UserLikeStatus === "Active" ? like : unlike}
                alt="like"
              />
            }
            onClick={() =>
              item.UserLikeStatus === "Active"
                ? likeChildSay(item.id, "cacheUpdate")
                : null
            }
          >
            Like
          </Button>
          <LikeContainer>
            <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> {item.voteUp}{" "}
            likes
          </LikeContainer>
        </div>
        <Message>{item.Message_Time}</Message>
      </div>
    </>
  );
};

export default ChildSay;
