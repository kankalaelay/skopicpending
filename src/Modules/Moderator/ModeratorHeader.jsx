import React, { Component, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ModeratorIcon from "../../Assets/images/ModeratorCommunityImage.svg";
import ModeratorCommunityAdd from "../../Assets/images/ModeratorAddCommunity.svg";
import PrimaryModeratorCrown from "../../Assets/images/PrimaryModeratorCrown.svg";
import SecondaryModeratorCrown from "../../Assets/images/SecondaryModeratorCrown.svg";
import CardContent from "@mui/material/CardContent";
import "../../Assets/css/Moderator/ModeratorHeader.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { ModeratorMenuItems } from "../Moderator/ModeratorMenu";
import { useSelector, useDispatch } from "react-redux";
import { PopperUnstyled } from "@mui/material";
import * as SignInActions from "../../store/actions/SignInActions/SignInAction";
import * as feedactions from "../../store/actions/feedactions/feedActionCreator";
import * as moderatorActions from "../../store/actions/Moderator/moderatoractions";

function ModeratorNav(props) {
  const moderatingCommunitysData = useSelector(
    (state) => state.ModeratorReducer.moderatingCommunitysData
  );
  const changeCommunityData = useSelector(
    (state) => state.followReducer.changeCommunityData
  );
  // const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const imageServerURL = "http://dev.skopic.com:9090/skopicimage/";
  const [tenantId, setTenantId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      moderatingCommunitysData &&
      Object.keys(moderatingCommunitysData).length !== 0 &&
      moderatingCommunitysData.restrictions
    ) {
      setTenantId(moderatingCommunitysData.restrictions[0].tenantId);
      // setTenantId(moderatingCommunitysData.tenantId)
    }
    props.setTenantValue(tenantId);
  }, [moderatingCommunitysData]);
  // console.log(moderatingCommunitysData)

  useEffect(() => {
    if (changeCommunityData && Object.keys(changeCommunityData).length !== 0) {
      if (changeCommunityData.status === "OK") {
        dispatch(SignInActions.fetchloginUser(""));
        dispatch(moderatorActions.fetchManageMembersData(tenantId));
      }
    }
  }, [changeCommunityData]);

  const changeCommunityHandler = (value, name) => {
    dispatch(feedactions.changeCommunity(name, value));

    setTenantId(value);
    props.setTenantValue(value);
  };

  // const selectedTenantId =
  //   userDetails && userDetails.userData ? userDetails.userData.tenantId : "";

  return (
    <React.Fragment>
      <div className="ModeratorCommunitysList">
        {moderatingCommunitysData &&
        Object.keys(moderatingCommunitysData).length !== 0
          ? moderatingCommunitysData.restrictions &&
            moderatingCommunitysData.restrictions.map((restrictions) => (
              <Card
                className="CommunityCard"
                key={restrictions.tenantId}
                onClick={() =>
                  changeCommunityHandler(
                    restrictions.tenantId,
                    restrictions.tenantName
                  )
                }
                style={{
                  // borderWidth:
                  //   selectedTenantId === restrictions.tenantId ? "2px" : "0px",
                  borderColor:
                    props.tenantId === restrictions.tenantId ? "#4795de" : "",
                  boxShadow:
                    props.tenantId === restrictions.tenantId
                      ? "2px 2px 9px #000000"
                      : "inherit",
                }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={`${imageServerURL}${restrictions.thumbnailLogo}`}
                  alt="UserFollowingCommunity"
                  className="CommunityIcon"
                />
                <CardContent className="CommunityName">
                  <span>{restrictions.tenantName}</span>
                </CardContent>
                {moderatingCommunitysData.isAdmin === "0" ? (
                  <span className="ModeratorIcon">
                    <img
                      src={`${
                        restrictions.isPm === "1"
                          ? PrimaryModeratorCrown
                          : SecondaryModeratorCrown
                      }`}
                    />
                  </span>
                ) : null}
              </Card>
            ))
          : null}
        <Card className="CommunityCard">
          <div className="CommunityIcon NewCommunity">
            <CardMedia
              component="img"
              height="46"
              image={ModeratorCommunityAdd}
              alt="UserFollowingCommunity"
              className="ModerateNewCommunity"
            />
          </div>
          <CardContent className="CommunityName">
            <span>Moderate new community</span>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

function LabTabs(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onMenuItemChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Manage Content" value="1" />
            <Tab label="Manage Members" value="2" />
            <Tab label="Edit Community" value="3" />
          </TabList>
        </Box>
        {/* <TabPanel value="1">Manage Content</TabPanel>
          <TabPanel value="2">Manage Members</TabPanel>
          <TabPanel value="3">Edit Community</TabPanel> */}
      </TabContext>
    </Box>
  );
}

function ModeratorNavItems(props) {
  return (
    <React.Fragment>
      <LabTabs
        menuItem={props.menuItem}
        onMenuItemChange={props.onMenuItemChange}
      />
    </React.Fragment>
  );
}

class ModeratorHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: this.props.menuItem,
    };
  }

  render(props) {
    return (
      <React.Fragment>
        <div className="ModeratorHeader">
          <ModeratorNav
            setTenantValue={this.props.setTenantValue}
            tenantId={this.props.tenantId}
          />
          <ModeratorNavItems
            menuItem={this.state.menuItem}
            onMenuItemChange={this.props.onMenuItemChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ModeratorHeader;
