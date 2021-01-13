import React from 'react';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize, Input} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';


export default function Dash() {
  return (
    <>
    <Grid container>
      <Grid>
        <Button variant="outlined" color="primary" href="/ChatrelPay/ChatrelList">Chatrel Payments</Button>
        <Button variant="outlined" color="primary" href="/Chatrel/SearchUsers">Search Users</Button>
        <Button variant="outlined" color="primary" href="/Chatrel/BulkImport">Bulk Import</Button>
        <Button variant="outlined" color="primary" href="#outlined-buttons">Reports</Button>

      </Grid>
    </Grid>
      
    </>
  );
}
