import cn from "classnames";
import MuiButton from "@mui/material/Button";
import { Typography, Box } from "@mui/material";

function Button(props = {}) {
  const { label = "button", active = false, ...other } = props;

  return (
    <Typography
      component="button"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      width="max-content"
      boxSizing="border-box"
      padding="12px 16px"
      fontSize="16px"
      border={`1px solid ${active ? "rgba(40, 103, 187, 0.1)" : "#D0D5DD"}`}
      color={active ? "#2867BB" : "#101828"}
      backgroundColor={active ? "rgba(40, 103, 187, 0.1)" : "#fff"}
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
      borderRadius="6px"
      {...other}>
      <Typography
        component="span"
        fontWeight={active ? 500 : 400}
        style={{ cursor: "pointer" }}>
        {label}
      </Typography>
    </Typography>
  );
}

export default Button;
