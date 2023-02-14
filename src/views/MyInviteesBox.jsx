import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Typography, Box } from "@mui/material";
import cn from "classnames";
import contractInfo from "../contractInfo";
import {
  invitationAtom,
  outstandingInvitationsAtom,
} from "../atoms/invitationAtom";

import Button from "../components/Button";
import copyInvitationLink from "../copyInvitationLink";
import MyInviteesReportHistory from "./MyInviteesReportHistory";
import MyInvitations from "./MyInvitations";
import linkForInvitation from "../linkForInvitation";
import CreateInvitationModal from "../components/CreateInvitationModal";
import { styled } from "@emotion/styled";
const { createMembership } = require("eth-delegatable-utils");

function MyInviteesBox() {
  return (
    <Box marginTop="80px">
      <Typography
        component="h3"
        fontSize="20px"
        marginBottom="24px"
        color="#101828"
        fontWeight={600}>
        My invitees
      </Typography>
      {MyInvitees()}
    </Box>
  );
}

function MyInvitees() {
  const [open, setOpen] = useState(false);
  const invitation = useAtomValue(invitationAtom);
  const [outstandingInvitations, setOutstandingInvitations] = useAtom(
    outstandingInvitationsAtom
  );

  if (!invitation) {
    return (
      <Box>
        <Typography component="h3">Processing invitation...</Typography>
      </Box>
    );
  }
  const tier = invitation.signedDelegations.length;

  const membership = createMembership({
    invitation,
    contractInfo,
  });

  const addInvitation = (invitation) => {
    if (invitation) {
      const newInvites = [...outstandingInvitations, invitation];
      setOutstandingInvitations(newInvites);
    }
  };

  const createNewLink = (petName) => {
    const newInvitation = membership.createInvitation();
    copyInvitationLink(newInvitation, petName)
      .then(() => {
        addInvitation({
          petName,
          invitationLink: linkForInvitation(newInvitation),
          invitation: newInvitation,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => setOpen(false);

  if (tier < 4) {
    return (
      <Box
        border="1px solid #D0D5DD"
        borderRadius="10px"
        paddingX="32px"
        paddingY="80px">
        <Typography
          component="img"
          src={require("../assets/Invite_icon.png")}
          width="80px"
          height="80px"
          margin="auto"
          display="block"
          marginBottom="45px"
          alt=""
        />
        <Box
          component="p"
          width="670px"
          margin="auto"
          color="#2867BB"
          fontSize="20px"
          marginBottom="29px">
          You are a tier {tier} invitee.
          <br />
          This means you can invite up to {4 - tier} additional tiers of
          members.
        </Box>
        <Box
          component="p"
          width="670px"
          margin="auto"
          color="#666F85"
          fontSize="16px"
          marginBottom="24px">
          Invite people who you think will respect the system, and only report
          definite impostors and frauds, and only endorse people who are
          neither.
          <br />
          <br />
          If you invite an abusive person and don't revoke their activity
          quickly, you may have your membership revoked.
        </Box>
        <Box component="p" textAlign="center" marginBottom="86px">
          <Button
            style={{
              background: "linear-gradient(90deg, #334FB8 0%, #1D81BE 100%)",
            }}
            color="#fff"
            display="inline-block"
            margin="auto"
            borderRadius="100px"
            label="Create new invite link"
            onClick={() => setOpen(true)}
          />
        </Box>
        <MyInviteesReportHistory />
        <MyInvitations />
        <CreateInvitationModal {...{ createNewLink, open, handleClose }} />
      </Box>
    );
  } else if (tier === 4) {
    return (
      <Box border="1px solid #D0D5DD" borderRadius="10px" padding="80px 32px">
        <Box width="670px" margin="auto" color="#666F85" marginBottom="24px">
          {" "}
          You are a tier 4 member. That means you can't currently invite new
          members through this interface, but if this site becomes popular, we
          can add support for this later.
        </Box>
      </Box>
    );
  }
}

export default MyInviteesBox;
