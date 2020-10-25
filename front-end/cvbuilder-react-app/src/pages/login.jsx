import {
  AppBar,
  Fab,
  Grid,
  Hidden,
  Tab,
  Tabs,
  TextField,
  useTheme,
} from "@material-ui/core";
import {
  PhonelinkRing,
  PermPhoneMsg,
  AccountCircle,
  Lock,
} from "@material-ui/icons";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../components/tabPanel";
import { useStyles } from "../utils/styles";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Login = () => {
  const theme = useTheme();
  const [currentTab, setcurrentTab] = useState(0);

  const handleChangeTab = (event, newTab) => {
    setcurrentTab(newTab);
  };

  const handleChangeTabIndex = (index) => {
    setcurrentTab(index);
  };

  const handleLoginUser = (event) => {
    event.preventDefault();
  };

  const handleLoginAdmin = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <div class="myCard">
      <Grid container spacing={0}>
        <Grid xs={12} sm={7} md={5} item>
          <div class="myLeftCtn">
            <div className={classes.root}>
              <AppBar position="static" color="transparent">
                <Tabs
                  value={currentTab}
                  onChange={handleChangeTab}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="ورود کاربر" {...a11yProps(0)} />
                  <Tab label="ورود ادمین" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "ltr" ? "x" : "x-reverse"}
                index={currentTab}
                onChangeIndex={handleChangeTabIndex}
              >
                <TabPanel value={currentTab} index={0} dir={theme.direction}>
                  <form
                    class="myForm"
                    onSubmit={handleLoginUser}
                    autoComplete="off"
                  >
                    <header style={{ marginBottom: 20 }}>ورود کاربر</header>
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
                      style={{ marginBottom: 50 }}
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
                    <button
                      type="submit"
                      style={{ marginBottom: 20 }}
                      class="butt"
                    >
                      ورود
                    </button>
                  </form>
                </TabPanel>
                <TabPanel value={currentTab} index={1} dir={theme.direction}>
                  <form
                    class="myForm"
                    onSubmit={handleLoginAdmin}
                    autoComplete="off"
                  >
                    <header style={{ marginBottom: 20 }}>ورود ادمین</header>
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
                          label="نام کاربری"
                          className={classes.formControl}
                          name="userName"
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
                      class="butt"
                    >
                      ورود
                    </button>
                  </form>
                </TabPanel>
              </SwipeableViews>
            </div>
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
  );
};

export default Login;
