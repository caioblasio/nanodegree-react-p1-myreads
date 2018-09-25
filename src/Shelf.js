import React from 'react';
import Book from './Book';

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

const Shelf = (props) => {

  const { shelfTitle, shelfBooks, classes } = props;
  
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
                  id={book.id}
                  title={book.title}
                  authors={book.authors ? book.authors : []}
                  description={book.description ? `${book.description.substring(0,160)}...`: ''}
                  publishedDate={book.publishedDate}
                  pageCount={book.pageCount}
                  averageRating={book.averageRating}
                  ratingsCount={book.ratingsCount}
                  image={book.imageLinks ? book.imageLinks.thumbnail : ''}
                />
            ))}
          </ul>
        }
        {shelfBooks.length === 0 &&
          <div style={{textAlign: 'center'}}>
            <CircularProgress className={classes.progress} />
          </div>
        }
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Shelf);