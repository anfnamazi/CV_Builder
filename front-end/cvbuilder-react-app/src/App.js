import {
  Container,
  createMuiTheme,
  ThemeProvider,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import ResumeForm from "./pages/resumeForm";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import "./assets/scss/main.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import AdminPanel from "./pages/adminPanel";
import Pdf from "./pages/pdf";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./pages/Logout";
import AdminLogin from "./pages/adminLogin";
import LoadingBar from "react-redux-loading-bar";
import { useStyles } from "./utils/styles";
import { useSelector } from "react-redux";

const App = () => {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const theme = createMuiTheme({
    direction: "rtl",
    palette: {
      primary: { main: "#9b00e8" },
    },
  });
  const classes = useStyles();
  const loadingBar = useSelector(state => state.loadingBar)
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <ToastContainer />
        <LoadingBar style={{ width: "100%", height: 5, background: "#9b00e8" }} />
        <Backdrop className={classes.backdrop} open={loadingBar.default}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid
          id="headerLogo"
          container
          alignItems="center"
          justify="center"
          style={{
            backgroundColor: "white",
            boxShadow: "0 5px 10px #00000033",
            marginBottom: 15,
          }}
        >
          <img
            src={require("./assets/images/hozeHonar.png")}
            style={{
              margin: "10px",
              width: 90,
              height: 70,
            }}
          />
        </Grid>
        <Container maxWidth="md">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={ResumeForm} />
              <Route path="/login" component={Login} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/logout" component={Logout} />
              <Route exact path="/admin" component={AdminPanel} />
              <Route path="/admin/:id" component={Pdf} />
            </Switch>
          </BrowserRouter>
        </Container>
      </StylesProvider>
    </ThemeProvider >
  );
};

export default App;
