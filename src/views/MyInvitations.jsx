import { useState } from "react";
import cn from "classnames";
import Button from "../components/Button";
import TableList from "../components/TableList";
function MyInvitations() {
  const [active, setActive] = useState(1);
  const [tabList, setTabList] = useState([]);

  const tableHeader = [
    {
      key: "Invite Name",
      title: "Invite Name",
    },
    {
      key: "Invite link",
      title: "Invite link",
    },
    {
      key: "Action",
      title: "Action",
    },
  ];

  return (
    <div className={cn("pt-[77px]")}>
      <h3 className={cn("text-[16px] mb-[24px]")}>My Invitations</h3>
      <p className="mb-[40px]">
        <Button
          {...{
            label: "Outstanding Invitations",
            active: active === 1,
            click: () => setActive(1),
          }}
        />
        <Button
          {...{
            label: "Revoked invitations",
            active: active === 2,
            className: "mx-[8px]",
            click: () => setActive(2),
          }}
        />
      </p>
      {active === 1 ? (
        <TableList {...{ tableHeader, tabList }} />
      ) : (
        <div
          className={cn(
            "h-[84px] flex justify-start items-center",
            " text-[16px] text-left",
            "border-y-[0.5px] border-solid border-[#E5E5E5]"
          )}>
          <div className={cn("w-[160px] shrink-0")}>1234</div>
          <div className="text-[#D0D5DD]">
            https://mobymask.com/#/members?238%nsdfg23824...
          </div>
        </div>
      )}
    </div>
  );
}

export default MyInvitations;
