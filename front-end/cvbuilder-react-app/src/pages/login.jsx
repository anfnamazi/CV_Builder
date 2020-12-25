import { Fab, Grid, Hidden, Link, TextField } from "@material-ui/core";
import { PermPhoneMsg } from "@material-ui/icons";
import React, { useState, Fragment } from "react";
import { loginUser, sendSms } from "../services/userService";
import { useStyles } from "../utils/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showverify, setshowverify] = useState(false);
  const [phone, setphone] = useState();
  let [counter, setcounter] = useState(60);

  const handleLoginUser = async (event) => {
    event.preventDefault();
    const id = event.target.verify.value;
    const request = { phone, id };
    try {
      const result = await loginUser(request);
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        window.location.replace("/");
      }
    } catch (error) {}
  };

  const handleGetVerify = async () => {
    const request = { phone };
    setcounter((counter = 60));
    try {
      const result = await sendSms(request);
      if (result.status < 210) {
        setshowverify(true);
        const interval = setInterval(() => {
          setcounter(counter--);
          if (counter < 0) clearInterval(interval);
        }, 1000);
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
                onSubmit={handleLoginUser}
                autoComplete="off"
              >
                <header style={{ margin: "40px 0" }}>ورود کاربر</header>
                <div style={{ display: !showverify ? "block" : "none" }}>
                  <Grid
                    container
                    style={{ marginBottom: 20 }}
                    spacing={1}
                    alignItems="flex-end"
                  >
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
                      اصلاح شماره
                    </Fab>
                  </div>
                </div>
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

export default Login;
