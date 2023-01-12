import { useState, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { useNavigate, useLocation } from "react-router-dom";
import contractInfo from "../contractInfo";
import ReportInput from "./ReportInput";
import PendingReports from "./PendingReports";
import ReportHistory from "./ReportHistory";

import { invitationAtom } from "../atoms/invitationAtom";
import MyInviteesBox from "./MyInviteesBox";

const { validateInvitation } = require("eth-delegatable-utils");
const { chainId } = contractInfo;
function ContentBox() {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const navigate = useNavigate();
  const [invitation, setInvitation] = useAtom(invitationAtom);
  const [loadingFromDisk, setLoadingFromDisk] = useState(false);

  useEffect(() => {
    async function checkInvitations() {
      if (!loadingFromDisk) {
        setLoadingFromDisk(true);

        if (!invitation) {
          try {
            let parsedInvitation = JSON.parse(query.get("invitation"));
            if (!parsedInvitation) return;
            validateInvitation({
              contractInfo,
              invitation: parsedInvitation,
            });
            setInvitation(parsedInvitation);
            setLoadingFromDisk(false);
            navigate("/members");
          } catch (err) {
            console.error(err.message);
          }
        }
      }
    }

    checkInvitations().catch(console.error);
  });
  return (
    <div className="pt-20 w-[910px] m-auto">
      <h1 className="text-[62px] pb-5 font-[600]">Check Phisher Status</h1>
      <h6 className="text-[#101828] text-xs mb-10">
        An alliance of good-hearted phish, aiming to eliminate phishers.
      </h6>
      <ReportInput />
      <PendingReports />
      <ReportHistory />
      <MyInviteesBox />
    </div>
  );
}

export default ContentBox;
