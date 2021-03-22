import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {storeGBDetails} from '../../../actions/transactions/GBDetailsAction';
import {storeSession} from '../../../actions/transactions/SessionAction';
import {
  Grid,
  InputAdornment,
  Button,
  TextField,
  Card,Container,
  Tooltip
} from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { Alerts } from '../../../views/alerts';

import { GoogleLogin } from 'react-google-login';
import GoogleLoginPage from 'views/login/GoogleLogin';
import axios from 'axios';
import projectLogo from '../../../assets/images/CTALogo.png';
import wallpaper from '../../../assets/images/wallpaper.jpg';
import newback from '../../../assets/images/new-background.jpg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { storeCurrentGBDetails } from 'actions/transactions/CurrentGBDetailsAction';
import {storeGoogleCreds} from 'actions/transactions/GLoginAction';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { dateTimePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { white } from '@material-ui/core/colors';
import Moment from 'moment';
//import cookieCheck from 'third-party-cookie-check';
import { GoogleLogout } from 'react-google-login';
//import { useDispatch } from 'react-redux';
//import {  Button} from '@material-ui/core';
//import {sGoogleAuth_ClientID} from '../../../config/commonConfig'; 

import Zoom from '@material-ui/core/Zoom';
import AppleLogin from 'react-apple-login'
import  {removeGoogleCreds} from '../../../actions/transactions/GLoginAction';

import AppleSignin from 'react-apple-signin-auth';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color : 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
    },
    
  },

  cssFocused: {
    //color:'white'
    '&.focused': {
      color: 'white'
    }
  },

  notchedOutline: {
    borderWidth: '3px',
    borderColor: 'white !important'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const MyTheme = createMuiTheme({
  palette: {
    secondary: {
      main: '#000',
    },
  },
});

export default function LogingPage(props) {
 
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch();
  
  
    const logout =() =>{
      //  history.go(0);
        dispatch(removeGoogleCreds());
        history.go(0); //oGoogle null
       // localStorage.removeItem("currentUser");
        // window.location.replace('/login');
        
    }
  //const userObj = useSelector(state => state.GLoginReducer.oGoogle);

  const responseGoogle = (response) => {
    console.log(response);

  }

    //Alert
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const alertObj = {
      alertMessage: alertMessage,
      alertType: alertType
    }
    const [snackbar, setSnackbar] = React.useState(false);
    const snackbarOpen = () => {
      setSnackbar(true);
    }
    const snackbarClose = () => {
      setSnackbar(false);
    };
    const [backdrop, setBackdrop] = React.useState(false);

    
  const [submitBtn,setSubmitBtn]=React.useState(true);
   const [login,setLogin]=React.useState(false);
   const [nGBID,setGbID]=React.useState("");
   const [dtDob,setDob]=React.useState(null);
   const [sGoogleCode,setGoogleCode]=React.useState("");
   const [sEmail,setEmail]=React.useState("");

  //On Success of verifying info
let oGBDetails={
  sGBID:nGBID,
  dtDob:dtDob
};
const test =(e)=>{

  setLogin(true);
  dispatch(storeGoogleCreds(e.profileObj));
  setGoogleCode(e.tokenId);
  setEmail(e.profileObj.email);


}
  const submit = (e) => {
    //obj.user=JSON.parse(localStorage.getItem('currentUser')).name;
    //alert(JSON.stringify(obj));
    e.preventDefault();
    setBackdrop(true);
    setSubmitBtn(false);
    if(nGBID==""){
      setBackdrop(false);
      setAlertMessage('Enter Green Book Number');
      setAlertType('info');
      snackbarOpen();
      setSubmitBtn(true);
    }
    else if(dtDob==null){
      setBackdrop(false);
      setAlertMessage('Enter Date Of Birth');
      setAlertType('info');
      snackbarOpen();
      setSubmitBtn(true);
    }
    else{
    let Obj={
      sGBID:""+nGBID,
      dtDOB:Moment(dtDob).format("YYYY-MM-DD"),
      //dtDOB:dtDob,
      code:sGoogleCode,
      sEmail:sEmail,
      sType:"Google"  
     
    }
    console.log(Obj);
    //dispatch(storeGBDetails(oGBDetails));
    //dispatch(storeCurrentGBDetails(oGBDetails));
    //history.push('/Home');
    axios.post(`User/AuthenticateGBID/`,Obj)
    .then(resp => {
      if (resp.status === 200) {
        console.log("Authentication resp", resp.data);
        //setPaymentHistory(resp.data);
        if(resp.data.result ==="Verified"){
          const token = resp.data.sJwtToken
          const dt=new Date();
          const oSession={
            sJwtToken:token,
            bSession:true
          //  bSession: new Date(dt.getTime() + 1000*60*2).getTime(),

          }
          dispatch(storeSession(oSession));
          dispatch(storeCurrentGBDetails(oGBDetails));
          oGBDetails.sCountryID=resp.data.sCountryID;
          oGBDetails.sAuthRegion=resp.data.sAuthRegion;
          console.log('test countryid',oGBDetails);
          
          dispatch(storeGBDetails(oGBDetails));
          
          setBackdrop(false);
          setAlertMessage('Verification Successful');
          setAlertType('success');
          snackbarOpen();
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        //  history.push('/Home');
          setTimeout(() => history.push('/Home'), 3000);
        }
        else{
          console.log(resp.data);
          setBackdrop(false);
          setAlertMessage('Your details could not be verified, please try again.');
          setAlertType('info');
          snackbarOpen();
          setSubmitBtn(true);
        }
      }
    })
    .catch(error => {
      if (error.response.status!=401) {
           setBackdrop(false);
          setAlertMessage('Verification Failed');
          setAlertType('error');
          snackbarOpen();
          setSubmitBtn(true);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    })
    .then(release => {
      //console.log(release); => udefined
    });
  }

  }
  const cookie= async () =>{
    //const { supported, timedOut } = await cookieCheck();

   // console.log("3rd party cookie's:",supported,timedOut);
  }
 useEffect(()=>{
  /*document.cookie = "username=test";
  var testCookie=document.cookie;
  console.log("Test Cookie",testCookie);*/
//  cookie();

 },[]);
 /*  useEffect(() => {
    
    if( userObj == null){
      setLogin(false);
    }
    else{
     setLogin(true);
    }
  
   fetch('https://json.geoiplookup.io/')
   //fetch('http://api.ipstack.com/check?access_key=aba3f72c6ce02b9645fb946f5b8c06fa')
   .then(response => response.json())
  .then(data => {

    console.log(data);
    //alert(data.country_code);
      if(data.country_code!="IN"){
         // history.push('/AccessDenied')

        }
        console.log(data);
  })
  .catch(error => {
console.log(error);

  });

  }, [userObj]);*/
  const [sClientIDGoogle, setsClientIDGoogle]= React.useState(null);
  const sWebAppPassphrase = "RKb4q^!E-NS?wY4=W@`Bt`*H,";
  useEffect(() => {
    console.log('test');
    axios
      .post(`/ChatrelPayment/GetGoogleCredentialsForWebApp?sWebAppPassphrase=${sWebAppPassphrase}`)
      .then((resp) => {
        if (resp.status === 200) {
          console.log('Login Ping Pong: ' + resp.data.sGoogleClientIDWebApp);
          setsClientIDGoogle(resp.data.sGoogleClientIDWebApp);
         
        }
      })
      .catch((error) => {
        if(error.response.status!==401){
          setAlertMessage('Something went wrong, please try again later');
          setAlertType('error');
          snackbarOpen();
        }
        console.log('Error ', error.response);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  }, []);
  return (
    <>
    <div className="app-wrapper min-vh-100 bg-white">
      
                    {/* <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100"> */}
                    <div className=" w-100  min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image opacity-9" style={{backgroundImage: 'url(' + newback + ')'}}/>
                            
                            {/* <div className="bg-composed-wrapper--bg bg-second opacity-7"/> */}
                            
                            <div className="bg-composed-wrapper--content "
                            style={{  position: 'fixed',
                                      top: '50%',
                                      left: '50%',
                                      transform: 'translate(-50%, -50%)'
                                      }}>
                                <Container className="w-50">
                                  
                                    <Card className="rounded-sm modal-content p-3 bg-white-10" >
                                        <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0"  style={{backgroundColor:'#298851'}}>
                                            <Grid container spacing={0}>
                                                <Grid item lg={12} className="d-flex align-items-center justify-content-center flex-column">
                                                    <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                    <div className="text-center mt-4">
                                                    
                                                    { !login &&    <img alt="CTA" src={projectLogo} width="200px" height="200px"/>}
                                                    <h4  className="display-4 mb-1 text-white">དྭང་བླངས་དཔྱ་དངུལ་གྱི་དྲྭ་ཐོག་ཏུ་ཕེབས་པར་དགའ་བསུ་ཞུ། </h4>
                                                    <h5  className="display-4 mb-1 text-white">Welcome to Chatrel online   </h5>

                                                    
                                           {/* <h6 className="display-5 mb-1 text-black ">Your go-to resource for supporting the Tibetan Government</h6> */}
                                                    </div>
                                                    { !login &&  <>  
                                                    { sClientIDGoogle &&  <div className="text-center mb-3">
                                                   <GoogleLoginPage  sClientIDGoogle={sClientIDGoogle} test={test} />
                                                   {/* <AppleLogin 
                                                    clientId="net.chatrel" 
                                                   // redirectURI="https://chatrel.net/Login"
                                                    usePopup={true}
                                                    /> */}
                                                    <AppleSignin
    /** Auth options passed to AppleID.auth.init() */
    authOptions={{
      /** Client ID - eg: 'com.example.com' */
      clientId: 'net.chatrel',
      /** Requested scopes, seperated by spaces - eg: 'email name' */
      scope: 'email name',
      /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
      redirectURI:"https://chatrel-webapp.azurewebsites.net/Login",
      /** State string that is returned with the apple response */
      state: 'state',
      /** Nonce */
      nonce: 'nonce',
      /** Uses popup auth instead of redirection */
      usePopup:false
    }} // REQUIRED
    /** General props */
    uiType="dark"
    /** className */
    className="apple-auth-btn"
    /** Removes default style tag */
    noDefaultStyle={false}
    /** Extra controlling props */
    /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
    onSuccess={(response) => console.log(response)} // default = undefined
    /** Called upon signin error */
    onError={(error) => console.error(error)} // default = undefined
    /** Skips loading the apple script if true */
    skipScript={false} // default = undefined
    /** Apple image props */
    //iconProp={{ style: { marginTop: '10px' } }} // default = undefined
    /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
   // render={(props) => <button {...props}>My Custom Button</button>}
  />
                                                     
                                                                    <Tooltip TransitionComponent={Zoom} title="Enable third-party cookies to login with Google">
                                                                    <Button className=" p-0 m-2" style={{backgroundColor:'#298851'}}>
                                                                      <span className="btn-wrapper--icon">
                                                                          <FontAwesomeIcon icon={['fas', 'info']} className="font-size-lg" />
                                                                      </span>
                                                                     </Button>
                                                                </Tooltip>           
                                    
                                                            </div  >}
                                                            </>
                                                            }
                                                             { login && 
                                                     <div className="p-3">
                                                       <form onSubmit={(e) =>submit(e)}>
                                               
                                                     <div className="text-center text-white py-2 mb-4">
                                                         Signed in with {sEmail}. 
                                                         <GoogleLogout
                            
                                                            clientId={sClientIDGoogle}
                                                          // buttonText="Logout"
                                                            onLogoutSuccess={() => {logout()}}
                                                            //onLogoutSuccess={logout}
                                                      render={renderProps => (
                                                           <Button  onClick={renderProps.onClick} className="p-0 btn-transparent btn-link btn-link-first"><span> Sign Out?</span></Button>      
                                                            )}
                                                            >       
                            </GoogleLogout>
                                                         
                                                         <a className="text-first" > </a>
                                                     </div>
                                                     <h5 className="display-5 mb-4 text-center text-white "> Great! Just one more step now.</h5>
                                                     <div className="text-white ">
                                                         <div className="mb-4">
                                                             <TextField fullWidth
                                                                        variant="outlined"
                                                                        id="textfield-email"
                                                                        label={<span style={{color:'white'}}>Green Book Number</span>}
                                                                        placeholder="Enter Green Book Number"
                                                                        onChange={(e)=>{setGbID(e.target.value)}} 
                                                                       style={{color:'white'}}
                                                                        // InputProps={{
                                                                        //   style: { color: 'white'},
                                                                        //     startAdornment: (
                                                                        //         <InputAdornment position="start">
                                                                        //             <FontAwesomeIcon icon={['fas', 'id-card']} className="display-4 text-white" style={{marginLeft:'10px'}} />
                                                                        //         </InputAdornment>
                                                                        //     ),
                                                                        // }}
                                                                        InputLabelProps={{
                                              
                                                                          shrink: true,
                                                                          classes: {
                                                                            root: classes.cssLabel,
                                                                            focused: classes.cssFocused,
                                                                          },
                                                                        }}
                                                                        InputProps={{
                                                                          style: { color: 'white'},
                                                                          startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <FontAwesomeIcon icon={['fas', 'id-card']} className="display-4 text-white" style={{marginLeft:'10px'}} />
                                                                            </InputAdornment>
                                                                        ),
                                                                          classes: {
                                                                            root: classes.cssOutlinedInput,
                                                                            focused: classes.cssFocused,
                                                                            notchedOutline: classes.notchedOutline,
                                                                          },
                                                                       
                                                                        }}
                                                             />
                                                         </div>
                                                         <div className="mb-3">
                                                         <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                    <div className="m-0">
                                        <KeyboardDatePicker
                                       
                                        fullWidth
                                    //    className="w-50"
                                        inputVariant="outlined"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label={<span style={{color:'white'}}>Date of Birth</span>}
                                           
                                            format="dd-MM-yyyy"
                                            value={dtDob}
                                          placeholder="DD-MM-YYYY"
                                            onChange={(date) => {setDob(date);}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            keyboardIcon={<FontAwesomeIcon icon={['fas', 'calendar-day']} className="display-4  text-white" />}
                                            InputLabelProps={{
                                              
                                              shrink: true,
                                              classes: {
                                                root: classes.cssLabel,
                                                focused: classes.cssFocused,
                                              },
                                            }}
                                            InputProps={{
                                              style: { color: 'white'},
                                              classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                              },
                                           
                                            }}
                                            // InputProps={{
                                            //   style: { color: 'white'}
                                            // }}
                                            InputAdornmentProps={{ position: 'start' }}
                                          
                                        />
                                          </div>
                            </MuiPickersUtilsProvider>
                                                         </div>
                                                     
                                                         <div className="text-center py-2">
                                                           
                                                             <Button className="mx-1  btn-pill w-50 text-white" type = 'submit' disabled={!submitBtn} style={{border:'1px solid white'}} > VERIFY</Button>
                                                         </div>
                                                
                                                     </div>
                                               </form>
                                                 </div>
                                                    
                                                    }
                                                  <div className="text-white" style={{fontSize:'18px'}}> Add Google Account to your Green Book by filling <span style={{color:'#ebcb45' ,cursor:'pointer'}} onClick={()=>{window.open('https://docs.google.com/forms/d/e/1FAIpQLSdEfQ4CZU16qOMtYSfRnlFiHMXJ4AuG0i4q7JHWsWJVyMFdzQ/viewform');}} > this form </span> </div>
                                                  <div className="text-white " style={{fontSize:'30px',marginBottom:'20px'}}> བོད་མིའི་སྒྲིག་འཛུགས་དཔལ་འབྱོར་ལས་ཁུངས་ནས། </div>
                                               {/*   <div className="p-4 py-1">
                                                            <div className="d-block d-xl-flex">
                                                                 <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'id-card']} className="font-size-xl" style={{color:'#ebcb45'}}/>
                                                                </div> 
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-white  font-size-lg mb-1">Map Google Account with Green Book</div>
                                                                    <p className="mb-0 text-white-75">Update your Google Account by filling  <Button  onClick={()=>{window.open('https://docs.google.com/forms/d/e/1FAIpQLSdEfQ4CZU16qOMtYSfRnlFiHMXJ4AuG0i4q7JHWsWJVyMFdzQ/viewform');}} className="p-0 btn-transparent btn-link btn-link-first"><span>this form</span></Button>  </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                       
                                                        <div className="p-4 py-1">
                                                            <div className="d-block d-xl-flex">
                                                                 <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'id-card']} className="font-size-xl " style={{color:'#ebcb45'}}/>
                                                                </div> 
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-white" style={{fontSize:'30px'}}> བོད་མིའི་སྒྲིག་འཛུགས་དཔལ་འབྱོར་ལས་ཁུངས་ནས། </div>
                                                                   
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                </Grid>
                                              
                                              
                                            </Grid>
                                        </Card>
                                    </Card>
                                </Container>
                            </div>
                        </div>
                      
                    </div>
                </div>
             
      {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
           <Backdrop className={classes.backdrop} open={backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
