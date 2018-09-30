import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  message: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 6
  },
  terms: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8
  },
  termsHead: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const EmptySearchResult = (props) => {

  const { noBooksFound, classes } = props;

  return(
    <div className={classes.message} >
      {!noBooksFound && 
        <Typography
        variant="subheading"
        color="textSecondary"
        >
          Type in the search bar to search for a book...
        </Typography>
      }
      {noBooksFound && 
        <Typography
        variant="subheading"
        color="textSecondary"
        >
          No books found...
        </Typography>
      }
      <Paper className={classes.terms} elevation={1}>
        <Typography
          variant="subheading"
          color="textSecondary"
          className={classes.termsHead}
          >
            Some available terms:
          </Typography>
          <Typography
          variant="body2"
          color="textSecondary"
          >
            'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 
            'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 
            'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 
            'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 
            'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 
            'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
            'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 
            'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
          </Typography>
        </Paper>
    </div>
  )
}

export default withStyles(styles)(EmptySearchResult);