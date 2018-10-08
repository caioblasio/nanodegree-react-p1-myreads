import React from 'react';

import Shelf from '../Shelf';
import Book from '../Book';
import { MemoryRouter } from 'react-router-dom';
import { shelvesData }  from '../../common/commonData';
import { testBooks } from '../../common/testData';
import { createShallow } from '@material-ui/core/test-utils';
import CircularProgress from '@material-ui/core/CircularProgress';


describe('Shelf', () => {

  let shelfTitle, shelfBooks, shelves, updateBookShelf, location, shallow;

	beforeAll(() => {
    shelfTitle = 'Test Shelf',
    shelfBooks = testBooks.books,
    shelves = shelvesData,
    updateBookShelf = jest.fn(),
    location = {},
    shallow = createShallow({untilSelector: Shelf});

	});

  it('should render 3 books', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Shelf
          shelfTitle={shelfTitle}
          shelfBooks={shelfBooks}
          shelves={shelves}
          isLoading={false}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
    )

    expect(wrapper.dive().find(Book)).toHaveLength(3);

  });

  it('should render a Circular Progress', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Shelf
          shelfTitle={shelfTitle}
          shelfBooks={[]}
          isLoading={true}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
    )

    expect(wrapper.dive().find(CircularProgress)).toHaveLength(1);

  });

 
})