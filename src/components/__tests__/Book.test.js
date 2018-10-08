import React from 'react';
import ReactDOM from 'react-dom';
import Book from '../Book';
import { MemoryRouter } from 'react-router-dom';
import { shelvesData }  from '../../common/commonData';
import { testBooks, jsonHeaders } from '../../common/testData';
import { createShallow } from '@material-ui/core/test-utils';

describe('Book', () => {

  let book1, book2, shelves, updateBookShelf, location, shallow, wrapper, mounted;

	beforeAll(() => {
    book1 = testBooks.books[0];
    book2 = {id: 'testID', shelf: 'none'}; //Book without authors, publishedDate, averageRating, pageCount, etc...
    shelves = shelvesData;
    updateBookShelf = jest.fn();
    location = {};
    shallow = createShallow({untilSelector: Book});

    wrapper = shallow(
      <MemoryRouter>
        <Book
          book={book1}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
    );

    mounted = mount(
      <MemoryRouter>
        <Book
          book={book1}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>
    );

  });

	it("should show the book's title", () => {
		expect(mounted.text().includes(book1.title)).toBe(true);
	});

	it("should show all the book's authors", () => {
		book1.authors.forEach(author => {
			expect(mounted.text().includes(author)).toBe(true);
		});
	});

	it("should show the book's description", () => {
		expect(mounted.text().includes(book1.description.substring(0, 160))).toBe(true);
  });

  it('Renders Book2 without crashing', () => {

    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <Book
          book={book2}
          shelves={shelves}
          updateBookShelf={updateBookShelf}
          location={location}
        />
      </MemoryRouter>, div);
    
  });
  
  it('can change the shelf', () => {

    const component = wrapper.dive();

    //mock the updateBook request
    const mockBookData = { shelfBooks: {...testBooks.books[0], shelf: 'read'} };
		fetch.mockResponse(JSON.stringify(mockBookData), { jsonHeaders });

    component.instance().changeShelf({target: {value: 'read'}});
    expect(component.state().shelf).toEqual('read');
  });
 
});