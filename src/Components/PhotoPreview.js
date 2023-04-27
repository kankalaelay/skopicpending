import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button as MuiButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import axios from "axios";

import { CookieConfig } from "../Utils/CookieConfig";
import { CenteredElements } from "../Components/StyledComponents";
import { imageServerURL } from "../Constants/constants";
import Crown from "../Assets/images/crown.svg";
import Send from "../Assets/images/sendemail.svg";

const Description = styled(Typography)({
  padding: "8px 15px 8px 15px",
  fontSize: "12px",
});

const SubHeader = styled(Typography)({
  fontSize: "12px",
  marginBottom: "6px",
  color: "#8E8E8E",
});

const Name = styled(Typography)({
  fontSize: "12px",
});

const Container = styled("div")({
  position: "relative",
});

const TileSubHeader = styled(Typography)({
  fontSize: "12px",
  marginBottom: "6px",
});

const Button = styled(MuiButton)({
  textTransform: "none",
  borderRadius: "30px",
  backgroundColor: "#fff",
  position: "absolute",
  top: "8px",
  left: "8px",
  color: "#8E8E8E",
  fontWeight: 400,
});

const goForward = {
  position: "absolute",
  top: "50%",
  right: "8px",
  backgroundColor: "#fff",
  fontSize: "10px",
};

const goBack = {
  position: "absolute",
  top: "50%",
  left: "8px",
  backgroundColor: "#fff",
  fontSize: "10px",
};

const closeIcon = {
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "#fff",
  fontSize: "10px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  minHeight: "300px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  height: "500px",
};

const memberData = [
  {
    id: 1,
    image: "/images/1637236554131dev1832300035index.jpg",
    ask: 329,
    say: 344,
    update: 32,
    tag: 12,
    name: "Bruce Williams",
  },
];

const moderatorData = [
  {
    id: 1,
    image: "/images/1637236554131dev1832300035index.jpg",
    ask: 329,
    say: 344,
    update: 32,
    tag: 12,
    name: "Hanna Bartman",
  },
  {
    id: 2,
    image: "/images/1637236554131dev1832300035index.jpg",
    ask: 329,
    say: 344,
    update: 32,
    tag: 12,
    name: "Hanna Bartman",
  },
];

const PhotoPreview = (props) => {
  const { open, handleClose, tenantId } = props;
  const [currIndex, setCurrIndex] = useState(0);
  const [photoTimeLineData, setPhotoTimeLineData] = useState([]);
  useEffect(() => {
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/timeline-images?tenantId=${tenantId}`,
        CookieConfig
      )
      .then((res) => {
        // console.log("res", res);
        setPhotoTimeLineData(res.data.imagesDetails);
      })
      .catch((err) => {});
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {photoTimeLineData.length ? (
          <Box sx={style}>
            <Container>
              <img
                src={`${imageServerURL}${photoTimeLineData[currIndex].timelineLogo}`}
                alt="Community Image"
                width="100%"
                height="220px"
                style={{ borderRadius: "10px" }}
              />
              <IconButton
                sx={goBack}
                aria-label="back"
                size="small"
                disabled={currIndex === 0}
                onClick={() => setCurrIndex(currIndex - 1)}
              >
                <ArrowBackIosIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={closeIcon}
                aria-label="close"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={goForward}
                aria-label="forward"
                size="small"
                disabled={currIndex === photoTimeLineData.length - 1}
                onClick={() => setCurrIndex(currIndex + 1)}
              >
                <ArrowForwardIosIcon fontSize="inherit" />
              </IconButton>
              <Button
                variant="outlined"
                startIcon={<LocationOnIcon />}
                onClick={() => alert("Coming Soon...")}
              >
                Location
              </Button>
            </Container>
            <Description>
              {photoTimeLineData[currIndex].tmlPhotoDesc}
            </Description>
            <Divider style={{ marginLeft: "15px", marginRight: "15px" }} />
            <div
              style={{
                padding: "8px 15px 8px 15px",
                overflow: "scroll",
                height: "230px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                {photoTimeLineData.map((item, i) => {
                  return (
                    <div
                      style={{
                        marginRight: "10px",
                        border: i == currIndex ? "2px solid blue" : "none",
                        borderRadius: "10px",
                      }}
                      onClick={() => setCurrIndex(i)}
                    >
                      <img
                        src={`${imageServerURL}${item.timelineLogo}`}
                        alt={item.locName}
                        width="80px"
                        height="45px"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  );
                })}
              </div>
              <SubHeader>Community Blog</SubHeader>
              <TileSubHeader>This is for community blog</TileSubHeader>
              <SubHeader>Impactful Member</SubHeader>
              <Tile data={memberData} />
              <SubHeader>Moderator</SubHeader>
              <Tile data={moderatorData} />
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <CenteredElements>No preview to display</CenteredElements>
          </Box>
        )}
      </Modal>
    </div>
  );
};

const Tile = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {data.map((item) => (
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative", marginRight: "10px" }}>
            <Avatar src={`${imageServerURL}${item.image}`} />
            <img
              src={Crown}
              alt="Crown"
              style={{ position: "absolute", bottom: "0px", right: "0px" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Name>{item.name}</Name>
            <TileSubHeader>
              ASK {item.ask} | SAY {item.say} | UPDATE {item.update} | TAG{" "}
              {item.tag}
            </TileSubHeader>
          </div>
          <IconButton onClick={handleClick} size="small">
            <KeyboardArrowDownIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => {}}>
              <img src={Send} alt="send" style={{ marginRight: "6px" }} /> Send
              email to {item.name}
            </MenuItem>
          </Menu>
        </div>
      ))}
    </>
  );
};

export default PhotoPreview;
