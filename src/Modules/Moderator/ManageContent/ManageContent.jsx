import React, { useEffect } from "react";
import Moderator from "../ManageMembers/ManagememModerator";
import * as moderatorActions from "../../../store/actions/Moderator/moderatoractions";
import { useSelector, useDispatch } from "react-redux";
import ActionItems from "./ActionItems";
import ItemsPost from "./ItemsPost";
import PrivateTags from "./PrivateTags";
import ActivityLog from "./ActivityLog";

const ManageContent = (props) => {
  const ItemsData = useSelector(
    (state) => state.ModeratorReducer.ActionItemsData
  );
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);

  // console.log("ManageContent.jsx", props);

  // console.log("ManageContent.jsx ItemsData", ItemsData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ItemsData && Object.keys(ItemsData).length !== 0) {
      dispatch(moderatorActions.fetchActionItemsData(ItemsData.tenantId));
    } else {
      if (userDetails && Object.keys(userDetails).length !== 0) {
        dispatch(
          moderatorActions.fetchManageMembersData(userDetails.userData.tenantId)
        );
      } else {
        if (userDetails && Object.keys(userDetails).length !== 0) {
          dispatch(
            moderatorActions.fetchPrivateTagsData(userDetails.userData.tenantId)
          );
        }
      }
    }
  }, [props.subMenuItem]);

  return (
    <div>
      {props.subMenuItem === "PrivateTags" ? (
        <PrivateTags tenantId={props.tenantValue} />
      ) : props.subMenuItem === "ActivityLog" ? (
        <ActivityLog tenantId={props.tenantValue} type={props.type} />
      ) : (
        <ActionItems tenantId={props.tenantValue} />
      )}
    </div>
  );
};

export default ManageContent;

// (changeItem==="1")?(<ActionItems/>)
// :(changeItem==="2")?(<ActivityLog/>):
//   (changeItem==="3")?(<PrivateTags/>)
// :<></>
