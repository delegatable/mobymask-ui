import { useId } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import cn from "classnames";
function TableList(props) {
  const { tableHeader = [], tabList = [] } = props;
  const key = useId();

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map((item, index) => (
                <TableCell key={`${key}TableCell${index}`}>
                  {item.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tabList.map((phisher, index) => (
              <TableRow key={phisher.key || index}>
                {tableHeader.map((item, idx) => (
                  <TableCell key={`${key}TableRow${idx}`}>
                    {!item.render
                      ? phisher[item.key]
                      : item.render(phisher[item.key], phisher, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {tabList.length == 0 && (
            <caption className="text-center py-[40px]">no phisher</caption>
          )}
        </Table>
      </TableContainer>
      {tabList.length > 0 ? (
        <p
          className={cn(
            "h-[84px] leading-[84px] text-[16px] text-[#D0D5DD] text-center m-0"
          )}>
          in the end···
        </p>
      ) : null}
    </div>
  );
}

export default TableList;
