import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./BaseTable.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BaseTable = ({
  headers,
  keys,
  rows,
  onDelete,
  editPath,
  btnText,
  btnNavigatePath,
  columnWidths = {},
}) => {
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#009e97",
      fontWeight: "bold",
      color: theme.palette.common.white,
      fontSize: "clamp(12px, 2vw, 16px)",
      letterSpacing: 1,
      whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "clamp(12px, 1.8vw, 14px)",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Typography
        variant="h4"
        className={styles.tableContainer}
        sx={{
          color: "#009e97",
          fontWeight: "bolder",
          marginTop: "120px !important",
          marginBottom: "20px",
        }}
      >
        View {btnText}
        {btnText.slice(-1) === "s" ? "es" : "s"}
      </Typography>
      <TableContainer
        className={styles.tableContainer}
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table
          aria-label="customized table"
          sx={{ minWidth: 600, tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <StyledTableCell
                  key={i}
                  align="left"
                  sx={{ width: columnWidths[keys[i]] || "auto" }}
                >
                  {header}
                </StyledTableCell>
              ))}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {keys.map((key, i) => (
                  <StyledTableCell
                    key={i}
                    align="left"
                    sx={{ width: columnWidths[key] || "auto" }}
                  >
                    {row[key] || "_"}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="left">
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <EditIcon
                      onClick={() => navigate(`${editPath}/${row.id}`)}
                      sx={{ color: "#e7c137", fontSize: "20px" }}
                    />
                    <DeleteIcon
                      onClick={() => onDelete(row.id)}
                      sx={{ color: "red", fontSize: "20px" }}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{
          marginTop: "10px !important",
          borderColor: "#009e97",
          color: "#009e97",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#009e97",
            color: "#fff",
            borderColor: "#009e97",
          },
        }}
        className={styles.tableContainer}
        variant="outlined"
        fullWidth
        onClick={() => navigate(btnNavigatePath)}
      >
        Add {btnText}
      </Button>
    </>
  );
};
