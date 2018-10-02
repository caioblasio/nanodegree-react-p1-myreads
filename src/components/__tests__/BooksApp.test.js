import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from '../BooksApp';

import Header from '../Header';
import Dashboard from '../Dashboard';

import { MemoryRouter } from 'react-router-dom';

import { testBooks, jsonHeaders } from '../../common/testData';
import { shelvesData } from '../../common/commonData';
import SearchResult from '../SearchResult';

describe.only('BooksApp', () => {

  let wrapperRoot, wrapperSearch;

	beforeAll(() => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
    wrapperRoot = mount(<MemoryRouter><BooksApp /></MemoryRouter>);
    wrapperSearch = mount(<MemoryRouter initialEntries={[ '/search' ]}><BooksApp /></MemoryRouter>);

	});

  it('renders without crashing', () => {

    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
          <BooksApp />
      </MemoryRouter>, div);
    
  });

  it('renders a Header', () => {
		expect(wrapperRoot.find(Header).length).toBe(1);
  });
  
  it('renders a Dashboard', () => {
		expect(wrapperRoot.find(Dashboard).length).toBe(1);
  });
  
  it('renders a Search Result', () => {
		expect(wrapperSearch.find(SearchResult).length).toBe(1);
	});

})