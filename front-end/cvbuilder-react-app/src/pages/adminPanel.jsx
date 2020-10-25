import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../utils/styles";

function createData(index, user, date, download) {
  return { index, user, date, download };
}

const rows = [
  createData(
    1,
    "amin_amini",
    "1399-04-04 15:40",
    <div className="download-icon-container">
      <IconButton>
        <img
          className="download-icon"
          src={require("../assets/images/excelIcon.svg")}
          alt=""
        />
      </IconButton>
      <IconButton>
        <img
          className="download-icon"
          src={require("../assets/images/pdfIcon.svg")}
          alt=""
        />
      </IconButton>
    </div>
  ),
  createData(
    2,
    "reza_rezaei",
    "1399-04-04 15:50",
    <div className="download-icon-container">
      <IconButton>
        <img
          className="download-icon"
          src={require("../assets/images/excelIcon.svg")}
          alt=""
        />
      </IconButton>
      <IconButton>
        <img
          className="download-icon"
          src={require("../assets/images/pdfIcon.svg")}
          alt=""
        />
      </IconButton>
    </div>
  ),
];

const AdminPanel = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ردیف</TableCell>
            <TableCell>کاربر</TableCell>
            <TableCell align="left">تاریخ</TableCell>
            <TableCell align="left">دانلود&nbsp;(pdf,excel)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.user}>
              <TableCell align="left">{row.index}</TableCell>
              <TableCell component="th" scope="row">
                {row.user}
              </TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.download}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminPanel;
