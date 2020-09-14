import React, { useState } from 'react';

import { Menu, MenuItem, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button
          aria-controls="simple-menu"
          className="btn-primary m-2"
          variant="contained"
          aria-haspopup="true"
          onClick={handleClick}>
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          classes={{ list: 'p-0' }}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <div className="p-3">
            <MenuItem className="pr-5 px-3 text-primary" onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem className="pr-5 px-3 text-primary" onClick={handleClose}>
              My account
            </MenuItem>
            <MenuItem className="pr-5 px-3 text-primary" onClick={handleClose}>
              Logout
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
}
