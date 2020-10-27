import React from 'react';

import { Button, Tooltip } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-4 flex-wrap">
        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-primary' }}
          arrow
          placement="top"
          title="This tooltip example has a primary color state !">
          <Button className="btn-primary m-2">Primary</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-secondary' }}
          arrow
          placement="top"
          title="This tooltip example has a secondary color state !">
          <Button className="btn-light m-2">Secondary</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-first' }}
          arrow
          placement="top"
          title="This tooltip example has a first color state !">
          <Button className="btn-first m-2">Primary Alt</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-second' }}
          arrow
          placement="top"
          title="This tooltip example has a second color state !">
          <Button className="btn-second m-2">Secondary Alt</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-info' }}
          arrow
          placement="top"
          title="This tooltip example has a info color state !">
          <Button className="btn-info m-2">Info</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-success' }}
          arrow
          placement="top"
          title="This tooltip example has a success color state !">
          <Button className="btn-success m-2">Success</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-warning' }}
          arrow
          placement="top"
          title="This tooltip example has a warning color state !">
          <Button className="btn-warning m-2">Warning</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-danger' }}
          arrow
          placement="top"
          title="This tooltip example has a danger color state !">
          <Button className="btn-danger m-2">Danger</Button>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: 'text-center p-3 tooltip-dark' }}
          arrow
          placement="top"
          title="This tooltip example has a dark color state !">
          <Button className="btn-dark m-2">Dark</Button>
        </Tooltip>
      </div>
    </>
  );
}
