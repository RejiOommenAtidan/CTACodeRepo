//REMOVE: Unnecessary IMPORTS as Well as Unncecessary Code after Working Stuff Out  
//NOTE: Request to Follow IMPORT Order For Consistency throughout
//REACT IMPORTS
//REDUX IMPORTS
//ACTIONS IMPORTS
//REDUCERS IMPORTS
//ROUTING IMPORTS
//AUTH SERVICE IMPORTS
//MOMENT IMPORT
//AXIOS IMPORT
//MUI IMPORTS
//MATERIAL-TABLE IMPORT
//LOCAL IMPORTS
//ANY OTHER IMPORTS AFTER THESE
//ENSURE SEMICOLON AFTER EACH IMPORT!!


//import avatar1 from '../../../public/ctalogo.png';
import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import stock from '../../assets/images/No_person.jpg';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'moment';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Tooltip,
  Card,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Table,
  CircularProgress,
  IconButton,
  DialogTitle
} from '@material-ui/core';
import { AddDocumentDialog } from "./dialogDocument";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { sDateFormat, sButtonColor, sButtonSize, sButtonVariant, sSnackbarAddMessage } from 'config/commonConfig';
import { BackdropComponent as BackdropDialogComponent } from "../backdrop/index";
import { Alerts } from '../alerts';
import handleError from "../../auth/_helpers/handleError";
import DeleteIcon from "@material-ui/icons/Delete";
/*const findImg = (obj) =>{
  var str="";
  obj.map((row) => {
     if(obj.sDocType === "Photo Identity"){
       str= obj.binFileDoc;
     }
     return str
  })
}*/

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  box: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  },
  button: {
    margin: theme.spacing(1),
  },
  
  tableRowBorder: {
    borderColor: 'black'
  },
  expansionHeading: {
    color: '#ffffff'
  },
  expansionPanel: {
    backgroundColor: '#4e5287'
  },
}));

