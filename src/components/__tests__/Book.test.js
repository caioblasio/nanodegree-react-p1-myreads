import React from 'react';

import Book from '../Book';
import { MemoryRouter } from 'react-router-dom';
import { shelvesData }  from '../../common/commonData';
import { testBooks, jsonHeaders } from '../../common/testData';
import { createShallow } from '@material-ui/core/test-utils';
import CardMedia from '@material-ui/core/CardMedia';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

describe('Book', () => {

  let book, shelves, updateBookShelf, location, shallow, wrapper, mounted;

	beforeAll(() => {
    book = testBooks.books[0]
    shelves = shelvesData
    updateBookShelf = jest.fn()
    location = {}
    shallow = createShallow({untilSelector: Book});

    wrapper = shallow(
      <MemoryRouter>
        <Book
          book={book}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
    )

    mounted = mount(
      <MemoryRouter>
        <Book
          book={book}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
    )

  });

	it("should show the book's title", () => {
		expect(mounted.text().includes(book.title)).toBe(true);
	});

	it("should show all the book's authors", () => {
		book.authors.forEach(author => {
			expect(mounted.text().includes(author)).toBe(true);
		});
	});

	it("should show the book's description", () => {
		expect(mounted.text().includes(book.description.substring(0, 160))).toBe(true);
  });
  
  it('can change the shelf', () => {

    const component = wrapper.dive();

    const mockBookData = { shelfBooks: {...testBooks.books[0], shelf: 'read'} };
		fetch.mockResponse(JSON.stringify(mockBookData), { jsonHeaders });


    component.instance().changeShelf({target: {value: 'read'}});
    expect(component.state().shelf).toEqual('read');
  });
 
})