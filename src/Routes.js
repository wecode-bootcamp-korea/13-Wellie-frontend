import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Styles/GlobalStyle";
import { theme } from "./Styles/Theme";
// import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import Join from "./Pages/Login/Join";

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme} />
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/join" component={Join} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Routes;
