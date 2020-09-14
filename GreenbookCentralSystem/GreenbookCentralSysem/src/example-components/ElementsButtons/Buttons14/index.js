import React from 'react';

import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="m-2 btn-transparent btn-link btn-link-primary">
          <span>Primary</span>
        </Button>
        <Button className="m-2 btn-transparent btn-link btn-link-first">
          <span>First</span>
        </Button>
        <Button className="m-2 btn-transparent btn-link btn-link-second">
          <span>Second</span>
        </Button>

        <Button className="m-2 btn-transparent btn-link btn-link-info">
          <span>Info</span>
        </Button>
        <Button className="m-2 btn-transparent btn-link btn-link-success">
          <span>Success</span>
        </Button>
        <Button className="m-2 btn-transparent btn-link btn-link-warning">
          <span>Warning</span>
        </Button>
        <Button className="m-2 btn-transparent btn-link btn-link-danger">
          <span>Danger</span>
        </Button>
        <Button className="m-2 btn-transparent btn-link btn-link-dark">
          <span>Dark</span>
        </Button>
      </div>
    </>
  );
}
