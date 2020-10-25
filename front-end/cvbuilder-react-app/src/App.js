import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ResumeForm from './pages/resumeForm';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import './assets/scss/main.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import AdminPanel from './pages/adminPanel';


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
      <Container maxWidth="md">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ResumeForm} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={AdminPanel} />
          </Switch>
        </BrowserRouter>
      </Container>
    </StylesProvider>
  </ThemeProvider>);
}

export default App;
