
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
  },
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
        <Snackbar open={props.snackbar} autoHideDuration={5000} onClose={props.snackbarClose} >
          {/*<Alert onClose={props.snackbarClose} severity={alertType}>
            {alertMessage}
          </Alert>*/}
          <Alert className="alerts-alternate mb-4" severity={alertType}>
            <div className="d-flex align-items-center align-content-start">
              <span>
                <strong className="d-block">{alertType.charAt(0).toUpperCase() + alertType.slice(1)+'!'}</strong> {alertMessage}
              </span>
            </div>
          </Alert>

        </Snackbar>
      </ThemeProvider>
    </>
  );
}
