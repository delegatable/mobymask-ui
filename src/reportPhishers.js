import { ethers } from "ethers";
import contractInfo from "./contractInfo";
import { MOBYMASK_TOPIC } from "./constants";
const { createMembership } = require("eth-delegatable-utils");
const { abi } = require("./artifacts");
const { chainId, address, name } = require("./config.json");
const CONTRACT_NAME = name;

export default async function reportPhishers({ phishers, invitation, provider = null, peer = null }) {
  const { key, signedDelegations } = invitation;
  const membership = createMembership({
    contractInfo,
    invitation,
  });

  let registry = new ethers.Contract(address, abi);
  
  if (provider) {
    const wallet = provider.getSigner();
    registry = await attachRegistry(registry, wallet);
  }

  const invocations = await Promise.all(
    phishers.map(async phisher => {
      const desiredTx = await registry.populateTransaction.claimIfPhisher(phisher, true);
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

  console.dir({ signedInvocations });
  console.log('reporting phishers', signedInvocations);

  if (peer) {
    // Broadcast invocations on the network
    peer.floodMessage(MOBYMASK_TOPIC, [signedInvocations]);
  } else {
    return await registry.invoke([signedInvocations]);
  }
}

async function attachRegistry(registry, signer) {
  registry = registry.attach(address);
  registry = registry.connect(signer);
  const deployed = await registry.deployed();
  return deployed;
}
