import React, { useState } from 'react';

import { ButtonGroup, Menu, MenuItem, Button } from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
        <ButtonGroup
          variant="contained"
          className="btn-second m-2"
          color="primary"
          aria-label="split button">
          <Button className="btn-transition-none">Split button</Button>
          <Button
            className="btn-transition-none px-2"
            color="primary"
            size="small"
            aria-haspopup="true"
            onClick={handleClick}>
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Menu
          id="simple-menu2"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{ list: 'p-0' }}>
          <div className="p-3">
            <MenuItem className="pr-5 px-3 text-dark" onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem className="pr-5 px-3 text-dark" onClick={handleClose}>
              My account
            </MenuItem>
            <MenuItem className="pr-5 px-3 text-danger" onClick={handleClose}>
              Logout
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
}
