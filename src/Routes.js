import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Styles/GlobalStyle";
import { theme } from "./Styles/Theme";
import Nav from "./Components/Nav/Nav";
import WellieMain from "./Pages/WellieMain/WellieMain";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PhoneValidate from "./Pages/Signup/components/PhoneValidate";
import SetAccount from "./Pages/Signup/components/SetAccount";
import Subscribe from "./Pages/Subscribe/Subscribe";
import Payments from "./Pages/Subscribe/Payments";
import Category from "./Pages/Category/Category";
import MyBooks from "./Pages/MyBooks/MyBooks";
import MyBooksManager from "./Pages/MyBooksManager/MyBooksManager";
import BookDetails from "./Pages/BookDetails/BookDetails";
import SearchDefault from "./Pages/Search/SearchDefault";
import SearchResult from "./Pages/Search/SearchResult";

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
              <Route exact path="/phone_validate" component={PhoneValidate} />
              <Route exact path="/set_account" component={SetAccount} />
              <Route exact path="/subscribe" component={Subscribe} />
              <Route exact path="/payments" component={Payments} />
              <Route exact path="/my_books" component={MyBooks} />
              <Route
                exact
                path="/my_books_manager"
                component={MyBooksManager}
              />
              <Route exact path="/book_details/:id" component={BookDetails} />
              <Route path="/category/:id" component={Category} />
              <Route path="/home" component={SearchDefault} />
              <Route path="/search_result" component={SearchResult} />
            </Switch>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
export default Routes;
