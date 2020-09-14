import React from 'react';

import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="m-2 btn-primary">
          Primary
        </Button>
        <Button variant="contained" className="m-2 btn-first">
          First
        </Button>
        <Button variant="contained" className="m-2 btn-second">
          Second
        </Button>
        <Button variant="contained" className="m-2 btn-info">
          Info
        </Button>
        <Button variant="contained" className="m-2 btn-success">
          Success
        </Button>
        <Button variant="contained" className="m-2 btn-warning">
          Warning
        </Button>
        <Button variant="contained" className="m-2 btn-danger">
          Danger
        </Button>
        <Button variant="contained" className="m-2 btn-dark">
          Dark
        </Button>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center">
        <Button className="m-2 btn-neutral-primary">Primary</Button>
        <Button className="m-2 btn-neutral-first">First</Button>
        <Button className="m-2 btn-neutral-second">Second</Button>
        <Button className="m-2 btn-neutral-info">Info</Button>
        <Button className="m-2 btn-neutral-success">Success</Button>
        <Button className="m-2 btn-neutral-warning">Warning</Button>
        <Button className="m-2 btn-neutral-danger">Danger</Button>
        <Button className="m-2 btn-neutral-dark">Dark</Button>
      </div>
    </>
  );
}
