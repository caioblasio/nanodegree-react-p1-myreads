import React from 'react';

const BookDetail = (props) => {
  console.log(props);
  const { id } = props.match.params;
  return (
    <div>{id}</div>
  )
}

export default BookDetail;