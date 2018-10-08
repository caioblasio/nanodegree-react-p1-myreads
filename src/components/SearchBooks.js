import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  link: {
    color: theme.palette.primary["900"],
    textDecoration: 'none'
  },
  inputRoot: {
    color: 'inherit',
    flexGrow: 1
  },
  inputInput: {
    padding: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 260,
      '&:focus': {
        width: 400,
      },
    },
  }
});

/**
* @description Search Books Component
* @param {function(string)} onSearch
* @param {Object} classes
*/
class SearchBooks extends Component {

  state = {
    query: '',
    typingTimeout: 0
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
 }

  /**
  * @description Handles change at input field with debounce
  * @param {object} event
  */
  handleChange = (event) => {

    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    this.setState({
      query: event.target.value,
      typingTimeout: setTimeout(function () {
        self.searchForBooks(self.state.name);
      }, 500)
    });
  };

  /**
  * @description Calls onSearch function with the query input by the user
  */
  searchForBooks = () => {

    const { onSearch } = this.props;
    onSearch(this.state.query);
  };

  render(){

    const { classes } = this.props;

    return (
      <div className={classes.search}>
        <Input
          placeholder="Search…"
          disableUnderline
          value={this.state.query}
          onChange={this.handleChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
        <Link to="/" className={classes.link}>
          <IconButton color="inherit">
            <CloseIcon />
          </IconButton>
        </Link>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  onSearch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBooks);