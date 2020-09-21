import React, { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Typography,
  Badge,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider,
  ButtonGroup,  MenuItem
} from '@material-ui/core';

import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles({
  badge: {
    backgroundColor: 'var(--success)',
    color: 'var(--success)',
    boxShadow: '0 0 0 2px #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
})(Badge);

const HeaderUserbox = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
     <ButtonGroup
          variant="contained"
          className="btn-second m-2"
          color="primary"
          aria-label="split button">
          <Button className="btn-transition-none">Malay Doshi (Admin)</Button>
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
              Change Password
            </MenuItem>
            
            <MenuItem className="pr-5 px-3 text-danger" onClick={handleClose}>
              Logout
            </MenuItem>
          </div>
        </Menu>
    </>
  );
};

export default HeaderUserbox;
