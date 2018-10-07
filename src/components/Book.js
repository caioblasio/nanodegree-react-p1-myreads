import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
      listStyleType: 'none',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 'calc(50% - 30px)'
      },
      margin: 15,
      display: 'flex'
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing.unit * 1.5,
      paddingBottom: 0,
      overflow: 'visible',
      position: 'relative',
      width: '100%'
    },
    icon: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: theme.zIndex.drawer
    },
    select: {
      position: 'absolute',
      opacity: 0
    },
    main: {
      display: 'flex',
      flexDirection: 'row'
    },
    link: {
      color: theme.palette.primary["900"],
      textDecoration: 'none'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing.unit * 1.5
    },
    author: {
      fontStyle: 'italic',
      display: 'inline'
    },
    cover: {
      width: 120,
      height: 190,
      position: 'relative',
      backgroundColor: theme.palette.primary.main
    },
    footer: {
      textAlign: 'center',
      marginTop: 'auto',
      borderTop: '1px solid',
      borderColor: theme.palette.divider,
      paddingTop: theme.spacing.unit * 0.5,
      paddingBottom: theme.spacing.unit * 0.5
    }
  });


class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  state = {
    shelf: ''
  }

  componentDidMount() {
    const { book } = this.props;
    const shelf = book.shelf;
    this.setState({ shelf });
  }

  changeShelf = event => {
    const { book, updateBookShelf } = this.props;
    const shelf = event.target.value;
    this.setState({ shelf })
    updateBookShelf(book, shelf);
  }

  render() {

    const { book, shelves, classes, location } = this.props;
    const {id, title, authors, description, publishedDate, pageCount, averageRating, ratingsCount, imageLinks, shelf } = book;

    return (
      <li className={classes.root}>
        <Card className={classes.card}>
          <IconButton className={classes.icon}>
            <MoreVertIcon />
            <div className={classes.select}>
              <Select
                value={shelf}
                onChange={this.changeShelf}
                inputProps={{
                  name: 'shelf',
                  id: 'shelf-select',
                }}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                {shelves.map(bookShelf => (
                  <MenuItem key={bookShelf.alias} value={bookShelf.alias}>
                    {bookShelf.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
            
          </IconButton>
          <Link to={{pathname: `/book/${id}`, state: {fromDashboard: location.pathname === '/' ? true : false, book }}} className={classes.link}>
          <CardActionArea>
            <div className={classes.main}>
              <div>
                <CardMedia
                  className={classes.cover}
                  image={imageLinks ? imageLinks.thumbnail : '#'}
                  title={title ? title : ''}
                />
              </div>
              <div>
                <CardContent className={classes.content}>
                  <Typography variant="subheading">
                    {title ? title : ''}
                  </Typography>
                  <Typography 
                    variant="body2"
                    color="textSecondary"
                    className={classes.author}
                  >
                    {authors && authors.map((author, index) => (
                      index > 0 ? <span key={index}> {`e ${author}`}</span> : <span key={index}>{author}</span>
                    ))}
                  </Typography>
                  <Typography 
                    variant="body2"
                    color="textSecondary"
                  >
                    {publishedDate ? `Published: ${publishedDate}` : ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {pageCount ? `Pages: ${pageCount}` : ''}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                  >
                    {description ? `${description.substring(0,160)}...`: ''}
                  </Typography>
                </CardContent>
              </div>
            </div>
          </CardActionArea>
          </Link>
          <div className={classes.footer}>
            {averageRating && <StarRatingComponent 
              name="rate1" 
              starCount={5}
              value={averageRating}
              editing={false}
            />}
            {!averageRating && !ratingsCount && <Typography
              variant="caption"
              color="textSecondary"
            >
              rating unavailable
            </Typography>}
          </div>
        </Card>
      </li>
    )
  }

}

export default withStyles(styles)(Book);