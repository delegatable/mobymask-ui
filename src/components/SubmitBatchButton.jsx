import cn from "classnames";
import Button from "./Button";
import reportMembers from "../reportMembers";
import reportPhishers from "../reportPhishers";
const { ethers } = require("ethers");
function SubmitBatchButton(props) {
  const { type, provider, subData, invitation = false, setLocalData } = props;
  const ethersProvider = new ethers.providers.Web3Provider(provider, "any");

  const submitClick = () => {
    phishingReport(type === "ReportPhisher");
  };

  // const memberReport = async () => {
  //   if (!invitation) return;
  //   try {
  //     await reportMembers(subData, ethersProvider, invitation);
  //     setLocalData([]);
  //   } catch (err) {
  //     console.error(`Error: ${err.message}`);
  //   }
  // };

  const phishingReport = async (isReportPhisher) => {
    try {
      await reportPhishers(
        subData,
        ethersProvider,
        invitation,
        isReportPhisher
      );
      setLocalData([]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <>
      {subData.length !== 0 && (
        <Button
          className="bg-gradient-to-r from-[#334FB8] to-[#1D81BE] text-white inline-block m-auto rounded-[100px]"
          label="Submit batch to blockchain"
          onClick={submitClick}
        />
      )}
    </>
  );
}

export default SubmitBatchButton;
