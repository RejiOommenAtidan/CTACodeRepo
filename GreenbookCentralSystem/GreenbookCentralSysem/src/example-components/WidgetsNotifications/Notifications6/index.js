import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function LivePreviewExample() {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button
          className="m-2 btn-primary"
          onClick={handleClick(TransitionLeft)}>
          Toastr Right
        </Button>
        <Button className="m-2 btn-primary" onClick={handleClick(TransitionUp)}>
          Toastr Up
        </Button>
        <Button
          className="m-2 btn-primary"
          onClick={handleClick(TransitionRight)}>
          Toastr Left
        </Button>
        <Button
          className="m-2 btn-primary"
          onClick={handleClick(TransitionDown)}>
          Toastr Down
        </Button>
        <Snackbar
          open={open}
          className="text-white"
          onClose={handleClose}
          TransitionComponent={transition}
          message="I love snacks"
        />
      </div>
    </>
  );
}
