import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import ActivityLogDropdown from "../../Assets/images/ActivityLogDropdown.svg";
import "../../Assets/css/Moderator/ModeratorHeader.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as moderatorActions from "../../store/actions/Moderator/moderatoractions";
import CommunityInfo from "./EditCommunity/CommunityInfo";

export function ModeratorMenuItems(props) {
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const ActionItems = useSelector(
    (state) => state.ModeratorReducer.ActionItemsData
  );
  const PrivateTagsData = useSelector(
    (state) => state.PrivateTagsReducer.PrivateTagsData
  );

  // console.log("props==========", props);
  const dispatch = useDispatch();

  const [isFirstOptionSelect, setFirstOptionSelect] = useState(false);
  const [isSecondOptionSelect, setSecondOptionSelect] = useState(false);
  const [isThirdOptionSelect, setThirdOptionSelect] = useState(false);
  const [isMenuItem] = useState(props.menuItem);
  const [isTenantID, setTenantID] = useState(null);
  useEffect(() => {
    if (props.menuItem) {
      setFirstOptionSelect(true);
      setSecondOptionSelect(false);
      setThirdOptionSelect(false);
    }
  }, [props.menuItem]);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length !== 0) {
      // console.log(userDetails.userData.tenantId)
      setTenantID([userDetails.userData.tenantId]);
    }
  }, [userDetails]);

  const onFirstOptionSelect = () => {
    setFirstOptionSelect(true);
    setSecondOptionSelect(false);
    setThirdOptionSelect(false);

    props.onSubItemChange(props.firstAction);

    //    managemebers community moderator submenu first option (members)

    if (props.firstAction === "Members") {
      if (userDetails && Object.keys(userDetails).length !== 0) {
        dispatch(moderatorActions.fetchManageMembersData(isTenantID));
      }
    }

    // Manage content community moderation first option Actionitems
    else if (props.firstAction === "ActionItems") {
      if (userDetails && Object.keys(userDetails).length !== 0) {
        dispatch(moderatorActions.fetchActionItemsData(isTenantID));
        // console.log("hello from actionitems from moderator menu");
      }
    }
  };

  const onSecondOptionSelect = (e) => {
    // console.log("target", props);
    setFirstOptionSelect(false);
    setSecondOptionSelect(true);
    setThirdOptionSelect(false);
    props.onSubItemChange(props.secondAction);
    // console.log("ModeratorMenu.jsx", props);
    if (props.secondAction === "Photo Timeline") {
      if (userDetails && Object.keys(userDetails).length !== 0) {
        dispatch(
          moderatorActions.fetchPhotoTimeLineList(`tenantId=${isTenantID}`)
        );
        dispatch(moderatorActions.fetchTenantList());
      }
      // console.log(userDetails.userData.tenantId)

      //    managemebers community moderator submenu second option (moderator)
    } else if (props.secondAction === "Moderators") {
      if (userDetails && Object.keys(userDetails).length !== 0) {
        dispatch(moderatorActions.fetchManageMembersData(isTenantID));
      }

      // Manage content community moderation second option Activity Log
    } else if (props.secondAction === "ActivityLog") {
      if (e.target.innerText === "Flagged Posts") {
        props.onTypeChange("report");
      } else if (e.target.innerText === "Moderator History") {
        props.onTypeChange("moderator");
      } else if (e.target.innerText === "User Posts") {
        props.onTypeChange("message");
      } else {
        props.onTypeChange("message");
      }
    } else {
      return false;
    }
  };

  const onThirdOptionSelect = () => {
    setFirstOptionSelect(false);
    setSecondOptionSelect(false);
    setThirdOptionSelect(true);
    props.onSubItemChange(props.thirdAction);

    // Manage content submenu third option privatetags

    if (props.thirdAction === "PrivateTags") {
      if (userDetails && Object.keys(userDetails).length !== 0) {
        // dispatch(moderatorActions.fetchPrivateTagsData(`tenantId=${isTenantID}`))
        // dispatch(moderatorActions.fetchPrivateTagsData(isTenantID))
        // dispatch(moderatorActions.fetchTenantList())
        // console.log("privatetags from moderator menu");
      } else {
        return false;
      }
    }
  };

  //   console.log(props.secondAction)
  return (
    <React.Fragment>
      <div className="menuItems">
        <ul>
          <li
            onClick={onFirstOptionSelect}
            className={`${isFirstOptionSelect ? "FirstOption" : null}`}
          >
            {props.firstAction}
          </li>
          <Divider variant="fullWidth" />
          <li
            onClick={onSecondOptionSelect}
            className={`${isSecondOptionSelect ? "FirstOption" : null}`}
          >
            {props.secondAction}
            {props.secondAction === "ActivityLog" ? (
              <>
                <span>
                  <img src={ActivityLogDropdown} alt="ActivityLogDropdown" />
                </span>
                <div className="activityDropdownOption">
                  <li
                    value="message"
                    style={{
                      color: props.type === "message" ? "#4795de" : "black",
                    }}
                  >
                    User Posts
                  </li>
                  <li
                    value="report"
                    style={{
                      color: props.type === "report" ? "#4795de" : "black",
                    }}
                  >
                    Flagged Posts
                  </li>
                  <li
                    value="moderator"
                    style={{
                      color: props.type === "moderator" ? "#4795de" : "black",
                    }}
                  >
                    Moderator History
                  </li>
                </div>
              </>
            ) : null}
          </li>
          <Divider variant="fullWidth" />
          <li
            onClick={onThirdOptionSelect}
            className={`${isThirdOptionSelect ? "FirstOption" : null}`}
          >
            {props.thirdAction}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

function ModeratorMenu(props) {
  return (
    <React.Fragment>
      {props.menuItem === "1" ? (
        <ModeratorMenuItems
          firstAction={"ActionItems"}
          secondAction={"ActivityLog"}
          thirdAction={"PrivateTags"}
          // value="1"
          menuItem={props.menuItem}
          onSubItemChange={props.onSubMenuItemChange}
          onTypeChange={props.onTypeChange}
          type={props.type}
        />
      ) : props.menuItem === "2" ? (
        <ModeratorMenuItems
          firstAction={"Members"}
          secondAction={"Moderators"}
          thirdAction={"Invite Members"}
          menuItem={props.menuItem}
          onSubItemChange={props.onSubMenuItemChange}
          onTypeChange={props.onTypeChange}
          type={props.type}
        />
      ) : (
        <ModeratorMenuItems
          firstAction={"Community Info"}
          secondAction={"Photo Timeline"}
          thirdAction={"Community Rules"}
          menuItem={props.menuItem}
          onSubItemChange={props.onSubMenuItemChange}
          onTypeChange={props.onTypeChange}
          type={props.type}
        />
      )}
    </React.Fragment>
  );
}

export default ModeratorMenu;
