import React from 'react';
import Shelf from './Shelf';


const Dashboard = (props) => {

  const { books, shelves, updateBookShelf, location } = props;

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

export default Dashboard;