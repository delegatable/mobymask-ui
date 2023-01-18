import React, { useState, useRef, useEffect } from "react";
import { reportTypes as options } from "../constants";
import cn from "classnames";

import { gql, useQuery } from "@apollo/client";
import useLazyQuery from "../hooks/useLazyQuery";
import LATEST_BLOCK_GRAPHQL from "../queries/latestBlock";
import IS_PHISHER_GRAPHQL from "../queries/isPhisher";
import createPhisherLabel from "../createPhisherLabel";
import ReportInputInfo from "./ReportInputInfo";
import config from "../config.json";
const { address } = config;

function ReportInput() {
  const [selectedOption, setSelectedOption] = useState("TWT");
  const [checkResult, setCheckResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [selectedOption]);

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

  async function submitFrom() {
    setIsLoading(true);
    setIsShow(true);
    const result = await checkPhisher(inputRef.current.value);
    if (result) {
      setCheckResult(result?.isPhisher?.value);
    } else {
      console.error(result);
    }
    setIsLoading(false);
  }

  const checkPhisher = async (codedName) => {
    try {
      const { data: latestBlockData } = await latestBlock();
      const { data } = await isPhisher({
        blockHash: latestBlockData?.latestBlock?.hash,
        key0: codedName,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const changeOptions = (item) => {
    clearPhisher();
    setSelectedOption(item.value);
  };

  const clearPhisher = () => {
    setIsShow(false);
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="flex justify-center">
        {options.map((item) => (
          <div
            className={cn(
              "mx-1 cursor-pointer",
              "px-[17.5px] pt-[8.5px] pb-[6.5px]",
              "rounded-t-[10px] border-[0.5px] border-[#D0D5DD] border-solid",
              selectedOption === item.value ? "text-white" : "#D0D5DD",
              selectedOption === item.value ? "bg-[#101828]" : "bg-white"
            )}
            key={item.value}
            onClick={() => changeOptions(item)}>
            {item?.label}
          </div>
        ))}
      </div>
      <div className="relative w-[100%] m-auto rounded-[100px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <input
          ref={inputRef}
          className={cn(
            "w-[100%] h-[80px] m-auto text-[18px] px-[35px] box-border",
            "border-[0.5px] border-solid border-[#D0D5DD] rounded-[100px]"
          )}
          placeholder="Enter a twitter name to check if it is a phisher..."
        />
        <span
          className="absolute top-[30px] right-9 cursor-pointer"
          onClick={submitFrom}>
          🔍
        </span>
      </div>
      {isShow && (
        <ReportInputInfo
          {...{
            checkResult,
            selectedOption,
            phisher: inputRef.current.value,
            clearPhisher,
            isLoading,
          }}
        />
      )}
    </>
  );
}

function sanitizeValue(type, value) {
  switch (type) {
    case "TWT":
      value = value.indexOf("@") === 0 ? value.slice(1) : value;
      break;

    case "URL":
      value = value.indexOf("//") === -1 ? value : value.split("//")[1];
      break;

    case "eip155:1":
      value = value.indexOf("0x") === 0 ? value : `0x${value}`;
      value = value.toLowerCase();
      break;
  }

  return `${type}:${value}`;
}

export default React.memo(ReportInput);
