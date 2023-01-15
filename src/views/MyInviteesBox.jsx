import { useState, useEffect, useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import cn from "classnames";
import contractInfo from "../contractInfo";
import {
  invitationAtom,
  outstandingInvitationsAtom,
} from "../atoms/invitationAtom";

import Button from "../components/Button";
import TableList from "../components/TableList";
import copyInvitationLink from "../copyInvitationLink";
import MyInviteesReportHistory from "./MyInviteesReportHistory";
import MyInvitations from "./MyInvitations";
const { createMembership } = require("eth-delegatable-utils");

function MyInviteesBox() {
  return (
    <div className={cn("pt-[80px]")}>
      <h3 className={cn("text-[20px] mb-[24px]")}>My invitees</h3>
      {MyInvitees()}
    </div>
  );
}

function MyInvitees() {
  const [invitations, setInvitations] = useState([]); // Outbound invitations
  const invitation = useAtomValue(invitationAtom);
  const [newInvites, setNewInvites] = useAtom(outstandingInvitationsAtom);

    if (!invitation) {
      return (
        <div>
          <h3>Processing invitation...</h3>
        </div>
      );
    }
    const tier = invitation.signedDelegations.length;

    const membership = createMembership({
      invitation,
      contractInfo,
    });

    const addInvitation = (invitation) => {
      if (invitation) {
        const newInvites = [...invitations, invitation];
        setNewInvites(newInvites);
      }
    };

    const createNewLink = () => {
      const petName = prompt(
        "Who is this invitation for (for your personal use only, so you can view their reports and revoke the invitation)?"
      );
      const newInvitation = membership.createInvitation();
      copyInvitationLink(newInvitation, petName)
        .then(() => {
          if (addInvitation) {
            addInvitation({
              petName,
              invitation: newInvitation,
            });
          }
        })
        .catch(() => {
          addInvitation({
            petName,
            invitation: newInvitation,
          });
        });
    };

  if (tier < 4) {
    return (
      <div
        className={cn(
          "border-[0.5px] border-solid rounded-[10px]",
          "px-[32px] py-[80px]"
        )}>
        <p
          className={cn(
            "w-[670px] m-auto text-[#2867BB] text-[20px] mb-[29px]"
          )}>
          You are a tier {tier} invitee.
          <br />
          This means you can invite up to {4 - tier} additional tiers of
          members.
        </p>
        <p
          className={cn(
            "w-[670px] m-auto text-[#666F85] text-[16px] mb-[24px]"
          )}>
          Invite people who you think will respect the system, and only report
          definite impostors and frauds, and only endorse people who are
          neither.
          <br />
          If you invite an abusive person and don't revoke their activity
          quickly, you may have your membership revoked.
        </p>
        <p className="text-center mb-[86px]">
          <Button
            className="bg-gradient-to-r from-[#334FB8] to-[#1D81BE] text-white inline-block m-auto rounded-[100px]"
            label="Create new invite link"
            click={createNewLink}
          />
        </p>
        <MyInviteesReportHistory />
        <MyInvitations />
      </div>
    );
  } else if (tier === 4) {
    return (
      <div
        className={cn(
          "border-[0.5px] border-solid rounded-[10px]",
          "px-[32px] py-[80px]"
        )}>
        <p
          className={cn(
            "w-[670px] m-auto text-[#666F85] text-[16px] mb-[24px]"
          )}>
          {" "}
          You are a tier 4 member. That means you can't currently invite new
          members through this interface, but if this site becomes popular, we
          can add support for this later.
        </p>
      </div>
    );
  }
}

export default MyInviteesBox;