export const ViewDialog = (props) => {
  const classes =  useStyles();
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
  const addDocumentAPICall = (documentObject) => {
    setdialogBackdrop(true);
    console.log("add document call",documentObject);
    axios
      .post(`/Greenbook/AddDocumentForSearch`, documentObject)
      .then((resp) => {
        if (resp.status === 200) {
          if(resp.data === 'Invalid File'){
            setdialogBackdrop(false);
            setAlertMessage("Invalid File format. Please upload a valid file.");
            setAlertType('error');
            snackbarOpen();
            return;
          }
          data.gbDocuments = resp.data;
          setData(data);
          setdialogBackdrop(false);
          setaddDocumentModal(false);
          setAlertMessage(sSnackbarAddMessage);
          setAlertType('success');
          snackbarOpen();
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };
  const [sFeature, setsFeature] = useState("");
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = React.useState([]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const userid = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);

  const [progress, setProgress] = useState(0);
  const gbDocumentDelete = (row) => {
    //http://localhost:52013/api/GBDocument/DeleteGBDocument/
    axios.post(`/GBDocument/DeleteGBDocument/`, row)
      .then(resp => {
        if (resp.status === 200) {
          console.log('deleted');
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
  }
  const [openDeleteDialog, setopenDeleteDialog] = React.useState(false);
  const [oDelete, setoDelete] = React.useState({});
  const handleDeleteDialogClose = () => {
    setopenDeleteDialog(false);
    setoDelete({});
  };
  const handleDeleteDialogClickOpen = (rowObject) => {
    setopenDeleteDialog(true);
    setoDelete(rowObject);
  };
  

  const handleDeleteDocumentRowClick = () => {
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/DeleteDocument`, oDelete)
      .then((resp) => {
        if (resp.status === 200) {
          data.gbDocuments = resp.data;
          handleDeleteDialogClose();
          setAlertMessage("Document Deleted Successfully");
          setAlertType('success');
          snackbarOpen();
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };
  useEffect(() => {
    let count=1;
    axios.get(`GreenBook/GetDetailsFromGBID?sGBID=` + props.sGBID + `&nUserId=` + userid)
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

  const openBase64NewTab = (binFileDoc,sTitle,sFileExtension,sDocType)=> {

   // console.log(binFileDoc);
    var type="";
    if (sDocType === "Photo Identity") {
      type="image/"+sFileExtension;
  }
  else {
    if(binFileDoc.charAt(0)==='J'){
      type="application/pdf";
    }else if(binFileDoc.charAt(0)==='/'){
      type="image/jpg";
    }else if(binFileDoc.charAt(0)==='i'){
      type="application/png";
    }
  //  type="pdf/"+sFileExtension;
  }
    
    var blob = base64toBlob(binFileDoc,type);
   // console.log(blob);
   
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, sTitle+'.'+sFileExtension);
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  }
  const base64toBlob = (base64Data ,type) => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
  
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
  
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
   // console.log(byteArrays);
    //var maginNumber= byteArrays.join('').toUpperCase();
    //console.log(getTypeFromMagicNumber(maginNumber));
    
    
    
    return new Blob(byteArrays, { type: type });

  //  return new Blob(byteArrays);
  }
  let count = 0;
  const tfontsize = '1.5rem';
  const efontsize = '1.0rem';
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
        <Dialog open={props.viewModal} onEscapeKeyDown={props.handleViewClickClose} fullWidth
          maxWidth='xl' aria-labelledby="form-dialog-title">
          {/*  <DialogTitle id="form-dialog-title">Add Feature</DialogTitle>*/}
          <DialogContent>
            <DialogContentText>

              <Card className="card-box mb-spacing-6-x2">
                <Grid container spacing={0}>
                  <Grid item xl={5}>
                    <div className="p-4 text-center">
                      <div className="avatar-icon-wrapper  mx-auto">
                        <div className="d-block p-0 avatar-icon-wrapper m-0 border-3">
                          <div className=" border-3 border-white overflow-hidden">
                            {data.sPhoto != null &&
                              <img alt="..." className="img-fluid" style={{ width: '150px', height: '200px' }} src={`data:image/` + data.sFileExtension + `;base64,${data.sPhoto}`} />}
                            {data.sPhoto == null &&
                              <img alt="..." className="img-fluid" style={{ width: '150px',height:'200px' }} src={stock} />}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-size-lg font-weight-bold my-2">
                        {data.greenBook.sFirstName + ' ' + (data.greenBook.sLastName ? data.greenBook.sLastName : "")}
                      </h4>
                      <h4 className="font-size-lg font-weight-bold my-2">
                        {data.greenBook.sAliasName && '(Alias: ' + data.greenBook.sAliasName+')'}
                      </h4>
                      <h4 className="font-size-lg font-weight-bold my-2">
                        {data.greenBook.sCountryID + data.greenBook.sGBID}
                      </h4>



                      <div className="divider my-4" />
                      <Grid container spacing={1} style={{ textAlign: 'left' }}>
                        <Grid item sm={6}>
                        <strong>  Gender:</strong>{data.greenBook.sGender == 'M' ? 'Male' : 'Female'}
                        </Grid>
                        <Grid item sm={6}>
                         <strong> Father's Name:</strong> {data.relations.sFathersName}
                        </Grid>
                        <Grid item sm={6}>
                        <strong>DOB:</strong> {`${data.greenBook.sDOBApprox === 'Y' ? Moment(data.greenBook.dtDOB).year() : data.greenBook.sDOBApprox === 'M' ? (((Moment(data.greenBook.dtDOB).month() + 1) < 10 ? '0' + (Moment(data.greenBook.dtDOB).month() + 1) : (Moment(data.greenBook.dtDOB).month() + 1))   + '/' + Moment(data.greenBook.dtDOB).year()) : Moment(data.greenBook.dtDOB).format(sDateFormat)}`}&nbsp;&nbsp;{`(${data.greenBook.sDOBApprox === 'Y' ? 'Year Only' : data.greenBook.sDOBApprox === 'M' ? 'Month/Year Exact' : data.greenBook.sDOBApprox === 'D' ? 'Day Approx' : 'Exact DOB'})`}
                        </Grid>
                        <Grid item sm={6}>
                        <strong> Mother's Name:</strong> {data.relations.sMothersName}
                        </Grid>
                        <Grid item sm={6}>
                        <strong>   Age:</strong> {data.nAge}
                        </Grid>
                        <Grid item sm={6}>
                        <strong> Family Name:</strong> {data.greenBook.sFamilyName}
                        </Grid>
                      </Grid>
                      <div className="divider my-4" />
                      <Grid container spacing={1} style={{ textAlign: 'left' }}>
                        <Grid item sm={6}>
                        <strong>  Resident:</strong> {data.greenBook.sAddress2 ? data.greenBook.sAddress2 : '' + data.greenBook.sCity + ',' + data.sCountry}
                        </Grid>
                        <Grid item sm={6}>
                        <strong>  Entered By:</strong> {data.sEnteredBy}
                        </Grid>
                        <Grid item sm={6}>
                        <strong> Chatrel Paid Until:</strong> {data.greenBook.sPaidUntil}
                          {/* Edited On: {data.greenBook.dtUpdated ? Moment(data.greenBook.dtUpdated).format('DD-MM-YYYY h:m:s a') : ''} */}
                        </Grid>
                        <Grid item sm={6}>
                          {/* Edited By: {data.sUpdatedBy} */}
                          <strong>  Entered On:</strong> {data.greenBook.dtEntered ? Moment(data.greenBook.dtEntered).format('DD-MM-YYYY HH:m:s') : ''}
                        </Grid>
                      </Grid>
                      <div className="divider my-4" />
                      {(data.relations.sFathersGBID || data.relations.sMothersGBID || data.relations.sSpouseGBID) &&
                        <div className="font-weight-bold text-uppercase text-black-50 text-center mb-3">
                          Family members
                                    </div>

                      }
                      <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">

                        {data.relations.sFathersGBID &&
                          <a disabled="disabled" style={{ cursor: 'pointer' }} onClick={() => props.openRelationGB(data.relations.sFathersGBID)} >
                            <Tooltip title={data.relations.sFathersGBID + ' (Father)'} classes={{ tooltip: "tooltip-danger" }} arrow>
                              <div className="avatar-icon-wrapper">
                                <div className="avatar-icon">
                                  {data.relations.sFathersPhoto &&
                                    <img alt="..." src={`data:image/gif;base64,${data.relations.sFathersPhoto}`} />}
                                  {!data.relations.sFathersPhoto &&
                                    <img alt="..." className="img-fluid" style={{ width: '100px' }} src={stock} />}
                                </div>
                              </div>
                            </Tooltip>
                          </a>
                        }
                        {data.relations.sMothersGBID &&
                          <a disabled="disabled" style={{ cursor: 'pointer' }} onClick={() => props.openRelationGB(data.relations.sMothersGBID)} >
                            <Tooltip title={data.relations.sMothersGBID + ' (Mother)'} classes={{ tooltip: "tooltip-first" }} arrow>
                              <div className="avatar-icon-wrapper">

                                <div className="avatar-icon">
                                  {data.relations.sMothersPhoto &&
                                    <img alt="..." src={`data:image/gif;base64,${data.relations.sMothersPhoto}`} />}
                                  {!data.relations.sMothersPhoto &&
                                    <img alt="..." className="img-fluid" style={{ width: '100px' }} src={stock} />}

                                </div>
                              </div>


                            </Tooltip>
                          </a>}
                        {data.relations.sSpouseGBID &&
                          <a disabled="disabled" style={{ cursor: 'pointer' }} onClick={() => props.openRelationGB(data.relations.sSpouseGBID)} >
                            <Tooltip title={data.relations.sSpouseGBID + ' (Spouse)'} classes={{ tooltip: "tooltip-first" }} arrow>
                              <div className="avatar-icon-wrapper">
                                <div className="avatar-icon">
                                  {data.relations.sSpousePhoto &&
                                    <img alt="..." src={`data:image/gif;base64,${data.relations.sSpousePhoto}`} />}
                                  {!data.relations.sSpousePhoto &&
                                    <img alt="..." className="img-fluid" style={{ width: '100px' }} src={stock} />}

                                </div>
                              </div>


                            </Tooltip>
                          </a>}


                      </div>

                    </div>
                  </Grid>
                  <Grid item xl={7}>
                    <Grid container className={props.classes.box}>
                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel1'}
                          onChange={handleAccordionChange('panel1')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography

                              className={props.classes.expansionHeading}
                            >Contact Information</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={2} >
                              <Grid item sm={6}>
                                <FormControl className={props.classes.formControl}>
                                <strong>Address 1:</strong> {data.greenBook.sAddress1}
                                </FormControl>
                              </Grid>
                              <Grid item sm={6}>
                                <FormControl className={props.classes.formControl}>
                                <strong>Address 2:</strong> {data.greenBook.sAddress2}
                                </FormControl>
                              </Grid>
                              <Grid item sm={6}>
                              <strong> City:</strong> {data.greenBook.sCity}

                              </Grid>
                              <Grid item xs={6}>
                              <strong>State:</strong> {data.greenBook.sState}

                              </Grid>
                              <Grid item sm={6}>
                              <strong> Pin Code:</strong> {data.greenBook.sPCode}

                              </Grid>
                              <Grid item sm={6}>
                              <strong> Country:</strong>  {data.sCountry}

                              </Grid>
                              <Grid item sm={6}>
                              <strong> Fax Number:</strong> {data.greenBook.sFax}

                              </Grid>

                              <Grid item sm={6}>
                              <strong> Email:</strong> {data.greenBook.sEmail}

                              </Grid>
                              <Grid item sm={6}>
                              <strong> Phone Number:</strong> {data.greenBook.sPhone}
                              </Grid>
                              <Grid item sm={6}>
                              <strong> Google Email:</strong> {data.greenBook.sLoginGmail}
                              </Grid>
                              <Grid item sm={6}>
                              <strong> Authority Region:</strong> {data.sAuthRegion}

                              </Grid>
                              <Grid item sm={6}>
                              <strong>Form Date: </strong> {data.greenBook.dtFormDate ? Moment(data.greenBook.dtFormDate).format(sDateFormat) : ''}
                              </Grid>
                            </Grid>

                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>

                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel2'}
                          onChange={handleAccordionChange('panel2')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography
                              className={props.classes.expansionHeading}
                            >Personal Information</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                          <Grid item xs={6} >
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <strong>  Place Of Birth:</strong>  {data.greenBook.sBirthPlace}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>   Origin Village: </strong> {data.greenBook.sOriginVillage}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>    Birth Country:</strong>  {data.sBirthCountry}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>  Old GB Number:</strong>  {data.greenBook.sOldGreenBKNo}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>  RC Number:</strong>  {data.greenBook.sResidenceNumber}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>  Other Documents:</strong>  {data.greenBook.sOtherDocuments}

                                </Grid>
                                <Grid item xs={12}>
                                <strong> Marital Status:</strong> {data.greenBook.sMarried}

                                </Grid>



                              </Grid>
                            </Grid>
                            <Grid item xs={6} >
                              <Grid container spacing={2}>
                              <Grid item xs={12}>
                              <strong>   <span style={{fontSize: '1.55rem'}} >སྐྱེས་ཡུལ་།</span>:&nbsp;</strong> <span style={{fontSize: '1.55rem'}} >{data.greenBook.tbuPlaceOfBirth}</span>

                                </Grid>
                                <Grid item xs={12}>
                                <strong>    <span style={{fontSize: '1.55rem'}} >ཕ་ཡུལ།</span>:&nbsp;</strong> <span style={{fontSize: '1.55rem'}} >{data.greenBook.tbuOriginVillage}</span>

                                </Grid>
                                <Grid item xs={12}>
                                <strong>   Province:</strong> {data.sProvince}

                                </Grid>
                                <Grid item xs={12}>
                                <strong> First GB number:</strong> {data.greenBook.sFstGreenBkNo}

                                </Grid>
                                <Grid item xs={12}>
                                <strong> Qualification:</strong> {data.sQualification}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>  Deceased:</strong> {data.greenBook.dtDeceased ? Moment(data.greenBook.dtDeceased).format(sDateFormat) : 'Not Deceased'}

                                </Grid>
                                <Grid item xs={12}>
                                <strong>  Occupation: </strong>  {data.sOccupationDesc}

                                </Grid>

                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>

                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel3'}
                          onChange={handleAccordionChange('panel3')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography
                              className={props.classes.expansionHeading}
                            >Relation Details</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div>
                              <Grid container>
                                <Grid item xs={6} >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <strong>   Father's Name:</strong> {data.relations.sFathersName}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  <span style={{fontSize: '1.55rem'}} >ཕ་མིང་།</span>:&nbsp; </strong><span style={{fontSize: '1.55rem'}} >{data.greenBook.tbuFathersName}</span>

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  Father's Old GB:</strong> {data.relations.sFathersID}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  Father's GB:</strong> {data.relations.sFathersGBID ? <Button onClick={() => props.openRelationGB(data.relations.sFathersGBID)} className="m-2 btn-transparent btn-link btn-link-first" >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sFathersGBID}</h4></Button> : ''}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong> Mother's Name:</strong> {data.relations.sMothersName}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong> <span style={{fontSize: '1.55rem'}} >མའི་མིང་།</span>: &nbsp;</strong><span style={{fontSize: '1.55rem'}} >{data.greenBook.tbuMothersName}</span>

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  Number of Male Children:  </strong> {data.greenBook.nChildrenM}

                                    </Grid>



                                  </Grid>
                                </Grid>
                                <Grid item xs={6} >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <strong>   Mother's OLD GB:</strong>  {data.relations.sMothersID}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  Mother's GB:</strong>  {data.relations.sMothersGBID ? <Button className="m-2 btn-transparent btn-link btn-link-first" onClick={() => { props.openRelationGB(data.relations.sMothersGBID) }} >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sMothersGBID}</h4></Button> : ''}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>   Spouse Name:</strong>  {data.relations.sSpouseName}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>   <span style={{fontSize: '1.55rem'}} >བཟའ་ཟླའི་མིང་།</span>:&nbsp;</strong>  <span style={{fontSize: '1.55rem'}} > {data.greenBook.tbuSpouseName}</span>

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  Spouse Old GB:</strong>  {data.relations.sSpouseID}

                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  Spouse GB:</strong>  {data.relations.sSpouseGBID ? <Button onClick={() => { props.openRelationGB(data.relations.sSpouseGBID) }} className="m-2 btn-transparent btn-link btn-link-first" style={{ padding: '0px' }} >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sSpouseGBID}</h4></Button> : ''}



                                    </Grid>
                                    <Grid item xs={12}>
                                    <strong>  No of Female Children:  </strong>  {data.greenBook.nChildrenF}

                                    </Grid>

                                  </Grid>
                                </Grid>
                              </Grid>





                              {data.children.length != 0 &&
                                <Table className="table table-hover table-striped table-bordered">
                                  <thead className="thead-dark">
                                    <tr>
                                      <th scope="col">Name</th>
                                      <th > DOB </th>
                                      <th > Gender </th>
                                      <th > Old GB </th>
                                      <th > GB Number </th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.children.map((row, index) => (
                                      <tr>
                                        <td scope="row">{row.sName}</td>
                                        <td scope="row">{row.dtDOB ? Moment(row.dtDOB).format(sDateFormat) : ''}
                                        </td>
                                        <td scope="row">{row.sGender}</td>
                                        <td scope="row">{row.sChildID}</td>
                                        <td scope="row">

                                          {row.sGBIDChild ? <Button onClick={() => props.openRelationGB(row.sGBIDChild)} className="m-2 btn-transparent btn-link btn-link-first" ><span>{row.sGBIDChild}</span></Button> : ''}
                                        </td>



                                      </tr>


                                    ))}
                                  </tbody>
                                </Table>}
                            </div>

                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel4'}
                          onChange={handleAccordionChange('panel4')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography
                              className={props.classes.expansionHeading}
                            >Book Issued Details</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {data.booksIssued.length != 0 &&
                              <Table className="table table-hover table-striped table-bordered " >
                                <thead className="thead-dark" style={{ padding: 0 }}>
                                  <tr>
                                    <th scope="col">Issued Date</th>
                                    <th > Why Issued </th>
                                    <th > Where Issued </th>
                                    <th > Issue Application No </th>
                                    <th > Entered Date </th>

                                  </tr>
                                </thead>
                                <tbody style={{ padding: 0 }}>
                                  {data.booksIssued.map((row, index) => (
                                    <tr>
                                      <td scope="row">{row.issueBook.dtIssuedDate ? Moment(row.issueBook.dtIssuedDate).format(sDateFormat) : ''}</td>
                                      <td scope="row">{row.sMadebDisplayName}</td>
                                      <td scope="row">{row.sAuthRegion}</td>
                                      <td scope="row">{row.issueBook.sFormNumber}</td>
                                      <td scope="row">{row.issueBook.dtEntered ? Moment(row.issueBook.dtEntered).format(sDateFormat) : ''}</td>



                                    </tr>


                                  ))}
                                </tbody>
                              </Table>}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel5'}
                          onChange={handleAccordionChange('panel5')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography
                              className={props.classes.expansionHeading}
                            >History</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {data.auditLogs.length != 0 &&
                              <Table className="table table-hover table-striped table-bordered " >
                                <thead className="thead-dark" style={{ padding: 0 }}>
                                  <tr style={{borderColor: 'black'}} >
                                    <th scope="col">SR No.</th>
                                    <th > Name Of Field</th>
                                    <th > Change From </th>
                                    <th > Changed To </th>
                                    <th > Changed By </th>
                                    <th > Changed At </th>
                                    <th > Date &amp; Time </th>

                                  </tr>
                                </thead>
                                {
                                  
                                  <tbody style={{ padding: 0 }}>
                                     {
                                    data.auditLogs.map((row1, i) => (
                                        <>
                                        {/* <tr >
                                          <td colSpan={7} style={{textAlign: 'center'}} >
                                            {row1.auditLog.dtEntered ? Moment(row1.auditLog.dtEntered).format('DD-MM-YYYY HH:mm:ss') : ''}
                                          </td>
                                          </tr> */}
                                      
                                      
                                       {JSON.parse(row1.auditLog.sFieldValuesOld).map((row2, j) => (
                                      <tr style={{borderColor: 'black'}}>

                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center'}} scope='row' className={props.classes.mytable} >{++count}</td>{/* Uncomment above and Change i to j if grouping required*/}
                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center', color: 'black'}} >{row2.Field}</td>
                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center', color: 'black', fontSize: row2.PreviousValue?.charCodeAt(0) > 255 ? '1.5rem' : '1rem'  }}>{row2.PreviousValue}</td>
                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center', color: 'black', fontSize: row2.NewValue?.charCodeAt(0) > 255 ? '1.5rem' : '1rem' }}>{row2.NewValue}</td>
                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center', color: 'black' }}>{row1.sEnteredBy}</td>
                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center', color: 'black'}}>{row1.sOffice}</td>
                                        <td style={{ padding: '0px', borderColor: 'black', textAlign: 'center', color: 'black'}}>{row1.auditLog.dtEntered ? Moment(row1.auditLog.dtEntered).format('DD-MM-YYYY HH:mm:ss') : ''}</td>
                                      </tr>

                                       ))}
                                        
                                        </>
                                        ))     
                                       }
                                  </tbody>}
                              </Table>}

                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel6'}
                          onChange={handleAccordionChange('panel6')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography className={props.classes.expansionHeading}>Notes</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {data.gbNotes.length != 0 &&
                              <Table className="table table-hover table-striped table-bordered " >
                                <thead className="thead-dark" style={{ padding: 0 }}>
                                  <tr>
                                    <th scope="col">Notes</th>
                                    <th style={{ width: '15%' }} > Date</th>


                                  </tr>
                                </thead>

                                <tbody style={{ padding: 0 }}>
                                  {data.gbNotes.map((row, index) => (
                                    <tr>

                                      <td scope="row">{row.sNote}</td>
                                      <td scope="row">{row.dtEntered ? Moment(row.dtEntered).format(sDateFormat) : ''}</td>



                                    </tr>


                                  ))}
                                </tbody>
                              </Table>}

                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                      <Grid item xs={12}>
                        <ExpansionPanel
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === 'panel7'}
                          onChange={handleAccordionChange('panel7')}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon className={props.classes.expansionHeading} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={props.classes.expansionPanel}
                          >
                            <Typography className={props.classes.expansionHeading}>Photos & Documents</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                            {data.gbDocuments.length === 0 &&
                            
                              <Typography align="center" variant="h6" color="primary">
                                No Records Found
                              </Typography>
                            
                            }
                            </Grid>
                            <Grid item xs={12}>
                            {data.gbDocuments.length > 0 &&
                              
                                <Table className="table table-hover table-striped table-bordered " >
                                  <thead className="thead-dark" style={{ padding: 0 }}>
                                    <tr>
                                      <th scope="col">Sr No.</th>
                                      <th> Date </th>
                                      <th> Title </th>
                                      <th> Type </th>
                                      <th> Entered By </th>
                                      
                                      <th style={{ width: '5%' }}> Delete </th>
                                    </tr>
                                  </thead>

                                  <tbody style={{ padding: 0 }}>
                                    {data.gbDocuments.map((row, index) => (
                                      <tr>

                                        <td scope="row">{index + 1}</td>
                                        <td>{row.dtEntered ? Moment(row.dtEntered).format(sDateFormat) : ''}</td>
                                        
                                        <td> <a onClick={() => openBase64NewTab(row.binFileDoc,row.sTitle,row.sFileExtension,row.sDocType)} style={{cursor: "pointer"}} ><u> {row.sTitle}</u> </a></td>
                                        <td>{row.sDocType+" ( "+row.sFileExtension+" ) "}</td>
                                        <td>{row.sFullName}</td>
                                        
                                        <td scope="row">
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    handleDeleteDialogClickOpen(row);
                                  }}
                                  component="span"
                                  style={{ padding: "0px" }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                              </td>
                                        {/*  <td>
                                <Button onClick={()=>gbDocumentDelete(row)} className="btn-neutral-danger btn-icon btn-animated-icon btn-transition-none d-40 p-0 m-2">
                                    <span className="btn-wrapper--icon">
                                    <DeleteForeverIcon/>
                                    </span>
                                 </Button>  
                                </td>  */}
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              
                            }
                          </Grid>
                            <Grid item xs={12}>
                              <div>
                              <Button
                                color={sButtonColor}
                                variant={sButtonVariant}
                                size={sButtonSize}
                                onClick={() => {
                                  setaddDocumentModal(true);
                                }}
                              >
                                Add a Photo/Document
                            </Button>
                            </div>
                            </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                    </Grid>
                  </Grid>
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

        <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onEscapeKeyDown={handleDeleteDialogClose}
      >
        <DialogTitle id="alert-dialog-title">{"Delete "}{oDelete.sDocType === "Photo Identity" ? "Photo" : "Support Document"}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete this {oDelete.sDocType === "Photo Identity" ? "Photo" : "Support Document"}? (Document Name:{" "}{oDelete.sTitle})
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >
            No
          </Button>
          <Button
            onClick={handleDeleteDocumentRowClick}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
            
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />
      }
      {addDocumentModal && (
        <AddDocumentDialog
          lGBDocument={data.gbDocuments}
          addDocumentModal={addDocumentModal}
          sGBID={props.sGBID}
          classes={props.classes}
          handleAddDocumentClickClose={handleAddDocumentClickClose}
          addDocumentAPICall={addDocumentAPICall}
        />
      )}
      {dialogBackdrop && <BackdropDialogComponent
        backdrop={dialogBackdrop}
      />}
    </>
  );
}

