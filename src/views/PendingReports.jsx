import { useState, useEffect } from "react";
import cn from "classnames";

import { useAtom, useAtomValue } from "jotai";
import {
  pendingPhishersAtom,
  pendingNotPhishersAtom,
} from "../atoms/phisherAtom";

import { invitationAtom } from "../atoms/invitationAtom";

import LazyConnect from "./LazyConnect";
import Button from "../components/Button";
import TableList from "../components/TableList";
import SubmitBatchButton from "../components/SubmitBatchButton";

const config = require("../config.json");
const { chainId } = config;

function PendingReports() {
  const [active, setActive] = useState("ReportPhisher");
  const [storedPhishers, setStoredPhishers] = useAtom(pendingPhishersAtom);
  const invitation = useAtomValue(invitationAtom);
  const [storedNotPhishers, setStoredNotPhishers] = useAtom(
    pendingNotPhishersAtom
  );
  const [tabList, setTabList] = useState([]);

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
      render: (row) => (
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
