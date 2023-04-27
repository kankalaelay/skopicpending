import React, { Component } from "react";
import Header from "../header/header";
import ModeratorHeader from "../Moderator/ModeratorHeader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ModeratorMenu from "./ModeratorMenu";
import "../../Assets/css/Moderator/ModeratorHeader.css";
import EditCommunity from "./EditCommunity/EditCommunity";
import * as feedActions from "../../store/actions/feedactions/feedActionCreator";
import * as SignInActions from "../../store/actions/SignInActions/SignInAction";
import * as moderatorActions from "../../store/actions/Moderator/moderatoractions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ManageMembers from "./ManageMembers/ManageMembers";
import ManageContent from "./ManageContent/ManageContent";

class Moderator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: "1",
      subMenuItem: "Action Items",
      moderatorTenantId: "",
      type: "",
    };
  }
  setType = (value) => {
    this.setState({ type: value });
  };

  onItemChange = (itemValue) => {
    this.setState({
      menuItem: itemValue,
    });
  };

  onSubItemChange = (subItemValue) => {
    this.setState({
      subMenuItem: subItemValue,
    });
  };
  setTenantId = (tenantId) => {
    this.setState({ moderatorTenantId: tenantId });
  };
  componentDidMount() {
    this.props.feedActions.fetchFeedData("?startlimit=0");
    this.props.SignInActions.fetchloginUser("");
    this.props.feedActions.fetchcontirbutors("");
    this.props.feedActions.fetchSettings("");
    this.props.feedActions.fetchUserNames("@");
    this.props.moderatorActions.fetchModeratingCommunityList("");
    this.props.moderatorActions.getTenantList();
  }

  getTenantId = () => {
    return this.props.moderatingCommunitysData && this.props.moderatingCommunitysData.restrictions
      ? this.props.moderatingCommunitysData.restrictions[0].tenantId
      : this.state.moderatorTenantId;
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Box sx={{ height: "100vh" }}>
            <ModeratorHeader
              menuItem={this.state.menuItem}
              onMenuItemChange={this.onItemChange}
              setTenantValue={this.setTenantId}
              tenantId={this.getTenantId()}
            />
            <div className="MiddleContent">
              <ModeratorMenu
                menuItem={this.state.menuItem}
                onSubMenuItemChange={this.onSubItemChange}
                onTypeChange={this.setType}
                type={this.state.type}
              />
              <div className="MenuContent">
                {this.state.menuItem === "1" ? (
                  <ManageContent
                    subMenuItem={this.state.subMenuItem}
                    tenantValue={this.getTenantId()}
                    type={this.state.type}
                  />
                ) : this.state.menuItem === "2" ? (
                  <ManageMembers
                    subMenuItem={this.state.subMenuItem}
                    tenantValue={this.getTenantId()}
                  />
                ) : (
                  <EditCommunity
                    subMenuItem={this.state.subMenuItem}
                    tenantId={this.getTenantId()}
                  />
                )}
              </div>
            </div>
          </Box>
        </Container>
        {/* <ModeratorMenu/>
          <ModeratorContent/> */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SignInActions: bindActionCreators(SignInActions, dispatch),
    feedActions: bindActionCreators(feedActions, dispatch),
    moderatorActions: bindActionCreators(moderatorActions, dispatch),
  };
}

function mapStateToProps(state) {
  const { userDetails } = state.SignInReducer;
  const { moderatingCommunitysData } = state.ModeratorReducer;
  return { userDetails, moderatingCommunitysData };
}

export default connect(mapStateToProps, mapDispatchToProps)(Moderator);
