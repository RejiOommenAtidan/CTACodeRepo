import React,{useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

const GoogleLoginPage = (props) => {

  let history = useHistory();
  const save = (response) => {
    console.log('Login Successful: ', response);
  
    const token = response.tokenId;

    props.test(response);
   
  };
  const dispatch = useDispatch();
  const check = (e) => {
    console.log(e.data);
  };

  return (
    <>
 {
 <GoogleLogin
      clientId={props.sClientIDGoogle}
   
      onSuccess={(response) => {
        console.log('login, onSuccess');
        save(response);
      }}
      onFailure={(response) => {}}
      cookiePolicy={'single_host_origin'}
    
      prompt={'select_account'}
    
      render={(renderProps) => (
        <Button
          className="m-1  btn-pill bg-white"
          style={{ border: '1px solid white' }}
          onClick={(e) => {
            renderProps.onClick();
          }}
          disabled={renderProps.disabled}>
          <span className="mr-2">
            <img
              alt="..."
              className="img-fluid"
              height="50"
              src={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4T6VTQUgUYRT+3j/+1Ebmhprd7NDSLYlchQ1jV91DFEFs7KEsIg+LdEiIIvDiQTc6Z0gRXmohWYo65jqFNiGrLRV1KLBjbmvJtjaSzo7zYpZtnZEtD73be7zv430f3yNsqoXg4QapiD4GwgB8ALwAFgC8JEvcanyRzjgh5Gy+dbb2M1EcgGczcbm3iHFHGtsGvJqWt2cVgsUu/wiAS38BboyJ5oWlBBuez3ypEOS6/D0E3HeATQAJMKZY8DKYDhIQA1AgYYYaU29sSaUi1lC7FD80aa3VtJVnOUvh7r0Trz84r1k61r7LNOBpUtM5lweGKi+gKEb1B/vnzOyODgYFmtTZmS2l/LnAUGWCGGfsfu1d/djOK197neDQsH6eCHuqElr0iYqT8hWAQFnRTdltXHcudw7pb0FoqUbAIO2/CACkySnh6Wrz2OkT824JQz+HIah5w3XYZtsBA8BPyEjJi0Uot2OFI3MfTW+HECIwG01WNXFwkMW0XPkMYF8JDlwjTqEulD/5TLdke9mHHAsKZ6LJ9y7dzBSK66MEsvNg1zos80Apif7xSA+zO0jESIBoyiLOE8NHLM5uz/b/kL9ajtr5IfBddaA2Voly63hkBLx1lOVyMO35fm61RtYdn7hKK65n8j+MXGbgxj+eyT74EQvRm4kmC5VfcGpte3yqfr1IfcQUBsEHxm4AWWJMW4q4l4kmNef+b0N4yYovWTzTAAAAAElFTkSuQmCC'
              }
            />
          </span>

          <div style={{ fontFamily: 'Roboto' }}>Sign in with Google</div>
        </Button>

      
      )}
    />} </> );
};

export default GoogleLoginPage;
