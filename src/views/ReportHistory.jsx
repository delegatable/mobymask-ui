import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
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
    <Box marginTop="77px">
      <Typography
        component="h3"
        fontSize="20px"
        marginBottom="24px"
        color="#101828"
        fontWeight={600}
      >
        My report history
      </Typography>
      <Box marginBottom="22px">
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
      <Box border="1px solid #D0D5DD" borderRadius="10px" padding="32px">
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

export default ReportHistory;
