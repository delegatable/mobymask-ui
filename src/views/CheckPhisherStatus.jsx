import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReportInput from "./ReportInput";
function CheckPhisherStatus() {
  return (
    <Box
      width="96%"
      maxWidth="960px"
      margin="auto"
      textAlign="center"
      paddingTop={{ xs: 5, sm: 10 }}
    >
      <Typography variant="h1">Check Phisher Status</Typography>
      <Typography variant="body1" marginTop={2.5} marginBottom={5}>
        An alliance of good-hearted phish, aiming to eliminate phishers.
      </Typography>
      <ReportInput />
    </Box>
  );
}

export default CheckPhisherStatus;
