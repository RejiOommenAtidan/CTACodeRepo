//Hi
import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link,
  Button
} from '@material-ui/core';

import {Alerts} from '../alerts';

import Country from './country';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  
  
  const alertObj={
    alertMessage:'Record Successfully Edited',
    alertType:'success'
  }
  const [snackbar,setSnackbar]=React.useState(false);
  const snackbarOpen = () => {
    //console.log('alert');
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };
  return (
   
      <Container maxWidth={false}>
        <Button  type='submit' onClick={snackbarOpen} color="primary">Save</Button> 
       { snackbar && <Alerts
       alertObj={alertObj}
       snackbar={snackbar}
       snackbarClose={snackbarClose}
       /> }
      </Container>

  );
};

export default Dashboard;
