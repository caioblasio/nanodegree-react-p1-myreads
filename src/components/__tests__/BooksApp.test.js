import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from '../BooksApp';

import Header from '../Header';
import Dashboard from '../Dashboard';
import BookDetail from '../BookDetail';
import CustomizedSnackbars from '../CustomizedSnackbars';

import { MemoryRouter } from 'react-router-dom';
import { testBooks, jsonHeaders } from '../../common/testData';

import { shelvesData } from '../../common/commonData';
import SearchResult from '../SearchResult';

import { createShallow } from '@material-ui/core/test-utils';

describe('BooksApp', () => {

  let mountedRoot, mountedSearch, shallow;
	beforeAll(() => {
		fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
    mountedRoot = mount(<MemoryRouter><BooksApp /></MemoryRouter>);
    mountedSearch = mount(<MemoryRouter initialEntries={[ '/search' ]}><BooksApp /></MemoryRouter>);
    
    shallow = createShallow({untilSelector: BooksApp});
	});

  it('Renders without crashing', () => {

    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });

    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
          <BooksApp />
      </MemoryRouter>, div);
    
  });

  it('Renders a Header', () => {
		expect(mountedRoot.find(Header).length).toBe(1);
  });
  
  it('Renders a Dashboard', () => {
		expect(mountedRoot.find(Dashboard).length).toBe(1);
  });
  
  it('Renders a Search Result', () => {

		expect(mountedSearch.find(SearchResult).length).toBe(1);
  });

  it('Renders a BookDetail', () => {

    const mockBookData = { book: testBooks.books[0] };
		fetch.mockResponse(JSON.stringify(mockBookData), { jsonHeaders });

    const mounted = mount(
    <MemoryRouter initialEntries={[ '/book/nggnmAEACAAJ']}>
      <BooksApp />
    </MemoryRouter>);

		expect(mounted.find(BookDetail).length).toBe(1);
  });

  it('Renders a SnackBar', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <BooksApp/>
      </MemoryRouter>
      );

      const snackbarInfo = { show: false, shelf: 'read', variant: 'success', action: 'moveToShelf' }
      const component = wrapper.dive();
      component.setState({snackbarInfo: {...snackbarInfo, show: true}})
      expect(component.find(CustomizedSnackbars)).toHaveLength(1);
    
  });

  it('Closes a Snackbar', () => {

    const wrapper = shallow(
      <MemoryRouter>
        <BooksApp/>
      </MemoryRouter>
      );

    const snackbarInfo = { show: false, shelf: 'read', variant: 'success', action: 'moveToShelf' }
    const component = wrapper.dive();
    component.setState({snackbarInfo: {...snackbarInfo, show: true}})
    expect(component.find(CustomizedSnackbars)).toHaveLength(1);
    component.instance().handleSnackBarClose();
    expect(component.find(CustomizedSnackbars)).toHaveLength(0);
    
  });

})