import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {storeGBDetails} from '../../../actions/transactions/GBDetailsAction';
import {
  Grid,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { Alerts } from '../../../views/alerts';

import { GoogleLogin } from 'react-google-login';
import GoogleLoginPage from 'views/login/GoogleLogin';
import axios from 'axios';
import projectLogo from '../../../assets/images/CTALogo.png';
import wallpaper from '../../../assets/images/wallpaper.jpg';
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
        dispatch(removeGoogleCreds()); //oGoogle null
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
        //setPaymentHistory(resp.data);
        if(resp.data=="Verified"){
          dispatch(storeGBDetails(oGBDetails));
          dispatch(storeCurrentGBDetails(oGBDetails));
          setBackdrop(false);
          setAlertMessage('Verification Successful');
          setAlertType('success');
          snackbarOpen();
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
      <div className="app-wrapper  min-vh-100" style={{  background:`rgba(255, 255, 255, 0.5) url(${wallpaper})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" , color:'white'}}>
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <form onSubmit={(e) =>submit(e)} >
                    <Grid item md={10} lg={8} xl={5} className="mx-auto">
                      <div className="text-center" style={{textAlign:'center',background: "rgba(0,0,0,0.7)",borderRadius: "25px",padding:'25px' }}>
                        <img alt="CTA" src={projectLogo} width="250px" height="250px"/>
                        
                        <br />
                        { !login &&             
                        <>
                        <h1  className="display-2 mb-1 font-weight-bold">eChatrel</h1>
                        <h4 className="display-5 mb-1 ">Your go-to resource for supporting the Tibetan Government</h4>     


                        <GoogleLoginPage
                        test={test}
                        />
                        </>
                        }
                      
                        {
                          login &&
                        <>
                          <h5 className="display-5 mb-1 " > Great! Thanks for logging in through Google. Just one more step now. </h5>  
                          <br/>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField   
                              id="standard-basic" 
                              autoFocus
                              variant="outlined"
                              className="w-50"
                        
                              //type='number' 
                              onChange={(e)=>{setGbID(e.target.value)}} 
                              label={<div style={{color:"white"}}>Green Book Number</div>}
                              /*inputProps={{ style: { color: 'white',borderColor:'white'}}}
                              InputLabelProps={{ style: { color: 'white'}}}*/
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                },
                              }}
                              InputProps={{
                                startAdornment: <InputAdornment style={{color:'#fff'}} position="start"><FontAwesomeIcon icon={['fas', 'id-card']} className="display-4 mx-2" /></InputAdornment>,
                                classes: {
                                  root: classes.cssOutlinedInput,
                                  focused: classes.cssFocused,
                                  notchedOutline: classes.notchedOutline,
                                },
                                inputMode: "numeric"
                              }}
                            
                              inputProps={{ style: { color: 'white'}}}
                              />
                            </Grid>
                            <Grid item xs={12}>
                          
                            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                    <div className="m-0">
                                        <KeyboardDatePicker
                                       
                                        
                                        className="w-50"
                                        inputVariant="outlined"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date of Birth"
                                            format="dd-MM-yyyy"
                                            value={dtDob}
                                          
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
                                           
                                              classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                              },
                                           
                                            }}
                                            InputAdornmentProps={{ position: 'start' }}
                                            inputProps={{ style: { color: 'white'}}}
                                        />
                                          </div>
                            </MuiPickersUtilsProvider>
                        
                            </Grid>
                            <Grid item xs={12}>
                            <Button variant="contained" className="w-50 " type = 'submit' disabled={!submitBtn} style={{   backgroundColor: 'rgb(42, 92, 255)', color:'white'}}>VERIFY DETAILS</Button>
                            </Grid>
                            <Grid item xs={12}>
                            { login &&<> Signed in with {sEmail}</> }
                            </Grid>  
                            <Grid item xs={12}>
                              
                            <GoogleLogout
                            
    clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
   // buttonText="Logout"
    onLogoutSuccess={() => {logout()}}
    //onLogoutSuccess={logout}
    render={renderProps => (
           
<Button  onClick={renderProps.onClick} className="p-0 btn-transparent btn-link btn-link-first"><span>Change Google Account?</span></Button>      
     
      )}
    >
       
</GoogleLogout>
                                  
                            </Grid>
                          </Grid>
                            
                            
                      
                       </>
                        }
                        
                      </div>
                     
                    </Grid>
                    
                  </form>
                </div>
              </div>
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
