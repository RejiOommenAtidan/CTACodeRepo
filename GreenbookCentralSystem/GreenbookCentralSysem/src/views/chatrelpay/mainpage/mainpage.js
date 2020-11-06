import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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
import Moment from 'moment';

import { storeCurrentGBDetails } from '../../../actions/transactions/CurrentGBDetailsAction';



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
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
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

const handleButtonClick = () =>{

};

const paymentButton = () => {
  return(
    <input type="button" value="Make Payment" onClick={handleButtonClick}/>
  );
};

const family = [
  createFamilyData('Member A', 'Father', 'IN1234567', 68, <input type="button" value="Make Payment"/>),
  createFamilyData('Member B', 'Mother', 'IN1234567', 64, <input type="button" value="Make Payment"/>),
  createFamilyData('Member C', 'Spouse', 'IN1234567', 33, <input type="button" value="Make Payment"/>),
  createFamilyData('Member D', 'Daughter', 'IN1234567', 5, <input type="button" value="Make Payment"/>),
];

// const paymentHistory = [
//   createPaymentHistory(123, '12-10-2019', '01-04-2016 - 31-03-2020', 'Self', <input type="button" value="Download Receipt"/>),
//   createPaymentHistory(123, '12-10-2017', '01-04-2014 - 31-03-2018', 'Spouse', <input type="button" value="Download Receipt"/>),
//   createPaymentHistory(123, '12-10-2017', '01-04-2009 - 31-03-2018', 'Friend', <input type="button" value="Download Receipt"/>),
//   createPaymentHistory(123, '12-10-2015', '01-04-2014 - 31-03-2016', 'Self', <input type="button" value="Download Receipt"/>),
//   createPaymentHistory(123, '12-10-2015', '01-04-2009 - 31-03-2016', 'Father', <input type="button" value="Download Receipt"/>),
//   createPaymentHistory(123, '12-10-2015', '01-04-2009 - 31-03-2016', 'Son', <input type="button" value="Download Receipt"/>),

// ];

