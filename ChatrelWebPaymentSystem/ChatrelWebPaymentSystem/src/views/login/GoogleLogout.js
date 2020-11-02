import React from 'react';
import { GoogleLogout } from 'react-google-login';


const GoogleLogoutButton = () => (
<GoogleLogout
    clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
    buttonText="Logout"
    onLogoutSuccess={() => {localStorage.removeItem("currentUser");window.location.replace('/login');}}
    //onLogoutSuccess={logout}
    >
</GoogleLogout>
)

export default GoogleLogoutButton;