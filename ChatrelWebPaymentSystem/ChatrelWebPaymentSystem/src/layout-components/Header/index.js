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
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
 // console.log(window.location.pathname);
    const[location,setLocation]=React.useState("");
    const userObj = useSelector(state => state.GLoginReducer.oGoogle);
    console.log(useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails));
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
const currentLocation = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);

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
const locationFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
const isSelfSelected =()=>{
  if(locationFrom=="Self Chatrel" && window.location.pathname=="/PaymentPage"){
    return true
  }
  else {
    return false
  }
}
const isFamilySelected =()=>{
  if(locationFrom=="Chatrel for Family" && window.location.pathname=="/PaymentPage"){
    return true
  }
  else if(window.location.pathname=="/Family") {
    return true
  }
  else{
    return false
  }
}
const isFriendsSelected =()=>{
  if(locationFrom=="Chatrel for Friends" && window.location.pathname=="/PaymentPage"){
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

useEffect(() => {
    // 1000*60*10= 10 mins 
  setTimeout(()=>{toggleSignoutModal();},1000*10*60);


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
          //  title="eChatrel"
            className="app-sidebar-logo">
            <div >
              <img
                alt="eChatrel"
                src={projectLogo}
                width="60px"
              />
            </div>
            <div className="app-sidebar-logo--text" >
            

              <b style={{color:'#1ab700',fontSize:"32px"}}>e</b><b style={{color:'#2a5cff',fontSize:"32px" }} >Chatrel</b>

          
            </div>
          
          </NavLink>
    {!responsive &&  <div style={{paddingLeft:'30px'}}> 
       <List component="div" className="nav-tabs nav-tabs-primary d-flex align-items-center">
                            <ListItem button onClick={()=>{selfPayment();}} selected={isSelfSelected()} >
                                <span>Self Chatrel</span>
                            </ListItem>
                            <ListItem button onClick={()=>{history.push('/Family');}}  selected={isFamilySelected()} >               
                                <span>Family Chatrel </span>
                            </ListItem>
                            <ListItem button onClick={()=>{history.push('/Friends');}}  selected={isFriendsSelected()} >
                                <span> Friends Chatrel</span>
                            </ListItem>
                            <ListItem button onClick={()=>{history.push('/PaymentHistory');}}  selected={window.location.pathname == '/PaymentHistory'?true:false } >
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
    <Dialog open={signoutModal} onClose={logout} classes={{ paper: 'shadow-xl-first rounded' }}>
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
