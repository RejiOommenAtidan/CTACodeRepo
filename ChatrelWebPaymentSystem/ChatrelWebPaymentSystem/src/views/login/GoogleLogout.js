import React from 'react';
import { GoogleLogout } from 'react-google-login';


const GoogleLogoutButton = () => (
<GoogleLogout
    clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={() => {window.location.replace('http://localhost:8080/');}}
    //onLogoutSuccess={logout}
    >
</GoogleLogout>
)

export default GoogleLogoutButton;