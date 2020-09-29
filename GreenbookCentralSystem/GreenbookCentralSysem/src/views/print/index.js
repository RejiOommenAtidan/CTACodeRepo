//Hi
import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link,
  Button,
  TextField
} from '@material-ui/core';



import Print from './print';

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
  
  

  const [snackbar,setSnackbar]=React.useState(false);

  return (
   
      <Container maxWidth={false}>

          <TextField></TextField>
        <Button  type='submit' onClick={ () => {window.open('/Print')}} color="primary">Save</Button> 
       
      </Container>

  );
};

export default Dashboard;
