import React from 'react';

import SearchBooks from '../SearchBooks';
import { MemoryRouter } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import { createShallow } from '@material-ui/core/test-utils';

describe('Header', () => {

  let onSearch, shallow;

	beforeAll(() => {
 
    onSearch = jest.fn()
    shallow = createShallow({untilSelector: SearchBooks});

	});

  it('should render a Search Icon', () => {
    const mounted = mount(
      <MemoryRouter>
        <SearchBooks
          onSearch={onSearch}
        />
      </MemoryRouter>
    )

    expect(mounted.find('input')).toHaveLength(1);
  });

  it('onSearch should be called with value typed in search input', () => {

    jest.useFakeTimers();

    const mounted = mount(
      <MemoryRouter>
        <SearchBooks
          onSearch={onSearch}
        />
      </MemoryRouter>
    )
  
    mounted.find('input').simulate("change", { target: { value: "test" }});

    jest.runOnlyPendingTimers();

    expect(onSearch.mock.calls.length).toBe(1);
    expect(onSearch.mock.calls[0][0]).toBe('test');

    jest.useRealTimers();

  });
 
})