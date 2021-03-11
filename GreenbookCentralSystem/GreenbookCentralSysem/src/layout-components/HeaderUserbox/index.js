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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import { sButtonColor, sButtonSize, sButtonVariant } from '../../config/commonConfig';
import axios from 'axios';

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
  const [openLogoutConfirmationDialog, setOpenLogoutConfirmationDialog] = useState(false);

  const handleLogoutConfirmationClose = () => {
    setOpenLogoutConfirmationDialog(false);
    setAnchorEl(null);
  };

  const handleLogoutConfirmationOpen = () => {
    setOpenLogoutConfirmationDialog(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logUserOut = () => {
    setAnchorEl(null);
    axios.get(`/User/Logout`)
    .then(resp => {
      if(resp.status === 200){
        console.log("Api logout success")
       // window.location.reload('/Login');
    dispatch(removeAuthDetails());
        //dispatch(removeAuthDetails());
        //history.push('/Login');
      }
    })
    .catch(error => {
      window.location.reload('/Login');
    dispatch(removeAuthDetails());
      //dispatch(removeAuthDetails());
      //history.push('/Login');
    });
    
  };

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
          aria-label="split button" style={{fontFamily: 'inherit'}}>
          <Button className="btn-transition-none" style={{fontFamily: 'inherit'}}>Welcome, {oUserAuth.oUser.sFullname + " (" + oUserAuth.oUserRights.sUserRightsName + ")"}</Button>
          <Button
            className="btn-transition-none px-2"
            color="primary"
            size="small"
            aria-haspopup="true"
            style={{fontFamily: 'inherit'}}
            onClick={handleClick}>
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Menu
          id="simple-menu2"
          anchorEl={anchorEl}
          keepMounted
          style={{fontFamily: 'Noto Serif'}}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{ list: 'p-0' }}>
          <div className="p-3" style={{fontFamily: 'inherit'}}>
            <MenuItem className="pr-5 px-3 text-dark" style={{fontFamily: 'inherit'}} onClick={handleChangePasswordClose}>
              Change Password
            </MenuItem>
            <MenuItem className="pr-5 px-3 text-danger" style={{fontFamily: 'inherit'}} onClick={handleLogoutConfirmationOpen}>
              Logout
            </MenuItem>
          </div>
        </Menu>
      </div>}
      <Dialog
        open={openLogoutConfirmationDialog}
        onClose={handleLogoutConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{fontFamily: 'inherit'}}
      >
        <DialogTitle id="alert-dialog-title">Logout?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
            onClick={handleLogoutConfirmationClose}
            startIcon={<CancelIcon />}
          >
            No
          </Button>
          <Button
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
            onClick={logUserOut}
            autoFocus
            startIcon={<ExitToAppIcon />}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HeaderUserbox;
