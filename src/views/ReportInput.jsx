import React, { useState, useRef, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { reportTypes as options } from "../constants";
import { toast } from "react-hot-toast";
import { gql } from "@apollo/client";
import useLazyQuery from "../hooks/useLazyQuery";
import LATEST_BLOCK_GRAPHQL from "../queries/latestBlock";
import IS_PHISHER_GRAPHQL from "../queries/isPhisher";
// import createPhisherLabel from "../createPhisherLabel";
import { checkPhisherStatus } from "../checkPhisherStatus";
import ReportInputInfo from "../views/ReportInputInfo";
import config from "../config.json";
import search_icon from "../assets/search.png";
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
    if (!inputRef.current.value) return;
    setIsLoading(true);
    setIsShow(true);
    try {
      const result = await checkPhisherStatus(
        selectedOption,
        inputRef.current.value,
        latestBlock,
        isPhisher
      );
      if (result) {
        setCheckResult(result?.isPhisher?.value);
      } else {
        console.error(result);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
    setIsLoading(false);
  }

  const changeOptions = (item) => {
    clearPhisher();
    setSelectedOption(item.value);
  };

  const clearPhisher = () => {
    setIsShow(false);
    inputRef.current.value = "";
  };

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      submitFrom();
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        {options.map((item) => (
          <Box
            margin="0 4px"
            padding="8px 18px 6px 18px"
            border="1px solid #D0D5DD"
            color={selectedOption === item.value ? "#fff" : "#D0D5DD"}
            backgroundColor={selectedOption === item.value ? "#101828" : "#fff"}
            borderRadius="10px 10px 0px 0px"
            borderBottom="none"
            style={{ cursor: "pointer" }}
            key={item.value}
            onClick={() => changeOptions(item)}>
            {item?.label}
          </Box>
        ))}
      </Box>
      <Box
        position="relative"
        width="100%"
        height="80px"
        margin="auto"
        border="1px solid #D0D5DD"
        box-shadow="0px 0px 30px rgba(0, 0, 0, 0.05)"
        borderRadius="100px">
        <Typography
          width="100%"
          height="100%"
          fontSize="18px"
          padding="0 35px"
          boxSizing="border-box"
          border="1px solid #D0D5DD"
          borderRadius="100px"
          component="input"
          ref={inputRef}
          onKeyDown={keyDown}
          placeholder="Enter a twitter name to check if it is a phisher..."
        />
        <Typography
          component="img"
          width="24px"
          height="24px"
          position="absolute"
          top="50%"
          right="28px"
          style={{ cursor: "pointer", transform: "translateY(-50%)" }}
          src={search_icon}
          onClick={submitFrom}
        />
      </Box>
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

export default React.memo(ReportInput);
