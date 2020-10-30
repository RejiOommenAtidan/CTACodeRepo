import React from 'react';
import GoogleLogin from 'react-google-login';
import {  Button} from '@material-ui/core';
const GoogleLoginPage = (props) => (
    <GoogleLogin
        clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
       
        onSuccess={(response) => { console.log("Login Successful: ",response); window.location='/Home'; }}
        onFailure={(response) => { console.log("Login Failure: ",response); }}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
        render={renderProps => (
           
            <Button variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled} style={{   backgroundColor: 'yellow', color:'white'}}>Sign in with Google</Button>
          )}
    />
);

export default GoogleLoginPage;