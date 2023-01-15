import PendingReports from "./PendingReports";
import ReportHistory from "./ReportHistory";
import MyInviteesBox from "./MyInviteesBox";

function ContentBox() {
  return (
    <div className="pt-20 w-[961px] m-auto">
      <PendingReports />
      <ReportHistory />
      <MyInviteesBox />
    </div>
  );
}

export default ContentBox;
