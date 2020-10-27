import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alert from '@material-ui/lab/Alert';

export default function LivePreviewExample() {
  return (
    <>
      <Alert
        variant="outlined"
        icon={false}
        className="mb-4 shadow-success-sm"
        severity="success">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-neutral-success rounded-sm text-success">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </span>
          <span>
            <strong className="d-block">Success!</strong> This is a success
            alert—check it out!
          </span>
        </div>
      </Alert>
      <Alert
        variant="outlined"
        icon={false}
        className="mb-4 shadow-info-sm"
        severity="info">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-neutral-info rounded-sm text-info">
            <FontAwesomeIcon icon={['fas', 'question']} />
          </span>
          <span>
            <strong className="d-block">Info!</strong> This is an info
            alert—check it out!
          </span>
        </div>
      </Alert>
      <Alert
        variant="outlined"
        icon={false}
        className="mb-4 shadow-warning-sm"
        severity="warning">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-neutral-warning rounded-sm text-warning">
            <FontAwesomeIcon icon={['fas', 'exclamation']} />
          </span>
          <span>
            <strong className="d-block">Warning!</strong> This is a warning
            alert—check it out!
          </span>
        </div>
      </Alert>
      <Alert
        variant="outlined"
        icon={false}
        className="shadow-error-sm"
        severity="error">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-neutral-danger rounded-sm text-danger">
            <FontAwesomeIcon icon={['fas', 'times']} />
          </span>
          <span>
            <strong className="d-block">Danger!</strong> This is an error
            alert—check it out!
          </span>
        </div>
      </Alert>
    </>
  );
}
