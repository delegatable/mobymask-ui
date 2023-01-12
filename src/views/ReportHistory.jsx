import { useState } from "react";
import cn from "classnames";
import Button from "../components/Button";
import TableList from "../components/TableList";
function ReportHistory() {
  const [active, setActive] = useState(1);
  const [tabList, setTabList] = useState([]);

  const isChallengedHeader =
    active === 3
      ? [
          {
            key: "myReport",
            title: "My report",
          },
          {
            key: "challengersReport",
            title: "Challenger's Report",
          },
        ]
      : [
          {
            key: "date",
            title: "Apply Date",
          },
        ];

  const tableHeader = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "type",
      title: "Type",
    },
    ...isChallengedHeader,
  ];

  return (
    <div className={cn("pt-[77px]")}>
      <h3 className={cn("text-[20px] mb-[24px]")}>My report history</h3>
      <p className="mb-[22px]">
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
      <div
        className={cn(
          "border-[0.5px] border-solid rounded-[10px]",
          "px-[32px] py-[32px]"
        )}>
        <TableList {...{ tableHeader, tabList }} />
      </div>
    </div>
  );
}

export default ReportHistory;
