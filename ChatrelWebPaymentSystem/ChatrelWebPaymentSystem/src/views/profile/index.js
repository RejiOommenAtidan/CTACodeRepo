
import React from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';

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
import { subMinutes } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';

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
  TextField: {
    width:200
  }
}));


export default function Friends () {
  const classes = useStyles();
  const theme = useTheme();
  const [sFirstName,setFirstName]=React.useState("");
  const [sLastName,setLastName]=React.useState("");
  const [sGBID,setGBID]=React.useState("");
  const [dtDob,setDOB]=React.useState("");
  

 
  
const userObj = useSelector(state => state.GLoginReducer.oGoogle);
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);

  return (
    <>
      <Card  style={{  padding: 50 }} >

      <br />
        <p style={{backgroundColor: "lightblue"}}>My Profile</p>
          <Grid container direction="column" alignContent="center" >
            

          <Grid item xs={12} sm={6}>
            
                    <div className="avatar-icon-wrapper  m-2">
                        <div className="d-block p-0 avatar-icon-wrapper  m-0 border-3 ">
                            <div className=" border-3 border-white overflow-hidden">
                                <img alt="..." className="img-fluid" src={userObj.imageUrl} />
                            </div>
                        </div>
                    </div>
            
             </Grid>
             <Grid item xs={12} sm={6}>
                    <div>First Name    : {userObj.givenName}</div>
                    </Grid>
             <Grid item xs={12} sm={6}>
                    <div>Last Name     : {userObj.familyName}</div>
                    </Grid>
             <Grid item xs={12} sm={6}>
                    <div>Email Id      : {userObj.email}</div>
                    </Grid>
             <Grid item xs={12} sm={6}>
                    <div>Green Book Id : {userGBObj.sGBID}</div>
                    </Grid>
             <Grid item xs={12} sm={6}>
                    <div>Date of Birth : {userGBObj.dtDob}</div>
                    </Grid>
            
                 
          
          </Grid>
    </Card>
    </>
  );
}