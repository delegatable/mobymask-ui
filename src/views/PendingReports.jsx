import { useState, useEffect, useRef } from "react";
import cn from "classnames";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useAtom, useAtomValue } from "jotai";
import {
  pendingPhishersAtom,
  pendingNotPhishersAtom,
} from "../atoms/phisherAtom";

import { invitationAtom } from "../atoms/invitationAtom";

import { reportTypes } from "../constants";

import LazyConnect from "./LazyConnect";
import Button from "../components/Button";
import TableList from "../components/TableList";
import SubmitBatchButton from "../components/SubmitBatchButton";

import LATEST_BLOCK_GRAPHQL from "../queries/latestBlock";
import IS_PHISHER_GRAPHQL from "../queries/isPhisher";
import { gql, useQuery } from "@apollo/client";
import useLazyQuery from "../hooks/useLazyQuery";
import { checkPhisherStatus, reportHandle } from "../checkPhisherStatus";

const config = require("../config.json");
const { chainId, address } = config;

function PendingReports() {
  const [active, setActive] = useState("ReportPhisher");
  const [storedPhishers, setStoredPhishers] = useAtom(pendingPhishersAtom);
  const invitation = useAtomValue(invitationAtom);
  const [storedNotPhishers, setStoredNotPhishers] = useAtom(
    pendingNotPhishersAtom
  );
  const [tabList, setTabList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("TWT");

  const inputRef = useRef();

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

  useEffect(() => {
    setTabList(active === "ReportPhisher" ? storedPhishers : storedNotPhishers);
  }, [active, storedPhishers, storedNotPhishers]);

  const tableHeader = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "type",
      title: "Type",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
      render: (val, row) => (
        <Button
          {...{
            label: "remove",
            active: false,
            onClick: () => removeClick(row),
          }}
        />
      ),
    },
  ];

  const removeClick = (row) => {
    if (active === "ReportPhisher") {
      removeStoredPhishers(row);
    } else {
      removeStoredNotPhishers(row);
    }
  };

  const removeStoredPhishers = (phisher) => {
    const newStoredPhishers = storedPhishers.filter(
      (item) => item.name !== phisher.name
    );
    setStoredPhishers(newStoredPhishers);
  };
  const removeStoredNotPhishers = (phisher) => {
    const newStoredNotPhishers = storedNotPhishers.filter(
      (item) => item.name !== phisher.name
    );
    setStoredNotPhishers(newStoredNotPhishers);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const checkInfo = async () => {
    if (!inputRef.current.value) return;
    const result = await checkPhisherStatus(
      selectedOption,
      inputRef.current.value,
      latestBlock,
      isPhisher
    );
    if (result) {
      console.log("result", result);
      reportHandle({
        phisher: inputRef.current.value,
        store: active === "ReportPhisher" ? storedPhishers : storedNotPhishers,
        setStore:
          active === "ReportPhisher" ? setStoredPhishers : setStoredNotPhishers,
        reportTypes,
        selectedOption,
      });
      inputRef.current.value = "";
    } else {
      console.error(result);
    }
  };

  return (
    <div className={cn("pt-[77px]")}>
      <h3 className={cn("text-[20px] mb-[24px]")}>Pending reports</h3>
      <p className="mb-[22px]">
        <Button
          {...{
            label: "Report Phisher",
            active: active === "ReportPhisher",
            className: "mr-[8px]",
            onClick: () => setActive("ReportPhisher"),
          }}
        />
        <Button
          {...{
            label: "Report not Phisher",
            active: active === "ReportNotPhisher",
            onClick: () => setActive("ReportNotPhisher"),
          }}
        />
      </p>

      <div
        className={cn(
          "border-[0.5px] border-solid border-[#D0D5DD] rounded-[10px]",
          "px-[32px] py-[32px]"
        )}>
        <TableList {...{ tableHeader, tabList }} />
        <div className={cn("flex justify-center items-center  mb-5")}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              className="w-[150px] h-[54px] rounded-[100px]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOption}
              label="Type"
              onChange={handleChange}>
              {reportTypes.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            className={cn(
              "flex justify-start items-center box-border",
              "w-[347px] h-[54px] rounded-[100px] p-[5px] ml-[16px]",
              "border-[1px] border-solid border-[#D0D5DD]"
            )}>
            <input
              className={cn(
                "w-[100%] h-[100%] block border-0 rounded-[100px] pl-[10px]",
                "outline-none"
              )}
              ref={inputRef}
              placeholder="Enter new names.."
            />
            <Button
              className="w-[81px] h-[100%] flex justify-center items-center bg-gradient-to-r from-[#334FB8] to-[#1D81BE] text-white text-[16px] m-auto rounded-[100px] shrink-0"
              label="Enter"
              onClick={checkInfo}
            />
          </div>
        </div>
        <LazyConnect
          actionName=" submit reports directly to the blockchain.Get a web3 compatible wallet(like metamask) to proceed."
          chainId={chainId}
          opts={{ needsAccountConnected: true }}>
          <SubmitBatchButton
            type={active}
            subData={
              active === "ReportPhisher" ? storedPhishers : storedNotPhishers
            }
            invitation={invitation}
            setLocalData={
              active === "ReportPhisher"
                ? setStoredPhishers
                : setStoredNotPhishers
            }
          />
        </LazyConnect>
      </div>
    </div>
  );
}

export default PendingReports;
