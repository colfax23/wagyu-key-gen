import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import 'typeface-roboto';
import MainWizard from "./pages/MainWizard";
import theme from "./theme";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/wizard/:stepSequenceKey" component={MainWizard} />
          </Switch>
        </Container>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
