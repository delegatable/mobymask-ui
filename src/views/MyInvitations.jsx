import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAtom, useAtomValue } from "jotai";
import cn from "classnames";
import createRegistry from "../createRegistry";
import copyInvitationLink from "../copyInvitationLink";
import { outstandingInvitationsAtom } from "../atoms/invitationAtom";
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
    outstandingInvitationsAtom
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
            <Button
              className="rounded-[100px] h-[48px] inline-flex"
              label="copy"
              onClick={() => copyLink(row)}
            />{" "}
            &nbsp;
            <Button
              className="rounded-[100px] h-[48px] inline-flex"
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
    try {
      const { signedDelegations } = row.invitation;
      const signedDelegation = signedDelegations[signedDelegations.length - 1];

      const delegationHash = createSignedDelegationHash(signedDelegation);
      const intendedRevocation = {
        delegationHash,
      };
      const signedIntendedRevocation = util.signRevocation(
        intendedRevocation,
        invitation.key
      );

      await registry.revokeDelegation(
        signedDelegation,
        signedIntendedRevocation
      );

      const newInvites = [...outstandingInvitations];
      newInvites.splice(index, 1);
      setOutstandingInvitations(newInvites);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cn("pt-[77px]")}>
      <h3 className={cn("text-[16px] mb-[24px]")}>My Invitations</h3>
      <p className="mb-[40px]">
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
            className: "mx-[8px]",
            onClick: () => setActive(2),
          }}
        />
      </p>
      {active === 1 ? (
        <TableList {...{ tableHeader, tabList: outstandingInvitations }} />
      ) : (
        <div
          className={cn(
            "h-[84px] flex justify-start items-center",
            "text-[16px] text-left",
            "border-y-[0.5px] border-solid border-[#E5E5E5]"
          )}>
          <div className={cn("w-[160px] shrink-0")}>1234</div>
          <div className="text-[#D0D5DD]">
            https://mobymask.com/#/members?238%nsdfg23824...
          </div>
        </div>
      )}
    </div>
  );
}

export default MyInvitations;
