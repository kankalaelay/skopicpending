import React, { useState } from "react";
import "./Communities.css";
// import Community from "../../../../Assets/images/Community-1.png"
import Link from "../../../../Assets/images/link.svg";
import Crown from "../../../../Assets/images/moderator1.svg";
import SecondaryModrator from "../../../../Assets/images/secondarymoderator.svg";
import Member from "../../../../Assets/images/crown.svg";
import Default from "../../../../Assets/images/Default.svg";
import MakeDefault from "../../../../Assets/images/setDefault.svg";
import { useSelector, useDispatch } from "react-redux";
import * as SignInActions from "../../../../store/actions/SignInActions/SignInAction";

import axios from "axios";
import * as Cookies from "js-cookie";
// import UnFollowModal from "../../../Reusuablecomponents/UnFollowModal"
import DialogBox from "../../../Reusuablecomponents/ReusableDialogBox";
// import GoogleLogin from "react-google-login"

function Communities() {
  const dispatch = useDispatch();

  let userDetails = useSelector((state) => state.SignInReducer.userDetails);
  localStorage.getItem(userDetails);

  const config = {
    headers: {
      "content-type": "x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Set-Cookie": Cookies.get("JSESSIONID"),
    },
    withCredentials: true,
  };

  let profileImagePath = "http://dev.skopic.com:9090/skopicimage";
  const [modreatorReq, setModreatorReq] = React.useState(false);
  const [unsubscribeprimary, setUnsubscribeprimary] = React.useState(false);
  const [userData, setUserData] = useState();
  const changeFollowHandler = (id, tentId) => {
    let formData = new FormData();
    formData.append("communityID", id);
    formData.append("communityName", tentId);
    formData.append("followStat", "0");
    formData.append("sourceApp", "WebApp");

    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/saveFollowCommunity.html`,
        formData,
        config
      )
      .then((res) => {
        console.log(res.data);
      });
    setTimeout(() => {
      dispatch(SignInActions.fetchloginUser());
    }, 500);
  };

  const makeDefaultHandler = (id) => {
    const data = new FormData();
    data.append("userDefaultTenantId", id);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/updateDefaultTenant.html`,
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
      });
    setTimeout(() => {
      dispatch(SignInActions.fetchloginUser());
    }, 500);
  };

  const makeAsModreator = (id) => {
    const data = new FormData();
    data.append("tenantId", id);
    data.append("requstFor", "0");
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/moderatorRequest.html`,
        data,
        config
      )
      .then((res) => {});
    setModreatorReq(true);
  };
  const unsubscribeRole = () => {};

  const changePrimaryRole = (id) => {
    const data = new FormData();
    data.append("tenantId", id);
    data.append("flag", "forPm");
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/getFollowingUsers`,
        data,
        config
      )
      .then((res) => {
        setUserData(res.data.userList);
      });
    setUnsubscribeprimary(true);
  };
  const clickToCopy = () => {
    let popup = document.getElementById("popUP");
    popup.style.display = "block";
    // console.log("pass");
  };
  const close = () => {
    setModreatorReq(false);
    setUnsubscribeprimary(false);
  };
  const dd = () => {
    setInterval(function () {
      let close = document.getElementById("popUP");
      close.style.display = "none";
      console.log("Fail");
    }, 300000);
  };
  // console.log(userData);
  return (
    <>
      <div className="Communities-dispaly">
        <p className="head">Communities </p>
        {userDetails && Object.keys(userDetails).length !== 0 ? (
          userDetails.userData &&
          Object.keys(userDetails.userData).length !== 0 ? (
            <div className=" Communities ">
              {userDetails.userData.communityFollowNames.map((result) => (
                <div className="Community">
                  <img
                    src={` ${profileImagePath}${result.thumbnailLogo}`}
                    alt="Community-Image"
                    className="CommunityImage"
                  />
                  <div className="Community-Details">
                    <p className="title">{result.userFollowCommunityName} </p>
                    {result.status > 0 ? (
                      <button
                        className="Unfollow"
                        disabled={
                          result.ispm === 1
                            ? true
                            : result.ispm === 0 && result.moderatorStatus === 1
                            ? true
                            : result.status === 2
                            ? true
                            : false
                        }
                        onClick={() =>
                          changeFollowHandler(
                            result.id,
                            result.userFollowCommunityName
                          )
                        }
                      >
                        Unfollow{" "}
                      </button>
                    ) : (
                      <button className="Unfollow">follow</button>
                    )}

                    <button
                      className="Actions"
                      onMouseOver={clickToCopy}
                      onMouseOut={dd}
                    >
                      <img src={Link} alt="Link" />
                    </button>
                    <div id="popUP">
                      <p>Click to Copy a Public URL for this community</p>
                    </div>
                    {result.ispm === 1 ? (
                      <button
                        className="Actions"
                        onClick={() => changePrimaryRole(result.id)}
                      >
                        <img src={Crown} alt="Modreator" />
                      </button>
                    ) : result.ispm === 0 && result.moderatorStatus === 1 ? (
                      <button className="Actions" onClick={unsubscribeRole}>
                        <img src={SecondaryModrator} alt="SecondaryModrato" />
                      </button>
                    ) : (
                      <button
                        className="Actions"
                        onClick={() => makeAsModreator(result.id)}
                      >
                        <img src={Member} alt="Member" />
                      </button>
                    )}
                    {result.status === 2 ? (
                      <button className="Actions">
                        <img src={Default} alt="MakeDefault" />
                      </button>
                    ) : (
                      <button
                        className="Actions"
                        onClick={() => makeDefaultHandler(result.id)}
                      >
                        <img src={MakeDefault} alt="MakeDefault" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null
        ) : null}
      </div>

      {/* <UnFollowModal
           show={showData}
           onHide={() => setShowData(false)}
           /> */}

      <DialogBox
        showReq={modreatorReq}
        description="Request sent successfully"
        close={close}
      />
      <DialogBox
        showPrimaryReq={unsubscribeprimary}
        description="Hello"
        close={close}
        list={userData}
      />
    </>
  );
}
export default Communities;
