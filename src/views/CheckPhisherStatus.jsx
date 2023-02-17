import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReportInput from "./ReportInput";
function CheckPhisherStatus() {
  return (
    <Box width="55.581260%" minWidth="600px" margin="auto" textAlign="center">
      <Typography
        component="h1"
        fontSize="62px"
        paddingBottom="2.08116545%"
        fontWeight="600"
        marginTop="8.220603%"
        lineHeight="1.2">
        Check Phisher Status
      </Typography>
      <Typography
        component="p"
        color="#101828"
        fontWeight="400"
        fontSize="16px"
        lineHeight="1.2"
        marginBottom="4.57856399%">
        An alliance of good-hearted phish, aiming to eliminate phishers.
      </Typography>
      <ReportInput />
    </Box>
  );
}

export default CheckPhisherStatus;
