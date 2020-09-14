import React from 'react';

import Pagination from '@material-ui/lab/Pagination';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination className="pagination-success" count={10} />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination className="pagination-danger" count={10} disabled />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-primary"
          count={10}
          variant="outlined"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Pagination
          className="pagination-first"
          count={10}
          variant="outlined"
          disabled
        />
      </div>
    </>
  );
}
