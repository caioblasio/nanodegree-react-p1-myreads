import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'react-star-rating-component';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import * as BooksAPI from '../utils/BooksAPI';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 8,
    backgroundColor: theme.palette.primary["50"]
  },
  link: {
    color: theme.palette.primary["900"],
    textDecoration: 'none'
  },
  main: {
    marginTop: theme.spacing.unit * 4,
    padding: 0,
    paddingTop: theme.spacing.unit,
    
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 4
    },
  },
  flex: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  media: {
    boxSizing: 'border-box',
    flexGrow: 0,
    flexShrink: 0,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    flexBasis: '33.33333%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '33.33333%'
    }
  },
  cover: {
    height: '400px',
    [theme.breakpoints.up('sm')]: {
      height: '500px'
    },
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.main
  },
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit * 2
  },
  subcontent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

/**
 * @description Get a bigger image by changing parameter in querystring
 * @param {string} uri
 * @param {string} key
 * @param {string} value
*/
const helperGetBigImage = (uri, key, value) => {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri
  }
};

/**
 * @description Book Detail component that shows book's details
 * @param {Object} location
 * @param {Object} match
 * @param {Object} classes
*/
class BookDetail extends Component {

  static propType = {
    location: PropType.object.isRequired,
    match: PropType.object.isRequired,
    classes: PropType.object.isRequired
  };

  state = {
    book: {}
  };
  
  componentDidMount(){

    //Allow user to access the route directly through the book link. If the book is not passed by props, than get data from API
    if(this.props.location.state){
      this.setState({
        book: {...this.props.location.state.book}
      })
    } else {
      BooksAPI.get(this.props.match.params.id)
        .then(book => {
          this.setState({
            book
          })
        })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.location.state &&
          <Link className={classes.link} to={{ pathname: this.props.location.state.fromDashboard ? '/' : '/search', state: {fromBookDetail: true} }} >
            <Button variant="contained" color="secondary">
              {this.props.location.state.fromDashboard ? 'Back To Dashboard' : 'Back To Search Results'}
            </Button>
          </Link>
        }
          <Card className={classes.main}>
            <div className={classes.flex}>
              <div className={classes.media}>
                <CardMedia
                    className={classes.cover}
                    image={this.state.book.imageLinks ? helperGetBigImage(this.state.book.imageLinks.thumbnail, 'zoom', '3') : '#'}
                    title={this.state.book.title ? this.state.book.title : ''}
                  />
              </div>
              <CardContent className={classes.content}>
                <Typography variant="headline">
                  {this.state.book.title ? this.state.book.title : ''}
                </Typography>
                <div className={classes.subcontent}>
                  <div>
                    <Typography 
                    variant="body2"
                    color="textSecondary"
                    className={classes.author}
                    >
                      {this.state.book.authors && this.state.book.authors.map((author, index) => (
                        index > 0 ? <span key={index}> {`e ${author}`}</span> : <span key={index}>{author}</span>
                      ))}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color="textSecondary"
                    >
                      {this.state.book.categories && this.state.book.categories.map((category, index) => (
                        index > 0 ? <span key={index}> {`, ${category}`}</span> : <span key={index}>{category}</span>
                      ))}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color="textSecondary"
                    >
                      {this.state.book.publishedDate ? `Published: ${this.state.book.publishedDate}` : ''}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {this.state.book.pageCount ? `Pages: ${this.state.book.pageCount}` : ''}
                    </Typography>
                    {this.state.book.averageRating && <StarRatingComponent 
                      name="rate1" 
                      starCount={5}
                      value={this.state.book.averageRating}
                      editing={false}
                    />}
                    {!this.state.book.averageRating && !this.state.book.ratingsCount && <Typography
                      variant="caption"
                      color="textSecondary"
                    >
                      rating unavailable
                    </Typography>}
                  </div>
                  {this.state.book.previewLink && 
                    <a target="_blank" className={classes.link} href={this.state.book.previewLink} >
                    <Button variant="outlined" color="secondary">
                      Preview
                    </Button>
                  </a>}
                </div>  
                <Divider className={classes.divider} />
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  {this.state.book.description ? this.state.book.description : ''}
                </Typography>
              </CardContent>
            </div>
          </Card>
        
      </div>
    )
  }
}

export default withStyles(styles)(BookDetail);