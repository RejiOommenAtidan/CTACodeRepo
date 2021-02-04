import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {  Button} from '@material-ui/core';
import  {removeGoogleCreds} from '../../actions/transactions/GLoginAction';
import {sGoogleAuth_ClientID} from '../../config/commonConfig'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useHistory} from 'react-router-dom';

const GoogleLogoutButton = () => {


    const dispatch = useDispatch();
    let history = useHistory();
    const save =() =>{
        history.push("/Login");
        dispatch(removeGoogleCreds()); //oGoogle null
       // localStorage.removeItem("currentUser");
        // window.location.replace('/login');
        
    }
    return (
<GoogleLogout
    clientId={sGoogleAuth_ClientID}
   // buttonText="Logout"
    onLogoutSuccess={() => {save()}}
    //onLogoutSuccess={logout}
    render={renderProps => (
           

        <Button className="btn-google m-2 shadow-first"  style={{   backgroundColor: 'rgb(42, 92, 255)'}}   onClick={renderProps.onClick} /*disabled={renderProps.disabled}*/ >
        <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['fab', 'google']} className="font-size-lg" />
        </span>
        <span className="btn-wrapper--label">
        Sign Out
    </span>
    </Button>
      )}
    >
       
</GoogleLogout>
    )}

export default GoogleLogoutButton;