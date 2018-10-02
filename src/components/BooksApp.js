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
    searchBooks: [],
    searchQuery: '',
    isSearching: false,
    snackbarInfo: {
      show: false,
      shelf: '',
      variant: '',
      action: ''
    }
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
    this.setState({ isSearching: true });

    BooksAPI.search(searchQuery)
      .then(searchBooks => {
        let searchResult;
        //se a resposta for array, faz o map
        if(searchBooks.length){
          searchResult = [];
          searchBooks.map(searchBook => {
            const book = {...searchBook};
            book.shelf = "none";
            const filtered = this.state.shelfBooks.find(shelfBook => shelfBook.id === book.id)
            return filtered ? searchResult.push(filtered) : searchResult.push(book)
          });
        } else {
          //se for erro, vai ser um objeto, só retorna o erro
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
      })
  }


  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState((currentState) => {
          //ve se o livro que foi atualizado ja esta em uma estante
          const shelfBook = currentState.shelfBooks.find(shelfBook => (shelfBook.id === book.id));
          const snackbarInfo = {show: true, shelf, variant: shelf !== 'none' ? 'success' : 'warning', action: shelf !== 'none' ? 'moveToShelf' : 'removeFromShelf'}
          if(shelfBook){
            //se ja esta, troca a estante dele pela nova
            shelfBook.shelf = book.shelf;
            //verifica se o livro foi movido para uma estante. Se a estante é 'none' significa que ele foi removido de alguma estante e mostramos um snackbar de warning
            return {shelfBooks: currentState.shelfBooks, snackbarInfo: { ...snackbarInfo}}
          } else {
            //senao coloca o livro na lista de livros nas estantes
            return {shelfBooks: currentState.shelfBooks.concat([book]), snackbarInfo: { ...snackbarInfo}}
          }
        
        })
      })
  }

  handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState((currentState) => ({
      snackbarInfo: {...currentState.snackbarInfo, show: false}
    }));
  };

  render(){

    const { classes } = this.props;
    //console.log(theme);

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
                {...props}
              />
            )} />
            <Route path="/search" render={(props) => (
              <SearchResult 
                resultBooks={this.state.searchBooks}
                shelves={shelvesData}
                query={this.state.searchQuery}
                clearQuery={this.searchBooks}
                updateBookShelf={this.updateBook}
                isSearching={this.state.isSearching}
                {...props}
              />
            )} />
            <Route path="/book/:id" render={(props) => (
              <BookDetail {...props} />
            )} />
          </div>
          {this.state.snackbarInfo.show && <CustomizedSnackbars 
            open={this.state.snackbarInfo.show} 
            handleClose={this.handleSnackBarClose} 
            variant={this.state.snackbarInfo.variant}
            message={`
              Book
              ${this.state.snackbarInfo.action === 'moveToShelf' ? 
              `moved to shelf ${shelvesData.find(shelf => (shelf.alias === this.state.snackbarInfo.shelf)).title}` : 'removed from shelf'}`
            }
          />}
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(BooksApp);