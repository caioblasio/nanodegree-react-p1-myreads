import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  closeIcon: {
  
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
  },
});

class SearchBooks extends Component {

  state = {
    query: '',
    typingTimeout: 0
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
 }

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
  }

  searchForBooks = () => {

    const { onSearch } = this.props;
    onSearch(this.state.query);
  }

  render(){
    return (
      <div className={this.props.classes.search}>
        <Input
          placeholder="Search…"
          disableUnderline
          value={this.state.query}
          onChange={this.handleChange}
          classes={{
            root: this.props.classes.inputRoot,
            input: this.props.classes.inputInput,
          }}
        />
        <Link to="/" className={this.props.classes.closeIcon}>
          <IconButton color="inherit">
            <CloseIcon />
          </IconButton>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBooks);