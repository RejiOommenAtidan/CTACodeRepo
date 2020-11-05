import React from 'react';
import GoogleLogin from 'react-google-login';
import {  Button} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {storeGoogleCreds} from '../../actions/transactions/GLoginAction';
import { useHistory } from 'react-router-dom';


const GoogleLoginPage = (props) => {
  let history = useHistory();
    const save =(response) => {
        console.log("Login Successful: ",response); 
        dispatch(storeGoogleCreds(response.profileObj));
       // history.push('/paymentpage');
        
    }
    const dispatch = useDispatch();
    return(
    <GoogleLogin
        clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
       
        onSuccess={(response) => {save(response) }}
        onFailure={(response) => { console.log("Login Failure: ",response); }}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        render={renderProps => (
           
            <Button variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled} style={{   backgroundColor: 'yellow', color:'black'}}>Sign in with Google</Button>
          )}
    />);
    
        };

export default GoogleLoginPage;