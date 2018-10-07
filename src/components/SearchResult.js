import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import EmptySearchResult from './EmptySearchResult';
import LinearProgress from '@material-ui/core/LinearProgress';

class SearchResult extends Component {

  static propTypes = {
    resultBooks: PropTypes.array.isRequired,
    query: PropTypes.string,
    clearResults: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    isSearching: PropTypes.bool,
    location: PropTypes.object.isRequired,
  }
  
  /* 
    Clear searched books and searched query on parent element if user has not come from a book detail page
    If user has come from a book detail page, we do not want to clear their search results
  */
  componentWillMount() {
    const { location, clearResults } = this.props; 
    if(!(location.state && location.state.fromBookDetail)){
      clearResults('');
    }
  }

  render() {
    const { resultBooks, query, shelves, updateBookShelf, isSearching, location } = this.props;
    return(
      <div>
        {isSearching && 
          <LinearProgress/>
        }
        {resultBooks && !resultBooks.length && 
          <EmptySearchResult noBooksFound={resultBooks.hasOwnProperty('error')}/>
        }
        {resultBooks && !!resultBooks.length &&
          <Shelf shelfTitle={`Search Results for: ${query}`} shelfBooks={resultBooks} shelves={shelves} updateBookShelf={updateBookShelf} location={location} />
        }
      </div>
    )
  }
}

export default SearchResult;