import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { useAtom, useAtomValue } from "jotai";
import cn from "classnames";

import { CopyToClipboard } from "react-copy-to-clipboard";

import createRegistry from "../createRegistry";
import copyInvitationLink from "../copyInvitationLink";
import {
  outstandingInvitationsAtom,
  revokedInvitationsAtom,
} from "../atoms/invitationAtom";
import { invitationAtom } from "../atoms/invitationAtom";
import { providerAtom } from "../atoms/providerAtom";
import Button from "../components/Button";
import TableList from "../components/TableList";

const {
  generateUtil,
  createSignedDelegationHash,
} = require("eth-delegatable-utils");

const { chainId, address, name } = require("../config.json");
const CONTRACT_NAME = name;
const util = generateUtil({
  chainId,
  verifyingContract: address,
  name: CONTRACT_NAME,
});
function MyInvitations() {
  const [active, setActive] = useState(1);
  const [outstandingInvitations, setOutstandingInvitations] = useAtom(
    outstandingInvitationsAtom,
  );

  const [revokedInvitations, setRevokedInvitations] = useAtom(
    revokedInvitationsAtom,
  );

  const provider = useAtomValue(providerAtom);

  const invitation = useAtomValue(invitationAtom);

  const tableHeader = [
    {
      key: "petName",
      title: "Invite Name",
    },
    {
      key: "invitationLink",
      title: "Invite link",
      render: (val) => val && `${val.slice(0, 50)}...${val.slice(-4)}`,
    },
    {
      key: "Action",
      title: "Action",
      render: (val, row, index) => {
        return (
          <>
            <CopyToClipboard text={row.invitationLink}>
              <Button borderRadius="100px" height="48px" label="copy" />
            </CopyToClipboard>
            &nbsp;
            <Button
              borderRadius="100px"
              height="48px"
              label="revoke"
              onClick={() => revokeLink(row, index)}
            />
          </>
        );
      },
    },
  ];

  const ethersProvider = new ethers.providers.Web3Provider(provider, "any");

  const [registry, setRegistry] = useState(null);

  useEffect(() => {
    if (registry) {
      return;
    }
    createRegistry(ethersProvider)
      .then((_registry) => {
        setRegistry(_registry);
      })
      .catch(console.error);
  });

  const copyLink = (row) => {
    copyInvitationLink(row.invitation, row.petName)
      .then(() => {})
      .catch(console.error);
  };

  const revokeLink = async (row, index) => {
    const loading = toast.loading("Waiting...");
    try {
      const { signedDelegations } = row.invitation;
      const signedDelegation = signedDelegations[signedDelegations.length - 1];

      const delegationHash = createSignedDelegationHash(signedDelegation);
      const intendedRevocation = {
        delegationHash,
      };
      const signedIntendedRevocation = util.signRevocation(
        intendedRevocation,
        invitation.key,
      );

      const result = await registry.revokeDelegation(
        signedDelegation,
        signedIntendedRevocation,
      );
      await result.wait();
      const newInvites = [...outstandingInvitations];
      const deleteInvites = newInvites.splice(index, 1);
      setOutstandingInvitations(newInvites);
      setRevokedInvitations([...revokedInvitations, ...deleteInvites]);
      toast.success("Revoke success!");
    } catch (err) {
      console.error(err);
      toast.error(err.reason || err.error.message);
    }
    toast.dismiss(loading);
  };

  return (
    <Box>
      <Typography
        component="h3"
        fontSize="16px"
        marginBottom="24px"
        fontWeight={600}
      >
        My Invitations
      </Typography>
      <Box component="p" marginBottom="24px">
        <Button
          {...{
            label: "Outstanding Invitations",
            active: active === 1,
            onClick: () => setActive(1),
          }}
        />
        <Button
          {...{
            label: "Revoked invitations",
            active: active === 2,
            marginX: "8px",
            onClick: () => setActive(2),
          }}
        />
      </Box>
      {active === 1 ? (
        <TableList {...{ tableHeader, tabList: outstandingInvitations }} />
      ) : revokedInvitations.length === 0 ? (
        <Typography textAlign="center" margin="60px">
          No Records
        </Typography>
      ) : (
        revokedInvitations.map((item) => (
          <Box
            height="84px"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            fontSize="16px"
            textAlign="left"
            borderBottom="1px solid #E5E5E5"
            key={`revokedInvitations${item.petName}${item.invitationLink}`}
          >
            <Box width="160px" flexShrink="0">
              {item.petName}
            </Box>
            <Box color="#D0D5DD">
              {item.invitationLink &&
                `${item.invitationLink.slice(
                  0,
                  50,
                )}...${item.invitationLink.slice(-4)}`}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}

export default MyInvitations;
