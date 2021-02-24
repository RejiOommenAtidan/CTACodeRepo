
import stock from '../../../assets/images/No_person.jpg';
import Moment from 'moment';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import {
  Grid,
  Button,
  Card,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { sDateFormat, sButtonColor, sButtonSize, sButtonVariant, sSnackbarAddMessage } from 'config/commonConfig';
import { BackdropComponent as BackdropDialogComponent } from "../../backdrop/index";
import { Alerts } from '../../alerts';
import handleError from "../../../auth/_helpers/handleError";
import DeleteIcon from "@material-ui/icons/Delete";
import AddSingleChatrel from 'views/chatrelhome/addchatrel';
import { NavigateBeforeSharp } from '@material-ui/icons';


export const ViewDialog = (props) => {
  let history = useHistory();
  const userRightsId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.nUserRightsId);

  const [addModal, setAddModal] = useState(false);
  const [addDocumentModal, setaddDocumentModal] = useState(false);
  const [dialogBackdrop, setdialogBackdrop] = useState(false);
  const handleAddDocumentClickClose = () => {
    setaddDocumentModal(false);
  };
  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [reload, setReload] = useState(false);
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const snackbarClose = () => {
    setSnackbar(false);
  };
  //#endregion

  const [sFeature, setsFeature] = useState("");
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = React.useState([]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const userid = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);

  const [progress, setProgress] = useState(0);
  
  const viewReceipt = (sReceiptNumber) => {
    console.log("Passing receipt number:", sReceiptNumber);
    //history.push('/ChatrelPay/ChatrelReceipt', {sReceiptNumber: sReceiptNumber});
    history.push({
      pathname: '/Chatrel/ChatrelReceipt',
      state: {
        sReceiptNumber
      },
    });
  };

  const handleAddClickClose = (load) => {
    setAddModal(false);
    if(load === true){
      loadData();
      setReload(true);
    }
    
  }


  const loadData = () => {
    axios.get(`ChatrelPayment/GetUserProfileFromGBID?sGBID=` + props.sGBID)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setData(resp.data);
       
          // console.log(JSON.parse(localStorage.getItem("currentUser")).oUser.id);

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
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    } const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }

  useEffect(() => {
    let count=1;
    loadData();

  }, []);

  return (
    <>
      {data.length == 0 && <Dialog open={true}
        maxWidth='sm' aria-labelledby="form-dialog-title">

        <DialogContent>
          <DialogContentText>
            <CircularProgress variant="determinate" value={progress} className="m-3 progress-xs" color="primary" />
          </DialogContentText>
        </DialogContent>


      </Dialog>}

      {data.length != 0 &&
        <Dialog open={props.viewModal} onEscapeKeyDown={props.handleViewClickClose} 
          maxWidth='lg' aria-labelledby="form-dialog-title">
          {/*  <DialogTitle id="form-dialog-title">Add Feature</DialogTitle>*/}
          <DialogContent>
            <DialogContentText>

              {/* <Card className="card-box mb-spacing-6-x2"> */}
                <Grid container spacing={0} style={{ textAlign: 'left' }}>
                  {/* <Grid item sm={6}> */}
                    {/* <div className="p-4 text-center"> */}
                      
                      
                      {/* <h4 className="font-size-lg font-weight-bold my-2">
                         {data.sAliasName && '(Alias: ' + data.sAliasName+')'} 
                      </h4> */}
                      
                      {/* <Grid container spacing={1} style={{ textAlign: 'left' }}></Grid> */}
                        <Grid item sm={4}>
                        <h4 className="font-size-lg font-weight-bold my-2">
                        Name: {data.profile.sFirstName + ' ' + (data.profile.sLastName ? data.profile.sLastName : "") + ' ' + (data.profile.sFamilyName ? data.profile.sFamilyName : "")}
                      </h4>
                          Gender: {data.profile.sGender == 'M' ? 'Male' : 'Female'}
                        </Grid>
                        
                        <Grid item sm={4}>
                        <h4 className="font-size-lg font-weight-bold my-2">
                        Greenbook ID: {data.profile.sCountryID + data.profile.sGBID}
                      </h4>
                          DOB: {data.profile.dtDOB ? Moment(data.profile.dtDOB).format(sDateFormat) : ''}
                        </Grid>
                        <Grid item sm={4}>
                        <h4 className="font-size-lg font-weight-bold my-2">
                          Country:  {data.profile.sCountry}
                          </h4>
                        </Grid>
                       
                        {/* <Grid item sm={6}>
                          Age: {data.profile.nAge}
                        </Grid> */}
                        {/* <Grid item sm={6}>
                          Family Name: {data.profile.sFamilyName}
                        </Grid> */}
                      
                      
                      <Grid container spacing={1} style={{ textAlign: 'left' }}>
                      <Grid item sm={4}>
                                Phone Number: {data.profile.sPhone}
                              </Grid>
                        
                        <Grid item sm={4}>
                                Email: {data.profile.sEmail}

                              </Grid>
                              
                      </Grid>
                      <Grid container spacing={1} >
                        <Grid item sm={12}>
                          <div>
                            <br />
                        {/* <Divider variant="full-width"  /> */}
                        </div>
                        </Grid>
                        </Grid>
                    {/* </div> */}
                        <div style={{display: 'flex', alignContent: 'center'}}>
                          <span style={{ fontWeight: 'bold', textAlign:'center'}}>LIST OF CHATRELS</span>      
                        </div>
                    {/* <p style={{fontSize: '1.2em', fontWeight: 'bold', textAlign:'center'}}>List of Chatrels</p> */}
                        
                    <Table size="small">
                    {/* <caption>List of Chatrels</caption> */}
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              RECEIPT NUMBER
                            </TableCell>
                            <TableCell>
                              PAYMENT DATE
                            </TableCell>
                            <TableCell>
                              CHATREL YEAR
                            </TableCell>
                            <TableCell>
                              CURRENCY
                            </TableCell>
                            <TableCell>
                              TOTAL CHATREL
                            </TableCell>
                            <TableCell>
                              PAYMENT MODE
                            </TableCell>
                            <TableCell>
                              STATUS
                            </TableCell>
                            <TableCell>
                              PAID BY
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.payment.map((row) => (
                          <TableRow key={row.sGBID}>
                            <TableCell align='right' component="th" scope="row">
                              {/* {<Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => {viewReceipt(row.sChatrelReceiptNumber) }}><span><u>{row.sChatrelReceiptNumber}</u></span></Button>} */}
                              <Link to={{
                                pathname: '/Chatrel/ChatrelReceipt',
                                search: `?receiptNumber=${row.sChatrelReceiptNumber}`,
                                state: {sReceiptNumber: row.sChatrelReceiptNumber},
                                }}
                                target='_blank'
                              >
                                <span style={{color: 'blue'}}><u>{row.sChatrelReceiptNumber}</u></span>
                              </Link>
                            </TableCell>
                            <TableCell align="right">{Moment(row.dtPayment).format(sDateFormat)}</TableCell>
                            <TableCell align="right">{row.nChatrelYear}</TableCell>
                            <TableCell align="left">{row.sPaymentCurrency}</TableCell>
                            <TableCell align="right">{row.nChatrelTotalAmount}</TableCell>
                            <TableCell align="left">{row.sPaymentMode}</TableCell>
                            <TableCell align="left">{row.sPaymentStatus}</TableCell>
                            <TableCell align="right">{row.sPaidByGBId}</TableCell>
                          </TableRow>
                        ))}
                        </TableBody>  
                      </Table>
                     


                  {/* </Grid> */}
                  {/* <Grid item xl={9}>
                    <Grid container className={props.classes.box}>
                      
                      

                      
                      
                      
                      
                      
                    </Grid>
                  </Grid> */}
                </Grid>
              {/* </Card> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{justifyContent:'center'}}>
          <Grid container spacing={1}>
        <Grid item xs={4} style={{ textAlign: "left" }}>
          {/* <Button>left</Button> */}
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
        {(userRightsId === 7 || userRightsId === 5) && <Button
              onClick={() => setAddModal(true)}
              color="primary"
              variant={"contained"}
              size={"small"}
            >Add Single Chatrel</Button>}
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
        <Button
              onClick={() => props.handleViewClickClose(reload)}
              color="primary"
              variant={"contained"}
              size={"small"}
            >Close</Button>
        </Grid>
      </Grid>
          </DialogActions>
        </Dialog>}

        
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />
      }
      
      {dialogBackdrop && <BackdropDialogComponent
        backdrop={dialogBackdrop}
      />}
      {addModal && <AddSingleChatrel
                      sGBID = {props.sGBID}
                      //sName = {data.profile.sFirstName + ' ' + (data.profile.sLastName ? data.profile.sLastName : "")}
                      addModal={addModal}
                      handleAddClickClose = {handleAddClickClose}
                      ></AddSingleChatrel>}
    </>
  );
}

