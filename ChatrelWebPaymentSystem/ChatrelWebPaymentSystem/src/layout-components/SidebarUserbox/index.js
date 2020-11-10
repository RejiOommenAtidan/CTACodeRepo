import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Badge, Menu, Button, Tooltip, Divider } from '@material-ui/core';

import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import { NavLink } from 'react-router-dom';
import GoogleLogoutButton from '../../views/login/GoogleLogout';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
//
const SidebarUserbox = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
/*const userObj=JSON.parse(localStorage.getItem('currentUser'));
if(userObj==null){
window.location="/login"
}*/
let history = useHistory();


const userObj = useSelector(state => state.GLoginReducer.oGoogle);

if(userObj===null){
 history.push("/login");
}
 

  return (
    <>
      <div className="app-sidebar--userbox">
        <div className="avatar-icon-wrapper avatar-icon-md">
          <Badge
            variant="dot"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            badgeContent=" "
            overlap="circle"
            classes={{ badge: 'bg-success badge-circle' }}>
            <div className="avatar-icon rounded-circle">
              {userObj &&
              <img alt="..." src={userObj.imageUrl} />
                }
            </div>
          </Badge>
        </div>
        <div className="my-3 userbox-details">
          <span>{userObj.name}</span>
          <small className="d-block text-white-50">
            ({userObj.email})
          </small>
        </div>
        <Button
          component={NavLink}
          to="/Profile"
          size="small"
          className="btn-userbox">
          View profile
        </Button>
        <br/>
        <GoogleLogoutButton/>
      </div>
    </>
  );
};

export default SidebarUserbox;
