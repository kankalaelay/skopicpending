import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Tag from "../../../../Assets/images/tag.svg";
import DownArrow from "../../../../Assets/images/UpButton.png";
import "./TagActtivity.css";
import ActivityPost from "../../ActivityPost";
import axios from "axios";
import * as Cookies from "js-cookie";
import { CookieConfig } from "../../../../Utils/CookieConfig";

function TagActtivity() {
  const [isListOpen, setisListOpen] = useState(false);
  const [listData, setListData] = useState([]);

  const toggleList = () => {
    setisListOpen(!isListOpen);
  };

  const getData = () => {
    axios
      .request({
        url: `http://dev.skopic.com:9090/skopicportal/jsonuser/activity-hash?breadCountLength=0`,
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      })
      .then((res) => {
        setListData(res.data.hashList);
      });
  };

  useEffect(() => getData(), []);

  const updateList = (id, followStatus) => {
    const newData = [...listData];
    const modifiedData = newData.find((x) => x.id === id);
    modifiedData.followStatus = followStatus.includes("0") ? "N" : "Y";
    modifiedData.followCount = followStatus.includes("0")
      ? modifiedData.followCount - 1
      : modifiedData.followCount - 1 + 2;
    setListData(newData);
  };

  const deleteTag = (id) => {
    const newList = [...listData];
    const index = newList.findIndex((x) => x.id === id);
    if (index > -1) {
      newList.splice(index, 1);
      setListData(newList);
    }
    let formdata = new FormData();
    formdata.append("messageID", id);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonmessage/deleteMessageByUser.html`,
        formdata,
        CookieConfig
      )
      .then((res) => {})
      .catch((err) => {});
  };

  const updateMessage = (id, message) => {
    const newData = [...listData];
    const modifiedData = newData.find((x) => x.id === id);
    modifiedData.Message = message;
    setListData(newData);
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
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <>
      <div className="TagActivity" onClick={toggleList}>
        <div>
          <img src={Tag} alt="Ask-icon" className="askicon" />
          <Typography className="ask mt-3">TAG</Typography>
        </div>
        <div className="ActivityInfo">
          <span className="number">{listData.length}</span>
          <img src={DownArrow} alt="DownArrow" className="DownArrow" />
        </div>
      </div>
      {isListOpen && (
        <div role="list" className="posts">
          {listData && listData.length !== 0 ? (
            <ActivityPost
              listData={listData}
              updateMessage={updateMessage}
              delete={deleteTag}
              updateList={updateList}
            />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}

export default TagActtivity;
