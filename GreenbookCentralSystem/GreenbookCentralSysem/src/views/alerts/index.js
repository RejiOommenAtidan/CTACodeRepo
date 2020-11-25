
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  Alerts: {
    primary: {
      main: '#FFF'
    },
    secondary: {
      main: '#11cb5f'
    },
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Alerts = (props) => {
  const [alertMessage, setMessage] = React.useState(props.alertObj.alertMessage);
  const [alertType, setAlertType] = React.useState(props.alertObj.alertType);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Snackbar open={props.snackbar} autoHideDuration={2000} onClose={props.snackbarClose} >
          <Alert onClose={props.snackbarClose} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}
