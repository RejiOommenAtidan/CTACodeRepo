import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

// Local import
import { AddDialog, EditDialog } from './dialog';
import { EmailDialog } from '../email';
import { Alerts } from '../../alerts';
import { ViewDialog } from '../../search/dialog';
import MaterialTable, {MTableToolbar} from 'material-table';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sISODateFormat, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';
import { BackdropComponent } from '../../backdrop/index';

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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

export default function EnhancedTable() {
  Moment.locale('en');
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [emailModal, setEmailModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  //const [isLoading, setisLoading] = React.useState(true);
  //VAR
  const [id, setId] = React.useState('');
  const [nFormNumber, setFormNumber] = React.useState(null);
  const [sAuthRegion, setAuthRegion] = React.useState(null);
  const [authRegions, setAuthRegionsList] = React.useState([]);
  const [dtReceived, setReceivedDate] = React.useState(null);
  const [sName, setName] = React.useState(null);
  const [sGBIDForSearch, setGBIDForSearch] = React.useState(null);

  const [gbId, setGbId] = React.useState(null);
  const [receiptNo, setReceiptNo] = React.useState(0);
  const [changeField, setChangeField] = React.useState('');
  const [status, setStatus] = React.useState('');

  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [rejectDate, setRejectDate] = React.useState('');
  const [norchoeObj, setNorchoeObj] = useState({});
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
    console.log(GBID)
    setGbId(GBID);
    setViewModal(true);
  }
  const openRelationGB = (newsGBID) => {
    handleViewClickClose();
    setTimeout(() => viewGb(newsGBID), 0);
  }
  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    console.log('alert');
    setSnackbar(true);
  }
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
      //loadData();
      searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sGBIDForSearch);
    }
    
  };

  const columns = [
    {
      align: 'center',
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
      field: "madeb.nFormNumber",
      title: "FORM NO.",
      
      width: "6%",
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
      field: "madeb.dtFormattedReceived",
      title: "RECEIVED DATE",
      width: "8%",
     // render: rowData => Moment(rowData['madeb']['dtReceived']).format(sDateFormat),
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
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY",
      width: "6%",
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
      field: "madeb.sName",
      width: "10%",
      title: "FULLNAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        paddingLeft:"10px"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "madeb.sGBID",
      render: rowData => rowData['madeb']['sGBID'] ? <Button size={"small"} className="m-2 btn-transparent btn-link btn-link-first" onClick={() => { viewGb(rowData['madeb']['sGBID']) }}><span>{rowData['madeb']['sGBID']}</span></Button> : '',
      title: "GB ID",
      width: "6%",
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
      field: "madeb.sChangeField",
      title: "CHANGE FIELD",
      hidden: false,
      width: "8%",
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
      field: "madeb.sDocumentAttached",
      title: "DOCUMENT ATTACHED",
      width: "8%",
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
      field: "madeb.nReceiptNo",
      title: "RECEIPT NO.",
      width: "8%",
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
      },
    },
    {
      width: "8%",
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
      },
    },
    {
      field: "sMadebStatus",
      width: "8%",
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
      }
    },
   
    {
      field: "madeb.dtFormattedIssueAction",
      width: "8%",
      title: "ISSUE ACTION DATE",
     // render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : '',
      // render: rowData => Moment(rowData['madeb']['dtIssueAction']).format('YYYY-MM-DD'),
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
    },
    {
      field: "sTypeIssued",
      title: "ISSUE ACTION",
      width: "8%",
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
      field: "madeb.dtFormattedReturnEmail",
      title: "RETURN DATE",
      width: "8%",
      //render: rowData => Moment(rowData['madeb']['dtReturnEmail']).format('YYYY-MM-DD'),
     // render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : '',
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
    },
    {
      field: "madeb.dtFormattedReject",
      width: "8%",
      title: "REJECT DATE",
    //  render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : '',
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
      field: "email",
      title: "EMAIL",
      width: "3%",
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
      field: "edit",
      title: "EDIT",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }}  style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      width: "3%",
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
      field: "madeb.sMadebStatusRemark",
      width: "8%",
      title: "REMARK",
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
      field: 'Verified By',
      title: 'VERIFIED BY',
      sort: false,
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
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      field: 'Re-Verified By',
      title: 'RE-VERIFIED BY',
      sort: false,
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
        textAlign: "center",
        padding: '5px'
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
      madebName: 'Norchoe',
      nMadebTypeId: 2
    });

    setEmailModal(true);
  }
  const editClick = (tableRowArray) => {
    setId(tableRowArray['madeb']['id']);
    // setFormNumber(tableRowArray['madeb']['nFormNumber']);
    // setAuthority(tableRowArray['sAuthRegion']);
    // setReceivedDate(tableRowArray['madeb']['dtReceived']);
    // setName(tableRowArray['madeb']['sName']);
    // setGbId(tableRowArray['madeb']['sGBID']);
    // setReceiptNo(tableRowArray['madeb']['nReceiptNo']);
    // setChangeField(tableRowArray['madeb']['sChangeField']);
    // setStatus(tableRowArray['madeb']['sApprovedReject'])
    // setDocument(tableRowArray['madeb']['sDocumentAttached']);
    // setIssueActionDate(tableRowArray['madeb']['dtIssueAction']);
    // setIssueAction(tableRowArray['madeb']['nIssuedOrNotID']);
    // setReturnDate(tableRowArray['madeb']['dtReturnEmail']);
    // setRejectDate(tableRowArray['madeb']['dtReject']);
    setNorchoeObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sChangeField: tableRowArray['madeb']['sChangeField'],
      nReceiptNo: tableRowArray['madeb']['nReceiptNo'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sDocumentAttached: tableRowArray['madeb']['sDocumentAttached'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtEmailSend: tableRowArray['madeb']['dtEmailSend'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });

    console.log(norchoeObj);
    setEditModal(true);
  }
  const editAPICall = (madeb) => {
    // let CountryID = countryPK;
    // let countryToUpdate = {
    //   ID : countryPK,
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    console.log(madeb);
    setBackdrop(true);
    axios.post(`/Madeb/EditMadeb/ID=` + id, madeb/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          setAlertMessage('Record Successfully Edited');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=2`)
          //   .then(resp => {
          //     if (resp.status === 200) {
          //       resp.data.forEach((element) => {
          //         element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          //         element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          //         element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
          //       });
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
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sGBIDForSearch);
          //window.location = window.location;
          // setdataAPI(dataAPI.map((data) => {
          //   console.log(data);
          //   if(data.id === countryObj.id){
          //     console.log(data);
          //     return {
          //       ...data,
          //       ...countryObj
          //     };
          //   }
          //   else{
          //     console.log(data)
          //     return data;
          //   }
          // }))
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
    axios.get(`Madeb/GetNewEmptyMadeb/?nMadebTypeId=2`)
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
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=2`)
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
          //     setAlertMessage('Error! ' + error.message);
          //     setAlertType('error');
          //     snackbarOpen();
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
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sGBIDForSearch);

        }
      })
      .catch(error => {
        setAlertMessage('Error adding record');
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
    
    console.log("Table reference", tableRef.current);
    console.log("Search Text", tableRef.current.dataManager.searchText);
    let text = tableRef.current.dataManager.searchText;
    axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${text}&madebType=2`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
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
        setAlertMessage('Error in loading Data');
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

  useEffect(() => {
    loadData();
    
  }, []);

  // useEffect(() => {
  //   const bar = document.getElementById("searchbar").getElementsByTagName('input');
  //   if(bar){
  //     bar[0].focus();
  //   };
  // }, [dataAPI]);

  const searchFunction = (form, date, region, name, sgbid) => {
    const searchObj = {
      nFormNumber: form ? form : null,
      dtReceived: date ? date : null,
      sAuthRegion: region ? region : null,
      sName: name ? name : null,
      sGBID: sgbid ? sgbid : null
    }
    console.log("Search Object", searchObj);
    //setBackdrop(true);
    axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=2`, searchObj)
    .then(resp => {
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
        modifyHeaders();
        selectDatafunction();
        setBackdrop(false);
      }
      if(resp.status === 204){
        setBackdrop(false);
        console.log("Got 204, Empty result");
        setdataAPI([]);
        setAlertMessage("No Data Found...");
        setAlertType('info');
        snackbarOpen();
      }
    })
    .catch(error =>{
      setBackdrop(false);
      // setAlertMessage("Error in searching...");
      // setAlertType('error');
      // snackbarOpen();
    });
  };

  return (
    <>
    <Paper>
        <Grid container spacing={1} alignContent='flex-start' /*style={{paddingLeft: '20px', maxWidth: '70%'}}*/ >


        
        <Grid item xs={1} lg={1}>
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField label={'Form No'} 
            fullWidth
            onChange={(e) => {
            if(e.target.value){
              setFormNumber(parseInt(e.target.value)); 
              searchFunction(parseInt(e.target.value), dtReceived, sAuthRegion, sName, sGBIDForSearch);
            }
            if(e.target.value === ''){
              setFormNumber(null);
              searchFunction(null, dtReceived, sAuthRegion, sName, sGBIDForSearch);
            }
            
          }

          } />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
              label={'Full Name'} 
              fullWidth
              onChange={(e) => {
                if(e.target.value){
                  setName(e.target.value); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, e.target.value, sGBIDForSearch); 
                }
                if(e.target.value === ''){
                  setName(null); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, null, sGBIDForSearch); 
                }
                }} 
            />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <Autocomplete
              openOnFocus
              fullWidth
              clearOnEscape
              autoComplete={true}
              autoHighlight={true}
              onChange={
                (e, value) => {
                  if (value !== null) {
                    setAuthRegion(value.sAuthRegion);
                    searchFunction(nFormNumber, dtReceived, value.sAuthRegion, sName, sGBIDForSearch);
                  }
                  else {
                    setAuthRegion(null);
                    searchFunction(nFormNumber, dtReceived, null, sName, sGBIDForSearch);
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
            fullWidth
            label={"Green Book ID"} 
            onChange={(e) => {
              if(e.target.value){
                setGBIDForSearch(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, e.target.value);
              }
              
              if(e.target.value === ''){
                setGBIDForSearch(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, null); 
              }
               }}
            />
          </Grid>
          <Grid item xs={2} lg={2} >
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    placeholder="DD-MM-YYYY"
                    variant="dialog"
                    fullWidth
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
                        searchFunction(nFormNumber, Moment(date, true).format(sISODateFormat), sAuthRegion, sName, sGBIDForSearch);
                      }
                      if(date === null){
                        console.log("Empty Date", date);
                        setReceivedDate(null);
                        searchFunction(nFormNumber, null, sAuthRegion, sName, sGBIDForSearch);    
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
            <Grid item xs={1} lg={1}>
          </Grid>
        </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable style={{ padding: '10px', width: '100%', boxShadow: 'none', fontSize:'1rem',color:'#000000',fontWeight:'bold' }}
            //isLoading={isLoading}
            tableRef={tableRef}
            icons={oTableIcons}
            title="Norchoe Madeb"
            columns={columns}
            data={dataAPI}
           // options={{...oOptions,tableLayout:"fixed"}}
           options={{
             ...oOptions,
             exportFileName: 'Norchoe Madeb',
             search: false
          }}
          // components={{
          //   Toolbar: props => (<div id='searchbar'><MTableToolbar
          //               {...props}
          //               onSearchChanged={searchText => {
          //               console.log(searchText);
          //               axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${searchText}&madebType=2`)
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
                tooltip: 'Add Norchoe Madeb',
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
            norchoeObj={norchoeObj}
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