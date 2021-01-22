
import React,{useState,useEffect} from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
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

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Flag from 'react-flagkit';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Family () {
  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  const sGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const [paymentHistory,setPaymentHistory]=React.useState();
  const [backdrop,setBackdrop]=React.useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [receiptData,setReceiptData]=React.useState();
  const [open, setOpen] = React.useState(false);
  const fontName='Poppins';
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getReceipt = (sChatrelReceiptNumber) => {
    setBackdrop(true);
    console.log("Receipt Number", sChatrelReceiptNumber);
    axios.get(`/ChatrelPayment/GetReceipt/?sReceiptNumber=`+sChatrelReceiptNumber)
    .then(resp => {
      console.log("Response", resp);
      if (resp.status === 200) {
        console.log(resp.data);
        resp.data.receipt.sGBID ='0'.repeat(7 - resp.data.receipt.sGBID.length) +
            resp.data.receipt.sGBID;
       setReceiptData(resp.data);
       
       setBackdrop(false);
       handleClickOpen();
       //printPDF();
      }
    })
    .catch(error => {
      console.log("Error ", error.response);
      if (error.response) {
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

  const printPDF = () => {
    const domElement = document.getElementById("mytable");
    html2canvas(domElement,{
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY,
     /* onclone: (clonedDomElement)=> {

        // I made the div hidden and here I am changing it to visible
        clonedDomElement.getElementById('mytable').style.display = 'block';
      //  clonedDomElement.getElementById('mytable').style.visibility = 'visible';
     }*/
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      console.log(imgData);
      //imgData.save();
      const pdf = new jsPdf();
      pdf.addImage(imgData, "PNG",10,10);
      pdf.save('eChatrel-Receipt.pdf');
    });

  };

  useEffect(() => {
    //setPaymentData(payObj);
    axios.get(`/ChatrelPayment/GetPaymentHistory/?sGBID=`+sGBID)
      .then(resp => {
        if (resp.status === 200) {
         setPaymentHistory(resp.data);
         console.log(resp.data.length);
         setBackdrop(false);
         
        }
      })
      .catch(error => {
        if (error.response) {
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

        <Alert className="alerts-alternate mb-4 w-50 mx-auto" severity="info">
        <div className="d-flex align-items-center align-content-start">
            <span>
                <strong className="d-block">CHATREL PAID BY {sGBID}</strong> Please pay your outstanding Chatrel Amount
        </span>
        </div>
        </Alert>
      }
      { paymentHistory.length > 0 &&
     <Grid container spacing={1}>
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

    {!responsive && (  
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr >
          <Th style={{textAlign:'center'}}>DATE</Th>
          <Th style={{textAlign:'center'}}>RECEIPT NO.</Th>
          <Th style={{textAlign:'center'}}>GB ID</Th>
          <Th style={{textAlign:'center'}}>PAID BY</Th>
          <Th style={{textAlign:'center'}}>NAME</Th>
          <Th style={{textAlign:'center'}}>RELATION</Th>
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>MODE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}></Th>
        </Tr>
      </Thead>
      <Tbody  >
      {paymentHistory.map((row) => (
        <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px',height:'60px'}}>
          <Td align="center">{Moment(row.dtPayment).format("DD-MM-yyyy")}</Td>
          <Td align="center">{row.sChatrelReceiptNumber}</Td>
          <Td align="center">{row.sGBIDPaidFor}</Td>
          <Td align="center">{row.sPaidByGBId}</Td>
          <Td align="center">{row.sFirstName + ' ' + row.sLastName}</Td>
          <Td align="center">{row.sRelation}</Td>
          <Td align="center">{row.sPaymentCurrency} <Flag country={row.sPaymentCurrency==="USD"?"US":"IN"} size={20} /></Td>
          <Td align="center" > <b style={{color:'#29cf00'}}>{row.sPaymentCurrency==="USD"?"$":"₹" }{row.nChatrelTotalAmount}</b></Td>
          <Td align="center"><div className="m-1 text-second badge badge-neutral-second">{row.sPaymentMode}</div></Td>
          <Td align="center">
          {row.sPaymentStatus==="Success" &&
            <div className="badge badge-success"> Success</div>}
          </Td>
          <Td align="center"> <Button style={{padding:'5px'}} onClick={()=>{getReceipt(row.sChatrelReceiptNumber )}} className="btn-primary m-1">
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['far', 'save']} />
                                </span>
                            <span className="btn-wrapper--label">Receipt</span>
                        </Button></Td>
          
        </Tr>))}
    
       
      </Tbody>
    </Table>)}
    {responsive && (  
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr >
          <Th style={{textAlign:'center'}}>DATE</Th>
          <Th style={{textAlign:'center'}}>RECEIPT NO.</Th>
          <Th style={{textAlign:'center'}}>GB ID</Th>
          <Th style={{textAlign:'center'}}>PAID BY</Th>
          <Th style={{textAlign:'center'}}>NAME</Th>
          <Th style={{textAlign:'center'}}>RELATION</Th>
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>MODE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}></Th>
        </Tr>
      </Thead>
      <Tbody  >
      {paymentHistory.map((row) => (
        <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px'}}>
          <Td align="center">{Moment(row.dtPayment).format("DD-MM-yyyy")}</Td>
          <Td align="center">{row.sChatrelReceiptNumber}</Td>
          <Td align="center">{row.sGBIDPaidFor}</Td>
          <Td align="center">{row.sPaidByGBId}</Td>
          <Td align="center">{row.sFirstName + ' ' + row.sLastName}</Td>
          <Td align="center">{row.sRelation}</Td>
          <Td align="center">{row.sPaymentCurrency} <Flag country={row.sPaymentCurrency==="USD"?"US":"IN"} size={20} /></Td>
          <Td align="center" > <b style={{color:'#29cf00'}}>{row.sPaymentCurrency==="USD"?"$":"₹" }{row.nChatrelTotalAmount}</b></Td>
          <Td align="center"><div className="m-1 text-second badge badge-neutral-second">{row.sPaymentMode}</div></Td>
          <Td align="center">
          {row.sPaymentStatus==="Success" &&
            <div className="badge badge-success"> Success</div>}
          </Td>
          <Td align="center"> <Button style={{padding:'5px'}} onClick={()=>{getReceipt(row.sChatrelReceiptNumber )}} className="btn-primary m-1">
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['far', 'save']} />
                                </span>
                            <span className="btn-wrapper--label">Receipt</span>
                        </Button></Td>
          
        </Tr>))}
    
       
      </Tbody>
    </Table>)}
     
    </Card>
      </div>
      </div>
      </Card>
      </Grid>
      <Grid item xs={12} sm={1} ></Grid>
      </Grid>}</>}

    <Backdrop className={classes.backdrop} open={backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        style={{paddingRight:'20px'}}
       // aria-labelledby="alert-dialog-slide-title"
        //aria-describedby="alert-dialog-slide-description"
      >
        {/*<DialogTitle id="alert-dialog-slide-title">{}</DialogTitle>*/}
        <DialogContent>
          <DialogContentText >
          { receiptData &&
          <table /*ref={ref}*/  id="mytable" className="mytable" cellspacing="0" style={{ border: "3px solid #000000",background:`linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)),url(${CTALogo}) no-repeat center ` }}>
      <tr>
          <td width="20"></td>
          <td width="200"></td>
          <td width="175"></td>
          <td width="175"></td>
          
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colSpan="2" height="35" align="left" valign="middle" ><b><font face="Microsoft Himalaya" size={5} color="#000000">༄༅། །བཙན་བྱོལ་བོད་མིའི་དཔྱ་དངུལ་བྱུང་འཛིན་ཨང་།</font></b></td>
          
          <td align="right"><img width="75px" height="75px"  src={"data:image/png;base64,"+receiptData.qrcode}/></td>
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colspan="2" height="28" align="left" valign="middle" ><b><font face="Microsoft Himalaya" size={4} color="#000000">མིང་།</font><font  size={4} color="#000000"> {receiptData.receipt.sFirstName +" "+ (receiptData.receipt.sLastName?receiptData.receipt.sLastName:"") }</font></b></td>
          <td align="right" valign="middle" ><b><font face="Microsoft Himalaya" size={4} color="#000000">རང་ལོ། {receiptData.receipt.nAge}</font></b></td>
          <td width="20"></td>
        </tr>
        <tr>
          
          <td colspan="5"/* style={{borderRight:"3px solid #000000"}}*/   height="27" align="left" valign="top" > 
            
            <table >
              <tr>
                <td style={{width:"200px",paddingLeft:"20px",borderTop:"3px solid #000000"}}><b><font face="Microsoft Himalaya" size={4} color="#000000">	དཔྱ་དེབ་ཨང་།</font></b></td>
                <td align="center" style={{border:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sCountryID.charAt(0)}</font></b></td>
                <td  align="center" style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sCountryID.charAt(1)}</font></b></td>
                <td  align="center"  style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(0)}</font></b></td>
                <td  align="center"  style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(1)}</font></b></td>
                <td  align="center" style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(2)}</font></b></td>
                <td align="center"  style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(3)}</font></b></td>
                <td align="center"  style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(4)}</font></b></td>
                <td align="center"  style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(5)}</font></b></td>
                <td  align="center" style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">{receiptData.receipt.sGBID.charAt(6)}</font></b></td>
                

                
              </tr>
            </table>
          
            
          </td>
        
        
        </tr>
     
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="7" align="left" valign="top" ><font face="Microsoft Himalaya" size={4} color="#000000"></font></td>
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20" height="26"  style={{borderBottom: "1px solid #000000"}} ></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༡།   དཔྱ་དངུལ།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nChatrelAmount?.toFixed(2)}</font></b></td>
          <td width="20" style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༢།   ཟས་བཅད་དོད།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nChatrelMeal?.toFixed(2)}</font></b></td>
          <td width="20"  style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༣།   ཕོགས་འབབ།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nCurrentChatrelSalaryAmt?.toFixed(2)}</font></b></td>
          <td width="20"  style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༤།   ཚོང་ཁེའི་བློས་བཅད་ཞལ་འདེབས།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nChatrelBusinessDonationAmt ? receiptData.receipt.nChatrelBusinessDonationAmt.toFixed(2) : 0}</font></b></td>
          <td width="20"  style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༥།   དཔྱ་དངུལ་འབུལ་ཆད་འབབ།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། { receiptData.receipt.nArrears && receiptData.receipt.nLateFees && (receiptData.receipt.nArrears + receiptData.receipt.nLateFees).toFixed(2)}  ({receiptData.receipt.nArrears && receiptData.receipt.nLateFees && (receiptData.receipt.dtArrearsFrom.split('-')[0] - receiptData.receipt.dtArrearsTo.split('-')[0])})</font></b></td>
          <td width="20"  style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༦།   འཕར་འབུལ་ཞལ་འདེབས།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nChatrelAddtionalDonationAmt ? receiptData.receipt.nChatrelAddtionalDonationAmt.toFixed(2) : 0}</font></b></td>
          <td width="20"  style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="10" align="left" valign="top" ><font face="Microsoft Himalaya" size={4} color="#000000"></font></td>
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20" height="34"></td>
          <td colspan="2" align="left" valign="bottom" ><font face="Microsoft Himalaya" size={4}color="#000000"><b>བཅས་བསྡོམས་</b> US$/CA$/AU$/NT$/CHF/EURO/GBP/YEN/RR/</font></td>
          <td   align="left" style={{paddingLeft:"30px"}} valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར </font><font  size={4 }color="#000000">{(receiptData.receipt.nChatrelAmount + receiptData.receipt.nChatrelMeal + receiptData.receipt.nCurrentChatrelSalaryAmt +receiptData.receipt.nArrears + receiptData.receipt.nLateFees+receiptData.receipt.nChatrelAddtionalDonationAmt+ receiptData.receipt.nChatrelBusinessDonationAmt  ).toFixed(2)}</font> </b></td>
          <td width="20" ></td>
        </tr>
        <tr>
          <td width="20" height="31"></td>
          <td colspan="3" align="left" valign="middle" ><font face="Microsoft Himalaya" size={4}color="#000000"><b>ཕྱི་ལོ་༌་་་་་་་་་་་་་་༌༌༌༌༌་་་་་་་་་་་་༌༌༌༌༌༌༌༌༌༌༌ལོའི་དཔྱ་དངུལ་འབུལ་འབབ་རྩིས་འབུལ་བྱུང་བའི་འཛིན་དུ། </b></font></td>
          <td width="20" ></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="32" align="left" valign="top" ><font face="Microsoft Himalaya" size={4} color="#000000"></font></td>
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20" height="33"></td>
          <td colspan="3" align="left" valign="middle" ><font face="Microsoft Himalaya" size={4}color="#000000"><b>བོད་རིགས་སྤྱི་མཐུན་ཚོགས་པའམ་བོད་རིགས་ཚོགས་པའི་ལས་དམ་དང་མཚན་རྟགས། &nbsp;&nbsp;&nbsp; ཕྱི་ལོ༌ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཟླ་ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཚེས་ &nbsp;&nbsp;&nbsp; ལ།</b></font></td>
          <td width="20" ></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="16" align="left" valign="top" >
            <font size={2} color="#000000">
            This is computer generated Chatrel receipt, no signature required.
            </font>
          </td>
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="16" align="left" valign="top" >
            <font size={2} color="#000000">
            You are advised to update chatrel contribution on your Greenbook from Office of Tibet or concerned Tibetan Association/Tibetan Community.
            </font>
          </td>
          <td width="20"></td>
        </tr>
       
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="16" align="left" valign="top" ><font face="Microsoft Himalaya" size={4} color="#000000"></font></td>
          <td width="20"></td>
        </tr>
      
       
        </table>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={printPDF} variant="contained" style={{paddingTop:"5px",paddingBottom:"5px"}} color="primary">
            Print
          </Button>
          <Button onClick={handleClose} variant="contained" style={{paddingTop:"5px",paddingBottom:"5px"}} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
     

    </>
    
  );
}