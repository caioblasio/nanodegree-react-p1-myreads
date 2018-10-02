import React, { Component } from 'react';
import Shelf from './Shelf';
import EmptySearchResult from './EmptySearchResult';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0
  },
  progress: {
    margin: theme.spacing.unit * 2,
    justifyContent: 'center'
  }
});

class SearchResult extends Component {
  

  componentWillMount() {
    //clears searched books and searched query on parent element
    if(!(this.props.location.state && this.props.location.state.fromBookDetail)){
      this.props.clearQuery('');
    }
  }

  render() {

    const { resultBooks, query, shelves, updateBookShelf, isSearching, location } = this.props;

    console.log('resultBooks', resultBooks);
    console.log('isSearching', isSearching);


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

export default withStyles(styles)(SearchResult);