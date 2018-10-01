import React from 'react';
import BooksApp from '../../src/BooksApp';
import Header from '../../src/Header';
import SearchResult from '../../src/SearchResult';

import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('Books App Component', () => {

  it('matches the snapshot', () => {
    const wrapper = mount(<MemoryRouter initialEntries={[ '/search' ]}><BooksApp /></MemoryRouter>)
    expect(wrapper.find(SearchResult)).toHaveLength(1);
  })


  it('starts with 0 shelf books', () => {
    const wrapper = shallow(<BooksApp/>)
    console.log(wrapper.find(Header));
    expect(wrapper.name()).toBe('BooksApp');
  })
})