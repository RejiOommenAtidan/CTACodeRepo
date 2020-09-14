import React from 'react';

import Alert from '@material-ui/lab/Alert';

export default function LivePreviewExample() {
  return (
    <>
      <Alert className="alerts-alternate mb-4" severity="success">
        <div className="d-flex align-items-center align-content-start">
          <span>
            <strong className="d-block">Success!</strong> This is a success
            alert - check it out!
          </span>
        </div>
      </Alert>
      <Alert className="alerts-alternate mb-4" severity="info">
        <div className="d-flex align-items-center align-content-start">
          <span>
            <strong className="d-block">Info!</strong> This is an info alert -
            check it out!
          </span>
        </div>
      </Alert>
      <Alert className="alerts-alternate mb-4" severity="warning">
        <div className="d-flex align-items-center align-content-start">
          <span>
            <strong className="d-block">Warning!</strong> This is a warning
            alert - check it out!
          </span>
        </div>
      </Alert>
      <Alert className="alerts-alternate mb-4" severity="error">
        <div className="d-flex align-items-center align-content-start">
          <span>
            <strong className="d-block">Danger!</strong> This is an error alert
            - check it out!
          </span>
        </div>
      </Alert>

      <div className="divider my-5" />

      <Alert
        icon={false}
        variant="filled"
        className="text-white mb-4"
        severity="success">
        This is a success alert - check it out!
      </Alert>
      <Alert
        icon={false}
        variant="filled"
        className="text-white mb-4"
        severity="info">
        This is an info alert - check it out!
      </Alert>
      <Alert
        icon={false}
        variant="filled"
        className="text-white mb-4"
        severity="warning">
        This is a warning alert - check it out!
      </Alert>
      <Alert
        icon={false}
        variant="filled"
        className="text-white"
        severity="error">
        This is an error alert - check it out!
      </Alert>
    </>
  );
}
