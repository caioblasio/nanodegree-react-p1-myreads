import React from 'react';

import CustomizedSnackbars from '../CustomizedSnackbars';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';

describe('Customized Snackbars', () => {

  let open, handleClose, variant, message;

  beforeAll(() => {
    open = true,
    handleClose = jest.fn(),
    message = 'Sample Message'
    variant = 'success'
  });


  it('Should render a success Snackbar with a Sample Message', () => {

    const mounted = mount(
      <CustomizedSnackbars
        open={open}
        handleClose={handleClose}
        variant={variant}
        message={message}
      />
    )

    expect(mounted.find('#client-snackbar').text()).toEqual('Sample Message');
    expect(mounted.find(CheckCircleIcon)).toHaveLength(1);
    
  });
 
})