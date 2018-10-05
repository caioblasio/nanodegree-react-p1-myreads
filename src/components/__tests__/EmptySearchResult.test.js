import React from 'react';

import EmptySearchResult from '../EmptySearchResult';
import { Typography } from '@material-ui/core';

describe('Empty Search Result', () => {


  it('should render the text Type in the search bar to search for a book', () => {

    let noBooksFound = false;
    const mounted = mount(
        <EmptySearchResult
          noBooksFound={noBooksFound}
        />
    )

    expect(mounted.find(Typography).first().text()).toEqual('Type in the search bar to search for a book...');
  });

  it('should render the text No books found', () => {

    let noBooksFound = true;
    const mounted = mount(
        <EmptySearchResult
          noBooksFound={noBooksFound}
        />
    )

    expect(mounted.find(Typography).first().text()).toEqual('No books found...');
  });
 
})