import cn from "classnames";
import Button from "./Button";
import reportMembers from "../reportMembers";
import reportPhishers from "../reportPhishers";
const { ethers } = require("ethers");
function SubmitBatchButton(props) {
  const { type, provider, subData, invitation = false, setLocalData } = props;
  const ethersProvider = new ethers.providers.Web3Provider(provider, "any");

  const submitClick = () => {
    switch (type) {
      case "ReportPhisher":
        phishingReport();
        break;
      case "ReportNotPhisher":
        // phishingReport();
        break;
    }
  };

  const memberReport = async () => {
    if (!invitation) return;
    try {
      await reportMembers(subData, ethersProvider, invitation);
      setLocalData([]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const phishingReport = async () => {
    try {
      await reportPhishers(subData, ethersProvider, invitation);
      setLocalData([]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <Button
      className="bg-gradient-to-r from-[#334FB8] to-[#1D81BE] text-white inline-block m-auto"
      label="Submit batch to blockchain"
      click={submitClick}
    />
  );
}

export default SubmitBatchButton;
