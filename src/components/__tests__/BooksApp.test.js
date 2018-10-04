import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from '../BooksApp';

import Header from '../Header';
import Dashboard from '../Dashboard';
import CustomizedSnackbars from '../CustomizedSnackbars';

import { MemoryRouter } from 'react-router-dom';

import { testBooks, jsonHeaders } from '../../common/testData';
import { shelvesData } from '../../common/commonData';
import SearchResult from '../SearchResult';


describe.only('BooksApp', () => {

  let mountedRoot, mountedSearch
	beforeAll(() => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
    mountedRoot = mount(<MemoryRouter><BooksApp /></MemoryRouter>);
    mountedSearch = mount(<MemoryRouter initialEntries={[ '/search' ]}><BooksApp /></MemoryRouter>);
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
		expect(mountedRoot.find(Header).length).toBe(1);
  });
  
  it('renders a Dashboard', () => {
		expect(mountedRoot.find(Dashboard).length).toBe(1);
  });
  
  it('renders a Search Result', () => {
		expect(mountedSearch.find(SearchResult).length).toBe(1);
  });

})