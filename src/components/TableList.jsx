import { useId } from "react";

import {
  Typography,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
            <StyledTableRow border="0px">
              <TableCell colSpan="24">
                {tabList.length > 0 ? (
                  <Typography
                    component="p"
                    fontSize="16px"
                    color="#D0D5DD"
                    textAlign="center"
                    margin="0">
                    in the end···
                  </Typography>
                ) : (
                  <Typography component="p" textAlign="center">
                    no phisher
                  </Typography>
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
