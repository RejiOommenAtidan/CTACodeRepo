import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Typography,
  Badge,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';
import { useMediaQuery } from 'react-responsive'

import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import GoogleLogoutButton from '../../views/login/GoogleLogout';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
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

  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let history = useHistory();

  let dispatch = useDispatch();
const userObj = useSelector(state => state.GLoginReducer.oGoogle);
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
console.log(userObj);
if(userObj===null){
 history.push("/login");
} 
const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);
const [chatrelPending, setChatrelPending] = React.useState(null);

const [currencySymbol, setCurrencySymbol] = React.useState();
const [paymentData, setPaymentData] = React.useState();
const [outstanding, setOutstanding] = useState(true);
 
const makePayment = (obj, data, outstanding)=> {
  console.log("Inside Make payment method for " , obj, data)
  dispatch(storeCurrentGBDetails(obj));
  history.push('/PaymentPage', {pymtData: data, outstanding});
}
const selfPayment=() => {
  axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+paidByGBID)
  .then(resp => {
    if (resp.status === 200) {
      //console.log("Self Chatrel Payment data:", resp.data);
      if(resp.data.chatrelPayment.nChatrelTotalAmount === 0){
        setChatrelPending('0');
        setOutstanding(false);
        // setCurrencySymbol(resp.data.currency === 'INR' ? '₹' : '$' );
        // element.disabled = false;
        // return;
      }
      else{
        setChatrelPending(resp.data.chatrelPayment.nChatrelTotalAmount);
      }
      setPaymentData(resp.data);
      console.log(resp.data);
      
      
      if(resp.data.gbChatrels[0].sAuthRegionCurrency === 'USD'){
        setCurrencySymbol('$');
      }
      else{
        setCurrencySymbol('₹');
      }
      
      console.log("Data fetched...", resp.data);
      makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding);
    }
  })
  .catch(error => {
    console.log(error.message);
    console.log(error.response);
  });

}

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        className="ml-2 btn-transition-none text-left ml-2 p-0 bg-transparent d-flex align-items-center"
        disableRipple>
        <div className="d-block p-0 avatar-icon-wrapper avatar-icon-lg">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            badgeContent=" "
            classes={{ badge: 'bg-success badge-circle border-0' }}
            variant="dot">
            <div className="avatar-icon ">
            {userObj &&
              <img alt="..." src={userObj.imageUrl}/>
                }
            </div>
          </StyledBadge>
        </div>

        <div className="d-none d-xl-block pl-2" style={{fontSize:"16px" }}>
          <div className="font-weight-bold pt-2 line-height-1" >{userObj.name}</div>
          <span className="text-black-50">{userGBObj.sGBID}</span>
          
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(anchorEl)}
        classes={{ list: 'p-0' }}
        onClose={handleClose}>
        <div className="dropdown-menu-lg overflow-hidden p-0" style={{fontFamily:'Poppins'}}>
          
      {responsive && <>  <List
            component="div"
            className="nav-neutral-primary text-left d-block px-3 pb-3">
            <ListItem button onClick={()=>{handleClose();history.push('/Home');}} className="d-block text-left">
              Home
            </ListItem>
           {  <ListItem button onClick={()=>{handleClose();selfPayment();}} className="d-block text-left">
              Self Chatrel
             </ListItem>}
            <ListItem button onClick={()=>{handleClose();history.push('/Family');}} className="d-block text-left">
               Family Chatrel
            </ListItem>
            <ListItem button  onClick={()=>{handleClose();history.push('/Friends');}} className="d-block text-left">
            Friend's Chatrel
            </ListItem>
            <ListItem button onClick={()=>{handleClose();history.push('/PaymentHistory');}} className="d-block text-left">
              Chatrel History
            </ListItem>
            <ListItem button onClick={()=>{handleClose();history.push('/FileDispute');}}  className="d-block text-left">
              File Dispute
            </ListItem>
            <ListItem button onClick={()=>{handleClose();history.push('/Profile');}}  className="d-block text-left">
              My Profile
            </ListItem>
            
          </List>
         
          <Divider className="w-100" /></>}
          <div className="d-block rounded-bottom py-3 text-center" style={{paddingBottom:'0px'}}>
          <GoogleLogoutButton/>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default HeaderUserbox;
