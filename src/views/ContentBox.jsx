import Box from "@mui/material/Box";
import PendingReports from "./PendingReports";
import ReportHistory from "./ReportHistory";
import MyInviteesBox from "./MyInviteesBox";

function ContentBox() {
  return (
    <Box width="55.581260%" minWidth="600px" margin="auto">
      <PendingReports />
      <ReportHistory />
      <MyInviteesBox />
    </Box>
  );
}

export default ContentBox;
