
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

function createPaymentHistory(receiptNo, date, period, paymentFor, action){
  return {receiptNo, date, period, paymentFor, action};
}
const paymentHistory = [
  createPaymentHistory(123, '12-10-2019', '01-04-2016 - 31-03-2020', 'Self', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2017', '01-04-2014 - 31-03-2018', 'Spouse', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2017', '01-04-2009 - 31-03-2018', 'Friend', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2015', '01-04-2014 - 31-03-2016', 'Self', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2015', '01-04-2009 - 31-03-2016', 'Father', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2015', '01-04-2009 - 31-03-2016', 'Son', <input type="button" value="Download Receipt"/>),

];

export default function Family () {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card  style={{  padding: 50 }} >

      <br />
        <p style={{backgroundColor: "lightblue"}}>Payment History</p>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left" style={{width: "10%"}}>Receipt No.</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Date</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Period</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Payment For</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentHistory.map((row) => (
            <TableRow key={row.receiptNo}>
              <TableCell >{row.receiptNo}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.period}</TableCell>
              <TableCell align="center">{row.paymentFor}</TableCell>
              <TableCell align="center">{row.action}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
    </>
  );
}