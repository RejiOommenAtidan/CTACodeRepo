import React from 'react';

import { Button } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ratings-buttons-1"
          defaultValue={2}
          icon={
            <Button
              size="small"
              className="btn-success btn-icon mx-1 btn-transition-none">
              &nbsp;
            </Button>
          }
          emptyIcon={
            <Button
              size="small"
              className="btn-neutral-success btn-icon mx-1 btn-transition-none">
              &nbsp;
            </Button>
          }
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ratings-buttons-2"
          defaultValue={2}
          icon={
            <Button className="btn-danger btn-icon mx-1 btn-transition-none">
              &nbsp;
            </Button>
          }
          emptyIcon={
            <Button className="btn-neutral-danger btn-icon mx-1 btn-transition-none">
              &nbsp;
            </Button>
          }
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ratings-buttons-3"
          defaultValue={2}
          icon={
            <Button
              size="large"
              className="btn-warning btn-icon mx-1 btn-transition-none">
              &nbsp;
            </Button>
          }
          emptyIcon={
            <Button
              size="large"
              className="btn-neutral-warning btn-icon mx-1 btn-transition-none">
              &nbsp;
            </Button>
          }
        />
      </div>
    </>
  );
}
