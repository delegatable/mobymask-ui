import linkForInvitation from "./linkForInvitation";

export default function copyInvitationLink(invitation, inviteeName) {
  return new Promise((resolve) => {
    const inviteLink = linkForInvitation(invitation);
    navigator.clipboard
      .writeText(inviteLink)
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        resolve(err);
      });
  });
}
