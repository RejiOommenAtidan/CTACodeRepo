import React, { useEffect, useState } from 'react';
import {Grid, TextField,  Paper, Typography,  Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import { AddDialog, EditDialog } from './dialog';
import { EmailDialog } from '../email';
import { Alerts } from '../../alerts';
import MaterialTable, {MTableToolbar} from 'material-table';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sISODateFormat, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';
import { ViewDialog } from '../../search/dialog';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { BackdropComponent } from '../../backdrop/index';

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
  expansionHeading: {
    color: '#ffffff'
  },
  expansionPanel: {
    backgroundColor: '#4e5287'
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
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25,
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    }
  },
  expansionHeading: {
    color: '#ffffff'
  },
  expansionPanel: {
    backgroundColor: '#4e5287'
  }
}));

export default function EnhancedTable() {
  Moment.locale('en');
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [emailModal, setEmailModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [id, setId] = React.useState('');
  //const [formNumber, setFormNumber] = React.useState(0);
  const [authority, setAuthority] = React.useState(0);
  //const [receivedDate, setReceivedDate] = React.useState('');
  //const [name, setName] = React.useState('');

  //search vars
  const [nFormNumber, setFormNumber] = React.useState(null);
  const [sAuthRegion, setAuthRegion] = React.useState(null);
  const [authRegions, setAuthRegionsList] = React.useState([]);
  const [dtReceived, setReceivedDate] = React.useState(null);
  const [sName, setName] = React.useState(null);
  const [sGBIDForSearch, setGBIDForSearch] = React.useState(null);
  const [sFathersName, setFathersName] = React.useState(null);
  const [sAlias, setAlias] = React.useState(null);

  //
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [rejectDate, setRejectDate] = React.useState('');
  const [abroadObj, setAbroadObj] = useState({});
  const [emailInObj, setEmailInObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  //const [isLoading, setisLoading] = React.useState(true);
  const [gbId, setGbId] = React.useState('');
  //View GB
  const [viewModal, setViewModal] = useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const handleViewClickClose = () => {
    setViewModal(false);
  };

  const viewGb = (GBID) => {
    setGbId(GBID);
    setViewModal(true);
  };
  const openRelationGB = (newsGBID) => {
    handleViewClickClose();
    setTimeout(() => viewGb(newsGBID), 0);
  };

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
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
  const handleEditClickOpen = () => {
    setEditModal(true);
  };
  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickOpen = () => {
    setAddModal(true);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  const handleEmailClickOpen = () => {
    setEmailModal(true);
  };
  const handleEmailClickClose = (shouldReload) => {
    setEmailModal(false);
    if(shouldReload){
      searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,  sFathersName, sGBIDForSearch, sAlias);
    }
    
  };

  const columns = [
    {
      field: "madeb.id",
      title: "#",
      hidden: true,
      export: false,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "6%",
      field: "madeb.nFormNumber",
      title: "FORM NO.",
       
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "8%",
      field: "madeb.dtFormattedReceived",
      title: "RECEIVED DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        //console.log(a, b);
        if(!a.madeb.dtFormattedReceived){
          return -1;
        }
        if(!b.madeb.dtFormattedReceived){
          return 1;
        }
        a = a.madeb.dtFormattedReceived.split('-').reverse().join('');
        b = b.madeb.dtFormattedReceived.split('-').reverse().join('');
        return a.localeCompare(b);
      },
      
    },
    {
      width: "9%",
      field: "sAuthRegion",
      title: "AUTHORITY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "10%",
      field: "madeb.sName",
      title: "NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "8%",
      field: "madeb.sAlias",
      title: "ALIAS",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "8%",
      field: "madeb.sGBID",
      render: rowData => 
      rowData['madeb']['sGBID'] ? 
      <Button className="btn-transparent btn-link btn-link-first" size={"small"} onClick={() => { viewGb(rowData['madeb']['sGBID']) }}><span>{rowData['madeb']['sGBID']}</span></Button> : '',
      title: "GB ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "10%",
      field: "madeb.sFathersName",
      title: "FATHER'S NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "6%",
      field: "madeb.nReceiptNo",
      title: "RECEIPT NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "6%",
      field: "madeb.nSaneyFormNo",
      title: "SANEY FORM NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "6%",
      field: "madeb.nCurrentGBSno",
      title: "CURRENT GB SR NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "center",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "6%",
      field: "madeb.nPreviousGBSno",
      title: "PREVIOUS GB SR NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },

    {
      width: "6%",
      field: 'Verified By',
      title: 'VERIFIED BY',
      sorting: false,
      export: true,
      filtering: false,
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "6%",
      field: 'Re-Verified By',
      title: 'RE-VERIFIED BY',
      sorting: false,
      export: true,
      filtering: false,
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      width: "6%",
      field: "sMadebStatus",
      title: "STATUS",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
 
    {
      width: "8%",
      field: "madeb.dtFormattedIssueAction",
      title: "ISSUE ACTION DATE",
      
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        if(!a.madeb.dtFormattedIssueAction){
          return -1;
        }
        if(!b.madeb.dtFormattedIssueAction){
          return 1;
        }
        a = a.madeb.dtFormattedIssueAction.split('-').reverse().join('');
        b = b.madeb.dtFormattedIssueAction.split('-').reverse().join('');
        return a.localeCompare(b);
      },
   
    },
    {
      width: "8%",
      field: "madeb.dtFormattedReject",
      title: "REJECT DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        if(!a.madeb.dtFormattedReject){
          return -1;
        }
        if(!b.madeb.dtFormattedReject){
          return 1;
        }
        a = a.madeb.dtFormattedReject.split('-').reverse().join('');
        b = b.madeb.dtFormattedReject.split('-').reverse().join('');
        return a.localeCompare(b);
      },
    },
    {
      width: "6%",
      field: "sTypeIssued",
      title: "ISSUE ACTION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
  
    {
      width: "8%",
      field: "madeb.dtFormattedReturnEmail",
      title: "RETURN DATE",
      //type: 'date',
      //dateSetting: {locale: 'en-IN'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        if(!a.madeb.dtFormattedReturnEmail){
          return -1;
        }
        if(!b.madeb.dtFormattedReturnEmail){
          return 1;
        }
        a = a.madeb.dtFormattedReturnEmail.split('-').reverse().join('');
        b = b.madeb.dtFormattedReturnEmail.split('-').reverse().join('');
        return a.localeCompare(b);
      },
      //render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : ''
    },

    {
      field: "madeb.dtFormattedEmailSend",
      title: "EMAIL SENT",
      width: "8%",
    // render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : '',
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      customSort: (a, b) => {
        //console.log(a, b);
        if(!a.madeb.dtFormattedEmailSend){
          return -1;
        }
        if(!b.madeb.dtFormattedEmailSend){
          return 1;
        }
        a = a.madeb.dtFormattedEmailSend.split('-').reverse().join('');
        b = b.madeb.dtFormattedEmailSend.split('-').reverse().join('');
        return a.localeCompare(b);
      },
    },

    {
      width: "6%",
      field: "email",
      title: "EMAIL",
      filtering: false,
      sorting: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { emailClick(rowData) }} style={{ padding: '0px' }}
      >
        <EmailIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "center",
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    {
      width: "6%",
      field: "edit",
      title: "EDIT",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <>
        <IconButton color="primary" aria-label="upload picture" component="span"
          onClick={() => { editClick(rowData) }}  style={{ padding: '0px' }}
        >
          <EditOutlinedIcon />
        </IconButton>
      </>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      width: "8%",
      field: "madeb.sMadebStatusRemark",
      title: "REMARK",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    }
  ];

  const emailClick = (tableRowArray) => {
    // setId(tableRowArray['madeb']['id']);
    // setFormNumber(tableRowArray['madeb']['nFormNumber']);
    // setName(tableRowArray['madeb']['sName']);

    setEmailInObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      sName: tableRowArray['madeb']['sName'],
      madebName: 'Abroad',
      nMadebTypeId:4
    });

    setEmailModal(true);
  };

  const editClick = (tableRowArray) => {
    setId(tableRowArray['madeb']['id']);
    // setFormNumber(tableRowArray['madeb']['nFormNumber']);
    // setAuthority(tableRowArray['sAuthRegion']);
    // setReceivedDate(tableRowArray['madeb']['dtReceived']);
    // setName(tableRowArray['madeb']['sName']);
    // setFname(tableRowArray['madeb']['sFathersName']);
    // setSaney(tableRowArray['madeb']['nSaneyFormNo']);
    // setDocument(tableRowArray['madeb']['sDocumentAttached']);
    // setIssueActionDate(tableRowArray['madeb']['dtIssueAction']);
    // setIssueAction(tableRowArray['madeb']['nIssuedOrNotID']);
    // setReturnDate(tableRowArray['madeb']['dtReturnEmail']);

    setAbroadObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sAlias: tableRowArray['madeb']['sAlias'],
      sGBID: tableRowArray['madeb']['sGBID'],
      nReceiptNo: tableRowArray['madeb']['nReceiptNo'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'],
      sFathersName: tableRowArray['madeb']['sFathersName'],
      nSaneyFormNo: tableRowArray['madeb']['nSaneyFormNo'],
      sDocumentAttached: tableRowArray['madeb']['sDocumentAttached'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtEmailSend: tableRowArray['madeb']['dtEmailSend'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });
    setEditModal(true);
  };

  const editAPICall = (madeb) => {
    // let CountryID = countryPK;
    // let countryToUpdate = {
    //   ID : countryPK,
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    setBackdrop(true);
    axios.post(`/Madeb/EditMadeb/ID=` + id, madeb/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          setAlertMessage('Record Successfully Edited');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=4`)
          //   .then(resp => {
          //     if (resp.status === 200) {
          //       resp.data.forEach((element) => {
          //         element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          //         element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          //         element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
          //       })
          //       setdataAPI(resp.data);
          //       selectDatafunction();
          //     }
          //   })
          //   .catch(error => {
          //     setBackdrop(false);
          //     if (error.response) {
          //       console.error(error.response.data);
          //       console.error(error.response.status);
          //       console.error(error.response.headers);
          //     } else if (error.request) {
          //       console.warn(error.request);
          //     } else {
          //       console.error('Error', error.message);
          //     }
          //     console.log(error.config);
          //   })
          //   .then(release => {
          //     //console.log(release); => udefined
          //   });
          //loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch, sAlias);
        }
      })
      .catch(error => {
        setAlertMessage('Error editing record');
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
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
  };

  const selectDatafunction = () => {
    setBackdrop(true);
    axios.get(`Madeb/GetNewEmptyMadeb/?nMadebTypeId=4`)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          setSelectData(resp.data);
          setAuthRegionsList(resp.data.authRegions);
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage('Error fetching Data');
        setAlertType('error');
        snackbarOpen();
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
  const addAPICall = (madeb) => {
    setBackdrop(true);
    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          setAlertMessage('Record Successfully Added');
          setAlertType('success');
          snackbarOpen();
          
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=4`)
          //   .then(resp => {
          //     if (resp.status === 200) {
          //       resp.data.forEach((element) => {
          //         element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          //         element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          //         element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
          //       })
          //       setdataAPI(resp.data);
          //       selectDatafunction();
          //     }
          //   })
          //   .catch(error => {
          //     setAlertMessage('Error! ' + error.message);
          //     setAlertType('error');
          //     snackbarOpen();
          //     setBackdrop(false);
          //     if (error.response) {
          //       console.error(error.response.data);
          //       console.error(error.response.status);
          //       console.error(error.response.headers);
          //     } else if (error.request) {
          //       console.warn(error.request);
          //     } else {
          //       console.error('Error', error.message);
          //     }
          //     console.log(error.config);
          //   })
          //   .then(release => {
          //     //console.log(release); => udefined
          //   });
          //loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch, sAlias);
          //window.location = window.location;
        }
      })
      .catch(error => {
        setAlertMessage('Error adding record ' + error.message);
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
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
  };

  const handleClose = () => {
    setDeleteModal(false);
  };
  const tableRef = React.useRef();
  const loadData = () => {
    setBackdrop(true);
    let text = tableRef.current.dataManager.searchText;
    axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${text}&madebType=4`)
    .then(resp => {
      if (resp.status === 200) {
        resp.data.forEach((element) => {
          element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
        })
        setdataAPI(resp.data);
        setBackdrop(false);
        modifyHeaders();
        selectDatafunction();
      }
    })
    .catch(error => {
      setBackdrop(false);
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
  };

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {
  //   const bar = document.getElementById("searchbar").getElementsByTagName('input');
  //   if(bar){
  //     bar[0].focus();
  //   };
  // }, [dataAPI]);

  const searchFunction = (form, date, region, name, fname, sgbid, alias) => {
    const searchObj = {
      nFormNumber: form ? form : null,
      dtReceived: date ? date : null,
      sAuthRegion: region ? region : null,
      sName: name ? name : null,
      sGBID: sgbid ? sgbid : null,
      sFathersName: fname ? fname : null,
      sAlias: alias ? alias : null
    }
    console.log("Search Object", searchObj);
    //setBackdrop(true);
    axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=4`, searchObj)
    .then(resp => {
      setBackdrop(false);
      if(resp.status === 200){
        console.log("Search result", resp.data);
        resp.data.forEach((element) => {
          element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
        });
        setdataAPI(resp.data);
      }
      if(resp.status === 204){
        console.log("Got 204, Empty result");
        setdataAPI([]);
        setAlertMessage("No Data Found...");
        setAlertType('info');
        snackbarOpen();
      }
    })
    .catch(error =>{
      setBackdrop(false);
      setAlertMessage("Error in searching...");
      setAlertType('error');
      snackbarOpen();
    });
  };

  return (
    <>
    <Paper style={{borderRadius: '10px'}}>
        <Grid container spacing={1} justify='"space-evenly"' style={{paddingLeft: '20px', maxWidth: '80%'}} >
          <Grid item xs style={{paddingTop: '9px'}}>
            <TextField label={'Form No'} onChange={(e) => {
            if(e.target.value){
              setFormNumber(parseInt(e.target.value)); 
              searchFunction(parseInt(e.target.value), dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch, sAlias);
            }
            if(e.target.value === ''){
              setFormNumber(null);
              searchFunction(null, dtReceived, sAuthRegion, sName, sFathersName,sGBIDForSearch, sAlias);
            }
            
          }

          } />
          </Grid>

          <Grid item xs style={{paddingTop: '9px'}}>
            <Autocomplete
              openOnFocus
              clearOnEscape
              autoComplete={true}
              autoHighlight={true}
              onChange={
                (e, value) => {
                  if (value !== null) {
                    setAuthRegion(value.sAuthRegion);
                    searchFunction(nFormNumber, dtReceived, value.sAuthRegion, sName, sFathersName, sGBIDForSearch, sAlias);
                  }
                  else {
                    setAuthRegion(null);
                    searchFunction(nFormNumber, dtReceived, null, sName,sFathersName,  sGBIDForSearch, sAlias);
                  }
                }
              }
              style={{ width: 200 }}
              //value={valueAuthRegion}
              id="id_nAuthorityId"
              options={authRegions}
              getOptionLabel={(option) => option.sAuthRegion}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{option.sAuthRegion}</span>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Authority Region"
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'off', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            {/* <TextField
              label={'Authority '}
              onChange={(e) => {
                setAuthRegion(e.target.value);
                searchFunction(nFormNumber, dtReceived, e.target.value, sName, sFathersName);
              }}
            /> */}
          </Grid>

          <Grid item xs style={{paddingTop: '9px'}}>
            <TextField 
              label={'Name'}
              onChange={(e) => {
                if(e.target.value){
                  setName(e.target.value); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, e.target.value,sFathersName, sGBIDForSearch, sAlias); 
                }
                if(e.target.value === ''){
                  setName(null); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, null,sFathersName, sGBIDForSearch, sAlias); 
                }
                }} 
            />
          </Grid>
          <Grid item xs style={{paddingTop: '9px'}}>
            <TextField 
              label={'Alias Name'} 
              onChange={(e) => {
                if(e.target.value){
                  setAlias(e.target.value); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, sGBIDForSearch, e.target.value); 
                }
                if(e.target.value === ''){
                  setAlias(null); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, sGBIDForSearch, null); 
                }
                }} 
            />
          </Grid>
          <Grid item xs style={{paddingTop: '9px'}}>
            <TextField 
            label={"Father's Name"} 
            onChange={(e) => {
              if(e.target.value){
                setFathersName(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, e.target.value, sGBIDForSearch, sAlias);
              }
              
              if(e.target.value === ''){
                setFathersName(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, null, sGBIDForSearch, sAlias); 
              }
               }}
            />
          </Grid>
          <Grid item xs style={{paddingTop: '9px'}}>
            <TextField 
            label={"GreenBook ID"} 
            onChange={(e) => {
              if(e.target.value){
                setGBIDForSearch(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, e.target.value, sAlias);
              }
              
              if(e.target.value === ''){
                setGBIDForSearch(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, null, sAlias); 
              }
               }}
            />
          </Grid>
          <Grid item xs >
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    placeholder="DD-MM-YYYY"
                    variant="dialog"
                    margin="dense"
                    id="dtReceived"
                    name="dtReceived"
                    autoOk
                    label='Received Date'
                    format={sDateFormatMUIDatepicker}
                    returnMoment={true}
                    onChange={(date) => {
                      console.log("Date object", date);
                      if (Moment(date, true).isValid()) {
                        console.log("Valid Date", date);
                        setReceivedDate(Moment(date, true).format(sISODateFormat));
                        searchFunction(nFormNumber, Moment(date, true).format(sISODateFormat), sAuthRegion, sName, sFathersName, sGBIDForSearch, sAlias);
                      }
                      if(date === null){
                        console.log("Empty Date", date);
                        setReceivedDate(null);
                        searchFunction(nFormNumber, null, sAuthRegion, sName, sFathersName, sGBIDForSearch, sAlias);    
                      }
                      // if (date) {
                      //   setStartDate(date);
                      //   setValue('startDate', date, { shouldValidate: true });
                      // };
                    }}
                    value={dtReceived}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    
                    // fullWidth
                    //className={classes.dateField}
                    // inputRef={register({
                    //   required: true,
                    //   pattern:
                    //   {
                    //     value: new RegExp(sDDMMYYYYRegex),
                    //     message: "Invalid Date"
                    //   }
                    // })}
                  />
                </MuiPickersUtilsProvider>
              
              
              {/* <TextField
                label={'Received Date'}
                onChange={(e) => {
                  if (Moment(e.target.value, 'DD-MM-YYYY', true).isValid()) {
                    console.log("Valid Date", e.target.value);
                    setReceivedDate(Moment(e.target.value, 'DD-MM-YYYY', true).format(sISODateFormat));
                    searchFunction(nFormNumber, Moment(e.target.value, 'DD-MM-YYYY', true).format(sISODateFormat), sAuthRegion, sName, sFathersName);
                  }
                  if (e.target.value === '') {
                    searchFunction(nFormNumber, null, sAuthRegion, sName, sFathersName);
                  }
  
                }}
              /> */}
            </Grid>
        </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable 
            style={{ 
              padding: '10px', 
              width: '100%', 
              // border: '2px solid grey', 
              // borderRadius: '10px',
              boxShadow: 'none',
              fontSize:'1rem',
              color:'#000000',
              fontWeight:'bold'  
            }}
            //isLoading={isLoading}
            tableRef={tableRef}
            icons={oTableIcons}
            title="Abroad Madeb"
            columns={columns}
            data={dataAPI}
            options={{
              ...oOptions,
              //tableLayout: "fixed",
              exportFileName: 'Abroad Madeb',
              search: false
            }}
            // components={{
            //   Toolbar: props => (<div id='searchbar'><MTableToolbar
            //               {...props}
            //               onSearchChanged={searchText => {
            //               console.log(searchText);
            //               axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${searchText}&madebType=4`)
            //               .then(resp => {
            //                 setBackdrop(false);
            //                 if(resp.status === 200){
            //                   console.log("Search result", resp.data);
            //                   resp.data.forEach((element) => {
            //                     element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
            //                   });
            //                   setdataAPI(resp.data);
            //                 }
            //                 if(resp.status === 204){
            //                   console.log("Got 204, Empty result");
            //                   setdataAPI([]);
            //                 }
            //               })
            //               .catch(error =>{
            //                 setBackdrop(false);
            //                 setAlertMessage("Error in searching...");
            //                 setAlertType('error');
            //                 snackbarOpen();
            //               });
            //               //commonSearch(searchText);
            //               //props.onSearchChanged(searchText);
            //               }}
            //           /></div>)
            // }}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Abroad Madeb',
                isFreeAction: true,
                onClick: () => setAddModal(true)
              },
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
          {viewModal && <ViewDialog
            viewModal={viewModal}
            classes={classes}
            handleViewClickClose={handleViewClickClose}
            sGBID={gbId}
            openRelationGB={openRelationGB}
          />}
          {addModal && <AddDialog
            addModal={addModal}
            classes={classes}
            selectData={selectData}
            handleAddClickClose={handleAddClickClose}
            addAPICall={addAPICall}
          />}
          {editModal && <EditDialog
            editModal={editModal}
            abroadObj={abroadObj}
            selectData={selectData}
            classes={classes}
            handleEditClickClose={handleEditClickClose}
            editAPICall={editAPICall}
          />}
          {emailModal && <EmailDialog
            emailModal={emailModal}
            emailInObj={emailInObj}
            //selectData={selectData}
            classes={classes}
            handleEmailClickClose={handleEmailClickClose}
          //emailAPICall={emailAPICall}
          />}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />}
          {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
        </Grid>
      </Grid>
      </Paper>
    </>
  );
}