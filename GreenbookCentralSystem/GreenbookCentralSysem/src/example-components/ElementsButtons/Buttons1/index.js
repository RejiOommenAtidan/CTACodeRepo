import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="btn-primary m-2">
          Button
        </Button>
        <Button variant="contained" className="btn-primary m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'lightbulb']} />
          </span>
          <span className="btn-wrapper--label">Left icon</span>
        </Button>
        <Button variant="contained" className="btn-primary m-2">
          <span className="btn-wrapper--label">Right icon</span>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'keyboard']} />
          </span>
        </Button>
        <Button variant="contained" className="btn-primary m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['fas', 'cog']} />
          </span>
        </Button>
      </div>
      <div className="divider my-3" />

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="d-flex align-items-center justify-content-center">
          <Button size="small" variant="contained" className="btn-primary m-2">
            Button
          </Button>
          <Button variant="contained" className="btn-primary m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['far', 'lightbulb']} />
            </span>
            <span className="btn-wrapper--label">Left icon</span>
          </Button>
          <Button size="large" variant="contained" className="btn-primary m-2">
            <span className="btn-wrapper--label">Right icon</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['far', 'keyboard']} />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
