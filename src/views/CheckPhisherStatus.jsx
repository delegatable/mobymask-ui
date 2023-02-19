import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReportInput from "./ReportInput";
function CheckPhisherStatus() {
  return (
    <Box
      width="96%"
      maxWidth="960px"
      minWidth="600px"
      margin="auto"
      textAlign="center"
      paddingTop="80px"
    >
      <Typography component="h1" fontSize="62px" fontWeight="600">
        Check Phisher Status
      </Typography>
      <Typography fontSize="16px" marginTop="20px" marginBottom="44px">
        An alliance of good-hearted phish, aiming to eliminate phishers.
      </Typography>
      <ReportInput />
    </Box>
  );
}

export default CheckPhisherStatus;
