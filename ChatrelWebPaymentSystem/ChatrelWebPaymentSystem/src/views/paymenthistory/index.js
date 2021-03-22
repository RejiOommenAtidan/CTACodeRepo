
import React,{useState,useEffect} from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button,Select, Typography,IconButton, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableBodyRow } from 'mui-datatables';
//import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import CTALogo from '../../assets/images/CTABackgroundLogo.PNG';
import { useMediaQuery } from 'react-responsive'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {storeSession} from '../../actions/transactions/SessionAction';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Flag from 'react-flagkit';
import { useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { Alerts } from '../alerts';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Family () {
  let history = useHistory();
  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  const sGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const sCountryID=useSelector(state => state.GBDetailsReducer.oGBDetails.sCountryID);
  const [paymentHistory,setPaymentHistory]=React.useState();
  const [backdrop,setBackdrop]=React.useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [receiptData,setReceiptData]=React.useState();
  const [open, setOpen] = React.useState(false);
  const fontName='Poppins';


  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  
  const getReceipt = (sChatrelReceiptNumber) => {
    setBackdrop(true);
    console.log("Receipt Number", sChatrelReceiptNumber);
    axios.get(`/ChatrelPayment/GetReceipt/?sReceiptNumber=`+sChatrelReceiptNumber/*,  { responseType: 'blob' }*/)
    .then(resp => {
      console.log("Response", resp.data);
      
      if (resp.status === 200) {
        const oSession={
          sJwtToken:resp.data.token,
          bSession:true
        }
        dispatch(storeSession(oSession));
        setBackdrop(false);
 //       const url = window.URL.createObjectURL(base64);
        const url = `data:application/pdf;base64,${resp.data.receipt}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ChatrelReceipt-"+sChatrelReceiptNumber+".pdf");
        document.body.appendChild(link);
        link.click();
      //  console.log(resp.data);
      //   resp.data.receipt.sGBID ='0'.repeat(7 - resp.data.receipt.sGBID.length) +
      //       resp.data.receipt.sGBID;
      //  setReceiptData(resp.data);
       
      //  setBackdrop(false);
      //  handleClickOpen();
       //printPDF();
      }
    })
    .catch(error => {
      console.log("Error ", error.response);
      if (error.response) {
        if(error.response.status!==401){
          setBackdrop(false);
               setAlertMessage('Something went wrong, please try again later');
               setAlertType('error');
               snackbarOpen();
             }
        console.error(error.response);
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

  }

  // const printPDF = () => {
  //   const domElement = document.getElementById("mytable");
  //   html2canvas(domElement,{
  //     allowTaint: true,
  //     scrollX: 0,
  //     scrollY: -window.scrollY,
  //    /* onclone: (clonedDomElement)=> {

  //       // I made the div hidden and here I am changing it to visible
  //       clonedDomElement.getElementById('mytable').style.display = 'block';
  //     //  clonedDomElement.getElementById('mytable').style.visibility = 'visible';
  //    }*/
  //   }).then(canvas => {
  //     const imgData = canvas.toDataURL("image/png");
  //     console.log(imgData);
  //     //imgData.save();
  //     const pdf = new jsPdf();
  //     pdf.addImage(imgData, "PNG",10,10);
  //     pdf.save('Chatrel-Receipt.pdf');
  //   });

  // };
  const [result,setResult]=React.useState(null);
  const [page,setPage]=React.useState(1);
  const pageSize = 10;
  
  useEffect(() => {
    //setPaymentData(payObj);
    axios.get(`/ChatrelPayment/GetPaymentHistory/?sGBID=`+sGBID)
      .then(resp => {
        if (resp.status === 200) {
          const oSession={ sJwtToken:resp.data.token,bSession:true }
          dispatch(storeSession(oSession));
         setPaymentHistory(resp.data.paymentHistory);
         let tempPaymentHistory=[...resp.data.paymentHistory.reverse()];
         const result = new Array(Math.ceil(tempPaymentHistory.length / pageSize))
          .fill()
          .map(_ => tempPaymentHistory.splice(0, pageSize));
         console.log(result);
         setResult(result);
         console.log(resp.data);
         setBackdrop(false);
         
        }
      })
      .catch(error => {
       
        if (error.response) {
          if(error.response.status!==401){
            setBackdrop(false);
                 setAlertMessage('Something went wrong, please try again later');
                 setAlertType('error');
                 snackbarOpen();
               }
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


    {paymentHistory &&
    <>
     { paymentHistory.length === 0 &&

        <Alert className="alerts-alternate mb-4 w-50 mx-auto" severity="info" style={{margin:'30px'}}>
        <div className="d-flex align-items-center align-content-start">
            <span>
                <strong className="d-block">CONTRIBUTION STATUS</strong> Please donate your outstanding Chatrel Amount or File a Dispute <Button className="p-0 btn-transparent btn-link btn-link-first" onClick={()=>{history.push('FileDispute')}}>here</Button>
        </span>
        </div>
        </Alert>
      }
      { paymentHistory.length > 0 &&
     <Grid container spacing={1} style={{marginTop:'30px'}}>
     <Grid item xs={12} sm={1} ></Grid>
     <Grid item xs={12} sm={10}>
     <Card className="card-box card-box-alt  mx-auto my-4 shadow-lg " style={{borderBottom: "10px solid #4191ff"}} >
     <div className="card-content-overlay text-left">
     <div className="px-4">
                                       <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                                           <FontAwesomeIcon icon={['fas', 'history']} className="display-4" />
                                       </div>
                                       <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                                         CHATREL HISTORY
                                       </div>
<Card  style={{  padding: 20,marginBottom:20,border:'1px solid grey'}} className="shadow-first shadow-xl"   >

    {!responsive && (  <>
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr >
          <Th style={{textAlign:'center'}}>DATE</Th>
          <Th style={{textAlign:'center'}}>RECEIPT NO.</Th>
          <Th style={{textAlign:'center'}}>GB ID</Th>
          <Th style={{textAlign:'center'}}>PAID BY</Th>
          <Th style={{textAlign:'center'}}>NAME</Th>
          {/* <Th style={{textAlign:'center'}}>RELATION</Th> */}
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>MODE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}></Th>
        </Tr>
      </Thead>
      <Tbody  >
      { result && result[page-1].map((row) => (
        <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px',height:'60px'}}>
          <Td align="center">{Moment(row.dtPayment).format("DD-MM-yyyy")}</Td>
          <Td align="center">{row.sChatrelReceiptNumber}</Td>
          <Td align="center">{row.sCountryIDPaidFor+row.sGBIDPaidFor}</Td>
          <Td align="center">{sCountryID+row.sPaidByGBId}</Td>
          <Td align="center">{row.sFirstName + ' ' + row.sLastName}</Td>
          {/* <Td align="center">{row.sRelation}</Td> */}
          <Td align="center">{row.sPaymentCurrency} {row.sPaymentMode=="Online" && <Flag country={row.sPaymentCurrency==="USD"?"US":"IN"} size={20} />}</Td>
          <Td align="center" > <b style={{color:'#29cf00'}}>{row.sPaymentMode=="Online"?(row.sPaymentCurrency==="USD"?"$":"₹"):'' }{row.nChatrelTotalAmount}</b></Td>
          <Td align="center"><div className="m-1 text-second badge badge-neutral-second">{row.sPaymentMode}</div></Td>
          <Td align="center">
          {row.sPaymentStatus==="Success" &&
            <div className="badge badge-success"> Success</div>}
          </Td>
          <Td align="center"> <Button style={{padding:'5px'}} disabled={row.sPaymentMode!=="Online"} onClick={()=>{getReceipt(row.sChatrelReceiptNumber )}} className="btn-primary m-1">
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['far', 'save']} />
                                </span>
                            <span className="btn-wrapper--label">Receipt</span>
                        </Button></Td>
          
        </Tr>))}
    
       
      </Tbody>
    </Table>
    { result && 
     <Grid container spacing={0}>
      
        <Grid item xs={12} align="right">
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          onChange={(e)=>{onPageSizeChange(e.target.value);}}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select> */}
        <IconButton aria-label="previous" disabled={page===1} onClick={()=>{setPage(page-1);}}>
            <ChevronLeftIcon />
        </IconButton>
      
           {page} of {result.length}
        <IconButton aria-label="next" disabled={page===result.length} onClick={()=>{setPage(page+1);}}>
        <ChevronRightIcon/>
        </IconButton>
      
       
         </Grid>
 
     </Grid>

    }
    
    </>
    )}
    {responsive && (  
      <>
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr >
          <Th style={{textAlign:'center'}}>DATE</Th>
          <Th style={{textAlign:'center'}}>RECEIPT NO.</Th>
          <Th style={{textAlign:'center'}}>GB ID</Th>
          <Th style={{textAlign:'center'}}>PAID BY</Th>
          <Th style={{textAlign:'center'}}>NAME</Th>
          {/* <Th style={{textAlign:'center'}}>RELATION</Th> */}
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>MODE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}></Th>
        </Tr>
      </Thead>
      <Tbody  >
      { result && result[page-1].map((row) => (
        <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px'}}>
          <Td align="center">{Moment(row.dtPayment).format("DD-MM-yyyy")}</Td>
          <Td align="center">{row.sChatrelReceiptNumber}</Td>
          <Td align="center">{row.sGBIDPaidFor}</Td>
          <Td align="center">{row.sPaidByGBId}</Td>
          <Td align="center">{row.sFirstName + ' ' + row.sLastName}</Td>
          {/* <Td align="center">{row.sRelation}</Td> */}
          <Td align="center">{row.sPaymentCurrency} {row.sPaymentMode=="Online" && <Flag country={row.sPaymentCurrency==="USD"?"US":"IN"} size={20} />}</Td>
          <Td align="center" > <b style={{color:'#29cf00'}}>{row.sPaymentMode=="Online"?(row.sPaymentCurrency==="USD"?"$":"₹"):'' }{row.nChatrelTotalAmount}</b></Td>
          <Td align="center"><div className="m-1 text-second badge badge-neutral-second">{row.sPaymentMode}</div></Td>
          <Td align="center">
          {row.sPaymentStatus==="Success" &&
            <div className="badge badge-success"> Success</div>}
          </Td>
          <Td align="center"> <Button style={{padding:'5px'}} disabled={row.sPaymentMode!=="Online"} onClick={()=>{getReceipt(row.sChatrelReceiptNumber )}} className="btn-primary m-1">
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['far', 'save']} />
                                </span>
                            <span className="btn-wrapper--label">Receipt</span>
                        </Button></Td>
          
        </Tr>))}
    
       
      </Tbody>
    </Table>
    { result && 
     <Grid container spacing={0}>
       <Grid item xs={12} align="left">
      
     <Pagination    count={result.length} page={page} onChange={(event,val)=> {setPage(val);}}  hideNextButton hidePrevButton />
      
        </Grid>
        <Grid item xs={12} align="right">
        <IconButton aria-label="previous" disabled={page===1} onClick={()=>{setPage(page-1);}}>
            <ChevronLeftIcon />
        </IconButton>
      
           {page} of {result.length}
        <IconButton aria-label="next" disabled={page===result.length} onClick={()=>{setPage(page+1);}}>
        <ChevronRightIcon/>
        </IconButton>
      
       
         </Grid>
 
     </Grid>

    }
    
    </>)}
     
    </Card>
      </div>
      </div>
      </Card>
      </Grid>
      <Grid item xs={12} sm={1} ></Grid>
      </Grid>}</>}
      {snackbar && (
            <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
          )}
    <Backdrop className={classes.backdrop} open={backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
   
     

    </>
    
  );
}