export default function MainPage () {
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  //const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  //const payingFor=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sName);
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);

  let history = useHistory();
  let dispatch = useDispatch();
  
  const makePayment = (obj)=> {
    console.log("Inside Make payment method for " , obj)
    // const obj={
    //   sGBID:sGBID,
    //   from:'Chatrel for Family'
    // }
    dispatch(storeCurrentGBDetails(obj));
    history.push('/ChatrelPay/PaymentPage');
  }

  const getReceipt = (nChatrelReceiptNumber) => {
    console.log("Receipt Number", nChatrelReceiptNumber);
  }
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [familyData, setFamilyData]=React.useState(null);
  const [paymentHistory, setPaymentHistory] = React.useState(null);
  const [sFirstName, setFirstName] = React.useState('');
  const [sLastName, setLastName] = React.useState('');
  const [dtDOB, setDOB] = React.useState();
  const [sFriendGBID, setFriendGBID] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 1){
      if(familyData === null){
       axios.get(`http://localhost:52013/api/ChatrelPayment/GetFamilyDetails/?sGBID=`+paidByGBID)
        .then(resp => {
          if (resp.status === 200) {
            setFamilyData(resp.data);
            return;
          }
        })
        .catch(error => {
          console.log(error.config);
          console.log(error.message);
          return;
        })
      }
      return;
    }
    else if(newValue === 3){
      if(paymentHistory === null){
        axios.get(`http://localhost:52013/api/ChatrelPayment/GetPaymentHistory/?sGBID=`+paidByGBID)
          .then(resp => {
            if (resp.status === 200) {
              setPaymentHistory(resp.data);
              return;
            }
          })
          .catch(error => {
            console.log(error.config);
            console.log(error.message);
            return;
          })
      }
      return;
      
    }
  };

  const verify = () => {
    axios.get(`http://localhost:52013/api/ChatrelPayment/VerifyFriendDetails/?sGBID=${sFriendGBID}&sFirstName=${sFirstName}&sLastName=${sLastName}&dtDOB=${dtDOB}`)
    .then(resp => {
      if(resp.status === 200){
        console.log(resp.data);
        if(resp.data === true){
          makePayment({sGBID: sFriendGBID, sName: `${sFirstName} ${sLastName}`, sRelation: `Friend`, from:'Chatrel for Friend' })
        }
        else{
          alert("Values don't match with database. Enter correct values.");
        }
      }
    })
    .catch(error => {
        console.log(error.message);
        console.log(error.config);
    });
  };
  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };
  return (
    <>
      <Card  style={{  padding: 50 }} >
        
        <div>
          <Grid container spacing={3} justify='center'>
            
              <Grid item >
              
              <h5>
                Manage Chatrels for {paidByName}, holding GreenBook ID: {paidByGBID}
              </h5>
            </Grid>
            
          </Grid>
          <br/>
        </div>
        
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}> 
            <div className={classes.root}>
        <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Self-Chatrel" {...a11yProps(0)} />
          <Tab label="Chatrel for Family" {...a11yProps(1)} />
          <Tab label="Chatrel for Friends" {...a11yProps(2)} />
          <Tab label="Chatrel History" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
     
        <TabPanel value={value} index={0} dir={theme.direction}>
          <br />
          <p style={{backgroundColor: "lightblue"}}>Personal Details </p>
          <Grid style={{paddingTop: '10px'}}>
            <FormControl style={{paddingRight: "20px"}}>
              <TextField label="GreenBook ID" value={paidByGBID}/>
            </FormControl>
          
            <FormControl>
              <TextField label="GreenBook Holder Name" value={paidByName}/>
            </FormControl>
          </Grid>
            
            <Grid item style={{paddingTop: '10px'}}>
              <input type="button" onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' })}} value="Check Pending &amp; Pay"/>
            </Grid>
        </TabPanel>

       
       
       {/** Family Members List */}

        <TabPanel value={value} index={1} dir={theme.direction}>
          <br />
          <p style={{backgroundColor: "lightblue"}}>Family Member List for {sGBID}</p>
           <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left" style={{width: "10%"}}>Name</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Relation</TableCell>
            <TableCell align="center" style={{width: "10%"}}>GreenBook ID</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Age</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Pending</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        {familyData && <TableBody>
          {familyData.map((row) => (
            // <TableRow key={row.name}>
            //   <TableCell component="th" scope="row">
            //     {row.name}
            //   </TableCell>
            //   <TableCell align="center">{row.relation}</TableCell>
            //   <TableCell align="center">{row.gbid}</TableCell>
            //   <TableCell align="right">{row.age}</TableCell>
            //   <TableCell align="center">{row.action}</TableCell>
              
            // </TableRow>
            <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.sName}
                  </TableCell>
                  <TableCell align="center">{row.sRelation}</TableCell>
                  <TableCell align="center">{row.sGBIDRelation}</TableCell>
                  <TableCell align="center">{row.nAge}</TableCell>
                  <TableCell align="right">{row.dPending}</TableCell>
                  {row.sGBIDRelation == null && 
                  <TableCell align="center"><Button disabled variant="contained" color="primary" onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' })}}>Pay"</Button></TableCell>}
                  {row.sGBIDRelation != null && 
                  <TableCell align="center"><Button variant='contained' color="primary" onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' })}}>Pay"</Button>
                    
                    {/* <input type="button" onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' })}} value="Check Pending &amp; Pay"/> */}
                    </TableCell>}
                  
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>

        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <br />
        <p style={{backgroundColor: "lightblue"}}>Pay for a friend</p>
          <Grid container direction="column" alignContent="center" >
            
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  label="Enter First Name of Friend"
                  // InputProps={{inputProps: {style: minWidth = "50px"} }}
                  style={{minWidth: "250px"}}
                  onChange={(e) => {setFirstName(e.target.value)}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  label="Enter Last Name of Friend"
                  style={{minWidth: "250px"}}
                  onChange={(e) => {setLastName(e.target.value)}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  label="Enter GreenBook ID"
                  style={{minWidth: "250px"}}
                  onChange={(e) => {setFriendGBID(e.target.value)}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  label="Enter Birth Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{minWidth: "250px"}}
                  type="date"
                  onChange={(e) => {setDOB(e.target.value)}}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <br />
              <Button variant="outlined" color="primary" onClick={verify}>Verify &amp; Pay</Button>
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
            <TableCell align="center" style={{width: "10%"}}>Name</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Relation</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        {paymentHistory && <TableBody>
          {paymentHistory.map((row) => (
            <TableRow key={row.receiptNo}>
              {/* <TableCell >{row.receiptNo}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.period}</TableCell>
              <TableCell align="center">{row.paymentFor}</TableCell>
              <TableCell align="center">{row.action}</TableCell> */}
              <TableCell >{row.nChatrelRecieptNumber}</TableCell>
              <TableCell align="center">{row.dtEntered.split('T'[0])}</TableCell>
              <TableCell align="center">{Moment(row.dtPeriodFrom).format('YYYY')+' - '+Moment(row.dtPeriodTo).format('YYYY') }</TableCell>
              <TableCell align="center">{row.sFirstName}</TableCell>
              <TableCell align="center">{row.sRelation}</TableCell>
              <TableCell align="center"><input type="button" value="Download Receipt" onClick={()=>{getReceipt({nChatrelReceiptNumber: row.nChatrelRecieptNumber })}} /></TableCell>
              
            </TableRow>
          ))}
        </TableBody>}
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
