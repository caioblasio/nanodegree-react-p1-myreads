import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBooks from './SearchBooks';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => {
  console.log(theme)
  return {
    root: {
      flexGrow: 1,
      background: theme.palette.primary["100"]
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    link: {
      color: theme.palette.primary["900"],
      textDecoration: 'none'
    }
  }
};

const Header = (props) => {

  const { onSearch, classes } = props;

  return(
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
            <Typography className={classes.grow} variant="title" color="default">
              <Link to="/" className={classes.link}>MyReads</Link>
            </Typography>
          <Route exact path="/" render={() => (
            <Link to="/search" className={classes.link}>
              <IconButton  className={classes.menuButton} color="inherit">
                <SearchIcon />
              </IconButton>
            </Link>
          )}
          />
          <Route path="/search" render={() => (
            <SearchBooks onSearch={onSearch} />
          )}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header);