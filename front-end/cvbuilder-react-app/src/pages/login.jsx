import { Container, Fab, Grid, Hidden, TextField } from "@material-ui/core";
import { PhonelinkRing, PermPhoneMsg } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../utils/styles";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <div class="myCard">
        <Grid container spacing={0}>
          <Grid xs={12} sm={7} md={5} item>
            <div class="myLeftCtn">
              <form class="myForm" onSubmit={handleLogin} autoComplete="off">
                <header style={{ marginBottom: 20 }}>ورود با تلفن همراه</header>
                <Grid
                  container
                  style={{ marginBottom: 20 }}
                  spacing={1}
                  alignItems="flex-end"
                >
                  <Grid item>
                    <PhonelinkRing fontSize="large" />
                  </Grid>
                  <Grid xs item>
                    <TextField
                      type="number"
                      label="تلفن همراه"
                      className={classes.formControl}
                      name="phoneNumber"
                      style={{ direction: "ltr" }}
                      placeholder="09123456789"
                      required
                    />
                  </Grid>
                </Grid>
                <Fab
                  variant="contained"
                  style={{ marginBottom: 60 }}
                  color="primary"
                  size="medium"
                  type="button"
                >
                  دریافت کد تایید
                </Fab>
                <Grid
                  container
                  style={{ marginBottom: 20 }}
                  spacing={1}
                  alignItems="flex-end"
                >
                  <Grid item>
                    <PermPhoneMsg fontSize="large" />
                  </Grid>
                  <Grid xs item>
                    <TextField
                      type="number"
                      label="کد تایید"
                      style={{ direction: "ltr" }}
                      className={classes.formControl}
                      name="confirmationCode"
                      placeholder="******"
                      required
                    />
                  </Grid>
                </Grid>
                <button type="submit" class="butt">
                  ورود
                </button>
              </form>
            </div>
          </Grid>
          <Hidden xsDown>
            <Grid xs={12} sm={5} md={7} item>
              <div class="myRightCtn">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={require("../assets/images/loginImg.svg")}
                  alt=""
                />
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
