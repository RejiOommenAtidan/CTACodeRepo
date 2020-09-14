import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alert from '@material-ui/lab/Alert';

export default function LivePreviewExample() {
  return (
    <>
      <Alert icon={false} className="mb-4" severity="success">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-white rounded-sm text-success">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </span>
          <span>
            <strong className="d-block">Success!</strong> This is a success
            alert—check it out!
          </span>
        </div>
      </Alert>
      <Alert icon={false} className="mb-4" severity="info">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-white rounded-sm text-info">
            <FontAwesomeIcon icon={['fas', 'question']} />
          </span>
          <span>
            <strong className="d-block">Info!</strong> This is an info
            alert—check it out!
          </span>
        </div>
      </Alert>
      <Alert icon={false} className="mb-4" severity="warning">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-white rounded-sm text-warning">
            <FontAwesomeIcon icon={['fas', 'exclamation']} />
          </span>
          <span>
            <strong className="d-block">Warning!</strong> This is a warning
            alert—check it out!
          </span>
        </div>
      </Alert>
      <Alert icon={false} severity="error">
        <div className="d-flex align-items-center align-content-center">
          <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-white rounded-sm text-danger">
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
