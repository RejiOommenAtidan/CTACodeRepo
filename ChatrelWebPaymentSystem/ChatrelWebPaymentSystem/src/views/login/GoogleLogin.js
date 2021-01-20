import React from 'react';
import GoogleLogin from 'react-google-login';
import {  Button} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {storeGoogleCreds} from '../../actions/transactions/GLoginAction';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
const GoogleLoginPage = (props) => {
   // console.log("PROPS",props);
   //console.log("Cookies enabled: " + navigator.cookieEnabled);
   
  let history = useHistory();
    const save =(response) => {
        console.log("Login Successful: ",response);
        //debugger
        const token = response.tokenId;

        props.test(response);
      /*  axios.get(`/User/ValidateGoogleToken/?code=${token}&email=${response.profileObj.email}`)
        .then(resp => {
          if(resp.status === 200){
            if(resp.data){
                dispatch(storeGoogleCreds(response.profileObj));
            }
            else{
              alert(`Verification Failed for ${response.profileObj.email}`);  
            }
            //console.log("Auth",resp.data);
          }
        })*/
        
       // history.push('/paymentpage');
        
    }
    const dispatch = useDispatch();
    const check = (e) =>{
            console.log(e.data);
    }
    return(
    <GoogleLogin
        clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
       
        onSuccess={(response) => { console.log("login, onSuccess"); save(response) }}
        onFailure={(response) => {  }}
        cookiePolicy={'single_host_origin'}
        //isSignedIn={true}
        prompt={'select_account'}
       // uxMode='redirect'
       // redirectUri='http://localhost:3000/Login/'
        render={renderProps => (
           
          
            <Button className="btn-google m-2 shadow-first" style={{   backgroundColor: 'rgb(42, 92, 255)'}}  onClick={(e)=>{ renderProps.onClick()}} disabled={renderProps.disabled} >
            <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fab', 'google']} className="font-size-lg" />
            </span>
            <span className="btn-wrapper--label">
            Sign In with Google
        </span>
        </Button>
          )}
    />);
    
        };

export default GoogleLoginPage;