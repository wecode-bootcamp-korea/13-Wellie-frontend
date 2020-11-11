import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import WellieMain from "./Pages/WellieMain/WellieMain";
import Login from "./Pages/Login/Login";
import Join from "./Pages/Login/Join";
import Today from "./Pages/Today/Today";
import MyBooks from "./Pages/MyBooks/MyBooks";
import Nav from "./Components/Nav/Nav";
import BookDetails from "./Pages/BookDetails/BookDetails";
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
              <Route path="/Login" component={Login} />
              <Route path="/join" component={Join} />
              <Route exact path="/BookDetails" component={BookDetails} />
              <Route
                exact
                path="*"
                component={() => (
                  <>
                    <Nav component={Nav} />
                    <Route path="/Today" component={Today} />
                    <Route path="/MyBooks" component={MyBooks} />
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
