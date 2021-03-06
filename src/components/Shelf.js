import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    backgroundColor: theme.palette.primary["50"]
  },
  header: {
    position: 'relative',
    margin: '0 auto',
    top: -45,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
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

/**
 * @description Shelf component that holds books
 * @param {string} shelfTitle
 * @param {Object[]} shelfBooks
 * @param {Object} shelves
 * @param {function(Object, string)} updateBookShelf
 * @param {string} isLoading
 * @param {Object} location
 * @param {Object} classes
*/
const Shelf = ({ shelfTitle, shelfBooks, shelves, updateBookShelf, isLoading, classes, location }) => {
  
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Paper className={classNames(classes.root, classes.header)}>
          <Typography variant="subheading" component="h3"  color="inherit">
            {shelfTitle}
          </Typography>
        </Paper>
        {shelfBooks.length > 0 &&
          <ul className={classes.list}>
            {shelfBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  shelves={shelves}
                  updateBookShelf={updateBookShelf}
                  location={location}
                />
            ))}
          </ul>
        }
        {isLoading &&
          <div style={{textAlign: 'center'}}>
            <CircularProgress className={classes.progress} />
          </div>
        }
      </Paper>
    </div>
  )
};

Shelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  shelfBooks: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Shelf);