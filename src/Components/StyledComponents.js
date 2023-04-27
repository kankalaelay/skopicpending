import { styled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";

export const Button = styled(MuiButton)({
  textTransform: "none",
  color: "#000",
  fontWeight: 400,
});

export const CenteredElements = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
