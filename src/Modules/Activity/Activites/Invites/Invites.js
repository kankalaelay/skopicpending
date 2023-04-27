import React, { useState } from "react";
import { Typography } from "@mui/material";
import IvitionsPending from "../../../../Assets/images/ReciveInvitation.svg";
import DownArrow from "../../../../Assets/images/UpButton.png";
import "./Invites.css";
import { useSelector } from "react-redux";
import axios from "axios";
import * as Cookies from "js-cookie";
import ReInvite from "../../ReInviteModal";

function Invites() {
  const ActivityInfo = useSelector(
    (state) => state.ActivityInfoReducer.activityInfo
  );

  const [isListOpen, setisListOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const toggleList = () => {
    setisListOpen(!isListOpen);
    if (!isListOpen) {
      axios
        .request({
          url: `http://dev.skopic.com:9090/skopicportal/jsonuser/getMoreActivityInvitations?breadCountLength=0`,
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          setListData(res.data.invitations);
          console.log(res.data);
        });
    }
  };
  const viewInvite = () => {
    setShowInvite(true);
  };
  const reSendInvite = () => {
    setOpenModal(true);
  };

  const hideInvite = () => {
    setShowInvite(false);
  };

  return (
    <>
      <div className="Invites" onClick={toggleList}>
        <div>
          <img src={IvitionsPending} alt="Ask-icon" className="askicon" />
          <Typography className="ask mt-3">Invites Sent</Typography>
        </div>
        <div className="ActivityInfo">
          {ActivityInfo && Object.keys(ActivityInfo).lenght !== 0 ? (
            <span className="number">{ActivityInfo.sentInvitationsSize}</span>
          ) : (
            <> </>
          )}
          <img src={DownArrow} alt="DownArrow" className="DownArrow" />
        </div>
      </div>
      {isListOpen && (
        <div role="list" className="posts">
          {listData && listData.length !== 0 ? (
            <div>
              {listData.map((result) => (
                <>
                  <div className="post-1">
                    <div className="SentInviteHeader">
                      <div classsName="">
                        To: {result.emailAddress}
                        <p> {result.time} </p>
                      </div>
                      <div className="Status">{result.inviteStatus}</div>
                    </div>
                    {showInvite && result.inviteStatus === "Joined" ? (
                      <>
                        <div className="MessageInfo">
                          <p>Subject: {result.subject}</p>
                          <span>
                            {" "}
                            Message :
                            <span
                              dangerouslySetInnerHTML={{
                                __html: result.formatMsg,
                              }}
                            ></span>{" "}
                          </span>
                        </div>
                        <span onClick={hideInvite} className="Invite">
                          Hide Invite
                        </span>
                      </>
                    ) : (
                      <span
                        onClick={
                          result.inviteStatus === "Not Joined"
                            ? reSendInvite
                            : viewInvite
                        }
                        className="Invite"
                      >
                        See Invite
                      </span>
                    )}
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}

      <ReInvite show={openModal} onHide={() => setOpenModal(false)} />
    </>
  );
}

export default Invites;
