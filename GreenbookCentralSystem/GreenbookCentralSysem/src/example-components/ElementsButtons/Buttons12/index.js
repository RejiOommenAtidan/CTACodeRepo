import React from 'react';

import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="m-2 btn-square btn-primary">Primary</Button>
        <Button className="m-2 btn-square btn-first">First</Button>
        <Button className="m-2 btn-square btn-second">Second</Button>

        <Button className="m-2 btn-square btn-info">Info</Button>
        <Button className="m-2 btn-square btn-success">Success</Button>
        <Button className="m-2 btn-square btn-warning">Warning</Button>
        <Button className="m-2 btn-square btn-danger">Danger</Button>
        <Button className="m-2 btn-square btn-dark">Dark</Button>
      </div>
    </>
  );
}
