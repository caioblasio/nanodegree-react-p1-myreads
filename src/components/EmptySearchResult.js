import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { searchTerms } from '../common/commonData';

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

/**
 * @description Empty Search Result Component. When search is empty or wrong
 * @param {boolean} noBooksFound
 * @param {Object} classes
*/
const EmptySearchResult = ({ noBooksFound, classes } ) => {

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
          {searchTerms.map((term, index) => (
            index > 0 ? `, ${term}` : `${term}`
          ))}
          </Typography>
        </Paper>
    </div>
  )
};

EmptySearchResult.propTypes = {
  noBooksFound: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmptySearchResult);