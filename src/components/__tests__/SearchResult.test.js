import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SearchResult from '../SearchResult';
import EmptySearchResult from '../EmptySearchResult';
import Shelf from '../Shelf';
import LinearProgress from '@material-ui/core/LinearProgress';
import { testBooks } from '../../common/testData';
import { shelvesData } from '../../common/commonData';

describe('SearchResult', () => {

  let resultBooks, emptyResult, shelves, query, clearResults, updateBookShelf, location;

	beforeAll(() => {
    resultBooks= testBooks.books,
    emptyResult = [],
    shelves= shelvesData,
    query = '',
    clearResults= jest.fn(),
    updateBookShelf= jest.fn(),
    location = {}
	});

  it('should render an EmptyResult', () => {
    const mounted = mount(
      <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = ''
        clearResults={clearResults}
        updateBookShelf={updateBookShelf}
        location={location}
      />
    );

    expect(mounted.find(EmptySearchResult)).toHaveLength(1);
  });
  

  it('should render a Shelf', () => {
    const mounted = mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={resultBooks}
        shelves={shelvesData}
        query = 'test'
        clearResults={clearResults}
        updateBookShelf={updateBookShelf}
        location={location}
      />
      </MemoryRouter>
    );

    expect(mounted.find(Shelf)).toHaveLength(1);
  });

  it('should render a Linar Progress Bar', () => {
    const mounted = mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = ''
        clearResults={clearResults}
        updateBookShelf={updateBookShelf}
        location={location}
        isSearching={true}
      />
      </MemoryRouter>
    );

    expect(mounted.find(LinearProgress)).toHaveLength(1);
  });

  it('should call clearResults', () => {

    let clearResults = jest.fn();

    mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = 'test'
        clearResults={clearResults}
        updateBookShelf={updateBookShelf}
        location={location}
      />
      </MemoryRouter>
    )

    expect(clearResults.mock.calls.length).toBe(1);
  });

  it('should not call clearResults', () => {

    let clearResults = jest.fn();

    mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = 'test'
        clearResults={clearResults}
        updateBookShelf={updateBookShelf}
        location={{
          state: {
            fromBookDetail: true
          }
        }}
      />
      </MemoryRouter>
    );

    expect(clearResults.mock.calls.length).toBe(0);
  });
 
});