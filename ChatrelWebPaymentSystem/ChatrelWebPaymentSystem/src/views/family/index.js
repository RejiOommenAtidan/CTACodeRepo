
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
  function createFamilyData(name, relation, gbid, age, action) {
    return { name, relation, gbid, age, action };
  
  }



  // dfasdfasdf sdfasdf asdf asdfasdf sdfas
  
  const handleClick = (temp) => {
    var gbid = {id: temp, other: "test" };
    history.push('/PaymentPage/' + gbid);
    
  }
  
  const family = [
    createFamilyData('Member A', 'Father', 'IN1234567', 68, <input type="button" value="Make Payment" onClick={() => handleClick('IN1234567')}/>),
    createFamilyData('Member B', 'Mother', 'IN1234567', 64, <input type="button" value="Make Payment"/>),
    createFamilyData('Member C', 'Spouse', 'IN1234567', 33, <input type="button" value="Make Payment"/>),
    createFamilyData('Member D', 'Daughter', 'IN1234567', 5, <input type="button" value="Make Payment"/>),
  ];

  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
    <p style={{fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>Pay for Family Members</p>
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
              {family.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.relation}</TableCell>
                  <TableCell align="center">{row.gbid}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
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