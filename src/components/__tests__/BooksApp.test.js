import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { testBooks, jsonHeaders } from '../../common/testData';
import { createShallow } from '@material-ui/core/test-utils';
import BooksApp from '../BooksApp';
import Header from '../Header';
import Dashboard from '../Dashboard';
import BookDetail from '../BookDetail';
import SearchResult from '../SearchResult';
import CustomizedSnackbars from '../CustomizedSnackbars';

describe('BooksApp', () => {

  let shallow, mountedRoot, mountedSearch, wrapper;
  
	beforeAll(() => {
    
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
    shallow = createShallow({untilSelector: BooksApp}); //helper from Material-UI

    mountedRoot = mount(
      <MemoryRouter>
        <BooksApp />
      </MemoryRouter>
    );

    mountedSearch = mount(
      <MemoryRouter initialEntries={[ '/search' ]}>
        <BooksApp />
      </MemoryRouter>
    );
    
    wrapper = shallow(
      <MemoryRouter>
        <BooksApp/>
      </MemoryRouter>
    );

	});

  it('Renders without crashing', () => {

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

    expect(mounted.find(BookDetail)).toHaveLength(1);

  });

  it('Renders a SnackBar', () => {

      const snackbarInfo = { show: false, shelf: 'read', variant: 'success', action: 'moveToShelf' }
      const component = wrapper.dive();
      component.setState({snackbarInfo: {...snackbarInfo, show: true}})
      expect(component.find(CustomizedSnackbars)).toHaveLength(1);
    
  });

  it('Closes a Snackbar', () => {

    const snackbarInfo = { show: false, shelf: 'read', variant: 'success', action: 'moveToShelf' }
    const component = wrapper.dive();
    component.setState({snackbarInfo: {...snackbarInfo, show: true}})
    expect(component.find(CustomizedSnackbars)).toHaveLength(1);
    component.instance().handleSnackBarClose();
    expect(component.find(CustomizedSnackbars)).toHaveLength(0);
    
  });

  it('Searches for books', (done) => {

    const mockBookData = testBooks;
    const testQuery = 'test query'
		fetch.mockResponse(JSON.stringify(mockBookData), {jsonHeaders});

    const component = wrapper.dive();

    component.instance().searchBooks(testQuery)

    //wait for componentDidMount run and shelfBooks piece of state to be set
    setImmediate(() => {
      expect(component.state().searchBooks).toEqual(testBooks.books);
      expect(component.state().searchQuery).toEqual(testQuery);
      done();
    });
    
  });

  it('Searches for books but book is not already in a shelf', (done) => {

    const mockBookData = {books: [{id: 'testID'}]};
    const testQuery = 'test query'
    const component = wrapper.dive();

    //wait for componentDidMount run and shelfBooks piece of state to be set
    setImmediate(() => {
      fetch.mockResponseOnce(JSON.stringify(mockBookData), {jsonHeaders});
      component.instance().searchBooks(testQuery);
      setImmediate(() => {
        //searchBooks should be an array with the book result and a shelf property set to none, as it has no shelf previously assigned
        expect(component.state().searchBooks).toEqual(mockBookData.books.map(book => ({...book, shelf: 'none'})));
        expect(component.state().searchQuery).toEqual(testQuery);
        done();
      })
     
    });
    
  });

  it('Searches for books with a wrong query', (done) => {

    const mockBookData = {books: {error: 'wrong query'}};
    const testQuery = 'wrong query'
    const component = wrapper.dive();
  
    //One setImmeadiate to wait for componentDidMount and other to wait for searchBooks
    setImmediate(() => {
		  fetch.mockResponseOnce(JSON.stringify(mockBookData), {jsonHeaders});
      component.instance().searchBooks(testQuery);
      setImmediate(() => {
        expect(component.state().searchBooks).toEqual(mockBookData.books)
        done();
      })
    
    });
    
  });

  it('Should handle empty query searches', () => {

    const component = wrapper.dive();

    //set to a previous search
    component.setState({searchBooks: testBooks.books})

    //supose user types in an empty query
    component.instance().searchBooks('');

    //should clear the searchBooks and searchQuery
    expect(component.state().searchBooks).toHaveLength(0)
    expect(component.state().searchQuery).toEqual('')
    
  });

  it('Update shelf for a book', (done) => {

    const component = wrapper.dive();

    const book = {...testBooks.books[0]}
    
    //One setImmeadiate to wait for componentDidMount and other to wait for updateBook
    setImmediate(() => {
      expect(component.state().shelfBooks[0].shelf).toEqual('wantToRead');
      component.instance().updateBook(book, 'read') 
      setImmediate(() => {
        expect(component.state().shelfBooks[0].shelf).toEqual('read');
        done();
      });
    });

  });

  it('Update shelf for a book not previously in a shelf', (done) => {

    const component = wrapper.dive();

    const book = {
			title: '4',
			id: 'testID'
    }
    
    // One setImmeadiate to wait for componentDidMount and other to wait for updateBook
    setImmediate(() => {
      component.instance().updateBook(book, 'read') 
      setImmediate(() => {
        //should have 1 more book in the shelfBooks array
        expect(component.state().shelfBooks).toHaveLength(4);
        expect(component.state().shelfBooks[3].shelf).toEqual('read');
        done();
      });
    });

  });


  it('Remove book that is in a shelf, from shelf', (done) => {

    const component = wrapper.dive();

    const book = {...testBooks.books[0]}
    
    //One setImmeadiate to wait for componentDidMount and other to wait for updateBook
    setImmediate(() => {
      expect(component.state().shelfBooks[0].shelf).toEqual('wantToRead');
      component.instance().updateBook(book, 'none') 
      setImmediate(() => {
        expect(component.state().shelfBooks).not.toEqual(expect.arrayContaining([book]));
        done();
      });
    });

  });

  it('Remove book that is not in a shelf, from shelf', (done) => {

    const component = wrapper.dive();

    const book = {id: 'testID', shelf: 'none'}

    //One setImmeadiate to wait for componentDidMount and other to wait for updateBook
    setImmediate(() => {
      component.instance().updateBook(book, 'none') 
      setImmediate(() => {
        expect(component.state().shelfBooks).not.toEqual(expect.arrayContaining([book]));
        done();
      });
    });

  });

});