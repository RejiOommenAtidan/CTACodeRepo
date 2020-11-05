
import React,{useEffect} from 'react';
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
import axios from 'axios';
import { useHistory } from 'react-router-dom';


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
}));




export default function Family () {
  let history = useHistory();
  const handleClick = (temp) => {
    var gbid = {id: temp, other: "test" };
    history.push('/PaymentPage/' + gbid);
    
  }
  const classes = useStyles();
  const theme = useTheme();
  let nGBID=9675;
  const [familyData,setFamilyData]=React.useState();
  useEffect(() => {
    //setPaymentData(payObj);
    axios.get(`http://localhost:52013/api/ChatrelPayment/GetFamilyDetails/?sGBID=`+nGBID)
      .then(resp => {
        if (resp.status === 200) {
          setFamilyData(resp.data);
         
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
     }, []);
  return (
    <>
    <p style={{fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>Pay for Family Members</p>
    { familyData &&
      <Card  style={{  padding: 50 }} >
      <br />
        <p style={{backgroundColor: "lightblue"}}>Family Member List</p>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                
                <TableCell align="left" style={{width: "10%"}}>Name</TableCell>
                <TableCell align="center" style={{width: "10%"}}>Relation</TableCell>
                <TableCell align="center" style={{width: "10%"}}>GreenBook ID</TableCell>
                <TableCell align="right" style={{width: "10%"}}>Age</TableCell>
                <TableCell align="center" style={{width: "10%"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.sName}
                  </TableCell>
                  <TableCell align="center">{row.sRelation}</TableCell>
                  <TableCell align="center">{row.sGBIDRelation}</TableCell>
                  <TableCell align="right">{row.dtDOB}</TableCell>
                  {row.sGBIDRelation == null && 
                  <TableCell align="center"><input type="button" disabled value="Make Payment"/></TableCell>}
                  {row.sGBIDRelation != null && 
                  <TableCell align="center"><input type="button"  value="Make Payment"/></TableCell>}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Card>}
    </>
  );
}