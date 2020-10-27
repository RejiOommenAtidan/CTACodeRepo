import React from 'react';

import Pagination from '@material-ui/lab/Pagination';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-danger"
          size="small"
          count={8}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-success"
          size="small"
          count={9}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-warning"
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-first"
          count={11}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-second"
          size="large"
          count={12}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-info"
          size="large"
          count={13}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
}
