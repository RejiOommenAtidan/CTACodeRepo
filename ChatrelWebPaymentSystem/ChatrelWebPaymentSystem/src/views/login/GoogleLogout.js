import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {  Button} from '@material-ui/core';
import  {removeGoogleCreds} from '../../actions/transactions/GLoginAction';
import {sGoogleAuth_ClientID} from '../../config/commonConfig'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
const GoogleLogoutButton = () => {


    const dispatch = useDispatch();
    let history = useHistory();
    const save =() =>{
        axios
        .get(`/User/Logout`)
        .then((resp) => {
          if (resp.status === 200 && resp.data.message === 'Logged Out successfully') {
            //alert(resp.data);
            console.log('logged out');
            history.push("/Login");
            dispatch(removeGoogleCreds());
            /* history.goBack();
        console.log(resp.data); */
          }
        })
        .catch((error) => {
          console.log(error.config);
          console.log(error.message);
          console.log(error.response);
        });
        //oGoogle null
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