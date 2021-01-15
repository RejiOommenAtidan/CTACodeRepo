import React from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid,CardContent, Button, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableBodyRow } from 'mui-datatables';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Himalaya from '../../assets/fonts/himalaya.ttf';
import Pdf from "react-to-pdf";
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

import Typography from '@material-ui/core/Typography';
import { PayPalButton } from "react-paypal-button-v2";
import Flag from 'react-flagkit';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
    alignContent: "center",
    textAlign: "center"
  },
  table: {
    minWidth: 650,
  },
  typography:{
    fontFamily:'Poppins',
  }

}));

const ref = React.createRef();
export default function Test () {
  const classes = useStyles();
  const theme = useTheme();

  const fontName='Poppins';
//const rowBackGround,setRowBack
 

  return (
    <>
    <div /*style={{backgroundColor:"#fff"}}*/  >
    <Typography className="myfont" variant="h4" style={{textAlign:'center',color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom>SELF CHATREL</Typography>
    <div style={{width:'85%',margin:'auto',backgroundColor:'#ced9fd',padding:'25px',border:'2px solid grey',borderRadius:'25px',boxShadow:" 10px 10px 5px grey"}} className='text-black' >
    
      <Typography className="myfont"variant="h5" style={{color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom>PERSONAL DETAILS</Typography>
  
      <Card  style={{  padding: 20,marginBottom:20,boxShadow:" 3px 3px 1px grey" }}   >
      <Grid container spacing={3} className='text-black'>
        <Grid item xs={12} sm={3} >
        <b> Name:</b> Aayush Pandya
        </Grid>
        <Grid item xs={12} sm={3}>
         <b> Green Book ID:</b> 1234567
        </Grid>
        <Grid item xs={12} sm={3}>
         
         <Card className="card-box" >
                            <div className="card-indicator bg-success" />
                            <CardContent className="px-4 py-3">
                                
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="badge badge-first px-3" style={{fontSize:'14px'}}>Paid Until</div>    
                                    &nbsp; &nbsp;
                                    
                                   
                                </div>
                                <div style={{marginTop:'7px',color:'#000'}} /*className="pb-3 d-flex justify-content-between"*/>
                               <b> 01-01-2000</b>
                                </div>
                            </CardContent>
                        </Card>

        </Grid>
        <Grid item xs={12} sm={3}>
        <Card className="card-box" >
                            <div className="card-indicator bg-success" />
                            <CardContent className="px-4 py-3">
                                
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="badge badge-first px-3" style={{fontSize:'14px'}}>Name</div>    
                                    &nbsp; &nbsp;
                                    
                                   
                                </div>
                                <div style={{marginTop:'7px',color:'#000'}} /*className="pb-3 d-flex justify-content-between"*/>
                               <b>Aayush Pandya</b>
                                </div>
                            </CardContent>
                        </Card>
        </Grid>
       
       </Grid> 
      </Card>

      <Typography className="myfont"variant="h5" style={{color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom> CHATREL BALANCE</Typography>

      <Card  style={{  padding: 20,marginBottom:20,boxShadow:" 3px 3px 1px grey" }}   >
        <b>
        <Grid  container spacing={3}   className='text-black' style={{marginBottom:10}}>
          <Grid item xs={1} >YEAR</Grid>
          <Grid item xs={2} >AUTHORITY REGION</Grid>
          <Grid item xs={1} >CURRENCY</Grid>
          <Grid item xs={1} >CHATREL</Grid>
          <Grid item xs={1} >MEAL</Grid>
          <Grid item xs={2} >LATE FEES</Grid>
          <Grid item xs={2} >EMPLOYED</Grid>
          <Grid item xs={1} >RATE ₹/$</Grid>
          <Grid item xs={1} >TOTAL($)</Grid>
        </Grid>
        </b>
        <Grid container id="test" spacing={3} style={{border:'1px solid lightgrey',borderRadius:'10px',marginBottom:"30px"}} className='text-black'>
          <Grid item xs={1} style={{verticalAlign:'middle'}}>2019</Grid>
          <Grid item xs={2} ><TextField value="Mundgod"></TextField></Grid>
          <Grid item xs={1} >INR <Flag country="IN" size={20} /></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}>₹36</b></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}>₹10</b></Grid>
          <Grid item xs={2} style={{color:'red'}} ><div style={{display:'inline'}} className="badge badge-danger"> Overdue</div> &nbsp; <b style={{fontSize:"18px"}}>₹4.6</b> </Grid>
          <Grid item xs={2} ><TextField ></TextField></Grid>
          <Grid item xs={1} style={{color:'grey'}}>0.0137</Grid>
          <Grid item xs={1} style={{color:'#29cf00',fontSize:"20px"}} ><b>$0.87</b></Grid>
        </Grid>
        <Grid container id="test" spacing={3} style={{border:'1px solid lightgrey',borderRadius:'10px',marginBottom:"30px"}} className='text-black'>
          <Grid item xs={1} style={{verticalAlign:'middle'}}>2020</Grid>
          <Grid item xs={2} ><TextField value="Mundgod"></TextField></Grid>
          <Grid item xs={1} >INR <Flag country="IN" size={20} /></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}>₹36</b></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}>₹10</b></Grid>
          <Grid item xs={2} style={{color:'red'}} ><div style={{display:'inline'}} className="badge badge-danger"> Overdue</div> &nbsp; <b style={{fontSize:"18px"}}>₹4.6</b> </Grid>
          <Grid item xs={2} ><TextField ></TextField></Grid>
          <Grid item xs={1} style={{color:'grey'}}>0.0137</Grid>
          <Grid item xs={1} style={{color:'#29cf00',fontSize:"20px"}} ><b>$0.87</b></Grid>
        </Grid>

        <Grid container spacing={3} style={{border:'1px solid lightgrey',borderRadius:'10px',marginBottom:15}} className='text-black'>
          <Grid item xs={1} style={{verticalAlign:'middle'}}>2021</Grid>
          <Grid item xs={2} ><TextField value="Chicago"></TextField></Grid>
          <Grid item xs={1} >USD <Flag country="US" size={20} /></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}> $36</b></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}> $10</b></Grid>
          <Grid item xs={2} style={{color:'red'}} ><div style={{display:'inline'}} className="badge badge-warning"> Pending</div></Grid>
          <Grid item xs={2}  ><input type="checkbox" /></Grid>
          <Grid item xs={1} >-</Grid>
          <Grid item xs={1} style={{color:'#29cf00',fontSize:"20px"}} ><b>$46</b></Grid>
        </Grid>
      </Card>


      <Typography className="myfont"variant="h5" style={{color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom> ADDITIONAL CHATREL</Typography>
  
  <Card  style={{  padding: 20,marginBottom:20,boxShadow:" 3px 3px 1px grey" }}   >
  <Grid container spacing={3} className='text-black'justify="center" >
    <Grid item xs={12} sm={6}   
  align="center"   >
  <b> Business Donation:</b> <TextField></TextField>
    </Grid>
    <Grid item xs={12} sm={6} align="center">
  <b>  Additional Donation: </b><TextField></TextField>
    </Grid>
    
   </Grid> 
  </Card>
  <Typography className="myfont"variant="h4" style={{textAlign:'center',color:'#000',margin:'auto',fontFamily:fontName}} gutterBottom> Total: $46.87</Typography>
    <div style={{textAlign:'center',color:'#2a5cff',width:'300px'}}  >
    <PayPalButton style={{label:'pay'}} />
    </div>

    </div>
    </div>
    </>
  );
}
