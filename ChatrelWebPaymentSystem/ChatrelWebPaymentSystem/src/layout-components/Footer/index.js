import React from 'react';

import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { List, ListItem ,Container,Button,Grid} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import projectLogo from '../../assets/images/CTALogo.png';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import { useSelector,useDispatch} from 'react-redux';
const Footer = (props) => {


  let history = useHistory();
  let dispatch = useDispatch();
  const userObj = useSelector(state => state.GLoginReducer.oGoogle);
  if(userObj===null){
   // history.push("/Login");
   window.location='/Login';
   }


  const { footerShadow, footerBgTransparent } = props;
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);

  const makePayment = (obj)=> {
    // //console.log("Inside Make payment method for " , obj, data)
     dispatch(storeCurrentGBDetails(obj));
     history.push('/Chatrel');
   }
   const selfPayment=() => {
    
     makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' });
   }


  return (
    <>
      <div 
        /*className={clsx('app-footer text-black-50', {
          'app-footer--shadow': footerShadow,
          'app-footer--opacity-bg': footerBgTransparent
        })}*/>
        {/*  <div className="app-footer--second">
          <span>CTA-CHATREL</span> ©
          2020 
         
      </div>*/}
        <div className="bg-white  py-0 mt-2 w-100" /*style={{paddingBottom:'0px',paddingTop:'0px'}}*/>
          <Container className="py-0 text-center text-xl-left py-xl-5">
            <Grid container spacing={6}>
              <Grid item xl={5} className="d-flex align-items-center">
                <div className="mb-5 mb-xl-0 w-100">
                  <div className="app-nav-logo justify-content-center text-left justify-content-xl-left flex-column flex-xl-row">
                    <a
                      //href="/Home"
                      onClick={(e) => e.preventDefault()}
                    //  title="eChatrel"
                      className="app-nav-logo app-nav-logo--dark">
                     
                      <img
                        alt="eChatrel"
                        src={projectLogo}
                        width="75px"
                      />
                      
                      <div className="app-nav-logo--text">
                        <span>CTA</span>

                        <b style={{textTransform:'none'}}>eChatrel</b>
                      </div>
                    </a>
                  </div>
                  <p className="text-black-50 font-size-lg my-4">
                  Your go-to resource for supporting the Tibetan Government.
                  </p>
                  <div className="divider border-1 rounded-circle border-dark bg-dark opacity-2 mx-auto mx-xl-0 mb-4 w-25" />
                  <List
                    component="div"
                    className="justify-content-center justify-content-xl-start">
                    <Button
                      className="btn-facebook btn-icon btn-animated-icon-sm d-30 p-0 mr-2"
                      //href="https://www.facebook.com/TheCentralTibetanAdministration/"
                      onClick={() => {window.open('https://www.facebook.com/TheCentralTibetanAdministration/')}}>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon
                          icon={['fab', 'facebook']}
                          className="font-size-sm"
                        />
                      </span>
                    </Button>

                    <Button
                      className="btn-twitter btn-icon btn-animated-icon-sm d-30 p-0 mr-2"
                     // href="#/"
                      
                      onClick={() => {window.open('https://twitter.com/NetTibet')}}>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          className="font-size-sm"
                        />
                      </span>
                    </Button>

                    <Button
                      className="btn-youtube btn-icon btn-animated-icon-sm d-30 p-0 mr-2"
                      //href="#/"
                      onClick={() => {window.open('https://www.youtube.com/user/ctaonlinetv')}}>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon
                          icon={['fab', 'youtube']}
                          className="font-size-sm"
                        />
                      </span>
                    </Button>

                   
                  </List>
                </div>
              </Grid>
              <Grid item xl={7} className="d-none d-md-flex align-items-center">
                <Grid container spacing={0} className="w-100">
                  <Grid item md={4}>
                    <div className="divider-v divider-v-lg opacity-1 d-none d-xl-block" />
                    <div className="pl-0 pl-lg-3">
                      <h6 className="text-second font-weight-bold mb-3">
                        CHATREL
                      </h6>
                      <List
                        component="div"
                        className="nav-transparent-alt flex-column">
                        <ListItem
                          component="a"
                          button
                        //  href="#/"
                          onClick={()=>{selfPayment();}}
                          className="px-0 d-block d-xl-flex py-1">
                          Self Chatrel
                        </ListItem>
                        {/* <ListItem
                          component="a"
                          button
                          href="/Family"
                          //onClick={()=>{history.push('/Family');}}
                          className="px-0 d-block d-xl-flex py-1">
                          Family Chatrel
                        </ListItem> */}
                        <ListItem
                          component="a"
                          button
                          href="/Friends"
                          //onClick={()=>{history.push('/Friends');}}
                          className="px-0 d-block d-xl-flex py-1">
                          Friends & Family
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="/ChatrelHistory"
                       //   onClick={()=>{history.push('/ChatrelHistory');}}
                          className="px-0 d-block d-xl-flex py-1">
                          Chatrel History
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    <div className="divider-v divider-v-lg opacity-1 d-none d-xl-block" />
                    <div className="pl-0 pl-lg-3">
                      <h6 className="text-second font-weight-bold mb-3">
                        USEFUL LINKS
                      </h6>
                      <List
                        component="div"
                        className="nav-transparent-alt flex-column">
                       
                        <ListItem
                          component="a"
                          button
                          href="/FileDispute"
                         // onClick={()=>{history.push('/FileDispute');}}
                          className="px-0 d-block d-xl-flex py-1">
                          File Dispute
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="/Profile"
                        //  onClick={()=>{history.push('/Profile');}}
                          className="px-0 d-block d-xl-flex py-1">
                          My Profile
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="/ContactUs"
                         // onClick={(e) => e.preventDefault()}
                          className="px-0 d-block d-xl-flex py-1">
                          Contact Us
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="/PrivacyPolicy"
                         // onClick={(e) => e.preventDefault()}
                          className="px-0 d-block d-xl-flex py-1">
                          Privacy Policy
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    <div className="divider-v divider-v-lg opacity-1 d-none d-xl-block" />
                    <div className="pl-0 pl-lg-3">
                      <h6 className="text-second font-weight-bold mb-3">
                        SUPPORT TIBET
                      </h6>
                      <List
                        component="div"
                        className="nav-transparent-alt flex-column">
                        <ListItem
                          component="a"
                          button
                         // href="#/"
                          onClick={(e) => {window.open('http://tibet.net/support-tibet/friends-of-tibet/')}}
                          className="px-0 d-block d-xl-flex py-1">
                          Be a Friend of Tibet
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                         // href="#/"
                          onClick={(e) => {window.open(' https://tibet.net/support-tibet/pay-green-book/')}}
                          className="px-0 d-block d-xl-flex py-1">
                          Green Book (Chatrel)
                        </ListItem>
                        {/* <ListItem
                          component="a"
                          button
                         // href="#/"
                          onClick={(e) => {window.open('http://www.tibetcorps.org/')}}
                          className="px-0 d-block d-xl-flex py-1">
                          Tibet Corps
                        </ListItem> */}
                       
                       
                      </List>
                    </div>
                  </Grid>
                 
                </Grid>
              </Grid>
            </Grid>
            <div className="divider border-1 d-none d-md-block rounded-circle border-dark bg-dark opacity-2 mx-auto my-4 my-lg-5 w-25" />
            <small className="text-center d-block text-black-50">
              Copyright &copy; 2021 - eChatrel   {/*-    <a href="/PrivacyPolicy">Privacy Policy </a>  */}
            </small>

            
          </Container>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent
});

export default connect(mapStateToProps)(Footer);
