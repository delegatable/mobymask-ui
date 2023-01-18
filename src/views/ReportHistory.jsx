import { useState, useEffect } from "react";
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
            render: (val, row) => {
              return (
                <>
                  {val}{" "}
                  <Button
                    {...{
                      className:
                        "inline-flex w-[80px] h-[34px] b-[100px] ml-[16px] rounded-[100px] px-[11.5px]",
                      label: "Revoke",
                      onClick: () => {},
                    }}
                  />
                </>
              );
            },
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

  useEffect(() => {
    if (active === 3) {
      setTabList([
        {
          name: "GaliBrata1",
          type: "Twitter",
          myReport: "bob",
          challengersReport: "Jane",
        },
        {
          name: "GaliBrata1",
          type: "Twitter",
          myReport: "bob",
          challengersReport: "Jane",
        },
        {
          name: "GaliBrata1",
          type: "Twitter",
          myReport: "bob",
          challengersReport: "Jane",
        },
      ]);
    } else {
      setTabList([
        { name: "GaliBrata1", type: "Twitter", date: "2022-10-11" },
        { name: "GaliBrata1", type: "Twitter", date: "2022-10-11" },
        { name: "GaliBrata1", type: "Twitter", date: "2022-10-11" },
      ]);
    }
  }, [active]);

  return (
    <div className={cn("pt-[77px]")}>
      <h3 className={cn("text-[20px] mb-[24px]")}>My report history</h3>
      <p className="mb-[22px]">
        <Button
          {...{
            label: "Reported phisher",
            active: active === 1,
            onClick: () => setActive(1),
          }}
        />
        <Button
          {...{
            label: "Reported not phisher",
            active: active === 2,
            className: "mx-[8px]",
            onClick: () => setActive(2),
          }}
        />
        <Button
          {...{
            label: "Challenged",
            active: active === 3,
            onClick: () => setActive(3),
          }}
        />
      </p>
      <div
        className={cn(
          "border-[0.5px] border-solid border-[#D0D5DD] rounded-[10px]",
          "px-[32px] py-[32px]"
        )}>
        <TableList {...{ tableHeader, tabList }} />
      </div>
    </div>
  );
}

export default ReportHistory;
