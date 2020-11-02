import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import Join from "./Pages/Login/Join";
import Today from "./Pages/Today/Today";
import Nav from "./Components/Nav/Nav";
import { ThemeProvider } from "styled-components";
import { theme } from "./Styles/Theme";
import GlobalStyle from "./Styles/GlobalStyle";

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/join" component={Join} />
              <Nav />
              <Route exact path="/Today" component={Today} />
            </Switch>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Routes;
