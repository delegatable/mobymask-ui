import { atomWithStorage } from "jotai/utils";

export const invitationAtom = atomWithStorage(
  "invitation",
  localStorage.getItem("invitation") || ""
);

export const outstandingInvitationsAtom = atomWithStorage(
  "outstandingInvitations",
  localStorage.getItem("outstandingInvitations") || []
);
