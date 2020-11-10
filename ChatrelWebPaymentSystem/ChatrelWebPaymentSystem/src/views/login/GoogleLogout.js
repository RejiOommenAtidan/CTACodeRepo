import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {  Button} from '@material-ui/core';
import  {removeGoogleCreds} from '../../actions/transactions/GLoginAction';
 
import {useHistory} from 'react-router-dom';

const GoogleLogoutButton = () => {


    const dispatch = useDispatch();
    let history = useHistory();
    const save =() =>{
        history.push("/login");
        dispatch(removeGoogleCreds()); //oGoogle null
       // localStorage.removeItem("currentUser");
        // window.location.replace('/login');
        
    }
    return (
<GoogleLogout
    clientId={"11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com"}
   // buttonText="Logout"
    onLogoutSuccess={() => {save()}}
    //onLogoutSuccess={logout}
    render={renderProps => (
           
        <Button variant="contained" className='btn-userbox' onClick={renderProps.onClick} disabled={renderProps.disabled} >Sign Out</Button>
      )}
    >
       
</GoogleLogout>
    )}

export default GoogleLogoutButton;