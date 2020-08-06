import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginPage = (props) => (
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={(response) => { console.log(response); props.history.push('/dashboard'); }}
        onFailure={(response) => { console.log(response); props.history.push('/'); }}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
    />
);

export default GoogleLoginPage;