import React from 'react';
import Dashboard from '../Dashboard';
import Shelf from '../Shelf';

import { MemoryRouter } from 'react-router-dom';
import { testBooks } from '../../common/testData';
import { shelvesData } from '../../common/commonData';

describe('Dashboard', () => {
	let books, shelves, updateBookShelf, location, mounted, wrapper;

	beforeAll(() => {
		books = testBooks.books;
		shelves = shelvesData;
    updateBookShelf = jest.fn();
    location = {
      pathname: '/'
    }

		wrapper = shallow(
			<Dashboard
				books={books}
				shelves={shelves}
        updateBookShelf={updateBookShelf}
        location={location}
			/>
		);

		mounted = mount(
      <MemoryRouter>
        <Dashboard
          books={books}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
		);
  });
  
  it('renders 3 shelves', () => {
		expect(wrapper.find(Shelf).length).toBe(3);
	});

});