import React, { useEffect, useState } from "react";
import Invition from "../../../../Assets/images/SentInvitation.svg";
import "./InvitesPending.css";
import axios from "axios";
import * as Cookies from "js-cookie";
import "./InvitesPending.css";

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const Container = styled("div")({
  backgroundColor: "#E9FFFE",
  padding: "10px",
  borderRadius: "10px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "8px",
});

const Button = styled("div")({
  backgroundColor: "#F3F3F3",
  flex: 1,
  display: "flex",
  padding: "5px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  cursor: "pointer",
  opacity: 1,
  ":hover": {
    boxShadow: "1px 3px 1px #9E9E9E",
  },
});

const Title = styled(Typography)({
  fontSize: "14px",
});

const SubTitle = styled(Typography)({
  fontSize: "12px",
});

const InviteStatus = styled(Typography)({
  fontSize: "13px",
  fontWeight: "500",
});

const SeeMore = styled(Typography)({
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer",
  ":hover": {
    color: "grey",
  },
  marginTop: "4px",
  alignSelf: "flex-end",
});

const InviteMessage = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "5px",
  marginTop: "6px",
});

const SeeInviteButton = styled(Typography)({
  textAlign: "center",
  color: "blue",
  marginTop: "6px",
  fontSize: "14px",
  cursor: "pointer",
});

const InvitesPending = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);
  const toggleList = () => {
    axios
      .request({
        url: `http://dev.skopic.com:9090/skopicportal/jsonuser/activityReceiveInvitations.html?breadCountLength=0`,
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.receivedinvitations);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => toggleList(), []);
  return (
    <Accordion
      sx={{
        backgroundColor: isExpanded ? "#fff" : "#efeeed",
        width: "465px",
        marginTop: "30px",
        borderRadius: "30px",
        position: "inherit",
        padding: "3px",
      }}
      onChange={() => setIsExpanded(!isExpanded)}
      expanded={isExpanded}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <img
          src={Invition}
          alt="Ask-icon"
          className="askicon"
          style={{ margin: 0, marginRight: "6px" }}
        />
        <Typography style={{ flex: 1, fontWeight: "400" }}>
          Invites Received
        </Typography>
        <Typography>{data.length}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.map((item, index) => (
          <Tile data={item} key={index} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const Tile = (props) => {
  const [showMore, setShowMore] = useState(false);
  const join = () => {
    axios
      .request({
        url: `http://dev.skopic.com:9090/skopicportal/user/communityurl.html?tid=id`,
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      })
      .then((res) => {
        // setData(res.data.receivedinvitations);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  const ignore = () => {
    alert("world");
  };
  const seeInvite = () => {
    alert("Again");
  };
  const { inviteStatus, emailAddress, Message_Time, subject, message } =
    props.data;
  return (
    <Container>
      <div style={{ display: "flex", marginBottom: "6px" }}>
        <div style={{ flex: 1 }}>
          <Title>From: {emailAddress}</Title>
          <SubTitle>{Message_Time} ago in the community</SubTitle>
        </div>
        <InviteStatus>{inviteStatus}</InviteStatus>
      </div>
      <Divider />
      {inviteStatus === "Not Joined" && (
        <InviteMessage>
          <SubTitle>subject: {subject}</SubTitle>
          {showMore && <SubTitle>{message}</SubTitle>}
          <SeeMore onClick={() => setShowMore(!showMore)}>
            {showMore ? "See Less" : "See More"}
          </SeeMore>
        </InviteMessage>
      )}
      {inviteStatus === "Not Joined" ? (
        <ButtonContainer>
          <Button onClick={join} style={{ marginLeft:"80px",marginRight: "80px" }}>
            <Typography>Join</Typography>
          </Button>
          {/* <Button onClick={ignore} style={{ marginLeft: "10px" }}>
            <Typography>Ignore</Typography>
          </Button> */}
        </ButtonContainer>
      ) : (
        <SeeInviteButton onClick={seeInvite}>See Invite</SeeInviteButton>
      )}
    </Container>
  );
};

export default InvitesPending;
