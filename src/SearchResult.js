import React, { Component } from 'react';
import Shelf from './Shelf';
import EmptySearchResult from './EmptySearchResult';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  componentWillUnmount() {
    //clears searched books and searched query on parent element
    this.props.clearQuery('');
  }

  render() {

    const { books, query, classes } = this.props;

    return(
      <div>
        {books && !books.length && 
          <EmptySearchResult noBooksFound={books.hasOwnProperty('error')}/>
        }
        {books && !!books.length &&
          <Shelf shelfTitle={`Search Results for: ${query}`} shelfBooks={books} />
        }
      </div>
    )
  }
}

export default withStyles(styles)(SearchResult);