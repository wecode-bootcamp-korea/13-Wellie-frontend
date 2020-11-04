import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import GlobalStyle from "./Styles/GlobalStyle";
import { theme } from "./Styles/Theme";
import { ThemeProvider } from "styled-components";

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme} />
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Routes;
