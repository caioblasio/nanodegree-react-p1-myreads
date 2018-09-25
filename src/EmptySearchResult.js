import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 6
  }
});

const EmptySearchResult = (props) => {

  const { noBooksFound, classes } = props;

  return(
    <div className={classes.root} >
      {!noBooksFound && 
        <Typography
        variant="subheading"
        color="textSecondary"
        >
          Busque por um livro...
        </Typography>
      }
      {noBooksFound && 
        <Typography
        variant="subheading"
        color="textSecondary"
        >
          Nenhum livro encontrado...
        </Typography>
      }
    </div>
  )
}

export default withStyles(styles)(EmptySearchResult);