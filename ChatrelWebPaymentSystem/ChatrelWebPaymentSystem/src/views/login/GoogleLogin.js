import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginPage = (props) => (
    <GoogleLogin
        clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
        buttonText="Login"
        onSuccess={(response) => { console.log("Login Successful: ",response); window.location='/Home'; }}
        onFailure={(response) => { console.log("Login Failure: ",response); }}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
    />
);

export default GoogleLoginPage;