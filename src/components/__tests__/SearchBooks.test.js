import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SearchBooks from '../SearchBooks';
import Input from '@material-ui/core/Input';
import { createShallow } from '@material-ui/core/test-utils';

describe('SearchBooks', () => {

  let onSearch, mounted, wrapper, shallow;

	beforeAll(() => {
 
    onSearch = jest.fn();
    shallow = createShallow({untilSelector: SearchBooks}); //helper from Material-UI

    mounted = mount(
      <MemoryRouter>
        <SearchBooks
          onSearch={onSearch}
        />
      </MemoryRouter>
    );

    wrapper = shallow(
      <MemoryRouter>
        <SearchBooks
          onSearch={onSearch}
        />
      </MemoryRouter>
    );

	});

  it('should render an Input', () => {
    
    expect(mounted.find(Input)).toHaveLength(1);
  });

  it('onSearch should be called with value typed in search input', () => {

    jest.useFakeTimers();
  
    mounted.find('input').simulate("change", { target: { value: "test" }});

    jest.runOnlyPendingTimers();

    expect(onSearch.mock.calls.length).toBe(1);
    expect(onSearch.mock.calls[0][0]).toBe('test');

    jest.useRealTimers();

  });

  it('Should clean timeout for input debounce', () => {

    const component = wrapper.dive();

    jest.useFakeTimers();
  
    //trigger first input change
    component.find(Input).simulate("change", { target: { value: "test" }});

    jest.runOnlyPendingTimers();

    //get first timeout
    const timer1 = component.state().typingTimeout;
    //trigger second input change
    component.find(Input).simulate("change", { target: { value: "test" }});
    //get second timeout
    const timer2 = component.state().typingTimeout;
    
    expect(timer1).not.toEqual(timer2);

    jest.useRealTimers();

  });
 
});