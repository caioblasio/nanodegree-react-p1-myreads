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

//   helperSetBooksShelf = (resultBooks, shelfBooks, attributeName) => (
//     resultBooks.map((resultBook) => {
//         let filtered = shelfBooks.filter((shelfBook) => (
//             resultBook.id === shelfBook.id
//         ));

//         return filtered.length > 0 ?  filtered[0] : resultBook
        
//         // if (filtered.length > 0) resultBook[attributeName] = filtered[0][attributeName];
//         // return resultBook;
//     })  
//  )

  render() {

    const { resultBooks, query, shelves, updateBookShelf, shelfBooks, classes } = this.props;

    console.log('resultBooks', resultBooks);
    console.log('shelfBooks', shelfBooks);

    return(
      <div>
        {resultBooks && !resultBooks.length && 
          <EmptySearchResult noBooksFound={resultBooks.hasOwnProperty('error')}/>
        }
        {resultBooks && !!resultBooks.length &&
          //this.helperSetBooksShelf(resultBooks, shelfBooks, "shelf")
          <Shelf shelfTitle={`Search Results for: ${query}`} shelfBooks={resultBooks} shelves={shelves} updateBookShelf={updateBookShelf} />
        }
      </div>
    )
  }
}

export default withStyles(styles)(SearchResult);