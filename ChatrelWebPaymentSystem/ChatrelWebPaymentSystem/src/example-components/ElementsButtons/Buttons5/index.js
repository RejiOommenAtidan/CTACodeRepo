import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Button className="btn-primary m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'building']} />
          </span>
          <span className="btn-wrapper--label">Left Icon</span>
        </Button>
        <Button className="btn-first m-2">
          <span className="btn-wrapper--label">Right Icon</span>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'building']} />
          </span>
        </Button>
        <Button className="btn-second m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'building']} />
          </span>
          <span className="btn-wrapper--label">Left/Right Icons</span>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'building']} />
          </span>
        </Button>
        <Button className="btn-info m-2 btn-icon">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'building']} />
          </span>
        </Button>
      </div>
      <div className="divider my-3" />

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="btn-success btn-icon btn-pill d-40 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-xs"
            />
          </span>
        </Button>
        <Button className="btn-danger btn-icon btn-pill d-50 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-sm"
            />
          </span>
        </Button>
        <Button className="btn-warning btn-icon btn-pill d-60 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-lg"
            />
          </span>
        </Button>
        <Button className="btn-info btn-icon btn-pill d-70 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-lg"
            />
          </span>
        </Button>
        <Button className="btn-dark btn-icon btn-pill d-80 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-xl"
            />
          </span>
        </Button>
        <Button className="btn-second btn-icon btn-pill d-90 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-xxl"
            />
          </span>
        </Button>
      </div>
    </>
  );
}
