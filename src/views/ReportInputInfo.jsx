import { useState, useEffect } from "react";
import cn from "classnames";
import Button from "../components/Button";
import { useAtom } from "jotai";
import { pendingPhishersAtom } from "../atoms/phisherAtom";
import { reportTypes } from "../constants";

function ReportInputInfo(props) {
  const {
    isLoading,
    checkResult,
    selectedOption,
    phisher = "",
    clearPhisher = () => {},
  } = props;
  const [storedPhishers, setStoredPhishers] = useAtom(pendingPhishersAtom);

  const handleReport = () => {
    if (checkResult) {
      reportIsNotPhisher();
    } else {
      reportIsPhisher();
    }
  };

  const reportIsPhisher = () => {
    const isPhisher = storedPhishers.find((item) => item.name === phisher);
    if (!isPhisher && phisher) {
      const typeLabel = reportTypes.find(
        (reportType) => reportType.value === selectedOption
      )?.label;
      const info = { type: typeLabel, name: phisher, status: "Pending" };
      setStoredPhishers([...storedPhishers, info]);
    }
    clearPhisher("");
  };
  const reportIsNotPhisher = () => {};

  return (
    <div
      className={cn(
        "w-[100%] p-[32px] mt-[10px]",
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
              src={require("../assets/ethereumLogo.png")}
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
          <Button
            {...{
              label: `Repot ${checkResult ? "not" : ""} Phisher`,
              active: false,
              click: handleReport,
            }}
          />
        </>
      )}
    </div>
  );
}

export default ReportInputInfo;
