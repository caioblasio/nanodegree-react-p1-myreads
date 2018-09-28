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

  //Tratar quando a busca da erro!! Antes era tratado direto no search result, na hora que definia se ia renderizar o EmptyResult ou uma Shelf com os resultados da busca
  fetchBooks = (searchQuery) => {
    BooksAPI.search(searchQuery)
      .then(searchBooks => {
        let searchResult = [];
        searchBooks.map(searchBook => {
          const book = {...searchBook};
          book.shelf = "none";
          const filtered = this.state.shelfBooks.find(shelfBook => shelfBook.id === book.id)
          return filtered ? searchResult.push(filtered) : searchResult.push(book)
        });
        return searchResult;
      })
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
        this.setState((currentState) => {
          //ve se o livro que foi atualizado ja esta em uma estante
          const shelfBook = currentState.shelfBooks.find(shelfBook => (shelfBook.id === book.id));

          if(shelfBook){
            //se ja esta, troca a estante dele pela nova
            shelfBook.shelf = book.shelf;
            return {shelfBooks: currentState.shelfBooks}
          } else {
            //senao coloca o livro na lista de livros nas estantes
            return {shelfBooks: currentState.shelfBooks.concat([book])}
          }
        
        })
      })
  }


  // updateBook = (book, shelf) => {
  //   BooksAPI.update(book, shelf)
  //     .then(() => {
  //       book.shelf = shelf;
  //       this.setState((currentState) => ({
  //         shelfBooks: currentState.shelfBooks.map(currentBook => (
  //           currentBook.id === book.id ? book : currentBook
  //         ))
  //       }))
  //     })
  // }

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
                resultBooks={this.state.searchBooks}
                shelves={shelves}
                query={this.state.searchQuery}
                clearQuery={this.searchBooks}
                updateBookShelf={this.updateBook}
                //shelfBooks={this.state.shelfBooks}
              />
            )} />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(BooksApp);