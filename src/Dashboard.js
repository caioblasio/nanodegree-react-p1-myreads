import React from 'react';
import Shelf from './Shelf';


const Dashboard = (props) => {

  const { books } = props;

  const getBooksShelves = (shelf) => (
    books.filter(book => (
      book.shelf === shelf
    ))
  );

    return (
      <div>
        <Shelf shelfTitle="Currently Reading" shelfBooks={getBooksShelves("currentlyReading")} />
        <Shelf shelfTitle="Want to Read" shelfBooks={getBooksShelves("wantToRead")} />
        <Shelf shelfTitle="Read" shelfBooks={getBooksShelves("read")} />
      </div>
    )
}

export default Dashboard;