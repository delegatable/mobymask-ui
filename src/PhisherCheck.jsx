import React, { useState } from "react";
import ReportInput from "./views/ReportInput";
import { gql, useQuery } from "@apollo/client";
import useLazyQuery from "./hooks/useLazyQuery";
import LATEST_BLOCK_GRAPHQL from "./queries/latestBlock";
import IS_PHISHER_GRAPHQL from "./queries/isPhisher";
import createPhisherLabel from "./createPhisherLabel";
import config from "./config.json";
const { address } = config;

export default function PhisherCheck(props) {
  const [output, setOutput] = useState("");
  return (
    <div>
      <h3>Check Phisher Status</h3>
      <ReportInput onSubmit={(name) => {
        props
          .checkPhisher(name)
          .then(result => {
            setOutput(result);
          })
          .catch(console.error);
      }} />
      {output ? <p>{output}</p> : null}
    </div>
  );
}

export function PhisherCheckButton() {
  // Get latest block
  const LATEST_BLOCK_GQL = gql(LATEST_BLOCK_GRAPHQL);
  const latestBlock = useLazyQuery(LATEST_BLOCK_GQL, {
    fetchPolicy: "no-cache",
  });

  // Check if isPhisher
  const IS_PHISHER_GQL = gql(IS_PHISHER_GRAPHQL);
  const isPhisher = useLazyQuery(IS_PHISHER_GQL, {
    variables: {
      contractAddress: address,
    },
  });

  return (
    <PhisherCheck
      checkPhisher={async codedName => {
        try {
          const { data: latestBlockData } = await latestBlock();
          const { data } = await isPhisher({ blockHash: latestBlockData?.latestBlock?.hash, key0: codedName });

          const name = createPhisherLabel(codedName);

          if (data?.isPhisher?.value) {
            return `${name} is an accused phisher.`;
          } else {
            return `${name} is not a registered phisher.`;
          }
        } catch (err) {
          console.error(err);
        }
      }}
    />
  );
}
