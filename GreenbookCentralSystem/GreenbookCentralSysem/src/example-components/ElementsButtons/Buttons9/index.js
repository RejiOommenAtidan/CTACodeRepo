import React from 'react';

import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="btn-outline-primary border-1 m-2" variant="outlined">
          Primary
        </Button>
        <Button className="btn-outline-first border-1 m-2" variant="outlined">
          First
        </Button>
        <Button className="btn-outline-second border-1 m-2" variant="outlined">
          Second
        </Button>

        <Button className="btn-outline-info border-1 m-2" variant="outlined">
          Info
        </Button>
        <Button className="btn-outline-success border-1 m-2" variant="outlined">
          Success
        </Button>
        <Button className="btn-outline-warning border-1 m-2" variant="outlined">
          Warning
        </Button>
        <Button className="btn-outline-danger border-1 m-2" variant="outlined">
          Danger
        </Button>
        <Button className="btn-outline-dark border-1 m-2" variant="outlined">
          Dark
        </Button>
      </div>
    </>
  );
}
