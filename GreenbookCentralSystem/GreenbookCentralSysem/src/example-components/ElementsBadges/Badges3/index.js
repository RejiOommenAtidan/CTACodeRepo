import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="btn-primary m-2">
          <FontAwesomeIcon icon={['far', 'bell']} />
          <div className="badge badge-warning ml-3">
            <b>23</b> New
          </div>
        </Button>
        <Button variant="contained" className="btn-success m-2">
          <div className="badge badge-second mr-3">New</div>
          <span>
            <FontAwesomeIcon icon={['far', 'lightbulb']} />
          </span>
        </Button>
        <Button variant="contained" className="btn-dark m-2">
          <FontAwesomeIcon icon={['far', 'keyboard']} />
          <div className="badge badge-second ml-3">
            <b>65</b>
          </div>
        </Button>
        <Button variant="contained" className="btn-second m-2">
          <FontAwesomeIcon icon={['far', 'bell']} />
          <div className="badge badge-success ml-3">Info</div>
        </Button>
      </div>
    </>
  );
}
