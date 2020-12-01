import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize, Input} from '@material-ui/core';
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
  const [chatrelPending, setChatrelPending] = React.useState(null);

  let history = useHistory();
  let dispatch = useDispatch();
  
  const makePayment = (obj, data, outstanding)=> {
    console.log("Inside Make payment method for " , obj, data)
    dispatch(storeCurrentGBDetails(obj));
    history.push('/ChatrelPay/PaymentPage', {pymtData: data, outstanding});
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
  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();

  const [sAccept, setsAccept] = useState("audio/*,video/*,image/*,*.doc, *.docx, *.pdf, *.xls, *.xlsx");
  const [sTitle, setsTitle] = useState("");
  const [sDocType, setsDocType] = useState("");
  const [binFileDoc, setbinFileDoc] = useState("");
  const [sFileExtension, setsFileExtension] = useState("");
  const [disputeDescription, setDisputeDescription] = useState('');
  const [outstanding, setOutstanding] = useState(true);

  console.log("Outstanding is: ", outstanding);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 1){
      if(familyData === null){
       axios.get(`/ChatrelPayment/GetFamilyDetails/?sGBID=`+paidByGBID)
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
        axios.get(`ChatrelPayment/GetPaymentHistory/?sGBID=`+paidByGBID)
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

  const verify = (e) => {
    e.preventDefault()
    axios.get(`/ChatrelPayment/VerifyFriendDetails/?sGBID=${sFriendGBID}&sFirstName=${sFirstName}&sLastName=${sLastName}&dtDOB=${dtDOB}`)
    .then(resp => {
      
      if(resp.status === 200){
        console.log(resp.data);
        if(resp.data === true){
          axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+sFriendGBID)
          .then(resp => {
            if (resp.status === 200) {
              makePayment({sGBID: sFriendGBID, sName: `${sFirstName} ${sLastName}`, sRelation: `Friend`, from:'Chatrel for Friend' }, resp.data, resp.data.chatrelPayment.nChatrelTotalAmount)
            }
          })
          .catch(error => {
            console.log(error.message);
          });
        }
        else{
          alert("Values don't match with database. Enter correct values.");
        }
      }
      
    
    })
    .catch(error => {
        if(error.response.status === 400){
          alert("Missing Parameters...");
        }
        console.log(error.message);
        console.log(error);

    });
  };
  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };
  React.useEffect(() => {
    const element = document.getElementById('SelfPay_Btn');
    element.disabled = true;
    axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+paidByGBID)
    .then(resp => {
      if (resp.status === 200) {
        //console.log("Self Chatrel Payment data:", resp.data);
        if(resp.data.chatrelPayment.nChatrelTotalAmount === 0){
          setChatrelPending('0');
          setOutstanding(false);
          // setCurrencySymbol(resp.data.currency === 'INR' ? '₹' : '$' );
          // element.disabled = false;
          // return;
        }
        else{
          setChatrelPending(resp.data.chatrelPayment.nChatrelTotalAmount);
        }
        setPaymentData(resp.data);
        //const element = document.getElementById('SelfPay_Btn');
        element.disabled = false;
        if(resp.data.gbChatrels[0].sAuthRegionCurrency === 'USD'){
          setCurrencySymbol('$');
        }
        else{
          setCurrencySymbol('₹');
        }
        
        console.log("Data fetched...", resp.data);
        
      }
    })
    .catch(error => {
      console.log(error.message);
    });

  }, []);

  const reader = new FileReader();

    reader.addEventListener("load", function () {
        setbinFileDoc(reader.result);
        console.log(reader.result);
    }, false);

  const handleUploadChange = (event) => {
    let files = document.getElementById("id_binDocFile").files;
    let file;
    if (files) {
        for (var i = 0; i < files.length; i++) {
            file = files[i];
            reader.readAsDataURL(file);
            //use var instead of let
            var Dot = file.name.lastIndexOf('.');
            var Name = file.name.slice(0, Dot);
            var Extension = file.type.split("/").pop()
            setsTitle(Name);
            setsFileExtension(Extension);
            console.log(file.name);
            console.log(Name);
            console.log(Extension);
        }
    }
};

 const handleDisputeFileSubmit = (e) => {
   e.preventDefault();
   console.log ("File upload:", binFileDoc)
   const submit = {sGBID: paidByGBID, sName: paidByName, description: disputeDescription, sTitle: sTitle,
    file: binFileDoc, sFileExtension: sFileExtension }
   axios.post(`/ChatrelPayment/SubmitDispute`, submit)
   .then((resp) => {
    if (resp.status === 200) {
      alert('Submitted successfully.')
    }
  })
  .catch((error) => {
      alert('error on submission.') ;
      console.log(error.message);
  });
 };


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
          <Tab label="Raise Dispute" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
     
        <TabPanel value={value} index={0} dir={theme.direction}>
          <br />
          <p style={{backgroundColor: "lightblue"}}>Personal Details </p>
         
          <Grid style={{paddingTop: '10px'}}>
            <FormControl style={{paddingRight: "20px"}}>
              <TextField label="GreenBook ID" value={paidByGBID}/>
            </FormControl>
          
            <FormControl style={{paddingRight: "20px"}}>
              <TextField label="GreenBook Holder Name" value={paidByName}/>
            </FormControl>

            <FormControl>
              <TextField InputLabelProps={{ shrink: true }} label="Chatrel Pending" value={chatrelPending && currencySymbol+' '+chatrelPending}/>
            </FormControl>
          </Grid>
            
            <Grid item style={{paddingTop: '10px'}}>
            
              <input id="SelfPay_Btn" type="button" onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}} value="Verify &amp; Pay"/>
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
                  <TableCell align="right">{row.dPending && row.dPending.chatrelPayment.nChatrelTotalAmount}</TableCell>
                  {row.sGBIDRelation == null && 
                  <TableCell align="center"><Button disabled variant="contained" color="primary" >Pay</Button></TableCell>}
                  {row.sGBIDRelation != null && 
                  <TableCell align="center"><Button variant='contained' color="primary" onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' }, row.dPending, row.dPending.chatrelPayment.nChatrelTotalAmount)}}>Pay</Button>
                    
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
        <form onSubmit = {(e) => verify(e)}>
          <Grid container direction="column" alignContent="center" >
            
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  label="Enter First Name of Friend"
                  // InputProps={{inputProps: {style: minWidth = "50px"} }}
                  style={{minWidth: "250px"}}
                  onChange={(e) => {setFirstName(e.target.value)}}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  label="Enter Last Name of Friend"
                  style={{minWidth: "250px"}}
                  onChange={(e) => {setLastName(e.target.value)}}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  label="Enter GreenBook ID"
                  style={{minWidth: "250px"}}
                  onChange={(e) => {setFriendGBID(e.target.value)}}
                  required
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
                  required
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <br />
              <Button variant="outlined" color="primary" type="submit" >Verify &amp; Pay</Button>
            </Grid>
          </Grid>
          </form>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <br />
        <p style={{backgroundColor: "lightblue"}}>Payment History</p>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left" style={{width: "8%"}}>Date</TableCell>
            <TableCell align="center" style={{width: "13%"}}>Reciept No.</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Paid By GBID</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Paid for GBID</TableCell>
            <TableCell align="center" style={{width: "16%"}}>Paid for Name</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Relation</TableCell>
            <TableCell align="center" style={{width: "3%"}}>Currency</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Amount</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Mode</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Status</TableCell>


          </TableRow>
        </TableHead>
        {paymentHistory && <TableBody>
          {paymentHistory.map((row) => (
            <TableRow key={row.receiptNo}>
              <TableCell align="center">{Moment(row.dtPayment).format("DD/MM/yyyy")}</TableCell>
              <TableCell >{row.sChatrelReceiptNumber}</TableCell>
              <TableCell >{row.sPaidByGBId}</TableCell>
              <TableCell >{row.sGBIDPaidFor}</TableCell>
              <TableCell >{row.sFirstName + ' ' + row.sLastName}</TableCell>
              <TableCell align="center">{row.sRelation}</TableCell>
              <TableCell align="center">{row.sPaymentCurrency}</TableCell>
              <TableCell align="center">{row.nChatrelTotalAmount}</TableCell>
              <TableCell align="center">{row.sPaymentMode}</TableCell>
              <TableCell align="center">{row.sPaymentStatus}</TableCell>
              <TableCell align="center"><input type="button" value="Download Receipt" onClick={()=>{getReceipt({nChatrelReceiptNumber: row.nChatrelRecieptNumber })}} /></TableCell>
              
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        <br />
        <p style={{backgroundColor: "lightblue"}}>Raise a Dispute</p>
        <form method = 'post' encType = '' onSubmit={(e) => handleDisputeFileSubmit(e)}>
        <Grid container direction="column" alignContent="center"  >
            
            <Grid item xs={12} sm={9}>
              <FormControl>
                <TextareaAutosize
                  placeholder="Enter Brief Description"
                  name="description"
                  // InputProps={{inputProps: {style: minWidth = "50px"} }}
                  style={{minWidth: "450px"}}
                  rowsMin={5}
                  onChange={(e) => {setDisputeDescription(e.target.value)}}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControl style={{paddingTop: "10px"}}>
                <Input
                  type = 'file'
                  accept=".doc, .docx, .pdf, image/*"
                  name='attachment'
                >
                </Input>
                             
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              <FormControl >
                  <label htmlFor="id_binDocFile">
                      <input
                          id="id_binDocFile"
                          accept={sAccept}
                          //className={props.classes.textField}
                          style={{ display: 'none' }}
                          type="file"
                          onChange={(event) => { handleUploadChange(event) }}
                      />
                      <Button color="primary" variant="contained" component="span">
                          Upload Document
                      </Button>
                  </label>
              </FormControl>
          </Grid>
          {sTitle !== "" && <Grid item xs={12}>
              <FormControl >
                  <Typography
                      variant="p"
                      color="primary"
                  >File Uploaded, File Name: {sTitle}</Typography>
              </FormControl>
          </Grid>}
            <Grid item xs={12} sm={6}>
              <FormControl style={{paddingTop: "10px"}}>
                <Button variant="contained"  color="primary" type='submit'>Save</Button>
                
              </FormControl>
            </Grid>
            </Grid>
            </form>
        </TabPanel>
        </div>
            </Grid>
          </Grid>
      
      
    
        
      </Card>
      <Grid style={{paddingTop: '10px'}} item >
              <Button variant='contained' color='primary' onClick={() => history.goBack()} >Go Back</Button>
      </Grid>
    </>
  );
}
