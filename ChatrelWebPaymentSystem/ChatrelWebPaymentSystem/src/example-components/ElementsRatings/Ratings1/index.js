import React from 'react';

import Rating from '@material-ui/lab/Rating';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating name="size-small" defaultValue={2} size="small" />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating name="size-medium" defaultValue={2} />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating name="size-large" defaultValue={2} size="large" />
      </div>
    </>
  );
}
