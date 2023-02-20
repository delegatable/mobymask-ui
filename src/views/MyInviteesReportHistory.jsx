import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Button from "../components/Button";
// import TableList from "../components/TableList";
function MyInviteesReportHistory() {
  const [active, setActive] = useState(1);
  const [tabList, setTabList] = useState([]);

  const isChallengedHeader =
    active === 3
      ? [
          {
            key: "status",
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

  useEffect(() => {
    if (active === 3) {
      setTabList([
        {
          name: "GaliBrata1",
          type: "Twitter",
          status: "bob",
          Reporter: "Jane",
          ParentInviter: "Jane",
        },
        {
          name: "GaliBrata1",
          type: "Twitter",
          status: "bob",
          Reporter: "Jane",
          ParentInviter: "Jane",
          Challenger: "Jane",
        },
        {
          name: "GaliBrata1",
          type: "Twitter",
          status: "bob",
          Reporter: "Jane",
          ParentInviter: "Jane",
          Challenger: "Jane",
        },
      ]);
    } else {
      setTabList([
        {
          name: "GaliBrata1",
          type: "Twitter",
          Reporter: "bob",
          date: "2022-10-22",
          ParentInviter: "Jane",
        },
        {
          name: "GaliBrata1",
          type: "Twitter",
          Reporter: "bob",
          date: "2022-10-22",
          ParentInviter: "Jane",
        },
        {
          name: "GaliBrata1",
          type: "Twitter",
          Reporter: "bob",
          date: "2022-10-22",
          ParentInviter: "Jane",
        },
      ]);
    }
  }, [active]);

  return (
    <Box>
      <Typography
        component="h3"
        fontSize="16px"
        marginBottom="24px"
        fontWeight={600}
      >
        My invitees' report history
      </Typography>
      <Box>
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
            marginX: "8px",
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
      </Box>
      <Box paddingY="40px">
        {/* <TableList {...{ tableHeader, tabList }} /> */}
        <Box
          component="img"
          src="/coming.png"
          width="115px"
          margin="30px auto"
          display="block"
        ></Box>
      </Box>
    </Box>
  );
}

export default MyInviteesReportHistory;
