import React from 'react';

import BookDetail from '../BookDetail';
import { MemoryRouter } from 'react-router-dom';
import { testBooks, jsonHeaders } from '../../common/testData';
import { createShallow } from '@material-ui/core/test-utils';

describe('Book Detail', () => {

  let shallow;

  beforeAll(() => {
    shallow = createShallow({untilSelector: BookDetail});

  });

  it('Should get book data from location object', () => {

    let location = {
      state: {
        book: testBooks.books[0]
      }
    }

    const wrapper = shallow(
    <MemoryRouter initialEntries={[ '/book/nggnmAEACAAJ' ]}>
      <BookDetail
        location={location}
      />
    </MemoryRouter>
    );

    expect(wrapper.dive().state().book.id).toBe('nggnmAEACAAJ')

  });

  it('Should get book data from API', (done) => {

    const mockBookData = { book: testBooks.books[1] };
		fetch.mockResponse(JSON.stringify(mockBookData), { jsonHeaders });

    let match = {
      params: {
        id: 'sJf1vQAACAAJ'
      }
    }

    let location = {}

    const wrapper = shallow(
    <MemoryRouter initialEntries={[ '/book/sJf1vQAACAAJ' ]}>
      <BookDetail
        match={match}
        location={location}
      />
    </MemoryRouter>
    );

    const mounted = mount(wrapper.get(0))

    /* Wait for setState on componentDidMount() */
    setImmediate(() => {
      expect(mounted.state()).toEqual(mockBookData);
			done();
		});

  });

  it('Should render Button with text "Back To Dashboard"', () => {
    
    let location = {
      state: {
        fromDashboard: true
      }
    }

    const mounted = mount(
      <MemoryRouter initialEntries={[ '/book/sJf1vQAACAAJ' ]}>
        <BookDetail
          location={location}
        />
      </MemoryRouter>
      );

    expect(mounted.find('button').first().text()).toEqual('Back To Dashboard');

  });

  it('Should render Button with text "Back To Search Results"', () => {
    
    let location = {
      state: {
        fromDashboard: false
      }
    }

    const mounted = mount(
      <MemoryRouter initialEntries={[ '/book/sJf1vQAACAAJ' ]}>
        <BookDetail
          location={location}
        />
      </MemoryRouter>
      );

    expect(mounted.find('button').first().text()).toEqual('Back To Search Results');

  });

 
})