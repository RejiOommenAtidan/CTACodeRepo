import React from 'react';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize, Input} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';


export default function Dash() {
  return (
    <>
    <Grid container>
      <Grid>
        <Button variant="outlined" color="primary" href="/ChatrelPay">Chatrel Payments</Button>
        <Button variant="outlined" color="primary" href="#outlined-buttons">Search Users</Button>
        <Button variant="outlined" color="primary" href="#outlined-buttons">Bulk Import</Button>
        <Button variant="outlined" color="primary" href="#outlined-buttons">Reports</Button>

      </Grid>
    </Grid>
      
    </>
  );
}