import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import WellieMain from "./Pages/WellieMain/WellieMain";
import Login from "./Pages/Login/Login";
import Today from "./Pages/Today/Today";
import MyBooks from "./Pages/MyBooks/MyBooks";
import Nav from "./Components/Nav/Nav";
import BookDetails from "./Pages/BookDetails/BookDetails";
import Category from "./Pages/Category/Category";
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
              <Route path="/login" component={Login} />
              <Route exact path="/book_details/:id" component={BookDetails} />
              <Route path="/category" component={Category} />
              <Route
                exact
                path="*"
                component={() => (
                  <>
                    <Nav component={Nav} />
                    <Route path="/today" component={Today} />
                    <Route path="/my_books" component={MyBooks} />
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
