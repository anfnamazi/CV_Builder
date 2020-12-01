import {
  AppBar,
  Fab,
  Grid,
  Hidden,
  Link,
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
import React, { useState, Fragment } from "react";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../components/tabPanel";
import { loginAdmin, loginUser, sendSms } from "../services/userService";
import { useStyles } from "../utils/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Login = () => {
  const theme = useTheme();
  const [currentTab, setcurrentTab] = useState(0);
  const [showverify, setshowverify] = useState(false);
  const [phone, setphone] = useState();
  let [counter, setcounter] = useState(60);

  const handleChangeTab = (event, newTab) => {
    setcurrentTab(newTab);
  };

  const handleChangeTabIndex = (index) => {
    setcurrentTab(index);
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    const id = event.target.verify.value;
    const request = { phone, id };
    const result = await loginUser(request);
    if (result.status === 200) {
      localStorage.setItem("token", result.data.token);
      window.location.replace("/");
    }
  };

  const handleLoginAdmin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const admin = { email, password };
    const result = await loginAdmin(admin);
    if (result.status === 200) {
      localStorage.setItem("token", result.data.token);
      window.location.replace("/admin");
    }
  };

  const handleGetVerify = async () => {
    const request = { phone };
    setcounter((counter = 60));
    const result = await sendSms(request);
    if (result.status < 210) {
      setshowverify(true);
      const interval = setInterval(() => {
        setcounter(counter--);
        if (counter < 0) clearInterval(interval);
      }, 1000);
    }
  };

  const classes = useStyles();
  return (
    <Fragment>
      <ToastContainer />
      <div className="myCard">
        <Grid container spacing={0}>
          <Grid xs={12} sm={7} md={5} item>
            <div className="myLeftCtn">
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
                      className="myForm"
                      onSubmit={handleLoginUser}
                      autoComplete="off"
                    >
                      <header style={{ marginBottom: 20 }}>ورود کاربر</header>

                      <div style={{ display: !showverify ? "block" : "none" }}>
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
                              name="phone"
                              onChange={(e) => setphone(e.target.value)}
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
                          onClick={handleGetVerify}
                        >
                          دریافت کد تایید
                        </Fab>
                      </div>
                      <div style={{ display: showverify ? "block" : "none" }}>
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
                              name="verify"
                              placeholder="******"
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: 10,
                          }}
                        >
                          {counter === 0 ? (
                            <Link
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleGetVerify();
                              }}
                            >
                              ارسال مجدد کد تایید
                            </Link>
                          ) : null}
                          <div>{counter} ثانیه باقی مانده</div>
                        </div>
                        <div>
                          <Fab
                            variant="contained"
                            color="secondary"
                            size="medium"
                            type="button"
                            disabled={counter <= 0 ? false : true}
                            onClick={() => setshowverify(false)}
                          >
                            برگشت
                          </Fab>
                        </div>
                      </div>
                    </form>
                  </TabPanel>
                  <TabPanel value={currentTab} index={1} dir={theme.direction}>
                    <form
                      className="myForm"
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
                  </TabPanel>
                </SwipeableViews>
              </div>
            </div>
          </Grid>
          <Hidden xsDown>
            <Grid xs={12} sm={5} md={7} item>
              <div className="myRightCtn">
                <div style={{ width: "100%", height: "100%", padding: 50 }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={require("../assets/images/loginImg.svg")}
                    alt=""
                  />
                </div>
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Login;
