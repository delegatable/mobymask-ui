import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import cn from "classnames";
import Button from "../components/Button";
import {
  pendingPhishersAtom,
  pendingNotPhishersAtom,
} from "../atoms/phisherAtom";
import { invitationAtom } from "../atoms/invitationAtom";
import { reportTypes } from "../constants";
import { reportHandle } from "../checkPhisherStatus";

function ReportInputInfo(props) {
  const {
    isLoading,
    checkResult,
    selectedOption,
    phisher = "",
    clearPhisher = () => {},
  } = props;
  const [storedPhishers, setStoredPhishers] = useAtom(pendingPhishersAtom);
  const [storedNotPhishers, setStoredNotPhishers] = useAtom(
    pendingNotPhishersAtom
  );
  const invitation = useAtomValue(invitationAtom);

  const handleReport = () => {
    reportHandle({
      phisher,
      checkResult,
      store: checkResult ? storedNotPhishers : storedPhishers,
      setStore: checkResult ? setStoredNotPhishers : setStoredPhishers,
      clearPhisher,
      reportTypes,
      selectedOption,
    });
  };

  const getIcon = () => {
    switch (selectedOption) {
      case "eip155:1":
        return require(`../assets/ICON_ETH.png`);
      case "TWT":
        return require(`../assets/ICON_TWT.png`);
      case "URL":
        return require(`../assets/ICON_URL.png`);
    }
  };

  return (
    <div
      className={cn(
        "w-[100%] p-[32px] mt-[10px] box-border",
        "border-[0.5px] border-solid border-[#D0D5DD] rounded-[10px]"
      )}>
      {isLoading ? (
        <>checking...</>
      ) : (
        <>
          <div
            className={cn(
              "w-[100%] flex justify-start items-center pb-[24px]",
              "border-b-[0.5px] border-solid border-[#D0D5DD]"
            )}>
            <img
              className={cn("w-[60px] h-[60px] flex-shrink-0 mr-[20px]")}
              src={getIcon()}
              alt=""
            />
            <span
              className={cn(
                "w-[100%] text-[18px] font-[600] text-[#101828] text-left"
              )}>
              {phisher + " "}
              <span
                className={cn(
                  checkResult ? " text-[#FF5056]" : "text-[#61BA60]"
                )}>
                is {!checkResult && "not"} a registered phisher.
              </span>
            </span>
            <img
              className={cn("w-[20px] h-[20px] flex-shrink-0")}
              src={require("../assets/ethereumLogo.png")}
              alt=""
            />
          </div>
          <p className="text-[16px] text-[#666F85] my-[24px] text-left">
            In doubt about this result, you can take the following actions
          </p>
          {invitation && (
            <Button
              {...{
                label: `Report ${checkResult ? "not" : ""} Phisher`,
                active: false,
                onClick: handleReport,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ReportInputInfo;
