import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header';
import SearchResult from './SearchResult';
import * as BooksAPI from './utils/BooksAPI';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: blue
  },
});

const styles = {
  root: {
    maxWidth: '1280px',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2
    }
  }
}

class BooksApp extends Component {

  state = {
    shelfBooks: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(shelfBooks => {
        this.setState({
          shelfBooks
        })
      })
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then(searchBooks => {
        this.setState({
          searchBooks
        })
      })
  }

  render(){

    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Header onSearch={this.searchBooks} />
          <div className={classes.root}>
            <Route exact path="/" render={() => (
              <Dashboard 
                books={this.state.shelfBooks}
              />
            )} />
            <Route path="/search" render={() => (
              <SearchResult 
                books={this.state.searchBooks}
              />
            )} />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(BooksApp);