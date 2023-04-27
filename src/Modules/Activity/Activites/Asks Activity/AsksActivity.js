import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Ask from "../../../../Assets/images/ask.svg";
import DownArrow from "../../../../Assets/images/UpButton.png";
import "./AsksActivity.css";
import axios from "axios";
import * as Cookies from "js-cookie";
import ActivityPost from "../../ActivityPost";

function AsksActtivity() {
  const [isListOpen, setisListOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const config = {
    headers: {
      "content-type": "x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Set-Cookie": Cookies.get("JSESSIONID"),
    },
    withCredentials: true,
  };

  const toggleList = () => {
    setisListOpen(!isListOpen);
  };

  const getData = () => {
    axios
      .request({
        url: `http://dev.skopic.com:9090/skopicportal/jsonuser/getMoreActivityASK?breadCountLength=0&isNewUiVersion=yes`,
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      })
      .then((res) => {
        setListData(res.data.askList);
      });
  };

  useEffect(() => getData(), []);

  const updateList = (id, followStatus) => {
    const newData = [...listData];
    const modifiedData = newData.find((x) => x.id === id);
    modifiedData.followStatus = followStatus.includes("0")
      ? "inactive"
      : "Active";
    modifiedData.followCount = followStatus.includes("0")
      ? modifiedData.followCount - 1
      : modifiedData.followCount - 1 + 2;
    setListData(newData);
  };

  const deleteAsk = (id) => {
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
        config
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
        config
      )
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <>
      <div className="AskActivity" onClick={toggleList}>
        {/* Activity Name */}
        <div>
          <img src={Ask} alt="Ask-icon" className="askicon" />
          <Typography className="ask mt-3">ASK</Typography>
        </div>
        {/* Activity Data */}
        <div className="ActivityInfo">
          <span className="number ">{listData.length}</span>
          <img src={DownArrow} alt="DownArrow" className="DownArrow" />
        </div>
      </div>
      {/* Post Data */}
      {isListOpen && (
        <div role="list" className="posts">
          {listData && listData.length !== 0 ? (
            <ActivityPost
              listData={listData}
              updateList={updateList}
              delete={deleteAsk}
              updateMessage={updateMessage}
            />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}

export default AsksActtivity;
