import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import WellieMain from "./Pages/WellieMain/WellieMain";
import Login from "./Pages/Login/Login";
import Join from "./Pages/Login/Join";
import Today from "./Pages/Today/Today";
import Nav from "./Components/Nav/Nav";
import Search from "./Pages/Search/Search";
import SearchResult from "./Pages/Search/SearchResult";
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
              <Route exact path="/" component={WellieMain} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/join" component={Join} />

              <Route
                exact
                path="*"
                component={() => (
                  <>
                    <Nav component={Nav} />
                    <Route path="/Today" component={Today} />
                    <Route exact path="/search" component={Search} />
                    <Route path="/search/result" component={SearchResult} />
                  </>
                )}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Routes;
