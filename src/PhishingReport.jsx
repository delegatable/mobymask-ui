import React, { useEffect, useState, useContext } from "react";
import { PeerContext } from "@cerc-io/react-peer";
import reportPhishers from "./reportPhishers";
import LazyConnect from "./LazyConnect";
import ReportInput from './ReportInput';
import createPhisherLabel from "./createPhisherLabel";
const { ethers } = require("ethers");
const config = require("./config.json");
const { chainId } = config;

export default function (props) {
  const { invitation } = props;
  const [phishers, setPhishers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    try {
      const rawStorage = localStorage.getItem("pendingPhishers");
      let storedPhishers = JSON.parse(rawStorage) || [];
      setPhishers(storedPhishers);
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="box">
      <h3>Report a phishing attempt</h3>

      <ReportInput onSubmit={(_phisher) => {
          const newPhishers = [...phishers, _phisher];
          localStorage.setItem("pendingPhishers", JSON.stringify(newPhishers));
          setPhishers(newPhishers);
      }} />

      <div className="phishers">
        {phishers && phishers.length > 0 ? (
          <div>
            <p>Pending phishing reports:</p>
            <ol>
              {phishers.map((phisher, index) => {
                const phisherLabel = createPhisherLabel(phisher);
                return (
                  <li key={index}>
                    {phisherLabel}{" "}
                    <button
                      onClick={() => {
                        const newPhishers = phishers.filter(p => p !== phisher);
                        localStorage.setItem("pendingPhishers", JSON.stringify(newPhishers));
                        setPhishers(newPhishers);
                      }}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ol>

            <SubmitBatchButton p2p phishers={phishers} invitation={invitation} setPhishers={setPhishers} />
            <br/>
            <LazyConnect actionName="submit reports directly to the blockchain" chainId={chainId}>
              <SubmitBatchButton phishers={phishers} invitation={invitation} setPhishers={setPhishers} />
            </LazyConnect>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SubmitBatchButton(props) {
  const { provider, phishers, invitation, setPhishers, p2p } = props;
  const peer = useContext(PeerContext);
  
  const reportPhishersOptions = {
    phishers,
    invitation
  };

  if (p2p) {
    reportPhishersOptions.peer = peer;
  } else {
    const ethersProvider = new ethers.providers.Web3Provider(provider, "any");
    reportPhishersOptions.provider = ethersProvider;
  }

  return (
    <div>
      <button
        onClick={async () => {
          try {
            const block = await reportPhishers(reportPhishersOptions);
            localStorage.clear();
            setPhishers([]);
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }}
      >
        { p2p ? 'Submit batch to p2p network' : 'Submit batch to blockchain' }
      </button>
    </div>
  );
}
