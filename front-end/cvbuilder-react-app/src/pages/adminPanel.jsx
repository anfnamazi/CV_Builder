import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  IconButton,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getallUsers, getUserCSV } from "../services/adminService";
import { useStyles } from "../utils/styles";
import fileDownload from "js-file-download";
import { MeetingRoom } from "@material-ui/icons";

const AdminPanel = () => {
  const [users, setusers] = useState([]);
  const classes = useStyles();

  const handleGetUsers = async () => {
    const getUsers = await getallUsers();
    if (getUsers.status < 210) {
      setusers([...getUsers.data.docs]);
    }
  };

  const handleDownlaodCSV = async (userId) => {
    try {
      const csvResult = await getUserCSV(userId);
      if (csvResult.status === 200) {
        fileDownload(csvResult.data, "filename.csv");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: 20, marginBottom: 120 }}
    >
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
          {users.map((user, index) => (
            <TableRow key={user.phone}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {user.phone}
              </TableCell>
              <TableCell align="left">
                {new Date(user.updatedAt).toLocaleString()}
              </TableCell>
              <TableCell align="left">
                <IconButton onClick={(e) => handleDownlaodCSV(user._id)}>
                  <img
                    className="download-icon"
                    src={require("../assets/images/excelIcon.svg")}
                    alt=""
                  />
                </IconButton>
                <Link to={`/admin/${user._id}`}>
                  <IconButton>
                    <img
                      className="download-icon"
                      src={require("../assets/images/pdfIcon.svg")}
                      alt=""
                    />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        style={{ position: "fixed", bottom: 80, left: -5 }}
        color="secondary"
        variant="contained"
        onClick={() => window.location.replace("/logout")}
      >
        <MeetingRoom style={{ marginLeft: 10 }} />
        خروج
      </Button>
    </TableContainer>
  );
};

export default AdminPanel;
