import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import defaultTheme from "./theme";
import Routes from "./routes/Routes";

import "./vendor/index.scss";

const App = () => {
  const [widthRatio, setWidthRatio] = useState(window.innerWidth / 1920);
  const [heightRatio, setHeightRatio] = useState(window.innerHeight / 1080);

  const setRatioFunction = () => {
    setWidthRatio(window.innerWidth / 1920);
    setHeightRatio(window.innerHeight / 1080);
  };

  useEffect(() => {
    window.addEventListener('resize', setRatioFunction);

    return () => window.removeEventListener('resize', setRatioFunction);
  }, []);

  const theme = {
    ...defaultTheme,
    widthRatio,
    heightRatio
  };

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={ theme }>
        <ThemeProvider theme={ theme }>
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
