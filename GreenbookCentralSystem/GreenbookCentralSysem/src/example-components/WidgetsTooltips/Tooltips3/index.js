import React from 'react';

import { Button, Tooltip } from '@material-ui/core';

import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-4 flex-wrap">
        <Tooltip title="This tooltip has a grow animation!">
          <Button size="large" className="m-2 btn-primary">
            Grow
          </Button>
        </Tooltip>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="This tooltip has a fade animation!">
          <Button size="large" className="m-2 btn-primary">
            Fade
          </Button>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom}
          title="This tooltip has a zoom animation!">
          <Button size="large" className="m-2 btn-primary">
            Zoom
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
