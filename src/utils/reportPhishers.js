import { ethers } from "ethers";
import contractInfo from "./contractInfo";
const { createMembership } = require("eth-delegatable-utils");
const { abi } = require("../contracts/abi.json");
const { address } = require("./config.json");

export default async function reportPhishers(
  phishers,
  provider,
  invitation,
  isPhisher,
) {
  const { signedDelegations } = invitation;
  const membership = createMembership({
    contractInfo,
    invitation,
  });

  const wallet = provider.getSigner();
  const registry = await attachRegistry(wallet);

  const invocations = await Promise.all(
    phishers.map(async (phisher) => {
      // true  false: not
      const desiredTx = await registry.populateTransaction.claimIfPhisher(
        phisher,
        isPhisher,
      );
      const invocation = {
        transaction: {
          to: address,
          data: desiredTx.data,
          gasLimit: 500000,
        },
        authority: signedDelegations,
      };
      return invocation;
    }),
  );
  console.dir({ invocations });

  const queue = Math.floor(Math.random() * 100000000);
  const signedInvocations = membership.signInvocations({
    batch: invocations,
    replayProtection: {
      nonce: 1,
      queue,
    },
  });

  return await registry.invoke([signedInvocations]);
}

async function attachRegistry(signer) {
  const Registry = new ethers.Contract(address, abi, signer);
  const _registry = await Registry.attach(address);
  const deployed = await _registry.deployed();
  return deployed;
}
