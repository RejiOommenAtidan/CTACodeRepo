import React from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
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
function createData(name, calories, fat, carbs, protein, total) {
  return { name, calories, fat, carbs, protein, total };
}

const rows = [
  createData('01/04/2017 - 31/03/2018', 36, 10, 4.6, <input type="checkbox"/>, 50.6),
  createData('01/04/2018 - 31/03/2019', 36, 10, 4.6,<input type="checkbox"/>, 50.6),
  createData('01/04/2019 - 31/03/2020', 36, 10, 9.6,<input type="checkbox" checked/>, 105.6),
  createData('01/04/2020 - 31/03/2021', 36, 10, 0, <input type="checkbox"/>,46),
  
];

export default function PaymentPage  (props) {
  console.log("props", props);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Card  style={{  padding: 50 }} >
        
        <div>
          <Grid container spacing={3}>
            
              <Grid item xs={12} sm={2}>
              
              {/* <FormControl >
                <TextField label="GreenBook ID" value={9996070}/>
              </FormControl> */}
            </Grid>
            
          </Grid>
          <br/>
        </div>
        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}> 
            <div className={classes.root}>
      
       
     
     
          <br />
            <p style={{backgroundColor: "lightblue"}}>Personal Details - {props.sGBID}</p>
          
          
              <FormControl>
                <TextField label="GreenBook Holder Name" value="Aayush Pandyaaa"/>
              </FormControl>
              
            
            
            <FormControl style={{paddingLeft: "20px"}}>
                <TextField label="Paid Until" value="31/03/2017"/>
              </FormControl>
              <br />
              <br />
              <br />
           <p style={{backgroundColor: "lightblue"}}>Payment Balance</p>
           <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Chatrel</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Meal</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Penalty</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Employed</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <p style={{backgroundColor: "lightblue"}}>Additional Payment</p>
    <Grid container xs={12} sm={12} alignContent="flex-end" justify="flex-end">
    <FormControl style={{textAlign: "right"}} >
                <TextField label="Business Donation" value="10" inputProps={{min: 0, style: { textAlign: 'right' }}}/>
              </FormControl>  
    </Grid>
     
    <Grid container xs={12} sm={12} alignContent="flex-end" justify="flex-end">
    <FormControl>
                <TextField textAlign={"right"} label="Additional Donation" value="0" inputProps={{min: 0, style: { textAlign: 'right' }}}/>
              </FormControl>  
    </Grid>
    <br />
           <p style={{backgroundColor: "lightblue", textAlign: "right", fontWeight: "bold"}}>Total To Pay<span style={{textAlign: "right", fontWeight: "bold"}}> $262.80</span></p>          
           <br />
           <p style={{backgroundColor: "lightblue"}}>Pay Online</p>   
           <div><img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" border="0" alt="Now accepting PayPal" /></div>
           
      
        </div>
            </Grid>
          </Grid>
      
      
    
        
      </Card>
    </>
  );
}

