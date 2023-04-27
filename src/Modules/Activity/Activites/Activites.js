import React, { useEffect } from "react";
import "./Activites.css";
import AsksActivity from "./Asks Activity/AsksActivity";
import InvitesPending from "./Invites Pending/InvitesPending";
import Invites from "./Invites/Invites";
import SaysActivity from "./Says Activity/SaysActivity";
import TagActtivity from "./Tag Activity/TagActtivity";
import UpdateActtivity from "./Update Activity/UpdateActtivity";
import { useDispatch } from "react-redux";
import * as ActivityActions from "../../../store/actions/Activity/ActivityAction";
function Activites() {
  const dispatch = useDispatch;

  //   useEffect(() => {
  //     setTimeout(() => {
  //       dispatch(ActivityActions.fetchActivityData());
  //     }, 1000);
  //   });

  return (
    <div className="Activites">
      <p className="head">Activity </p>
      <AsksActivity />
      <SaysActivity />
      <UpdateActtivity />
      <TagActtivity />
      <InvitesPending />
      <Invites />
    </div>
  );
}
export default Activites;
