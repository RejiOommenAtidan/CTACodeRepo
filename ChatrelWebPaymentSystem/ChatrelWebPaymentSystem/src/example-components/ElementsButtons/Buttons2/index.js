import React from 'react';

import { ButtonGroup, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ButtonGroup
          className="m-2"
          size="small"
          color="secondary"
          aria-label="small outlined button group">
          <Button className="btn-transition-none">One</Button>
          <Button className="btn-transition-none">Two</Button>
          <Button className="btn-transition-none">Three</Button>
        </ButtonGroup>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ButtonGroup
          size="medium"
          className="m-2"
          color="primary"
          aria-label="outlined primary button group">
          <Button className="btn-transition-none">One</Button>
          <Button className="btn-transition-none">Two</Button>
          <Button className="btn-transition-none">Three</Button>
        </ButtonGroup>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ButtonGroup
          className="m-2"
          size="large"
          variant="contained"
          color="primary"
          aria-label="contained primary button group">
          <Button className="btn-transition-none">One</Button>
          <Button className="btn-transition-none">Two</Button>
          <Button className="btn-transition-none">Three</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
