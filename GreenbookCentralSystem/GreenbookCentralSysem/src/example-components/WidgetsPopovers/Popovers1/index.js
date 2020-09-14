import React, { useState } from 'react';

import { Popover, Button, Divider } from '@material-ui/core';

export default function LivePreviewExample() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [anchorEl5, setAnchorEl5] = useState(null);

  const handleClickPopover1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClosePopover1 = () => {
    setAnchorEl1(null);
  };

  const handleClickPopover2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClosePopover2 = () => {
    setAnchorEl2(null);
  };

  const handleClickPopover3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClosePopover3 = () => {
    setAnchorEl3(null);
  };

  const handleClickPopover4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClosePopover4 = () => {
    setAnchorEl4(null);
  };

  const handleClickPopover5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };
  const handleClosePopover5 = () => {
    setAnchorEl5(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-4 flex-wrap">
        <Button
          variant="text"
          className="btn-outline-primary m-2"
          onClick={handleClickPopover1}>
          Popover on top
        </Button>
        <Popover
          open={open1}
          anchorEl={anchorEl1}
          classes={{ paper: 'rounded font-size-md' }}
          onClose={handleClosePopover1}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <div className="rounded-top p-3 font-weight-bold bg-secondary">
            Top Popover
          </div>
          <Divider />
          <div className="p-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </Popover>

        <Button
          variant="text"
          className="btn-outline-primary m-2"
          onClick={handleClickPopover2}>
          Popover on right
        </Button>
        <Popover
          open={open2}
          anchorEl={anchorEl2}
          classes={{ paper: 'rounded font-size-md' }}
          onClose={handleClosePopover2}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}>
          <div className="rounded-top p-3 font-weight-bold bg-secondary">
            Right Popover
          </div>
          <Divider />
          <div className="p-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </Popover>

        <Button
          variant="text"
          className="btn-outline-primary m-2"
          onClick={handleClickPopover3}>
          Popover on center
        </Button>
        <Popover
          open={open3}
          anchorEl={anchorEl3}
          classes={{ paper: 'rounded font-size-md' }}
          onClose={handleClosePopover3}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}>
          <div className="rounded-top p-3 font-weight-bold bg-secondary">
            Center Popover
          </div>
          <Divider />
          <div className="p-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </Popover>

        <Button
          variant="text"
          className="btn-outline-primary m-2"
          onClick={handleClickPopover4}>
          Popover on bottom
        </Button>
        <Popover
          open={open4}
          anchorEl={anchorEl4}
          classes={{ paper: 'rounded font-size-md' }}
          onClose={handleClosePopover4}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <div className="rounded-top p-3 font-weight-bold bg-secondary">
            Bottom Popover
          </div>
          <Divider />
          <div className="p-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </Popover>

        <Button
          variant="text"
          className="btn-outline-primary m-2"
          onClick={handleClickPopover5}>
          Popover on left
        </Button>
        <Popover
          open={open5}
          anchorEl={anchorEl5}
          classes={{ paper: 'rounded font-size-md' }}
          onClose={handleClosePopover5}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right'
          }}>
          <div className="rounded-top p-3 font-weight-bold bg-secondary">
            Left Popover
          </div>
          <Divider />
          <div className="p-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </Popover>
      </div>
    </>
  );
}
