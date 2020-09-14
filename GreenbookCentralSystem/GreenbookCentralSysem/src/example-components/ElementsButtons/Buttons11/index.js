import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Tooltip title="Facebook" placement="top" arrow>
          <Button className="btn-facebook btn-icon btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'facebook']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <Tooltip title="Twitter" placement="top" arrow>
          <Button className="btn-twitter btn-icon btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'twitter']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <Tooltip title="Google" placement="top" arrow>
          <Button className="btn-google btn-icon btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'google']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <Tooltip title="Instagram" placement="top" arrow>
          <Button className="btn-instagram btn-icon btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'instagram']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <Tooltip title="Pinterest" placement="top" arrow>
          <Button className="btn-pinterest btn-icon btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'pinterest']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
        <Tooltip title="Youtube" placement="top" arrow>
          <Button className="btn-youtube btn-icon btn-pill d-60 p-0 m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fab', 'youtube']}
                className="font-size-lg"
              />
            </span>
          </Button>
        </Tooltip>
      </div>
      <div className="divider my-3" />

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Tooltip title="Slack" placement="top" arrow>
          <Button className="btn-slack btn-icon d-40 p-0 m-2">
            <FontAwesomeIcon icon={['fab', 'slack']} className="font-size-sm" />
          </Button>
        </Tooltip>

        <Tooltip title="Dribbble" placement="top" arrow>
          <Button className="btn-dribbble btn-icon d-50 p-0 m-2">
            <FontAwesomeIcon
              icon={['fab', 'dribbble']}
              className="font-size-lg"
            />
          </Button>
        </Tooltip>
        <Tooltip title="Github" placement="top" arrow>
          <Button className="btn-github btn-icon d-60 p-0 m-2">
            <FontAwesomeIcon
              icon={['fab', 'github']}
              className="font-size-lg"
            />
          </Button>
        </Tooltip>
        <Tooltip title="Discord" placement="top" arrow>
          <Button className="btn-discord btn-icon d-70 p-0 m-2">
            <FontAwesomeIcon
              icon={['fab', 'discord']}
              className="font-size-xl"
            />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
