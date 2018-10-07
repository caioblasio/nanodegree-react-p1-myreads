import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';


const Dashboard = ({ books, shelves, updateBookShelf, location }) => {

  const getBooksShelves = (shelf) => (
    books.filter(book => (
      book.shelf === shelf
    ))
  );

  return (
    <div>
      {shelves.map(shelf => (
        <Shelf key={shelf.alias} shelfTitle={shelf.title} shelfBooks={getBooksShelves(shelf.alias)} shelves={shelves} updateBookShelf={updateBookShelf} location={location} />
      ))}
    </div>
  )
}

Dashboard.propTypes = {
  books:PropTypes.array.isRequired,
  shelves:PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default Dashboard;