import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { NavLink } from 'react-router-dom';
import HeaderDots from '../../layout-components/HeaderDots';
import HeaderDrawer from '../../layout-components/HeaderDrawer';
import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderSearch from '../../layout-components/HeaderSearch';
import HeaderMenu from '../../layout-components/HeaderMenu';
import {Button,List,ListItem,Dialog} from '@material-ui/core';
import projectLogo from '../../assets/images/CTALogo.png';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
//import { useSelector,useDispatch} from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import  {removeGoogleCreds} from '../../actions/transactions/GLoginAction';
import  {removeGBDetails} from '../../actions/transactions/GBDetailsAction';
import  {removeCurrentGBDetails} from '../../actions/transactions/CurrentGBDetailsAction';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = (props) => {

  

  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  console.log(responsive);

  const {
    headerShadow,
    headerBgTransparent,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;
  let history = useHistory();
  let dispatch = useDispatch();
  const userObj = useSelector(state => state.GLoginReducer.oGoogle);
  if(userObj===null){
    //history.push("/Login");
    window.location='/Login';
   }



  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
 // console.log(window.location.pathname);
    const[location,setLocation]=React.useState("");
   // const userObj = useSelector(state => state.GLoginReducer.oGoogle);
    console.log(useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails));
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);


console.log(userObj);
if(userObj===null){
 history.push("/Login");
} 
const currentLocation = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);
const [chatrelPending, setChatrelPending] = React.useState(null);

const [currencySymbol, setCurrencySymbol] = React.useState();
const [paymentData, setPaymentData] = React.useState();
const [outstanding, setOutstanding] = useState(true);
 
const makePayment = (obj)=> {
 // console.log("Inside Make payment method for " , obj, data)
  dispatch(storeCurrentGBDetails(obj));
  history.push('/Chatrel');
}
const selfPayment=() => {
 
  makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' });
}
const locationFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
const isSelfSelected =()=>{
  if(locationFrom=="Self Chatrel" && window.location.pathname=="/Chatrel"){
    return true
  }
  else {
    return false
  }
}
// const isFamilySelected =()=>{
//   if(locationFrom=="Chatrel for Family" && window.location.pathname=="/Chatrel"){
//     return true
//   }
//   else if(window.location.pathname=="/Family") {
//     return true
//   }
//   else{
//     return false
//   }
// }
const isFriendsSelected =()=>{
  if(locationFrom=="Chatrel for Friends & Family" && window.location.pathname=="/Chatrel"){
    return true
  }
  else if(window.location.pathname=="/Friends") {
    return true
  }
  else{
    return false
  }
}
const [signoutModal, setSignoutModal] = useState(false);
const toggleSignoutModal = () => setSignoutModal(!signoutModal);
const logout =() =>{
  //alert('logout');
  toggleSignoutModal();
   
  dispatch(removeGoogleCreds());
  dispatch(removeCurrentGBDetails());
  dispatch(removeGBDetails());
  history.push('/Login');
    
}
const oSession = useSelector(
  (state) => state.SessionReducer.oSession
);
// if (oSession !== null)
// {
//  setSignoutModal(!oSession.bSession); 
// }


const time=1000*60*10;
useEffect(() => {
    // 1000*60*10= 10 mins 
 // setTimeout(()=>{toggleSignoutModal();},time);


}, []);


  return (
    <>
     <div
      className={clsx('app-header', {
        'app-header--shadow': headerShadow,
        'app-header--opacity-bg': headerBgTransparent
      })}>
      <div className="app-header--pane">
     {/*     <button
          className={clsx(
            'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
            { 'is-active': sidebarToggleMobile }
          )}
          onClick={toggleSidebarMobile}>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <HeaderSearch />
      <HeaderMenu /> */}
      <div className="app-sidebar-logo">
          <NavLink
            to="/Home"
          //  title="Chatrel"
            className="app-sidebar-logo">
            <div >
              <img
                alt="Chatrel"
                src={projectLogo}
                width="60px"
              />
            </div>
            <div className="app-sidebar-logo--text" >
            

              <b style={{color:'#2a5cff',fontSize:"32px" }} >Chatrel</b>

          
            </div>
          
          </NavLink>
    {!responsive &&  <div style={{paddingLeft:'30px'}}> 
       <List component="div" className="nav-tabs nav-tabs-primary d-flex align-items-center">
                            <ListItem button onClick={()=>{selfPayment();}} selected={isSelfSelected()} >
                                <span>Self Chatrel</span>
                            </ListItem>
                            {/* <ListItem button onClick={()=>{history.push('/Family');}}  selected={isFamilySelected()} >               
                                <span>Family Chatrel </span>
                            </ListItem> */}
                            <ListItem button onClick={()=>{history.push('/Friends');}}  selected={isFriendsSelected()} >
                                <span> Friends & Family</span>
                            </ListItem>
                            <ListItem button onClick={()=>{history.push('/ChatrelHistory');}}  selected={window.location.pathname == '/ChatrelHistory'?true:false } >
                                <span> Chatrel History </span>
                            </ListItem>
                            <ListItem button onClick={()=>{history.push('/FileDispute');}}  selected={window.location.pathname == '/FileDispute'?true:false} >
                                <span>File Dispute </span>
                            </ListItem>
                            <ListItem button onClick={()=>{history.push('/Profile');}}  selected={window.location.pathname == '/Profile'?true:false} >
                                <span>My Profile </span>
                            </ListItem>
                        </List>
     </div>}

        </div>
      </div>
      <div className="app-header--pane">
      

        {/*   <HeaderDots />
        
       <HeaderDrawer />*/}
       <HeaderUserbox />
      </div>
    </div>
    <Dialog open={/*signoutModal*/false} onClose={logout} classes={{ paper: 'shadow-xl-first rounded' }}>
                            <div className="text-center p-5">
                                <div className="avatar-icon-wrapper rounded-circle m-0">
                                    <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
                                        <FontAwesomeIcon icon={['fas', 'hourglass-end']} className="d-flex align-self-center display-3"/>
                                    </div>
                                </div>
                                <h4 className="font-weight-bold mt-4">Session Timeout</h4>
                                <p className="mb-0 text-black-50">Your session has timed out. Please signin again.</p>
                                <div className="pt-4">
                                    <Button onClick={logout} className="btn-outline-first border-1 m-2" variant="outlined">
                                        <span className="btn-wrapper--label">
                                            Close
                    </span>
                                    </Button>
                                   
                                </div>
                            </div>
                        </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
