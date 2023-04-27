import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as moderatorActions from "../../../store/actions/Moderator/moderatoractions";
import styles from "../../../Assets/css/home/post.module.css";
import crown from "../../../Assets/images/crown.png";

const Container = styled("div")({
  backgroundColor: "#fff",
  margin: "20px",
  borderRadius: "20px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
});

const Status = styled("div")({
  width: "10px",
  height: "10px",
  borderRadius: "10px",
  alignSelf: "flex-end",
  marginBottom: "6px",
});

const UserName = styled(Typography)({
  fontSize: "16px",
  fontWeight: "700",
});

const MessageTime = styled(Typography)({
  fontSize: "12px",
});

const NameContainer = styled("div")({
  flex: 1,
  flexDirection: "column",
  display: "flex",
});

function ActivityLog(props) {
  const data =
    useSelector((state) => state.ModeratorReducer.ActivityLogdata) || [];

  // const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const dispatch = useDispatch();

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

  console.log("props.tenantId", props.tenantId);

  useEffect(() => {
    dispatch(
      moderatorActions.fetchActivityLogData(
        `tenantID=${props.tenantId}&type=${props.type}`
      )
    );
  }, [props.type, props.tenantId]);

  const currStatus = (status) => {
    switch (status) {
      case "A":
        return "Approved";
      case "1":
        return "Approved";
      default:
        return "Rejected";
    }
  };

  const isActive = (status) => {
    switch (status) {
      case "SAY":
        return "green";
      case "UPDATE":
        return "red";
      case "#TAG":
        return "orange";
      default:
        return "blue";
    }
  };

  const { type } = props;

  if (data.length < 1) {
    return (
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        No data found
      </div>
    );
  }

  return (
    <>
      {data.map((item) => (
        <Container>
          <div style={{ display: "flex" }}>
            <Avatar
              src={`${profileImagePath}${
                type == "report"
                  ? item.rpt_a_image_s
                  : type === "message"
                  ? item.msg_usr_image_s
                  : item.image_s
              }`}
              className={styles.avatar}
              variant="square"
            />
            <NameContainer>
              <UserName>
                {type === "report"
                  ? item.rpt_display_name_s
                  : type === "message"
                  ? item.msg_usr_display_name_s
                  : item.display_name_s}
              </UserName>
              <MessageTime>
                {type == "report"
                  ? item.rpt_created_date_dt
                  : type === "message"
                  ? item.msg_created_date_dt
                  : item.created_date_dt}
              </MessageTime>
            </NameContainer>
            {type === "report" && item.rpt_reason_s && (
              <div style={{ fontSize: "12px" }}>
                Reported by <b>{item.rpt_created_display_name_s}</b> as{" "}
                <b>{item.rpt_reason_s}</b>
              </div>
            )}
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>
            {type == "report"
              ? item.rpt_message_text_s
              : item.msg_message_text_s}
          </div>
          {type != "moderator" ? (
            <Status
              style={{
                backgroundColor: isActive(
                  type === "report"
                    ? item.rpt_message_type_s
                    : item.msg_message_type_s
                ),
              }}
            />
          ) : (
            <img
              src={crown}
              height="14px"
              width="14px"
              style={{ marginLeft: "auto" }}
            />
          )}
          <Divider variant="fullWidth" />
          <div style={{ marginTop: "10px", fontSize: "14px" }}>
            <b>
              {type === "report"
                ? item.rpt_message_type_s
                : type === "message"
                ? item.msg_message_type_s
                : "Moderator Request"}
            </b>{" "}
            was{" "}
            <b>
              {currStatus(
                type === "report"
                  ? item.rpt_admin_status_s
                  : type === "message"
                  ? item.msg_message_status_s
                  : item.moderator_status_s
              )}
            </b>{" "}
            {type === "report"
              ? item.rpt_action_on_time_dt
              : type === "message"
              ? item.msg_action_on_time_dt
              : item.action_on_time_dt}{" "}
            ago by{" "}
            <b>
              {type === "report"
                ? item.rpt_a_display_name_s
                : type === "message"
                ? item.msg_a_display_name_s
                : item.action_by_display_name_s}
            </b>
          </div>
        </Container>
      ))}
    </>
  );
}
export default ActivityLog;
