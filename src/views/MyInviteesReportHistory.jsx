import { useState } from "react";
import cn from "classnames";
import Button from "../components/Button";
import TableList from "../components/TableList";
function MyInviteesReportHistory() {
  const [active, setActive] = useState(1);
  const [tabList, setTabList] = useState([]);

  const isChallengedHeader =
    active === 3
      ? [
          {
            key: "ReportStatus",
            title: "Report Status",
          },
          {
            key: "Reporter",
            title: "Reporter",
          },
          {
            key: "ParentInviter",
            title: "Parent Inviter",
          },
          {
            key: "Challenger",
            title: "Challenger",
          },
        ]
      : [
          {
            key: "type",
            title: "Type",
          },
          {
            key: "date",
            title: "Report Date",
          },
          {
            key: "Reporter",
            title: "Reporter",
          },
          {
            key: "ParentInviter",
            title: "Parent Inviter",
          },
        ];

  const tableHeader = [
    {
      key: "name",
      title: "Name",
    },

    ...isChallengedHeader,
  ];

  return (
    <div className={cn("pt-[77px]")}>
      <h3 className={cn("text-[16px] mb-[24px]")}>
        My invitees' report history
      </h3>
      <p>
        <Button
          {...{
            label: "Reported phisher",
            active: active === 1,
            click: () => setActive(1),
          }}
        />
        <Button
          {...{
            label: "Reported not phisher",
            active: active === 2,
            className: "mx-[8px]",
            click: () => setActive(2),
          }}
        />
        <Button
          {...{
            label: "Challenged",
            active: active === 3,
            click: () => setActive(3),
          }}
        />
      </p>
      <div className={cn(" py-[32px]")}>
        <TableList {...{ tableHeader, tabList }} />
      </div>
    </div>
  );
}

export default MyInviteesReportHistory;
