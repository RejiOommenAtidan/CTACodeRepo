import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="btn-primary m-3 badge-wrapper">
          <div className="badge badge-success badge-position badge-position--top-left badge-circle">
            New notifications
          </div>
          <FontAwesomeIcon icon={['far', 'bell']} />
          <div className="badge badge-warning ml-3">
            <b>23</b> New
          </div>
        </Button>
        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-info badge-position badge-position--top-center badge-circle">
            New notifications
          </div>
          <span>
            <FontAwesomeIcon icon={['far', 'keyboard']} />
          </span>
        </Button>

        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-info badge-position badge-position--top-right badge-circle">
            New notifications
          </div>
          <span>
            <FontAwesomeIcon icon={['far', 'lightbulb']} />
          </span>
        </Button>
      </div>

      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="btn-primary m-3 badge-wrapper">
          <div className="badge badge-warning badge-position badge-position--top-left badge-circle-inner">
            New notifications
          </div>
          Button
        </Button>
        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-danger badge-position badge-position--top-center badge-circle-inner">
            New notifications
          </div>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'keyboard']} />
          </span>
          <span className="btn-wrapper--label">Button</span>
        </Button>
        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-danger badge-position badge-position--top-right badge-circle-inner">
            New notifications
          </div>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'lightbulb']} />
          </span>
          <span className="btn-wrapper--label">Button</span>
        </Button>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button variant="contained" className="btn-primary m-3 badge-wrapper">
          <div className="badge badge-success badge-position badge-position--bottom-left badge-circle">
            New notifications
          </div>
          <FontAwesomeIcon icon={['far', 'bell']} />
          <div className="badge badge-warning ml-3">
            <b>23</b> New
          </div>
        </Button>
        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-info badge-position badge-position--bottom-center badge-circle">
            New notifications
          </div>
          <span>
            <FontAwesomeIcon icon={['far', 'keyboard']} />
          </span>
        </Button>
        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-info badge-position badge-position--bottom-right badge-circle">
            New notifications
          </div>
          <span>
            <FontAwesomeIcon icon={['far', 'lightbulb']} />
          </span>
        </Button>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center">
        <Button variant="contained" className="btn-primary m-3 badge-wrapper">
          <div className="badge badge-warning badge-position badge-position--bottom-left badge-circle-inner">
            New notifications
          </div>
          Button
        </Button>
        <Button
          variant="contained"
          className="btn-primary badge-wrapper m-3"
          title="Tooltip example">
          <div className="badge badge-info badge-position badge-position--bottom-center badge-circle-inner">
            New notifications
          </div>
          <span>
            <FontAwesomeIcon icon={['far', 'keyboard']} />
          </span>
        </Button>
        <Button variant="contained" className="btn-primary badge-wrapper m-3">
          <div className="badge badge-danger badge-position badge-position--bottom-right badge-circle-inner">
            New notifications
          </div>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['far', 'lightbulb']} />
          </span>
          <span className="btn-wrapper--label">Button</span>
        </Button>
      </div>
    </>
  );
}
