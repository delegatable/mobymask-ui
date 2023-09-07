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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableList(props) {
  const { tableHeader = [], tabList = [] } = props;
  const key = useId();

  const firstColumn = { color: "#101828", fontWeight: "bold" };
  const normalColumn = { color: "#666F85" };

  return (
    <Box borderBottom="1px solid #E5E5E5">
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeader.map((column, index) => (
                <TableCell key={`${key}TableCell${index}`} align="center">
                  <span style={normalColumn}>{column.title}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {tabList.length > 0 && (
            <TableBody>
              {tabList.map((phisher, index) => (
                <StyledTableRow key={phisher.key || index}>
                  {tableHeader.map((column, idx) => (
                    <TableCell
                      key={`${key}TableRow${idx}`}
                      align={column.align || "center"}
                      style={idx === 0 ? firstColumn : normalColumn}
                    >
                      {!column.render
                        ? phisher[column.key]
                        : column.render(phisher[column.key], phisher, index)}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {tabList.length === 0 && (
          <Typography textAlign="center" margin="60px">
            No Records
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
}

export default TableList;
