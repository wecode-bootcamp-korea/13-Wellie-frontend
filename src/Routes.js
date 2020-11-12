import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Nav from "./Components/Nav/Nav";
import WellieMain from "./Pages/WellieMain/WellieMain";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import MyBooks from "./Pages/MyBooks/MyBooks";
import BookDetails from "./Pages/BookDetails/BookDetails";
import { ThemeProvider } from "styled-components";
import Category from "./Pages/Category/Category";
import { theme } from "./Styles/Theme";

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component={WellieMain} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/my_books" component={MyBooks} />
              <Route exact path="/book_details/:id" component={BookDetails} />
            </Switch>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
