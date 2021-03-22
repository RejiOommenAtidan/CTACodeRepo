import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField,  Paper, Typography} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import MaterialTable, {MTableToolbar} from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import { EmailDialog } from '../email';
import { ViewDialog } from '../../search/dialog';
import { Alerts } from '../../alerts';
import { AddDialog, EditDialog } from './dialog';
import { oOptions, oTableIcons, sDateFormat, sButtonSize, modifyHeaders, sISODateFormat, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from 'config/commonConfig';

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { BackdropComponent } from '../../backdrop/index';


const MyNewTitle = ({ text, variant }) => (
  <div>
  <Typography
    variant={variant}
    // style={{
    //   whiteSpace: "nowrap",
    //   overflow: "hidden",
    //   textOverflow: "ellipsis"
    // }}
  >
    {text}
  </Typography>
  </div>
);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    },
   
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
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25,
  },
  // button: {
  //   margin: theme.spacing(1),
  //   '&:disabled':{
  //     backgroundColor: 'yellow',
  //     cursor: 'not-allowed',
  //   }
  button: {
    
      backgroundColor: '#070910 !important',
      color: '#a7acba !important',
      //display: 'none'
      //visibility: 'hidden'
    
  },
  
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
  expansionHeading: {
    color: '#ffffff'
  },
  expansionPanel: {
    backgroundColor: '#4e5287'
  },
}));



export default () => {

  const classes = useStyles();
  
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  //const [loading, setisLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [emailModal, setEmailModal] = React.useState(false);

  //VAR
  const [id, setId] = React.useState('');
  const [nFormNumber, setFormNumber] = React.useState(null);
  const [sAuthRegion, setAuthRegion] = React.useState(null);
  const [authRegions, setAuthRegionsList] = React.useState([]);
  const [dtReceived, setReceivedDate] = React.useState(null);
  const [sName, setName] = React.useState(null);
  const [sGBIDForSearch, setGBIDForSearch] = React.useState(null);
  const [sFathersName, setFathersName] = React.useState(null);


  //const [nFormNumber, setFormNumber] = React.useState(0);
  //const [dtReceivedDate, setReceivedDate] = React.useState('');
  const [nAuthRegionID, setAuthoRegionID] = React.useState(0);
  //const [sName, setName] = React.useState('');
  const [sGBID, setGBID] = useState('');
  const [sFname, setFname] = React.useState('');
  const [nReceiptNo, setReceiptNo] = React.useState(0);
  const [nSaney, setSaney] = React.useState(0);
  const [nCurrentGBSNo, setCurrentGBSNo] = useState(0);
  const [nPreviousGBSNo, setPreviousGBSNo] = useState(0);
  const [dtIssueAction, setIssueActionDate] = React.useState('');
  const [dtRejectDate, setRejectDate] = useState('');
  const [nIssueAction, setIssueAction] = React.useState(0);
  const [dtReturnDate, setReturnDate] = React.useState('');
  const [briefGBObj, setBriefGBObj] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  const [result, setResult] = useState(false);
  const [emailInObj, setEmailInObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //View GB
  const [viewModal, setViewModal] = useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const handleViewClickClose = () => {
    setViewModal(false);
  };

  const viewGb = (GBID) => {
    setGBID(GBID);
    setViewModal(true);
  };
  const openRelationGB = (newsGBID) => {
    handleViewClickClose();
    setTimeout(() => viewGb(newsGBID), 0);
  };

  // SnackBar Alerts 

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
  const handleEmailClickClose = (shouldReload) => {
    setEmailModal(false);
    if(shouldReload){
      searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,  sFathersName, sGBIDForSearch);
    }
    
  };

  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  const columns = [
    {
      width: "5%",
      field: "madeb.id",
      title: "#",
      hidden: true,
      export: false,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
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
      title: "FORM NO",
       
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
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
        padding: '5px'
      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.madeb.dtFormattedReceived){
          return -1;
        }
        if(!b.madeb.dtFormattedReceived){
          return 1;
        }
        a = a ? a.madeb.dtFormattedReceived.split('-').reverse().join('') : '';
        b = b ? b.madeb.dtFormattedReceived.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    //  render: rowData => rowData['madeb']['dtReceived'] ? Moment(rowData['madeb']['dtReceived']).format(sDateFormat) : undefined
    },
    {
      width: "8%",
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
        padding: '5px'
      }
    },
    {
      width: "7%",
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
        padding: '5px'
      }
    },
    {
      width: "8%",
      field: "madeb.sGBID",
      render: rowData => rowData['madeb']['sGBID'] ? <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewGb(rowData['madeb']['sGBID']) }}><span>{rowData['madeb']['sGBID']}</span></Button> : '',
      title: "GB ID",
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
        padding: '5px'
      }
    },
    {
      width: "8%",
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
        padding: '5px'
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
        padding: '5px'
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
        textAlign: "right",
        padding: '5px'
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
        padding: '5px'
      }
    },
    // {
    //   field: "madeb.sApprovedReject",
    //   title: "Approved/Rejected",

    //   headerStyle: {
    //     padding: '0px',
    //     width: '10%',
    //     textAlign: 'left'
    //   },
    //    cellStyle: {
