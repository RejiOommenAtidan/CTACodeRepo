import React from 'react';
import GoogleLogin from 'react-google-login';
import {  Button} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {storeGoogleCreds} from '../../actions/transactions/GLoginAction';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        onFailure={(response) => {  }}
        cookiePolicy={'single_host_origin'}
        //isSignedIn={true}
        
        render={renderProps => (
           
           
            <Button className="btn-google m-2 shadow-first" style={{   backgroundColor: 'rgb(42, 92, 255)'}}  onClick={renderProps.onClick} disabled={renderProps.disabled} >
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