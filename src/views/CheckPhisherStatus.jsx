import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReportInput from "./ReportInput";
function CheckPhisherStatus() {
  return (
    <Box width="961px" margin="auto" textAlign="center">
      <Typography
        component="h1"
        fontSize="62px"
        paddingBottom="20px"
        fontWeight="600"
        marginTop="79px"
        lineHeight="1.2">
        Check Phisher Status
      </Typography>
      <Typography
        component="p"
        color="#101828"
        fontWeight="400"
        fontSize="16px"
        lineHeight="1.2"
        marginBottom="44px">
        An alliance of good-hearted phish, aiming to eliminate phishers.
      </Typography>
      <ReportInput />
    </Box>
  );
}

export default CheckPhisherStatus;
