import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import SearchIcon from '@material-ui/icons/Search';
import SearchBooks from '../SearchBooks';

describe('Header', () => {

  let onSearch;

	beforeAll(() => {
    onSearch = jest.fn()
	})

  it('should render a Search Icon', () => {
    const mounted = mount(
      <MemoryRouter>
        <Header
          onSearch={onSearch}
        />
      </MemoryRouter>
    )

    expect(mounted.find(SearchIcon)).toHaveLength(1);
  });

  it('should render a Search Bar', () => {
    const mounted = mount(
      <MemoryRouter initialEntries={[ '/search' ]}>
        <Header
          onSearch={onSearch}
        />
      </MemoryRouter>
    )

    expect(mounted.find(SearchBooks)).toHaveLength(1);
  });
 
})