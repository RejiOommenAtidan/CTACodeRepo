import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="btn-facebook m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'facebook']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Facebook</span>
        </Button>
        <Button className="btn-twitter m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'twitter']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Twitter</span>
        </Button>
        <Button className="btn-google m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'google']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Google</span>
        </Button>
        <Button className="btn-instagram m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'instagram']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Instagram</span>
        </Button>
        <Button className="btn-pinterest m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'pinterest']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Pinterest</span>
        </Button>
        <Button className="btn-youtube m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'youtube']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Youtube</span>
        </Button>
        <Button className="btn-slack m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['fab', 'slack']} className="font-size-lg" />
          </span>
          <span className="btn-wrapper--label">Slack</span>
        </Button>
        <Button className="btn-dribbble m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'dribbble']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Dribbble</span>
        </Button>
        <Button className="btn-github m-2">
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon
              icon={['fab', 'github']}
              className="font-size-lg"
            />
          </span>
          <span className="btn-wrapper--label">Github</span>
        </Button>
      </div>
    </>
  );
}
