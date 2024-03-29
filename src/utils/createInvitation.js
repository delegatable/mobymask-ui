import { ethers } from "ethers";

const { signDelegation } = require("eth-delegatable-utils");
const { chainId, address, name } = require("./config");
const CONTRACT_NAME = name;
const sigUtil = require("eth-sig-util");
const { TypedDataUtils } = sigUtil;
const types = require("./types");

export default function createInvitation(invitation) {
  const { signedDelegations, key } = invitation;
  const signedDelegation = signedDelegations[signedDelegations.length - 1];

  const delegate = ethers.Wallet.createRandom();
  const delegationHash = TypedDataUtils.hashStruct(
    "SignedDelegation",
    signedDelegation,
    types.types,
    true,
  );
  const hexHash = "0x" + delegationHash.toString("hex");

  const delegation = {
    delegate: delegate.address,
    authority: hexHash,

    // Revokable by default:
    caveats: [
      {
        enforcer: address,
        terms:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
    ],
  };

  const newSignedDelegation = signDelegation(delegation, key, {
    chainId,
    verifyingContract: address,
    name: CONTRACT_NAME,
  });
  const newInvite = {
    signedDelegations: [...signedDelegations, newSignedDelegation],
    key: delegate.privateKey,
  };
  return newInvite;
}
