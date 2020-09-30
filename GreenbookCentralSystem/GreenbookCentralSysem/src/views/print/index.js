//Hi
import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link,
  Button,
  TextField,
  Paper,
  Grid
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

     <Grid container spacing={1}>
     <Grid item xs={12}>

       <Breadcrumbs aria-label="breadcrumb">
       <Link color="inherit" href="/Home" >
         Home
     </Link>

       <Typography color="textPrimary">Print Green Book</Typography>
     </Breadcrumbs>
     <Grid container spacing={1}>
     <Grid item xs={12} style={{textAlign:'center' }}>
       <Paper elevation={3}  style={{padding:30 }}>  

            <Typography color="textPrimary">Enter Green Book Number To Print:</Typography>
            <TextField id="standard-basic" type='number' label="Green Book No." 
             /*onChange ={ (e) => {setTempGbId(e.target.value)} }*/
             
            
            />
          { /* <Button   style={{marginTop:8,marginLeft:5 }} type='submit' onClick={searchGbId}  variant="outlined">Show</Button>*/}
          { /*     <Button   style={{marginTop:8,marginLeft:5 }} type='submit' onClick={()=>{setHistoryTable(true);setGbId(tempGbId.toString());}}  variant="outlined">Show</Button> */}
          <Button  type='submit'style={{marginTop:8,marginLeft:5 }} onClick={ () => {window.open('/Print')}} color="primary">Save</Button> 
        {/*  <IssueBookTable
           gbId={gbId}
           />
        */ }


       </Paper>
    
     </Grid>
     </Grid>
   
       
       </Grid>
     </Grid>
    
  );
};

export default Dashboard;
