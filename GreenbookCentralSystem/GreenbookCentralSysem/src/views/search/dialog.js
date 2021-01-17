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
  const addDocumentAPICall = (documentObject) => {
    setdialogBackdrop(true);
    console.log("add document call",documentObject);
    axios
      .post(`/Greenbook/AddDocumentForSearch`, documentObject)
      .then((resp) => {
        if (resp.status === 200) {
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
    var type="";
    if (sDocType === "Photo Identity") {
      type="image/"+sFileExtension;
  }
  else {
    type="application/"+sFileExtension;
  }
    
    var blob = base64toBlob(binFileDoc,type);
 
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
    return new Blob(byteArrays, { type: type });
  }
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
                          Gender: {data.greenBook.sGender == 'M' ? 'Male' : 'Female'}
                        </Grid>
                        <Grid item sm={6}>
                          Father's Name: {data.relations.sFathersName}
                        </Grid>
                        <Grid item sm={6}>
                          DOB: {data.greenBook.dtDOB ? Moment(data.greenBook.dtDOB).format(sDateFormat) : ''}
                        </Grid>
                        <Grid item sm={6}>
                          Mother's Name: {data.relations.sMothersName}
                        </Grid>
                        <Grid item sm={6}>
                          Age: {data.nAge}
                        </Grid>
                        <Grid item sm={6}>
                          Family Name: {data.greenBook.sFamilyName}
                        </Grid>
                      </Grid>
                      <div className="divider my-4" />
                      <Grid container spacing={1} style={{ textAlign: 'left' }}>
                        <Grid item sm={6}>
                          Resident: {data.greenBook.sAddress2 ? data.greenBook.sAddress2 : '' + data.greenBook.sCity + ',' + data.sCountry}
                        </Grid>
                        <Grid item sm={6}>
                          Entered By: {data.sEnteredBy}
                        </Grid>
                        <Grid item sm={6}>
                          Edited On: {data.greenBook.dtUpdated ? Moment(data.greenBook.dtUpdated).format('DD-MM-YYYY h:m:s a') : ''}
                        </Grid>
                        <Grid item sm={6}>
                          Edited By: {data.sUpdatedBy}
                        </Grid>
                      </Grid>
                      <div className="divider my-4" />
                      {data.relations.sFathersGBID != null && data.relations.sMothersGBID != null && data.relations.sSpouseGBID != null &&
                        <div className="font-weight-bold text-uppercase text-black-50 text-center mb-3">
                          Family members
                                    </div>

                      }
                      <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">

                        {data.relations.sFathersGBID != null &&
                          <a disabled="disabled" style={{ cursor: 'pointer' }} onClick={() => props.openRelationGB(data.relations.sFathersGBID)} >
                            <Tooltip title={data.relations.sFathersGBID + ' (Father)'} classes={{ tooltip: "tooltip-danger" }} arrow>
                              <div className="avatar-icon-wrapper">
                                <div className="avatar-icon">
                                  {data.relations.sFathersPhoto != null &&
                                    <img alt="..." src={`data:image/gif;base64,${data.relations.sFathersPhoto}`} />}
                                  {data.relations.sFathersPhoto == null &&
                                    <img alt="..." className="img-fluid" style={{ width: '100px' }} src={stock} />}
                                </div>
                              </div>
                            </Tooltip>
                          </a>
                        }
                        {data.relations.sMothersGBID != null &&
                          <a disabled="disabled" style={{ cursor: 'pointer' }} onClick={() => props.openRelationGB(data.relations.sMothersGBID)} >
                            <Tooltip title={data.relations.sMothersGBID + ' (Mother)'} classes={{ tooltip: "tooltip-first" }} arrow>
                              <div className="avatar-icon-wrapper">

                                <div className="avatar-icon">
                                  {data.relations.sMothersPhoto != null &&
                                    <img alt="..." src={`data:image/gif;base64,${data.relations.sMothersPhoto}`} />}
                                  {data.relations.sMothersPhoto == null &&
                                    <img alt="..." className="img-fluid" style={{ width: '100px' }} src={stock} />}

                                </div>
                              </div>


                            </Tooltip>
                          </a>}
                        {data.relations.sSpouseGBID != null &&
                          <a disabled="disabled" style={{ cursor: 'pointer' }} onClick={() => props.openRelationGB(data.relations.sSpouseGBID)} >
                            <Tooltip title={data.relations.sSpouseGBID + ' (Spouse)'} classes={{ tooltip: "tooltip-first" }} arrow>
                              <div className="avatar-icon-wrapper">
                                <div className="avatar-icon">
                                  {data.relations.sSpousePhoto != null &&
                                    <img alt="..." src={`data:image/gif;base64,${data.relations.sSpousePhoto}`} />}
                                  {data.relations.sSpousePhoto == null &&
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
                                  Address 1: {data.greenBook.sAddress1}
                                </FormControl>
                              </Grid>
                              <Grid item sm={6}>
                                <FormControl className={props.classes.formControl}>
                                  Address 2: {data.greenBook.sAddress2}
                                </FormControl>
                              </Grid>
                              <Grid item sm={6}>
                                City: {data.greenBook.sCity}

                              </Grid>
                              <Grid item xs={6}>
                                State: {data.greenBook.sState}

                              </Grid>
                              <Grid item sm={6}>
                                Pin Code: {data.greenBook.sPCode}

                              </Grid>
                              <Grid item sm={6}>
                                Country:  {data.sCountry}

                              </Grid>
                              <Grid item sm={6}>
                                Fax Number: {data.greenBook.sFax}

                              </Grid>

                              <Grid item sm={6}>
                                Email: {data.greenBook.sEmail}

                              </Grid>
                              <Grid item sm={6}>
                                Phone Number: {data.greenBook.sPhone}
                              </Grid>
                              <Grid item sm={6}>
                                Form Date: {data.greenBook.dtFormDate ? Moment(data.greenBook.dtFormDate).format(sDateFormat) : ''}
                              </Grid>
                              <Grid item sm={6}>
                                Authority Region: {data.sAuthRegion}

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
                                  Place Of Birth: {data.greenBook.sBirthPlace}

                                </Grid>
                                <Grid item xs={12}>
                                  Origin Village: {data.greenBook.sOriginVillage}

                                </Grid>
                                <Grid item xs={12}>
                                  ཕ་ཡུལ།: {data.greenBook.tbuPlaceOfBirth}

                                </Grid>
                                <Grid item xs={12}>
                                  Old GB Number: {data.greenBook.sOldGreenBKNo}

                                </Grid>
                                <Grid item xs={12}>
                                  RC Number: {data.greenBook.sResidenceNumber}

                                </Grid>
                                <Grid item xs={12}>
                                  Other Documents: {data.greenBook.sOtherDocuments}

                                </Grid>
                                <Grid item xs={12}>
                                  Marital Status: {data.greenBook.sMarried}

                                </Grid>



                              </Grid>
                            </Grid>
                            <Grid item xs={6} >
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  Birth Country: {data.sBirthCountry}

                                </Grid>
                                <Grid item xs={12}>
                                  Province: {data.sProvince}

                                </Grid>
                                <Grid item xs={12}>
                                  First GB number: {data.greenBook.sFstGreenBkNo}

                                </Grid>
                                <Grid item xs={12}>
                                  Qualification: {data.sQualification}

                                </Grid>
                                <Grid item xs={12}>
                                  Deceased: {data.greenBook.dtDeceased ? Moment(data.greenBook.dtDeceased).format(sDateFormat) : 'Not Deceased'}

                                </Grid>
                                <Grid item xs={12}>
                                  Occupation: {data.sOccupationDesc}

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
                                      Father's Name: {data.relations.sFathersName}

                                    </Grid>
                                    <Grid item xs={12}>
                                      ཕ་མིང་། : {data.greenBook.tbuFathersName}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Father's Old GB: {data.relations.sFathersID}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Father's GB: {data.relations.sFathersGBID ? <Button onClick={() => props.openRelationGB(data.relations.sFathersGBID)} className="m-2 btn-transparent btn-link btn-link-second" >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sFathersGBID}</h4></Button> : ''}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Mother's Name: {data.relations.sMothersName}

                                    </Grid>
                                    <Grid item xs={12}>
                                      མའི་མིང་།: {data.greenBook.tbuMothersName}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Number of Male Children: {data.greenBook.nChildrenM}

                                    </Grid>



                                  </Grid>
                                </Grid>
                                <Grid item xs={6} >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                      Mother's OLD GB: {data.relations.sMothersID}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Mother's GB: {data.relations.sMothersGBID ? <Button className="m-2 btn-transparent btn-link btn-link-second" onClick={() => { props.openRelationGB(data.relations.sMothersGBID) }} >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sMothersGBID}</h4></Button> : ''}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Spouse Name: {data.relations.sSpouseName}

                                    </Grid>
                                    <Grid item xs={12}>
                                      ཟ་ཟླའི་མིང་།: {data.greenBook.tbuSpouseName}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Spouse Old GB: {data.relations.sSpouseID}

                                    </Grid>
                                    <Grid item xs={12}>
                                      Spouse GB: {data.relations.sSpouseGBID ? <Button onClick={() => { props.openRelationGB(data.relations.sSpouseGBID) }} className="m-2 btn-transparent btn-link btn-link-second" style={{ padding: '0px' }} >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sSpouseGBID}</h4></Button> : ''}



                                    </Grid>
                                    <Grid item xs={12}>
                                      No of Female Children: {data.greenBook.nChildrenF}

                                    </Grid>

                                  </Grid>
                                </Grid>
                              </Grid>





                              {data.children.length != 0 &&
                                <Table className="table table-hover table-striped table-bordered">
                                  <thead className="thead-light">
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

                                          {row.sGBIDChild ? <Button onClick={() => props.openRelationGB(row.sGBIDChild)} className="m-2 btn-transparent btn-link btn-link-second" ><span>{row.sGBIDChild}</span></Button> : ''}
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
                                <thead className="thead-light" style={{ padding: 0 }}>
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
                                <thead className="thead-light" style={{ padding: 0 }}>
                                  <tr>
                                    <th scope="col">SR No.</th>
                                    <th > Name Of Field</th>
                                    <th > Change From </th>
                                    <th > Changed To </th>
                                    <th > Changed By </th>
                                    <th > Changed At </th>
                                    

                                  </tr>
                                </thead>
                                {
                                  
                                  <tbody style={{ padding: 0 }}>
                                     {
                                    data.auditLogs.map((row1, i) => (
                                        <>
                                        <tr >
                                          <td colSpan={7} style={{textAlign: 'center'}} >
                                            {row1.auditLog.dtEntered ? Moment(row1.auditLog.dtEntered).format('DD-MM-YYYY HH:mm:ss') : ''}
                                          </td>
                                          </tr>
                                      
                                      
                                       {JSON.parse(row1.auditLog.sFieldValuesOld).map((row2, j) => (
                                      <tr>
                                        <td scope='row' className={props.classes.mytable} >{j+1}</td>  
                                        <td style={{ padding: '0px' }} >{row2.Field}</td>
                                        <td style={{ padding: '0px' }}>{row2.PreviousValue}</td>
                                        <td style={{ padding: '0px' }}>{row2.NewValue}</td>
                                        <td style={{ padding: '0px' }}>{row1.sEnteredBy}</td>
                                        <td style={{ padding: '0px' }}>{row1.sOffice}</td>
                                       {/*  <td style={{ padding: '0px' }}>{row1.auditLog.dtEntered ? Moment(row1.auditLog.dtEntered).format('DD-MM-YYYY HH:mm:ss') : ''}</td>*/}
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
                                <thead className="thead-light" style={{ padding: 0 }}>
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
                                  <thead className="thead-light" style={{ padding: 0 }}>
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

