import { get, getAll, update, search } from '../BooksAPI';
import { testBooks, jsonHeaders } from '../../common/testData';

describe('BooksAPI', () => {
	it('getAll: fetches all books', () => {
		const mockBooksData = testBooks;
		fetch.mockResponse(JSON.stringify(mockBooksData), { jsonHeaders });

		return getAll().then(returnedBooks => {
			expect(returnedBooks).toEqual(mockBooksData.books);
		});
	});

	it('get: fetches one book', () => {
		const mockBookData = { book: testBooks.books[0] };
		const bookId = mockBookData.book.id;
		fetch.mockResponse(JSON.stringify(mockBookData), { jsonHeaders });

		return get(bookId).then(returnedBook => {
			expect(returnedBook).toEqual(mockBookData.book);
		});
	});

	it("update: updates a book's shelf", () => {
		const mockBook = testBooks.books[0];
		const newShelf = 'currentlyReading';
    const expectedBook = {...mockBook, shelf : newShelf };
		fetch.mockResponse(JSON.stringify(expectedBook), { jsonHeaders });

		return update(mockBook, newShelf).then(returnedBook => {
			expect(returnedBook).toEqual(expectedBook);
		});
	});

	it('search: searches for books', () => {
		const query = 'search test';
		const mockBooksData = testBooks;
		fetch.mockResponse(JSON.stringify(mockBooksData), { jsonHeaders });

		return search(query).then(returnedBooks => {
			expect(returnedBooks).toEqual(mockBooksData.books);
		});
	});
});