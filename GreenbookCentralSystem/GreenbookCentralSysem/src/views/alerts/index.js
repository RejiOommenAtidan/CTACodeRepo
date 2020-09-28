
import React, { useEffect, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import MuiAlert from '@material-ui/lab/Alert';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { white } from '@material-ui/core/colors';

const theme = createMuiTheme({
    Alerts: {
      primary: {
        // Purple and green play nicely together.
        main: '#FFF',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  export const Alerts = (props) => {
    //debugger

   
    const [alertMessage,setMessage]=React.useState(props.alertObj.alertMessage);
    const [alertType,setAlertType]=React.useState(props.alertObj.alertType);

  
    return (
        
        <>
        <ThemeProvider theme={theme}>
          <Snackbar open={props.snackbar} autoHideDuration={3000} onClose={props.snackbarClose} >
          <Alert  onClose={props.snackbarClose} severity={alertType}  >
           {alertMessage}
          </Alert>
        </Snackbar>
        </ThemeProvider>
        </> 
  );
  
  
  }
