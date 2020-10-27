import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="btn-success btn-icon btn-animated-icon btn-transition-none btn-pill d-40 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              className="font-size-xs"
            />
          </span>
        </Button>
        <Button className="btn-danger btn-icon btn-animated-icon btn-transition-none btn-pill d-50 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              className="font-size-sm"
            />
          </span>
        </Button>
        <Button className="btn-warning btn-icon btn-animated-icon btn-transition-none btn-pill d-60 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              className="font-size-lg"
            />
          </span>
        </Button>
        <Button className="btn-info btn-icon btn-animated-icon btn-transition-none btn-pill d-70 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              className="font-size-lg"
            />
          </span>
        </Button>
        <Button className="btn-dark btn-icon btn-animated-icon btn-transition-none btn-pill d-80 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              className="font-size-xl"
            />
          </span>
        </Button>
        <Button className="btn-second btn-icon btn-animated-icon btn-transition-none btn-pill d-90 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              className="font-size-xxl"
            />
          </span>
        </Button>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="btn-neutral-success btn-icon btn-animated-icon btn-transition-none d-40 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'life-ring']}
              className="font-size-xs"
            />
          </span>
        </Button>
        <Button className="btn-neutral-danger btn-icon btn-animated-icon btn-transition-none d-50 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'life-ring']}
              className="font-size-sm"
            />
          </span>
        </Button>
        <Button className="btn-neutral-warning btn-icon btn-animated-icon btn-transition-none d-60 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'life-ring']}
              className="font-size-lg"
            />
          </span>
        </Button>
        <Button className="btn-neutral-info btn-icon btn-animated-icon btn-transition-none d-70 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'life-ring']}
              className="font-size-lg"
            />
          </span>
        </Button>
        <Button className="btn-neutral-dark btn-icon btn-animated-icon btn-transition-none d-80 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'life-ring']}
              className="font-size-xl"
            />
          </span>
        </Button>
        <Button className="btn-neutral-second btn-icon btn-animated-icon btn-transition-none d-90 p-0 m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['far', 'life-ring']}
              className="font-size-xxl"
            />
          </span>
        </Button>
      </div>
    </>
  );
}
