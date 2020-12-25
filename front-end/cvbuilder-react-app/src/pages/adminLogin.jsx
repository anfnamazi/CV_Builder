import { Grid, Hidden, TextField } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import React, { Fragment } from "react";
import { loginAdmin } from "../services/userService";
import { useStyles } from "../utils/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const handleLoginAdmin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const admin = { email, password };
    try {
      const result = await loginAdmin(admin);
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        window.location.replace("/admin");
      }
    } catch (error) {}
  };

  const classes = useStyles();
  return (
    <Fragment>
      <ToastContainer />
      <div className="myCard">
        <Grid container spacing={0}>
          <Grid xs={12} sm={7} md={5} item>
            <div className="myLeftCtn">
              <form
                className="myForm"
                onSubmit={handleLoginAdmin}
                autoComplete="off"
              >
                <header style={{ margin: "40px 0" }}>ورود ادمین</header>
                <Grid
                  container
                  style={{ marginBottom: 20 }}
                  spacing={1}
                  alignItems="flex-end"
                >
                  <Grid item>
                    <AccountCircle fontSize="large" />
                  </Grid>
                  <Grid xs item>
                    <TextField
                      type="text"
                      label="ایمیل"
                      className={classes.formControl}
                      name="email"
                      style={{ direction: "ltr" }}
                      placeholder="user name"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{ marginBottom: 50 }}
                  spacing={1}
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Lock fontSize="large" />
                  </Grid>
                  <Grid xs item>
                    <TextField
                      type="password"
                      label="رمز عبور"
                      style={{ direction: "ltr" }}
                      className={classes.formControl}
                      name="password"
                      placeholder="password"
                      required
                    />
                  </Grid>
                </Grid>
                <button
                  type="submit"
                  style={{ marginBottom: 20 }}
                  className="butt"
                >
                  ورود
                </button>
              </form>
            </div>
          </Grid>
          <Hidden xsDown>
            <Grid xs={12} sm={5} md={7} item>
              <div className="myRightCtn"></div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
