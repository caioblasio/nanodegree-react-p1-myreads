import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';

/**
 * @description Dashboard component that holds shelves
 * @param {Object[]} books
 * @param {Object[]} shelves
 * @param {function(Object, string)} updateBookShelf
 * @param {boolean} isLoading
 * @param {Object} location
*/
const Dashboard = ({ books, shelves, updateBookShelf, isLoading, location }) => {

  /**
   * @description View component for an individual book
   * @param {string} shelf
  */
  const getBooksShelves = (shelf) => (
    books.filter(book => (
      book.shelf === shelf
    ))
  );

  return (
    <div>
      {shelves.map(shelf => (
        <Shelf 
          key={shelf.alias}
          isLoading={isLoading}
          shelfTitle={shelf.title}
          shelfBooks={getBooksShelves(shelf.alias)}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location} 
        />
      ))}
    </div>
  )
}

Dashboard.propTypes = {
  books:PropTypes.array.isRequired,
  shelves:PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

export default Dashboard;