
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


export default function Friends () {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card  style={{  padding: 50 }} >

      <br />
        <p style={{backgroundColor: "lightblue"}}>Pay for a friend</p>
          <Grid container direction="column" alignContent="center" >
            
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter First Name of Friend"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter Last Name of Friend"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter GreenBook ID"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter Birth Date"
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <br />
              <Button variant="outlined" color="primary">Verify &amp; Pay</Button>
            </Grid>
          </Grid>
    </Card>
    </>
  );
}