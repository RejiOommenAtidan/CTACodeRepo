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
import {sGoogleAuth_ClientID} from '../../../config/commonConfig'; 

import Zoom from '@material-ui/core/Zoom';

import  {removeGoogleCreds} from '../../../actions/transactions/GLoginAction';
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
    }
  },

  cssFocused: {},

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
      sEmail:sEmail
     
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
      if (error.response) {
           setBackdrop(false);
          setAlertMessage('Verification Failed');
          setAlertType('error');
          snackbarOpen();
          setSubmitBtn(true);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.warn(error.request);
      } else {
        console.error('Error', error.message);
      }
      console.log(error.config);
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

  return (
    <>
    <div className="app-wrapper min-vh-100 bg-white">
      
                    <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image opacity-9" style={{backgroundImage: 'url(' + newback + ')'}}/>
                            <div className="bg-composed-wrapper--bg bg-second opacity-7"/>
                            <div className="bg-composed-wrapper--content p-3 p-md-5">
                                <Container>
                                  
                                    <Card className="rounded-sm modal-content p-3 bg-white-10">
                                        <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                            <Grid container spacing={0}>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column">
                                                    <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                    <div className="text-center mt-4">
                                                    
                                                    <img alt="CTA" src={projectLogo} width="200px" height="200px"/>
                                                    <h4  className="display-3 mb-1 text-black">eChatrel</h4>
                                           <h6 className="display-5 mb-1 text-black ">Your go-to resource for supporting the Tibetan Government</h6>
                                                    </div>
                                                    { !login &&    
                                                    <div className="text-center mb-3">
                                                      <GoogleLoginPage  test={test} />
                                                     
                                                                    <Tooltip TransitionComponent={Zoom} title="Enable third-party cookies to login with Google">
                                                                    <Button className="btn-secondary btn-icon btn-pill bg-white d-40 p-0 m-2">
                                                                      <span className="btn-wrapper--icon">
                                                                          <FontAwesomeIcon icon={['fas', 'info']} className="font-size-lg" />
                                                                      </span>
                                                                     </Button>
                                                                </Tooltip>           
                                                            {/* <Button className="m-1  btn-pill" style={{border:'1px solid black'}} >
                                            <span className="mr-2" >
                                               <img alt="..." className="img-fluid" height="50" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4T6VTQUgUYRT+3j/+1Ebmhprd7NDSLYlchQ1jV91DFEFs7KEsIg+LdEiIIvDiQTc6Z0gRXmohWYo65jqFNiGrLRV1KLBjbmvJtjaSzo7zYpZtnZEtD73be7zv430f3yNsqoXg4QapiD4GwgB8ALwAFgC8JEvcanyRzjgh5Gy+dbb2M1EcgGczcbm3iHFHGtsGvJqWt2cVgsUu/wiAS38BboyJ5oWlBBuez3ypEOS6/D0E3HeATQAJMKZY8DKYDhIQA1AgYYYaU29sSaUi1lC7FD80aa3VtJVnOUvh7r0Trz84r1k61r7LNOBpUtM5lweGKi+gKEb1B/vnzOyODgYFmtTZmS2l/LnAUGWCGGfsfu1d/djOK197neDQsH6eCHuqElr0iYqT8hWAQFnRTdltXHcudw7pb0FoqUbAIO2/CACkySnh6Wrz2OkT824JQz+HIah5w3XYZtsBA8BPyEjJi0Uot2OFI3MfTW+HECIwG01WNXFwkMW0XPkMYF8JDlwjTqEulD/5TLdke9mHHAsKZ6LJ9y7dzBSK66MEsvNg1zos80Apif7xSA+zO0jESIBoyiLOE8NHLM5uz/b/kL9ajtr5IfBddaA2Voly63hkBLx1lOVyMO35fm61RtYdn7hKK65n8j+MXGbgxj+eyT74EQvRm4kmC5VfcGpte3yqfr1IfcQUBsEHxm4AWWJMW4q4l4kmNef+b0N4yYovWTzTAAAAAElFTkSuQmCC"} />
                                            </span>

                                                  <div style={{fontFamily:'Roboto'}}>            
                                              Sign in with Google
                                                    </div>    
                                                            </Button>} */}
                                                            </div  >}
                                                 
                                                </Grid>
                                              
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column bg-secondary">
                                                { !login &&      <div className="p-3">
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'id-card']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black  font-size-lg mb-1">Map Google Account with Green Book</div>
                                                                    <p className="mb-0 text-black-75">Update your Google Account by filling  <Button  onClick={()=>{window.open('https://docs.google.com/forms/d/e/1FAIpQLSdEfQ4CZU16qOMtYSfRnlFiHMXJ4AuG0i4q7JHWsWJVyMFdzQ/viewform');}} className="p-0 btn-transparent btn-link btn-link-first"><span>this form</span></Button>  </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'landmark']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black font-weight-bold font-size-xxl mb-1">དྭང་བླངས་དཔྱ་དངུལ་དྲ་ངོར་འབུལ་བར་དགའ་བསུ་ཞུ།</div>
                                                                    <p className="mb-0 text-black-75 font-size-xl">བོད་མིའི་སྒྲིག་འཛུགས་དཔལ་འབྱོར་ལས་ཁུངས་ནས།</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'seedling']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black  font-size-lg mb-1">Goals and Needs of Chatrel</div>
                                                                    <p className="mb-0 text-black-75">Chatrel symbolizes the Tibetan people’s recognition of CTA as their legitimate representative. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>}
                                                    { login && 
                                                     <div className="p-3">
                                                       <form onSubmit={(e) =>submit(e)}>
                                               
                                                     <div className="text-center text-black py-2 mb-4">
                                                         Signed in with {sEmail}.
                                                         <GoogleLogout
                            
                                                            clientId={sGoogleAuth_ClientID}
                                                          // buttonText="Logout"
                                                            onLogoutSuccess={() => {logout()}}
                                                            //onLogoutSuccess={logout}
                                                      render={renderProps => (
                                                           <Button  onClick={renderProps.onClick} className="p-0 btn-transparent btn-link btn-link-first"><span>Sign Out?</span></Button>      
                                                            )}
                                                            >       
                            </GoogleLogout>
                                                         
                                                         <a className="text-first" > </a>
                                                     </div>
                                                     <h5 className="display-5 mb-4 text-center text-black "> Great! Just one more step now.</h5>
                                                     <div>
                                                         <div className="mb-4">
                                                             <TextField fullWidth
                                                                        variant="outlined"
                                                                        id="textfield-email"
                                                                        label="Green Book Number"
                                                                        placeholder="Enter Green Book Number"
                                                                        onChange={(e)=>{setGbID(e.target.value)}} 
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                                <InputAdornment position="start">
                                                                                    <FontAwesomeIcon icon={['fas', 'id-card']} className="display-4" style={{marginLeft:'10px'}} />
                                                                                </InputAdornment>
                                                                            ),
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
                                            label="Date of Birth"
                                            format="dd-MM-yyyy"
                                            value={dtDob}
                                          placeholder="Enter Date of Birth"
                                            onChange={(date) => {setDob(date);}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            keyboardIcon={<FontAwesomeIcon icon={['fas', 'calendar-day']} className="display-4  text-black" />}
                                            // InputLabelProps={{
                                              
                                            //   shrink: true,
                                            //   classes: {
                                            //     root: classes.cssLabel,
                                            //     focused: classes.cssFocused,
                                            //   },
                                            // }}
                                            // InputProps={{
                                           
                                            //   classes: {
                                            //     root: classes.cssOutlinedInput,
                                            //     focused: classes.cssFocused,
                                            //     notchedOutline: classes.notchedOutline,
                                            //   },
                                           
                                            // }}
                                            InputAdornmentProps={{ position: 'start' }}
                                          
                                        />
                                          </div>
                            </MuiPickersUtilsProvider>
                                                         </div>
                                                     
                                                         <div className="text-center py-4">
                                                           
                                                             <Button className="m-1  btn-pill w-50" type = 'submit' disabled={!submitBtn} style={{border:'1px solid black'}} > VERIFY</Button>
                                                         </div>
                                                
                                                     </div>
                                               </form>
                                                 </div>
                                                    
                                                    }
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
