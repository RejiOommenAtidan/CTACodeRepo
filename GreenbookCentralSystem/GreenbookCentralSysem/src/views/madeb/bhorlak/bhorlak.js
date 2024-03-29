import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button
} from '@material-ui/core';
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
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sButtonSize, sISODateFormat, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';
import { ViewDialog } from '../../search/dialog';
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
      main: red[500],
    },
    secondary: {
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

  const [id, setId] = React.useState('');

  const [nFormNumber, setFormNumber] = React.useState(null);
  const [sAuthRegion, setAuthRegion] = React.useState(null);
  const [authRegions, setAuthRegionsList] = React.useState([]);
  const [dtReceived, setReceivedDate] = React.useState(null);
  const [sName, setName] = React.useState(null);
  const [sGBIDForSearch, setGBIDForSearch] = React.useState(null);



  //const [formNumber, setFormNumber] = React.useState(0);
  const [authority, setAuthority] = React.useState(0);
  //const [receivedDate, setReceivedDate] = React.useState('');
  //const [name, setName] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [rejectDate, setRejectDate] = React.useState('');
  const [bhorlakObj, setBhorlakObj] = useState({});
  const [emailInObj, setEmailInObj] = useState({});
  //const [isLoading, setisLoading] = React.useState(true);
  const [gbId, setGbId] = React.useState('');
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  //View GB
  const [viewModal, setViewModal] = useState(false);
  const handleViewClickClose = () => {

    setViewModal(false);
  };

  const viewGb = (GBID) => {
    console.log(GBID)
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
  const [backdrop, setBackdrop] = React.useState(false);
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
     searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sGBIDForSearch);
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
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "5%",
      field: "madeb.nFormNumber",
      title: "FORM NO.",
      
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
        padding: '5px'
      }
    },
    {
      width: "12%",
      field: "madeb.sName",
      title: "FULLNAME",
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
      field: "madeb.sGBID",
      render: rowData => rowData['madeb']['sGBID'] ?
        <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewGb(rowData['madeb']['sGBID']) }}><span>{rowData['madeb']['sGBID']}</span></Button> : '',
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
      width: "10%",
      field: "madeb.sDocumentAttached",
      title: "DOCUMENT ATTACHED",
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
      }
    },
   
    {
      width: "8%",
      field: "madeb.dtFormattedIssueAction",
      title: "ISSUE ACTION DATE",
    //  render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : '',
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
      width: "9%",
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
      //render: rowData => Moment(rowData['madeb']['dtReturnEmail']).format('YYYY-MM-DD'),
    //  render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : '',
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
      width: "8%",
      field: "madeb.dtFormattedReject",
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
      width: "5%",
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
      width: "5%",
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
        textAlign: "left",
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
        textAlign: "left",
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
      madebName: 'Bhorlak',
      nMadebTypeId: 3,
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

    setBhorlakObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sName: tableRowArray['madeb']['sName'],
      nReceiptNo: tableRowArray['madeb']['nReceiptNo'],
      sDocumentAttached: tableRowArray['madeb']['sDocumentAttached'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtEmailSend: tableRowArray['madeb']['dtEmailSend'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });

    console.log(bhorlakObj);
    setEditModal(true);
  };

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
          setEditModal(false);
          setAlertMessage('Record Successfully Edited');
          setAlertType('success');
          snackbarOpen();
          
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=3`)
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
          //     setBackdrop(true);
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
        setAlertMessage('Error editing record ');
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
    axios.get(`Madeb/GetNewEmptyMadeb/?nMadebTypeId=3`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
          setBackdrop(false);
          setAuthRegionsList(resp.data.authRegions);
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

  const addAPICall = (madeb) => {
    setBackdrop(true);
    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          setAlertMessage('Record Successfully Added');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=3`)
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
          //window.location = window.location;
          //loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sGBIDForSearch);
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
    axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${text}&madebType=3`)
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
    axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=3`, searchObj)
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
            fullWidth
              label={'Full Name'} 
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
          <MaterialTable style={{ padding: '10px', width: '100%', boxShadow: 'none', fontSize:'1rem',color:'#000000',fontWeight:'bold'  }}
            //isLoading={isLoading}
            tableRef={tableRef}
            icons={oTableIcons}
            title="Bhorlak Madeb"
            columns={columns}
            data={dataAPI}
            options={{ 
              ...oOptions, 
              //tableLayout: "fixed",
              exportFileName: 'Bhorlak Madeb',
              search: false
             }}
            //  components={{
            //   Toolbar: props => (<div id='searchbar'><MTableToolbar
            //               {...props}
            //               onSearchChanged={searchText => {
            //               console.log(searchText);
            //               axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${searchText}&madebType=3`)
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
                tooltip: 'Add Bhorlak Madeb',
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
            bhorlakObj={bhorlakObj}
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