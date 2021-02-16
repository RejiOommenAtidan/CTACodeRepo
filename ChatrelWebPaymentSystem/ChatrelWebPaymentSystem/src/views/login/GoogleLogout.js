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
           

        
         <Button className="btn-outline-first border-1 m-2" onClick={renderProps.onClick}  variant="outlined">
         <span className="btn-wrapper--label">
             Yes
         </span>
     </Button>
      )}
    >
       
</GoogleLogout>
    )}

export default GoogleLogoutButton;