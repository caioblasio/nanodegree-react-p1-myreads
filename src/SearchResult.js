import React from 'react';
import Book from './Book';

const SearchResult = (props) => {

  const { books } = props;

  console.log(books);

  return(
    <div>
      {books && books.map(book => (
        // <Book key={book.id} title={book.title} />
        <p key={book.id}>{book.title}</p>
      ))}
    </div>
  )
}

export default SearchResult;