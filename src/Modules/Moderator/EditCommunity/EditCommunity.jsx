import React from "react";
import Phototimeline from "./Phototimeline";
import "../../../Assets/css/Moderator/EditCommunitys.css";
import CommunityInfo from "./CommunityInfo";
import CommunityRules from "./CommunityRules";

const EditCommunity = (props) => {
  return (
    <React.Fragment>
      <div className="EditCommunityContent">
        {props.subMenuItem === "Community Rules" ? (
          <CommunityRules tenantId={props.tenantId} />
        ) : props.subMenuItem === "Photo Timeline" ? (
          <Phototimeline />
        ) : (
          <CommunityInfo
            {...props}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default EditCommunity;
