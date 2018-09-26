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

const shelves = [
  {
    title: 'Currently Reading',
    alias: 'currentlyReading'
  },
  {
    title: 'Want To Read',
    alias: 'wantToRead'
  },
  {
    title: 'Read',
    alias: 'read'
  }
]

class BooksApp extends Component {

  state = {
    shelfBooks: [],
    searchBooks: [],
    searchQuery: ''
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
    !query ? this.setState({searchBooks: [], searchQuery: query}) : this.fetchBooks(query)
  }

  fetchBooks = (searchQuery) => {
    BooksAPI.search(searchQuery)
      .then(searchBooks => {
        this.setState({
          searchBooks,
          searchQuery
        })
      })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState((currentState) => ({
          shelfBooks: currentState.shelfBooks.map(currentBook => (
            currentBook.id === book.id ? book : currentBook
          ))
        }))
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
                shelves={shelves}
                updateBookShelf={this.updateBook}
              />
            )} />
            <Route path="/search" render={() => (
              <SearchResult 
                books={this.state.searchBooks}
                shelves={shelves}
                query={this.state.searchQuery}
                clearQuery={this.searchBooks}
                updateBookShelf={this.updateBook}
              />
            )} />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(BooksApp);