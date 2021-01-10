
import stock from '../../../assets/images/No_person.jpg';
import Moment from 'moment';
import axios from 'axios';
import { useHistory } from "react-router-dom";
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



export const ViewDialog = (props) => {
  let history = useHistory();
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
  


  useEffect(() => {
    let count=1;
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

              <Card className="card-box mb-spacing-6-x2">
                <Grid container spacing={0}>
                  <Grid item xl={9}>
                    <div className="p-4 text-center">
                      {/* <div className="avatar-icon-wrapper  mx-auto">
                        <div className="d-block p-0 avatar-icon-wrapper m-0 border-3">
                          <div className=" border-3 border-white overflow-hidden">
                            {data.sPhoto != null &&
                              <img alt="..." className="img-fluid" style={{ width: '150px', height: '200px' }} src={`data:image/` + data.sFileExtension + `;base64,${data.sPhoto}`} />}
                            {data.sPhoto == null &&
                              <img alt="..." className="img-fluid" style={{ width: '150px',height:'200px' }} src={stock} />}
                          </div>
                        </div>
                      </div> */}
                      <h4 className="font-size-lg font-weight-bold my-2">
                        {data.profile.sFirstName + ' ' + (data.profile.sLastName ? data.profile.sLastName : "")}
                      </h4>
                      <h4 className="font-size-lg font-weight-bold my-2">
                        {/* {data.sAliasName && '(Alias: ' + data.sAliasName+')'} */}
                      </h4>
                      <h4 className="font-size-lg font-weight-bold my-2">
                        {data.profile.sCountryID + data.profile.sGBID}
                      </h4>



                      <div className="divider my-4" />
                      <Grid container spacing={1} style={{ textAlign: 'left' }}>
                        <Grid item sm={6}>
                          Gender: {data.profile.sGender == 'M' ? 'Male' : 'Female'}
                        </Grid>
                        
                        <Grid item sm={6}>
                          DOB: {data.profile.dtDOB ? Moment(data.profile.dtDOB).format(sDateFormat) : ''}
                        </Grid>
                        {/* <Grid item sm={6}>
                          Age: {data.profile.nAge}
                        </Grid> */}
                        <Grid item sm={6}>
                          Family Name: {data.profile.sFamilyName}
                        </Grid>
                      </Grid>
                      <div className="divider my-4" />
                      <Grid container spacing={1} style={{ textAlign: 'left' }}>
                        <Grid item sm={6}>
                          Country:  {data.profile.sCountry}
                        </Grid>
                        <Grid item sm={6}>
                                Email: {data.profile.sEmail}

                              </Grid>
                              <Grid item sm={6}>
                                Phone Number: {data.profile.sPhone}
                              </Grid>
                      </Grid>
                    </div>

                    <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Receipt Number
                            </TableCell>
                            <TableCell>
                              Payment Date
                            </TableCell>
                            <TableCell>
                              Chatrel Year
                            </TableCell>
                            <TableCell>
                              Currency
                            </TableCell>
                            <TableCell>
                              Total Chatrel
                            </TableCell>
                            <TableCell>
                              Payment Mode
                            </TableCell>
                            <TableCell>
                              Status
                            </TableCell>
                            <TableCell>
                              Paid By
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.payment.map((row) => (
                          <TableRow key={row.sGBID}>
                            <TableCell component="th" scope="row">
                              {<Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { }}><span><u>{row.sChatrelReceiptNumber}</u></span></Button>}
                            </TableCell>
                            <TableCell align="right">{Moment(row.dtPayment).format(sDateFormat)}</TableCell>
                            <TableCell align="right">{row.nChatrelYear}</TableCell>
                            <TableCell align="left">{row.sPaymentCurrency}</TableCell>
                            <TableCell align="right">{row.nChatrelTotalAmount}</TableCell>
                            <TableCell align="right">{row.sPaymentMode}</TableCell>
                            <TableCell align="right">{row.sPaymentStatus}</TableCell>
                            <TableCell align="right">{row.sPaidByGBId}</TableCell>
                          </TableRow>
                        ))}
                        </TableBody>  
                      </Table>



                  </Grid>
                  {/* <Grid item xl={9}>
                    <Grid container className={props.classes.box}>
                      
                      

                      
                      
                      
                      
                      
                    </Grid>
                  </Grid> */}
                </Grid>
              </Card>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.handleViewClickClose}
              color="primary"
              variant={"contained"}
              size={"small"}
            >Close</Button>
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
    </>
  );
}

