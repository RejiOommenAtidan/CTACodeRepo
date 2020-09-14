import React from 'react';

import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="btn-pill m-2 btn-primary">
          Primary
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-first">
          First
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-second">
          Second
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-info">
          Info
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-success">
          Success
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-warning">
          Warning
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-danger">
          Danger
        </Button>
        <Button variant="contained" className="btn-pill m-2 btn-dark">
          Dark
        </Button>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="text" className="btn-pill m-2 btn-outline-primary">
          Primary
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-first">
          First
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-second">
          Second
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-info">
          Info
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-success">
          Success
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-warning">
          Warning
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-danger">
          Danger
        </Button>
        <Button variant="text" className="btn-pill m-2 btn-outline-dark">
          Dark
        </Button>
      </div>
    </>
  );
}
