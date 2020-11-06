import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
       
          <Typography>{children}</Typography>
       
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
function createData(region, year, chatrel, meal, late, employed, total) {
  return { region, year, chatrel, meal, late, employed, total };
}

function createFamilyData(name, relation, gbid, age, action) {
  return { name, relation, gbid, age, action };
}

function createPaymentHistory(receiptNo, date, period, paymentFor, action){
  return {receiptNo, date, period, paymentFor, action};
}

const select = (<select><option>1</option><option>2</option><option>3</option><option>4</option></select>);

const rows = [
  createData(select, '01/04/2017 - 31/03/2018', 36, 10, 4.6, <input type="checkbox"/>, 50.6),
  createData(select, '01/04/2018 - 31/03/2019', 36, 10, 4.6,<input type="checkbox"/>, 50.6),
  createData(select, '01/04/2019 - 31/03/2020', 36, 10, 9.6,<input type="checkbox" checked/>, 105.6),
  createData(select, '01/04/2020 - 31/03/2021', 36, 10, 0, <input type="checkbox"/>,46),
  
];

const family = [
  createFamilyData('Member A', 'Father', 'IN1234567', 68, <input type="button" value="Make Payment"/>),
  createFamilyData('Member B', 'Mother', 'IN1234567', 64, <input type="button" value="Make Payment"/>),
  createFamilyData('Member C', 'Spouse', 'IN1234567', 33, <input type="button" value="Make Payment"/>),
  createFamilyData('Member D', 'Daughter', 'IN1234567', 5, <input type="button" value="Make Payment"/>),
];

const paymentHistory = [
  createPaymentHistory(123, '12-10-2019', '01-04-2016 - 31-03-2020', 'Self', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2017', '01-04-2014 - 31-03-2018', 'Spouse', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2017', '01-04-2009 - 31-03-2018', 'Friend', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2015', '01-04-2014 - 31-03-2016', 'Self', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2015', '01-04-2009 - 31-03-2016', 'Father', <input type="button" value="Download Receipt"/>),
  createPaymentHistory(123, '12-10-2015', '01-04-2009 - 31-03-2016', 'Son', <input type="button" value="Download Receipt"/>),

];

export default function ChatrelPay () {
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);

  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 1){
      setShow(false);
      history.push('/family');
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
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
        <AppBar position="static" color="default">
        {show && <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Self-Payment" {...a11yProps(0)} />
          <Tab label="Payment for Family" {...a11yProps(1)} />
          <Tab label="Payment for Friends" {...a11yProps(2)} />
          <Tab label="Payment History" {...a11yProps(3)} />
        </Tabs>}
      </AppBar>
     
        <TabPanel value={value} index={0} dir={theme.direction}>
          <br />
          <p style={{backgroundColor: "lightblue"}}>Personal Details - {sGBID}</p>
          
          
              <FormControl>
                <TextField label="GreenBook Holder Name" value="Aayush Pandya"/>
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
          <TableCell>Region</TableCell>
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
            <TableRow key={row.year}>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell align="right">{row.chatrel}</TableCell>
              <TableCell align="right">{row.meal}</TableCell>
              <TableCell align="right">{row.late}</TableCell>
              <TableCell align="center">{row.employed}</TableCell>
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
           <div>
             <img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" border="0" alt="Now accepting PayPal" />
             <a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_secured_by_pp_2line.png" border="0" alt="Secured by PayPal" />
             </a>
           </div>
           
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
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

        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <br />
        <p style={{backgroundColor: "lightblue"}}>Pay for a friend</p>
          <Grid container direction="column" alignContent="center" >
            
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter Name of Friend"
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
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
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
        </TabPanel>
        </div>
            </Grid>
          </Grid>
      
      
    
        
      </Card>
    </>
  );
}
