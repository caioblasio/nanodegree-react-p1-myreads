import React from 'react';

import SearchResult from '../SearchResult';
import EmptySearchResult from '../EmptySearchResult';
import Shelf from '../Shelf';
import { BrowserRouter } from 'react-router-dom';

import { testBooks, jsonHeaders } from '../../common/testData';
import { shelvesData } from '../../common/commonData';

describe('<SearchResult/>', () => {

  const emptyResultProps = {
    resultBooks: [],
    query: '',
    location: {},
    clearQuery: jest.fn
  }

  const resultProps = {
    resultBooks: testBooks.books,
    query: 'sample',
    location: {},
    shelves: shelvesData,
    clearQuery: jest.fn,
    updateBookShelf: jest.fn
  }

  xit('should render <EmptySearchResult/>', () => {
    const wrapper = mount(<SearchResult {...emptyResultProps}/>)
    expect(wrapper.find(EmptySearchResult)).toHaveLength(1);
  })


  xit('should render <EmptySearchResult/>', () => {
    const wrapper = mount(<BrowserRouter><SearchResult {...resultProps}/></BrowserRouter>)
    expect(wrapper.find(Shelf)).toHaveLength(1);
  })
})