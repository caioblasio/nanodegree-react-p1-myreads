import React from 'react';
import Dashboard from '../Dashboard';
import Shelf from '../Shelf';
import { testBooks } from '../../common/testData';
import { shelvesData } from '../../common/commonData';

describe('Dashboard', () => {
  
	let books, shelves, updateBookShelf, location, wrapper;

	beforeAll(() => {
		books = testBooks.books;
		shelves = shelvesData;
    updateBookShelf = jest.fn();
    location = {};

		wrapper = shallow(
			<Dashboard
				books={books}
				shelves={shelves}
        updateBookShelf={updateBookShelf}
        location={location}
			/>
		);

  });
  
  it('Renders 3 shelves', () => {
		expect(wrapper.find(Shelf).length).toBe(3);
	});

});