import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ResumeForm from './components/resumeForm';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import './assets/scss/main.scss';



const App = () => {

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const theme = createMuiTheme({
    direction: "rtl",
    palette: {
      primary: { main: "#784af4" }
    }
  })

  return (<ThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      <ResumeForm />
    </StylesProvider>
  </ThemeProvider>);
}

export default App;
