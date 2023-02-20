import React, { useMemo, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
// Routes
import ContentBox from "./ContentBox";
// import Members from "../views/Members";
import contractInfo from "../utils/contractInfo";
import { invitationAtom } from "../atoms/invitationAtom";

const { validateInvitation } = require("eth-delegatable-utils");

export default function RoutableArea() {
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
        } else {
          navigate("/members");
        }
      }
    }

    checkInvitations().catch(console.error);
  });
  return (
    <Routes>
      <Route path="/members" element={invitation ? <ContentBox /> : null} />
    </Routes>
  );
}
