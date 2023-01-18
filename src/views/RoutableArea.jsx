import React, { useMemo, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
// Routes
import ContentBox from "./ContentBox";
import Members from "./Members";
import contractInfo from "../contractInfo";
import { invitationAtom } from "../atoms/invitationAtom";

const { validateInvitation } = require("eth-delegatable-utils");
const config = require("../config.json");
const { chainId } = config;

export default function RoutableArea(props) {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const navigate = useNavigate();
  const [invitation, setInvitation] = useAtom(invitationAtom);
  const [loadingFromDisk, setLoadingFromDisk] = useState(false);

  useEffect(() => {
    async function checkInvitations() {
      if (!loadingFromDisk) {
        setLoadingFromDisk(true);
        console.log("invitation", invitation);
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
