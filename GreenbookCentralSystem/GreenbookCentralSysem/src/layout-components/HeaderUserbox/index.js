import React, { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  Badge,
  Menu,
  Button,
  ButtonGroup,
  MenuItem,
  Link,
  Breadcrumbs
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthDetails } from "../../actions/userAuthenticateAction";
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
  let history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logUserOut = () => {
    setAnchorEl(null);
    dispatch(removeAuthDetails());
    history.push('/Login');
  }

  const handleChangePasswordClose = () => {
    setAnchorEl(null);
    history.push('/ChangePassword');
  };

  const oUserAuth = useSelector(state => state.UserAuthenticationReducer.oUserAuth);
  let bRender = true;
  if (oUserAuth === null) {
    bRender = false;
    history.push("/Login");
  }
  //const sRightsName = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUserRights.sUserRightsName);

  // const preventDefault = (event) => {
  //   event.preventDefault();
  //   history.push("/Home");
  // };

  return (
    <>
      {/*<Breadcrumbs aria-label="breadcrumb">

        <Link
          color="primary"
          href="/Home"
          onClick={preventDefault}
          underline="hover">
          Home
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>*/}
      {bRender && <div>
      <ButtonGroup
        variant="contained"
        className="btn-second m-2"
        color="primary"
        aria-label="split button">
        <Button className="btn-transition-none">Welcome, {oUserAuth.oUser.sFullname + " (" + oUserAuth.oUserRights.sUserRightsName + ")"}</Button>
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
          <MenuItem className="pr-5 px-3 text-dark" onClick={handleChangePasswordClose}>
            Change Password
            </MenuItem>
          <MenuItem className="pr-5 px-3 text-danger" onClick={logUserOut}>
            Logout
            </MenuItem>
        </div>
      </Menu>
      </div>}
    </>
  );
};

export default HeaderUserbox;
