
import React,{useState,useEffect} from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
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
      if (resp.status === 200) {
       setReceiptData(resp.data);
       console.log(resp.data);
       setBackdrop(false);
       handleClickOpen();
       //printPDF();
      }
    })
    .catch(error => {
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
      pdf.save(`${new Date().toISOString()}.pdf`);
    });

  };

  useEffect(() => {
    //setPaymentData(payObj);
    axios.get(`/ChatrelPayment/GetPaymentHistory/?sGBID=`+sGBID)
      .then(resp => {
        if (resp.status === 200) {
         setPaymentHistory(resp.data);
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
       <Typography className="myfont" variant="h4" style={{textAlign:'center',color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom>CHATREL HISTORY</Typography>
      <div style={{width:'85%',margin:'auto',backgroundColor:'#ced9fd',padding:'25px',border:'2px solid grey',borderRadius:'25px',boxShadow:" 10px 10px 5px grey"}} className='text-black' >
      <Typography className="myfont"variant="h5" style={{color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom>CHATREL PAID BY {sGBID}</Typography>

      <Card  style={{  padding: 20,marginBottom:20,boxShadow:" 3px 3px 1px grey" }}   >
      
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr>
          <Th style={{textAlign:'center'}}>DATE</Th>
          <Th style={{textAlign:'center'}}>RECEIPT NO.</Th>
          <Th style={{textAlign:'center'}}>PAID BY</Th>
          <Th style={{textAlign:'center'}}>GBID</Th>
          <Th style={{textAlign:'center'}}>NAME</Th>
          <Th style={{textAlign:'center'}}>RELATION</Th>
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>MODE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td align="center">14-01-2021</Td>
          <Td align="center">1</Td>
          <Td align="center">9675</Td>
          <Td align="center">9675</Td>
          <Td align="center">Tamdin Richoe</Td>
          <Td align="center">Self</Td>
          <Td align="center">USD <Flag country={"US"} size={20} /></Td>
          <Td align="center" > <b style={{color:'#29cf00'}}>$4.29</b></Td>
          <Td align="center"><div className="m-1 text-second badge badge-neutral-second">Online</div></Td>
          <Td align="center"><div className="badge badge-success"> Success</div></Td>
          <Td align="center"> <Button style={{padding:'5px'}} className="btn-primary m-1">
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['far', 'save']} />
                                </span>
                            <span className="btn-wrapper--label">Receipt</span>
                        </Button></Td>
          
        </Tr>
        <Tr>
          <Td align="center">14-01-2021</Td>
          <Td align="center">1</Td>
          <Td align="center">9675</Td>
          <Td align="center">9675</Td>
          <Td align="center">Tamdin Richoe</Td>
          <Td align="center">Self</Td>
          <Td align="center">USD <Flag country={"US"} size={20} /></Td>
          <Td align="center" > <b style={{color:'#29cf00'}}>$4.29</b></Td>
          <Td align="center"><div className="m-1 text-second badge badge-neutral-second">Online</div></Td>
          <Td align="center"><div className="badge badge-success"> Success</div></Td>
          <Td align="center"> <Button style={{padding:'5px'}} className="btn-primary m-1">
                                <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon icon={['far', 'save']} />
                                </span>
                            <span className="btn-wrapper--label">Receipt</span>
                        </Button></Td>
          
        </Tr>
        
       
      </Tbody>
    </Table>
      </Card>


      </div>
    
    
    <p style={{fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>Chatrel History</p>
      <Card  style={{  padding: 50 }} >

      <br />
        <p style={{backgroundColor: "lightblue"}}>Payment History</p>
        <TableContainer component={Paper}>
      <Table className={classes.table}  aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left" style={{width: "10%",padding:'5px'}}>Date</TableCell>
            <TableCell align="center" style={{width: "12%",padding:'5px'}}>Reciept No.</TableCell>
            <TableCell align="center" style={{width: "8%",padding:'5px'}}>Paid By GBID</TableCell>
            <TableCell align="center" style={{width: "8%",padding:'5px'}}>GBID</TableCell>
            <TableCell align="center" style={{width: "16%",padding:'5px'}}>Name</TableCell>
            <TableCell align="center" style={{width: "8%",padding:'5px'}}>Relation</TableCell>
            <TableCell align="center" style={{width: "3%",padding:'5px'}}>Currency</TableCell>
            <TableCell align="center" style={{width: "8%",padding:'5px'}}>Amount</TableCell>
            <TableCell align="center" style={{width: "10%",padding:'5px'}}>Mode</TableCell>
            <TableCell align="center" style={{width: "10%",padding:'5px'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        {paymentHistory && <TableBody>
          {paymentHistory.map((row) => (
            <TableRow key={row.receiptNo}>
              <TableCell style={{padding:'5px'}} align="left">{Moment(row.dtPayment).format("DD-MM-yyyy")}</TableCell>
              <TableCell style={{padding:'5px'}} align="center">{row.sChatrelReceiptNumber}</TableCell>
              <TableCell style={{padding:'5px'}} align="center">{row.sPaidByGBId}</TableCell>
              <TableCell style={{padding:'5px'}} align="center">{row.sGBIDPaidFor}</TableCell>
              <TableCell style={{padding:'5px'}} align="center">{row.sFirstName + ' ' + row.sLastName}</TableCell>
              <TableCell style={{padding:'5px'}} align="center">{row.sRelation}</TableCell>
              <TableCell style={{padding:'5px'}} align="center">{row.sPaymentCurrency}</TableCell>
              <TableCell  style={{padding:'5px'}} align="center">{row.nChatrelTotalAmount}</TableCell>
              <TableCell style={{padding:'5px'}}  align="center">{row.sPaymentMode}</TableCell>
              <TableCell style={{padding:'5px'}}  align="center">{row.sPaymentStatus}</TableCell>
              <TableCell style={{padding:'5px'}}  align="center"><Button variant="contained" style={{paddingTop:'5px', paddingBottom:'5px'}} color="primary" type = 'button' onClick={()=>{getReceipt(row.sChatrelReceiptNumber )}}>Receipt</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
    </Card></>}
    <Backdrop className={classes.backdrop} open={backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
       // aria-labelledby="alert-dialog-slide-title"
        //aria-describedby="alert-dialog-slide-description"
      >
        {/*<DialogTitle id="alert-dialog-slide-title">{}</DialogTitle>*/}
        <DialogContent>
          <DialogContentText >
          { receiptData &&
          <table /*ref={ref}*/  id="mytable" className="mytable" cellspacing="0" style={{ border: "3px solid #000000",background:`linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)),url(${CTALogo})`,backgroundRepeat:'no-repeat',backgroundPosition:'center' }}>
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
          <td colspan="2" height="28" align="left" valign="middle" ><b><font face="Microsoft Himalaya" size={4} color="#000000">མིང་།</font><font  size={4} color="#000000"> {receiptData.receipt.sFirstName}</font></b></td>
          <td align="right" valign="middle" ><b><font face="Microsoft Himalaya" size={4} color="#000000">རང་ལོ། {receiptData.receipt.nAge}</font></b></td>
          <td width="20"></td>
        </tr>
        <tr>
          
          <td colspan="5"/* style={{borderRight:"3px solid #000000"}}*/   height="27" align="left" valign="top" > 
            
            <table >
              <tr>
                <td style={{width:"200px",paddingLeft:"20px",borderTop:"3px solid #000000"}}><b><font face="Microsoft Himalaya" size={4} color="#000000">	དཔྱ་དེབ་ཨང་།</font></b></td>
                <td align="center" style={{border:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">X</font></b></td>
                <td  align="center" style={{borderTop:"3px solid #000000",borderBottom:"3px solid #000000",borderRight:"3px solid #000000"}} width="32"><b><font  size={4} color="#000000">X</font></b></td>
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
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nChatrelAmount.toFixed(2)}</font></b></td>
          <td width="20" style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༢།   ཟས་བཅད་དོད།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nChatrelMeal.toFixed(2)}</font></b></td>
          <td width="20"  style={{borderBottom: "2px solid #000000"}}></td>
        </tr>
        <tr>
          <td width="20" style={{borderBottom: "1px solid #000000"}} height="26"></td>
          <td colspan="2" style={{borderBottom: "1px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">༣།   ཕོགས་འབབ།</font></b></td>
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {receiptData.receipt.nCurrentChatrelSalaryAmt.toFixed(2)}</font></b></td>
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
          <td  style={{borderBottom: "2px solid #000000"}}  align="left" valign="bottom" ><b><font face="Microsoft Himalaya" size={4 }color="#000000">སྒོར། {(receiptData.receipt.nArrears + receiptData.receipt.nLateFees).toFixed(2)}  ({receiptData.receipt.dtArrearsFrom.split('-')[0]}-{receiptData.receipt.dtArrearsTo.split('-')[0]})</font></b></td>
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
            You are advised to update chatrel contribution on your Greenbook from Office of Tibet or
            </font>
          </td>
          <td width="20"></td>
        </tr>
        <tr>
          <td width="20"></td>
          <td colSpan="3" height="16" align="left" valign="top" >
            <font size={2} color="#000000">
            concerned Tibetan Association/Tibetan Community.
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