import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Rating from '@material-ui/lab/Rating';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="font-awesome-icons-1"
          defaultValue={2}
          icon={
            <span className="text-first">
              <FontAwesomeIcon spin icon={['fas', 'star']} />
            </span>
          }
          emptyIcon={
            <span className="text-first opacity-4">
              <FontAwesomeIcon spin icon={['far', 'star']} />
            </span>
          }
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="font-awesome-icons-2"
          defaultValue={2}
          icon={
            <span className="text-first">
              <FontAwesomeIcon spin size="2x" icon={['fas', 'star']} />
            </span>
          }
          emptyIcon={
            <span className="text-first opacity-4">
              <FontAwesomeIcon spin size="2x" icon={['far', 'star']} />
            </span>
          }
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="font-awesome-icons-3"
          defaultValue={2}
          icon={
            <span className="text-first">
              <FontAwesomeIcon spin size="3x" icon={['fas', 'star']} />
            </span>
          }
          emptyIcon={
            <span className="text-first opacity-4">
              <FontAwesomeIcon spin size="3x" icon={['far', 'star']} />
            </span>
          }
        />
      </div>
    </>
  );
}
