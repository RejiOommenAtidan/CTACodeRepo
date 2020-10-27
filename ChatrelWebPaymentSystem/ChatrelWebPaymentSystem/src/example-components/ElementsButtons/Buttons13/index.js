import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 50000);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <span className="btn-loading-wrapper">
          <Button
            onClick={handleButtonClick}
            className="btn-primary btn-icon btn-transition-none btn-pill d-40 p-0 m-2">
            <span className="btn-wrapper--icon">
              {success ? (
                <FontAwesomeIcon
                  icon={['fas', 'times']}
                  className="font-size-lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={['far', 'user-circle']}
                  className="font-size-lg"
                />
              )}
            </span>
          </Button>
          {loading && (
            <CircularProgress
              size={48}
              style={{ margin: '-24px 0 0 -24px' }}
              className="text-success"
            />
          )}
        </span>
        <span className="btn-loading-wrapper">
          <Button
            onClick={handleButtonClick}
            className="btn-success btn-icon btn-transition-none btn-pill d-50 p-0 m-2">
            <span className="btn-wrapper--icon">
              {success ? (
                <FontAwesomeIcon
                  icon={['fas', 'times']}
                  className="font-size-xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={['far', 'user-circle']}
                  className="font-size-xl"
                />
              )}
            </span>
          </Button>
          {loading && (
            <CircularProgress
              size={58}
              style={{ margin: '-29px 0px 0px -29px' }}
              className="text-danger"
            />
          )}
        </span>
        <span className="btn-loading-wrapper">
          <Button
            onClick={handleButtonClick}
            className="btn-danger btn-icon btn-transition-none btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              {success ? (
                <FontAwesomeIcon
                  icon={['fas', 'times']}
                  className="font-size-xxl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={['far', 'user-circle']}
                  className="font-size-xxl"
                />
              )}
            </span>
          </Button>
          {loading && (
            <CircularProgress
              size={68}
              style={{ margin: '-34px 0 0 -34px' }}
              className="text-dark"
            />
          )}
        </span>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <span className="btn-loading-wrapper">
          <Button
            size="small"
            disabled={loading}
            onClick={handleButtonClick}
            className="btn-primary btn-icon btn-transition-none m-2">
            <span className="btn-wrapper--label">Loading 1</span>
          </Button>
          {loading && (
            <CircularProgress
              size={22}
              className="text-warning"
              style={{ margin: '-11px 0 0 -11px' }}
            />
          )}
        </span>
        <span className="btn-loading-wrapper">
          <Button
            size="medium"
            disabled={loading}
            onClick={handleButtonClick}
            className="btn-success btn-icon btn-transition-none m-2">
            <span className="btn-wrapper--label">Loading 2</span>
          </Button>
          {loading && (
            <CircularProgress
              size={26}
              className="text-second"
              style={{ margin: '-13px 0 0 -13px' }}
            />
          )}
        </span>
        <span className="btn-loading-wrapper">
          <Button
            size="large"
            disabled={loading}
            onClick={handleButtonClick}
            className="btn-danger btn-icon btn-transition-none m-2">
            <span className="btn-wrapper--label">Loading 3</span>
          </Button>
          {loading && (
            <CircularProgress
              size={30}
              className="text-white"
              style={{ margin: '-15px 0 0 -15px' }}
            />
          )}
        </span>
      </div>
    </>
  );
}
