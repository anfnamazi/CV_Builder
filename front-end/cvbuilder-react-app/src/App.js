import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ResumeForm from './pages/resumeForm';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import './assets/scss/main.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login';


const App = () => {

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const theme = createMuiTheme({
    direction: "rtl",
    palette: {
      primary: { main: "#9b00e8" }
    }
  })

  return (<ThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ResumeForm} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  </ThemeProvider>);
}

export default App;
