import React from 'react';

import SearchResult from '../SearchResult';
import EmptySearchResult from '../EmptySearchResult';
import Shelf from '../Shelf';
import { MemoryRouter } from 'react-router-dom';

import { testBooks } from '../../common/testData';
import { shelvesData } from '../../common/commonData';
import LinearProgress from '@material-ui/core/LinearProgress';


describe('<SearchResult/>', () => {

  let resultBooks, emptyResult, shelves, query, clearQuery, updateBookShelf, location;

	beforeAll(() => {
    resultBooks= testBooks.books,
    emptyResult = [],
    shelves= shelvesData,
    query = '',
    clearQuery= jest.fn(),
    updateBookShelf= jest.fn(),
    location = {}

	});

  it('should render an EmptyResult', () => {
    const mounted = mount(
      <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = ''
        clearQuery={clearQuery}
        updateBookShelf={updateBookShelf}
        location={location}
      />
    )

    expect(mounted.find(EmptySearchResult)).toHaveLength(1);
  })
  

  it('should render a Shelf', () => {
    const mounted = mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={resultBooks}
        shelves={shelvesData}
        query = 'test'
        clearQuery={clearQuery}
        updateBookShelf={updateBookShelf}
        location={location}
      />
      </MemoryRouter>
    )

    expect(mounted.find(Shelf)).toHaveLength(1);
  })

  it('should render a Linar Progress Bar', () => {
    const mounted = mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = ''
        clearQuery={clearQuery}
        updateBookShelf={updateBookShelf}
        location={location}
        isSearching={true}
      />
      </MemoryRouter>
    )

    expect(mounted.find(LinearProgress)).toHaveLength(1);
  })

  it('should call clearQuery', () => {

    let clearQuery = jest.fn();

    const mounted = mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = 'test'
        clearQuery={clearQuery}
        updateBookShelf={updateBookShelf}
        location={location}
      />
      </MemoryRouter>
    )

    expect(clearQuery.mock.calls.length).toBe(1);
  });

  it('should not call clearQuery', () => {

    let clearQuery = jest.fn();

    const mounted = mount(
      <MemoryRouter>
        <SearchResult
        resultBooks={emptyResult}
        shelves={shelvesData}
        query = 'test'
        clearQuery={clearQuery}
        updateBookShelf={updateBookShelf}
        location={{
          state: {
            fromBookDetail: true
          }
        }}
      />
      </MemoryRouter>
    )

    expect(clearQuery.mock.calls.length).toBe(0);
  });
 
})