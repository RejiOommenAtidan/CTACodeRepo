import React from 'react';

import Pagination from '@material-ui/lab/Pagination';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-primary"
          size="small"
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-primary"
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-primary"
          size="large"
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
}
