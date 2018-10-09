import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header';
import SearchResult from './SearchResult';
import BookDetail from './BookDetail';
import CustomizedSnackbars from './CustomizedSnackbars';
import * as BooksAPI from '../utils/BooksAPI';
import { shelvesData } from '../common/commonData';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: blue
  }
});

const styles = {
  root: {
    maxWidth: '1280px',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2
    }
  },
  footer: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  }
};

/** Main class for the MyReads App */
class BooksApp extends Component {

  state = {
    shelfBooks: [],
    searchBooks: [],
    searchQuery: '',
    isSearching: false,
    isLoading: false,
    snackbarInfo: {
      show: false,
      shelf: '',
      variant: '',
      action: ''
    }
  };

  componentDidMount() {
    this.setState({isLoading: true});
    BooksAPI.getAll()
      .then(shelfBooks => {
        this.setState({
          shelfBooks,
          isLoading: false
        });
      });
  }

  /**
  * @description Checks if should empty query and searchBooks or fetch new books based on query input by user
  * @param {string} query
  */
  searchBooks = (query) => {
    !query ? this.setState({searchBooks: [], searchQuery: query}) : this.fetchBooks(query)
  };

  /**
  * @description Fetches books and assign shelf property so it can be used in search results page
  * @param {string} searchQuery
  */
  fetchBooks = (searchQuery) => {
    this.setState({ isSearching: true });
    BooksAPI.search(searchQuery)
      .then(searchBooks => {
        let searchResult;
        // if searchBooks is an array than map it
        if(searchBooks.length){
          searchResult = [];
          searchBooks.map(searchBook => {
            const book = {...searchBook};
            book.shelf = "none"; //add shelf none to all searched books
            const filtered = this.state.shelfBooks.find(shelfBook => shelfBook.id === book.id) //check if they are already in a shelf
            return filtered ? searchResult.push(filtered) : searchResult.push(book) //correctly push book objects with their shelf
          });
        } else {
          //if searchBooks is an object than just return that object as a result
          searchResult = searchBooks;
        }
        return searchResult;
      })
      .then(searchBooks => {
        this.setState({
          searchBooks,
          searchQuery,
          isSearching: false
        });
      });
  };

  /**
  * @description Updates a book's shelf or remove book from shelf if shelf equals none
  * @param {Object} book
  * @param {string} shelf
  */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState((currentState) => {
          
          //check if updated book is already in a shelf
          const shelfBook = currentState.shelfBooks.find(shelfBook => (shelfBook.id === book.id));
          //set snackbarInfo according to operation perfomed, shelf change or shelf removal
          const snackbarInfo = {show: true, shelf, action: shelf !== 'none' ? 'moveToShelf' : 'removeFromShelf'}
          
          if(shelfBook && shelf === 'none'){ 
            //remove a book from shelf
            return {shelfBooks: currentState.shelfBooks.filter(book => book.id !== shelfBook.id), snackbarInfo: { ...snackbarInfo, variant: 'warning'}}
            
          } else if(!shelfBook && shelf === 'none') {
            //remove a book that is not in a shelf
            return {shelfBooks: currentState.shelfBooks, snackbarInfo: { ...snackbarInfo, variant: 'error'}}

          } else if(shelfBook){
            //if book is already in a shelf, change its shelf
            shelfBook.shelf = book.shelf;
            return {shelfBooks: currentState.shelfBooks, snackbarInfo: { ...snackbarInfo, variant: 'success'}}

          } else {
            //if book was not in a shelf, put it in the shelf
            return {shelfBooks: currentState.shelfBooks.concat([book]), snackbarInfo: { ...snackbarInfo, variant: 'success'}}
          }
        
        })
      });
  };

  /**
  * @description Handles close of a snackbar
  */
  handleSnackBarClose = () => {
    this.setState((currentState) => ({
      snackbarInfo: {...currentState.snackbarInfo, show: false}
    }));
  };

  render(){
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Header onSearch={this.searchBooks} />
          <div className={classes.root}>
            <Route exact path="/" render={(props) => (
              <Dashboard 
                books={this.state.shelfBooks}
                shelves={shelvesData}
                updateBookShelf={this.updateBook}
                isLoading={this.state.isLoading}
                {...props}
              />
            )} />
            <Route path="/search" render={(props) => (
              <SearchResult 
                resultBooks={this.state.searchBooks}
                shelves={shelvesData}
                query={this.state.searchQuery}
                clearResults={this.searchBooks}
                updateBookShelf={this.updateBook}
                isSearching={this.state.isSearching}
                {...props}
              />
            )} />
            <Route path="/book/:id" render={(props) => (
              <BookDetail {...props} />
            )} />
            <div className={classes.footer}>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Udacity MyReads Project by @caioblasio - <a href="https://github.com/caioblasio/nanodegree-react-p1-myreads">github</a>
            </Typography>
            </div>
          </div>
          {this.state.snackbarInfo.show && <CustomizedSnackbars 
            open={this.state.snackbarInfo.show} 
            handleClose={this.handleSnackBarClose} 
            variant={this.state.snackbarInfo.variant}
            message={`
              Book
              ${this.state.snackbarInfo.action === 'moveToShelf' ? 
              `moved to shelf ${shelvesData.find(shelf => (shelf.alias === this.state.snackbarInfo.shelf)).title}` 
              : (this.state.snackbarInfo.action === 'removeFromShelf' && this.state.snackbarInfo.variant === 'warning') ? 'removed from shelf' 
              : 'is not in a shelf'}`
            }
          />}
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(BooksApp);