import { Button as MuiButton, Switch, Typography, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import * as Cookies from "js-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { updateCommunityRules } from "../../../store/actions/Moderator/moderatoractions";

const Button = styled(MuiButton)({
  borderRadius: "0px",
  marginBottom: "10px",
  fontSize: "12px",
  padding: "0px",
  paddingLeft: "12px",
  paddingRight: "12px",
  textTransform: "none",
});

const Header = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "10px",
});

const Types = styled(Typography)({
  fontSize: "12px",
});

const Container = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "20px",
  marginBottom: "20px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const PermissionnContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const CommunityRules = (props) => {
  const moderatingCommunitysData = useSelector(
    (state) => state.ModeratorReducer.moderatingCommunitysData
  );
  const community = moderatingCommunitysData.restrictions.find(
    (x) => x.tenantId === props.tenantId
  );
  const {
    communityType,
    communityView,
    newsletterFrequency,
    ask,
    say,
    hashSay,
    hashTag,
    bottomSay,
    moderator,
    update,
  } = community;
  const permissionsArray = [
    { id: 1, title: "Post ASKs", selected: ask === "1", name: "ask" },
    { id: 2, title: "Post SAYs", selected: say === "1", name: "say" },
    {
      id: 3,
      title: "Post SAYs to ASKs",
      selected: bottomSay === "1",
      name: "bottomSay",
    },
    {
      id: 4,
      title: "Post #SAYs to #TAGs",
      selected: hashSay === "1",
      name: "hashSay",
    },
    {
      id: 5,
      title: "Create #TAGs",
      selected: hashTag === "1",
      name: "hashTag",
    },
    { id: 6, title: "Post Updates", selected: update === "1", name: "update" },
    {
      id: 7,
      title: "Add Moderators",
      selected: moderator === "1",
      name: "moderator",
    },
  ];
  const config = {
    headers: {
      "content-type": "x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Set-Cookie": Cookies.get("JSESSIONID"),
    },
    withCredentials: true,
  };
  const [permission, setPermission] = useState(permissionsArray);
  const dispatch = useDispatch();
  const setModeratorPermission = (id) => {
    const newPermissions = [...permission];
    const modifiedPermission = newPermissions.find((x) => x.id === id);
    modifiedPermission.selected = !modifiedPermission.selected;
    setPermission([...newPermissions]);
    community[modifiedPermission.name] =
      community[modifiedPermission.name] === "1" ? "0" : "1";
    dispatch(updateCommunityRules(community));
    const rules = permission.map((item) => (item.selected ? "1" : "0"));
    let formData = new FormData();
    formData.append("tenantIds", props.tenantId);
    formData.append("rules", rules.join(","));
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/restriction`,
        formData,
        config
      )
      .then((res) => {})
      .catch((error) => {});
  };

  const setNewsLetterType = (value) => {
    let formData = new FormData();
    formData.append("tenantId", props.tenantId);
    formData.append("newsletterFrequency", value);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/newsletter-schedule`,
        formData,
        config
      )
      .then((res) => {})
      .catch((error) => {});
    community.newsletterFrequency = value;
    dispatch(updateCommunityRules(community));
  };

  const setCommunityType = (value) => {
    let formData = new FormData();
    formData.append("tenantId", props.tenantId);
    formData.append("communityType", value);
    formData.append("communityView", communityView);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/community-type`,
        formData,
        config
      )
      .then((res) => {})
      .catch((error) => {});
    community.communityType = value;
    dispatch(updateCommunityRules(community));
  };

  const setCommunityView = (value) => {
    let formData = new FormData();
    formData.append("tenantId", props.tenantId);
    formData.append("communityType", communityType);
    formData.append("communityView", value);
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/community-type`,
        formData,
        config
      )
      .then((res) => {})
      .catch((error) => {});
    community.communityView = value;
    dispatch(updateCommunityRules(community));
  };

  return (
    <>
      <Container>
        <Header>Newsletter Schedule</Header>
        <div>
          <NewLetterButtons
            title="Monthly"
            styles={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              marginLeft: "10px",
            }}
            value="Monthly"
            type={newsletterFrequency}
            onClick={setNewsLetterType}
          />
          <NewLetterButtons
            title="BiMonthly"
            styles={{}}
            value="BiMonthly"
            type={newsletterFrequency}
            onClick={setNewsLetterType}
          />
          <NewLetterButtons
            title="Weekly"
            styles={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
            value="Weekly"
            type={newsletterFrequency}
            onClick={setNewsLetterType}
          />
        </div>
        <Header>Moderator Permissions</Header>
        <div style={{ marginLeft: "10px" }}>
          {permission.map((item) => (
            <PermissionnContainer key={item.id}>
              <Types>{item.title}</Types>
              <Switch
                checked={item.selected}
                onChange={() => {
                  setModeratorPermission(item.id);
                }}
              />
            </PermissionnContainer>
          ))}
        </div>
      </Container>
      <Container>
        <Header>Community Type</Header>
        <ButtonContainer>
          <RadioButton
            title="Public"
            value="public"
            description="Community accessible to all members"
            setType={setCommunityType}
            type={communityType}
          />
          <RadioButton
            title="Private"
            value="private"
            description="Members join Community by invitation or by request"
            setType={setCommunityType}
            type={communityType}
          />
        </ButtonContainer>
        {communityType === "Private" && (
          <ButtonContainer style={{ marginLeft: "50px" }}>
            <RadioButton
              title="View Only"
              value="view"
              description="Non members can view all activity and content"
              setType={setCommunityView}
              type={communityView}
            />
            <RadioButton
              title="Hide"
              value="hide"
              description="Community hidden from all non members"
              setType={setCommunityView}
              type={communityView}
            />
          </ButtonContainer>
        )}
      </Container>
    </>
  );
};

const RadioButton = (props) => {
  const { type, value, setType, title, description } = props;
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <Radio
        checked={type === value}
        onClick={() => setType(value)}
        sx={{
          marginTop: "-16px",
        }}
        size="small"
      />
      <div>
        <Typography style={{ fontSize: "14px" }}>{title}</Typography>
        <Types style={{ color: "#444444" }}>{description}</Types>
      </div>
    </div>
  );
};

const NewLetterButtons = (props) => {
  const { title, value, type, styles, onClick } = props;
  return (
    <Button
      style={{
        ...styles,
        color: type === value ? "#1976d2" : "#c4c4c4",
        borderColor: type === value ? "#1976d2" : "#c4c4c4",
        backgroundColor: type === value ? "#d0f6ff" : "#fff",
      }}
      onClick={() => onClick(value)}
    >
      {title}
    </Button>
  );
};

export default CommunityRules;
