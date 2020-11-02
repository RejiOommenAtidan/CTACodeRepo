import React, { useEffect, useState } from 'react';

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

import projectLogo from '../../../assets/images/CTALogo.png';

export default function LogingPage(props) {
  const responseGoogle = (response) => {
    console.log(response);
  }

   const [login,setLogin]=React.useState(false);
   const [gbid,setGbid]=React.useState(0);
   const [dob,setDob]=React.useState("");

   const obj ={
    gbid:gbid,
    dob:dob,
    user:"",
  }
  const submit = () => {
    obj.user=JSON.parse(localStorage.getItem('currentUser')).name;
    alert(JSON.stringify(obj));
    window.location='/selfpayment';
  }
   useEffect(() => {
    if(JSON.parse(localStorage.getItem('currentUser'))== null){
      setLogin(false);
    }
    else{
     setLogin(true);
     
     
     
    }
  }, []);

  return (
    <>
      <div className="app-wrapper  min-vh-100" style={{   backgroundColor: '#168b44', color:'white'}}>
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <form >
                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                      <div className="text-center" style={{textAlign:'center'}}>
                        <img alt="CTA" src={projectLogo} width="300px" height="300px"/>
                        <h1 className="display-2 mb-1 font-weight-bold">Welcome to Chatrel</h1>
                        <h3 className="display-5 mb-1 ">Your go-to resource for supporting the Tibetan Government</h3>
                        <br />
                        { JSON.parse(localStorage.getItem('currentUser'))== null &&
                        <GoogleLoginPage/>
                        }
                        { JSON.parse(localStorage.getItem('currentUser')) != null && 
                        
                        <>
                         <TextField   id="standard-basic" type='number' onChange={(e)=>{console.log(obj);setGbid(e.target.value)}} style={{color:'white'}} label="GBID"/>
                          <br/>  
                         <TextField
                         id="date"
                         label="DOB"
                         type="date"
                         onChange={(e)=>{setDob(e.target.value)}}
                       
                         InputLabelProps={{
                           shrink: true,
                         }}
                       />
                       <br/>
                       <br/>
                        <Button variant="contained" onClick={()=>{submit()}} style={{   backgroundColor: 'yellow', color:'black'}}>Submit</Button>
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
      { /*snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />*/}
    </>
  );
}
