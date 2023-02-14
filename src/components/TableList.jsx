import { useId } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import cn from "classnames";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableList(props) {
  const { tableHeader = [], tabList = [] } = props;
  const key = useId();

  return (
    <Box>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeader.map((column, index) => (
                <TableCell key={`${key}TableCell${index}`} align="center">
                  <span style={{ color: "#666F85" }}>{column.title}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tabList.map((phisher, index) => (
              <StyledTableRow key={phisher.key || index}>
                {tableHeader.map((column, idx) => (
                  <TableCell
                    key={`${key}TableRow${idx}`}
                    align={column.align || "center"}>
                    {!column.render
                      ? phisher[column.key]
                      : column.render(phisher[column.key], phisher, index)}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
            <StyledTableRow className="border-0">
              <TableCell colSpan="24">
                {tabList.length > 0 ? (
                  <p
                    className={cn(
                      "text-[16px] text-[#D0D5DD] text-center m-0"
                    )}>
                    in the end···
                  </p>
                ) : (
                  <p className="text-center">no phisher</p>
                )}
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableList;
