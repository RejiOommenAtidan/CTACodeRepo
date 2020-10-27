import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';

export default function LivePreviewExample() {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    toastrStyle: '',
    message: 'This is a toastr/snackbar notification!'
  });

  const { vertical, horizontal, open, toastrStyle, message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap"></div>
      <div className="divider my-4" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button
          className="m-2 btn-primary"
          onClick={handleClick({
            message: 'This notification is positioned top center!',
            toastrStyle: 'toastr-primary',
            vertical: 'top',
            horizontal: 'center'
          })}>
          Top-Center
        </Button>
        <Button
          className="m-2 btn-second"
          onClick={handleClick({
            message: 'This notification is positioned top right!',
            toastrStyle: 'toastr-second',
            vertical: 'top',
            horizontal: 'right'
          })}>
          Top-Right
        </Button>
        <Button
          className="m-2 btn-success"
          onClick={handleClick({
            message: 'This notification is positioned bottom right!',
            toastrStyle: 'toastr-success',
            vertical: 'bottom',
            horizontal: 'right'
          })}>
          Bottom-Right
        </Button>
        <Button
          className="m-2 btn-warning"
          onClick={handleClick({
            message: 'This notification is positioned bottom center!',
            toastrStyle: 'toastr-warning',
            vertical: 'bottom',
            horizontal: 'center'
          })}>
          Bottom-Center
        </Button>
        <Button
          className="m-2 btn-danger"
          onClick={handleClick({
            message: 'This notification is positioned bottom left!',
            toastrStyle: 'toastr-danger',
            vertical: 'bottom',
            horizontal: 'left'
          })}>
          Bottom-Left
        </Button>
        <Button
          className="m-2 btn-first"
          onClick={handleClick({
            message: 'This notification is positioned top left!',
            toastrStyle: 'toastr-first',
            vertical: 'top',
            horizontal: 'left'
          })}>
          Top-Left
        </Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          open={open}
          classes={{ root: toastrStyle }}
          onClose={handleClose}
          message={message}
        />
      </div>
    </>
  );
}
