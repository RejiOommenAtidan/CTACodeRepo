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
import { storeCurrentGBDetails } from 'actions/transactions/CurrentGBDetailsAction';

export default function LogingPage(props) {



  let history = useHistory();
  const dispatch = useDispatch();
  
  
  const userObj = useSelector(state => state.GLoginReducer.oGoogle);
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
  


   const [login,setLogin]=React.useState(false);
   const [nGBID,setGbID]=React.useState(0);
   const [dtDob,setDob]=React.useState("");

  //On Success of verifying info
let oGBDetails={
  sGBID:nGBID,
  dtDob:dtDob
};
  const submit = (e) => {
    //obj.user=JSON.parse(localStorage.getItem('currentUser')).name;
    //alert(JSON.stringify(obj));
    e.preventDefault();
    let Obj={
      sGBID:""+nGBID,
      dtDOB:dtDob,
      sFirstName:userObj.givenName,
      sLastName:userObj.familyName,
      sEmail:userObj.email  
    }
    console.log(Obj);
    //dispatch(storeGBDetails(oGBDetails));
    //dispatch(storeCurrentGBDetails(oGBDetails));
    //history.push('/Home');
    axios.post(`ChatrelPayment/AuthenticateGBID/`,Obj)
    .then(resp => {
      if (resp.status === 200) {
        //setPaymentHistory(resp.data);
        if(resp.data=="Verified"){
          dispatch(storeGBDetails(oGBDetails));
          dispatch(storeCurrentGBDetails(oGBDetails));
          history.push('/Home');
        }
        else{
          console.log(resp.data);
          setAlertMessage('Enter valid credentials.');
          setAlertType('info');
          snackbarOpen();
        }
      }
    })
    .catch(error => {
      if (error.response) {
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
 
   useEffect(() => {
    
    if( userObj == null){
      setLogin(false);
    }
    else{
     setLogin(true);
    }
  
   fetch('https://json.geoiplookup.io/')
   .then(response => response.json())
  .then(data => {
      if(data.country_code!="IN"){
          history.push('/AccessDenied')
        }
        console.log(data);
  });

  }, [userObj]);

  return (
    <>
      <div className="app-wrapper  min-vh-100" style={{   backgroundColor: '#168b44', color:'white'}}>
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <form onSubmit={(e) =>submit(e)} >
                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                      <div className="text-center" style={{textAlign:'center'}}>
                        <img alt="CTA" src={projectLogo} width="300px" height="300px"/>
                        <h1 className="display-2 mb-1 font-weight-bold">Welcome to Chatrel</h1>
                        <h3 className="display-5 mb-1 ">Your go-to resource for supporting the Tibetan Government</h3>
                        <br />
                        { !login &&                     
                        <GoogleLoginPage/>
                        }
                      
                        {
                          login &&
                        <>

                            <TextField   
                              id="standard-basic" 
                              autoFocus
                              type='number' 
                              onChange={(e)=>{setGbID(e.target.value)}} 
                              label="GBID"
                              inputProps={{ style: { color: 'white'}}}
                              InputLabelProps={{ style: { color: 'white'}}}
                              />
                              <br/>  
                            <TextField
                            id="date"
                            label="DOB"
                            type="date"
                            onChange={(e)=>{setDob(e.target.value)}}
                            inputProps={{ style: { color: 'white'}}}
                          
                            InputLabelProps={{
                              shrink: true,
                              style: { color: 'white'}
                            }}
                          />
                          <br/>
                          <br/>
                            <Button variant="contained" type = 'submit' style={{   backgroundColor: 'yellow', color:'black'}}>Submit</Button>
                       {/* onClick={()=>{submit()}} */}
                       </>
                        }
                        
                      </div>
                      <div>

                     
                  
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
    </>
  );
}