//	border: '1px solid black',
    //     padding: '0px',
    //     paddingLeft: '10px',
    //     width: '10%',
    //     textAlign: 'left'

    //   },

    // },
    {
      width: "8%",
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
        padding: '5px'
      }
    },
    {
      width: "8%",
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
        padding: '5px'
      }
    },
    {
      width: "9%",
      field: "madeb.dtFormattedIssueAction",
      title: "ISSUE ACTION DATE",
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
        padding: '5px'
      },
      customSort: (a, b) => {
        
        if(!a.madeb.dtFormattedIssueAction){
          return -1;
        }
        if(!b.madeb.dtFormattedIssueAction){
          return 1;
        }
        a = a ? a.madeb.dtFormattedIssueAction.split('-').reverse().join('') : '';
        b = b ? b.madeb.dtFormattedIssueAction.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
     // render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : undefined
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
        padding: '5px'
      },
      customSort: (a, b) => {
        //console.log(a, b);
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
    //  render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : undefined
    },
    {
      width: "8%",
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
        padding: '5px'
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
        padding: '5px'
      },
      
      customSort: (a, b) => {
        //console.log(a, b);
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
     // render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : ''
    },
    {
      width: "8%",
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
        padding: '5px'
      },
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
        padding: '5px'
      }
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
      title: "STATUS REMARK",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
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
      madebName: 'Brief GreenBook',
      nMadebTypeId:6
    });
    setEmailModal(true);
  };

  const editClick = (tableRowArray) => {
    setBriefGBObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sFathersName: tableRowArray['madeb']['sFathersName'],
      nReceiptNo: tableRowArray['madeb']['nReceiptNo'] > 0 ? tableRowArray['madeb']['nReceiptNo'] : null,
      nSaneyFormNo: tableRowArray['madeb']['nSaneyFormNo'] > 0 ? tableRowArray['madeb']['nSaneyFormNo'] : null,
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'] > 0 ? tableRowArray['madeb']['nCurrentGBSno'] : null,
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'] > 0 ? tableRowArray['madeb']['nPreviousGBSno'] : null,
      sApprovedReject: tableRowArray['madeb']['sApprovedReject'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtEmailSend: tableRowArray['madeb']['dtEmailSend'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });
    setEditModal(true);
  };

  const editAPICall = (madeb) => {
    console.log(madeb);
    madeb.dtReject = madeb.dtReject === "" ? null : madeb.dtReject;
    madeb.dtReceived = madeb.dtReceived === "" ? null : madeb.dtReceived;
    madeb.dtIssueAction = madeb.dtIssueAction === "" ? null : madeb.dtIssueAction;
    madeb.dtReturnEmail = madeb.dtReturnEmail === "" ? null : madeb.dtReturnEmail;

    setBackdrop(true);
    axios.post(`Madeb/EditMadeb/Id=` + madeb.id, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
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
          //     else {
          //       console.log("Response received:\n", resp);
          //     }
          //   })
          //   .catch(error => {
          //     setBackdrop(false);
          //     console.log(error.config);
          //     console.log(error.message);
          //   })
          //loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch );
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage(`Error editing record`);
        setAlertType('error');
        snackbarOpen();
      })

  };

  const selectDatafunction = () => {
    setBackdrop(true);
    axios.get(`Madeb/GetNewEmptyMadeb/?nMadebTypeId=6`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
          setBackdrop(false);
          setAuthRegionsList(resp.data.authRegions);
          // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage('Error fetching Data');
        setAlertType('error');
        snackbarOpen();
        console.log(error.config);
        console.log(error.message);
      })
  };

  const addAPICall = (madeb) => {
    console.log(madeb);
    setBackdrop(true);
    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          setAlertMessage('Created new record successfully.');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
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
          //     console.log(error.message);
          //     console.log(error.config);
          //   })
          // loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch );
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage(`Error adding record`);
        setAlertType('error');
        snackbarOpen();
        
      })
  };
  const tableRef = React.useRef();


  const loadData = () => {
    setBackdrop(true);
    let text = tableRef.current.dataManager.searchText;
    axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${text}&madebType=6`)
    .then(resp => {
      if (resp.status === 200) {
        resp.data.forEach((element) => {
          element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
        });
        setdataAPI(resp.data);
        setBackdrop(false);
        modifyHeaders();
        selectDatafunction();
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
      setBackdrop(false);
    });
  };

  useEffect(() => {
    loadData();
    //console.log(tableRef.current.props.components.Toolbar);
  }, []);

  // useEffect(() => {
  //   const bar = document.getElementById("searchbar").getElementsByTagName('input');
  //   if(bar){
  //     bar[0].focus();
  //   };
  // }, [dataAPI]);

  const searchFunction = (form, date, region, name, fname, sgbid) => {
    const searchObj = {
      nFormNumber: form ? form : null,
      dtReceived: date ? date : null,
      sAuthRegion: region ? region : null,
      sName: name ? name : null,
      sGBID: sgbid ? sgbid : null,
      sFathersName: fname ? fname : null
    }
    console.log("Search Object", searchObj);
    //setBackdrop(true);
    axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=6`, searchObj)
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
        <Grid container spacing={1} alignContent='flex-start' style={{paddingLeft: '20px', maxWidth: '70%'}} >


        

          <Grid item xs={1} lg={1} style={{paddingTop: '9px'}}>
            <TextField label={'Form No'} onChange={(e) => {
            if(e.target.value){
              setFormNumber(parseInt(e.target.value)); 
              searchFunction(parseInt(e.target.value), dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch);
            }
            if(e.target.value === ''){
              setFormNumber(null);
              searchFunction(null, dtReceived, sAuthRegion, sName, sFathersName,sGBIDForSearch);
            }
            
          }

          } />
          </Grid>

          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <Autocomplete
              openOnFocus
              clearOnEscape
              autoComplete={true}
              autoHighlight={true}
              onChange={
                (e, value) => {
                  if (value !== null) {
                    setAuthRegion(value.sAuthRegion);
                    searchFunction(nFormNumber, dtReceived, value.sAuthRegion, sName, sFathersName, sGBIDForSearch);
                  }
                  else {
                    setAuthRegion(null);
                    searchFunction(nFormNumber, dtReceived, null, sName,sFathersName,  sGBIDForSearch);
                  }
                }
              }
              //style={{ width: 180 }}
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

          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
              label={'Name'} 
              onChange={(e) => {
                if(e.target.value){
                  setName(e.target.value); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, e.target.value,sFathersName, sGBIDForSearch); 
                }
                if(e.target.value === ''){
                  setName(null); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, null,sFathersName, sGBIDForSearch); 
                }
                }} 
            />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
            label={"Father's Name"} 
            onChange={(e) => {
              if(e.target.value){
                setFathersName(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, e.target.value, sGBIDForSearch);
              }
              
              if(e.target.value === ''){
                setFathersName(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, null, sGBIDForSearch); 
              }
               }}
            />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
            label={"Greenbook ID"} 
            onChange={(e) => {
              if(e.target.value){
                setGBIDForSearch(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, e.target.value);
              }
              
              if(e.target.value === ''){
                setGBIDForSearch(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, null); 
              }
               }}
            />
          </Grid>
          <Grid item xs={2} lg={2} >
            
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
                        searchFunction(nFormNumber, Moment(date, true).format(sISODateFormat), sAuthRegion, sName, sFathersName, sGBIDForSearch);
                      }
                      if(date === null){
                        console.log("Empty Date", date);
                        setReceivedDate(null);
                        searchFunction(nFormNumber, null, sAuthRegion, sName, sFathersName, sGBIDForSearch);    
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
              boxShadow: 'none',
              fontSize:'1rem',
              color:'#000000',
              fontWeight:'bold' 
             }}
            //isLoading={loading}
            tableRef={tableRef}
            icons={oTableIcons}
            title="Brief Green Book Madeb"
            //title={<MyNewTitle variant='h6' text='Brief Green Book Madeb' />}
            
            columns={columns}
            data={dataAPI}
            options={{
              ...oOptions,
              //tableLayout: "fixed",
              exportFileName: 'BriefGB Madeb',
              search: false
            }}
            // components={{
            //   Toolbar: props => (<div id='searchbar'><MTableToolbar
            //               {...props}
            //               onSearchChanged={searchText => {
            //               console.log(searchText);
            //               axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${searchText}&madebType=6`)
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
            actions={
              [
                {
                  icon: oTableIcons.Add,
                  tooltip: 'Add Brief Green Book Madeb',
                  isFreeAction: true,
                  onClick: () => setAddModal(true)
                },
                {
                  icon: oTableIcons.Search,
                  tooltip: 'Toggle Filter',
                  isFreeAction: true,
                  onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
                }
              ]
            }
          />
          {viewModal && <ViewDialog
            viewModal={viewModal}
            classes={classes}
            handleViewClickClose={handleViewClickClose}
            sGBID={sGBID}
            openRelationGB={openRelationGB}
          />}
          {addModal && <AddDialog
            addModal={addModal}
            selectData={selectData}
            classes={classes}
            handleAddClickClose={handleAddClickClose}
            addAPICall={addAPICall}
          />}
          {editModal && <EditDialog
            editModal={editModal}
            selectData={selectData}
            classes={classes}
            handleEditClickClose={handleEditClickClose}
            editAPICall={editAPICall}
            briefGBObj={briefGBObj}
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

