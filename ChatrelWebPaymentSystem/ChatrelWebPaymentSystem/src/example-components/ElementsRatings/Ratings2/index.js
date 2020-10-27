import React from 'react';

import Rating from '@material-ui/lab/Rating';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          className="text-warning"
          name="size-small"
          defaultValue={2}
          precision={0.5}
          size="small"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          className="text-danger"
          name="size-medium"
          defaultValue={2}
          precision={0.5}
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          className="text-success"
          name="size-large"
          defaultValue={2}
          precision={0.5}
          readOnly
          size="large"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          className="text-primary"
          name="size-medium"
          defaultValue={2}
          disabled
          precision={0.5}
        />
      </div>
    </>
  );
}
