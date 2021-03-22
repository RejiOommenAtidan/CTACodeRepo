import React, { useEffect, useState } from 'react'; import {
  Grid,
  Paper,
  TextField,
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
import MaterialTable, { MTableToolbar } from 'material-table';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sISODateFormat, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { el } from 'date-fns/locale';

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

  const [id, setId] = React.useState('');
  const [nFormNumber, setFormNumber] = React.useState(null);
  const [sAuthRegion, setAuthRegion] = React.useState(null);
  const [authRegions, setAuthRegionsList] = React.useState([]);
  const [dtReceived, setReceivedDate] = React.useState(null);
  const [sName, setName] = React.useState(null);
  const [sFathersName, setFathersName] = React.useState(null);
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [rejectDate, setRejectDate] = React.useState('');
  const [sarsoObj, setSarsoObj] = useState({});
  const [emailInObj, setEmailInObj] = useState({});
  //const [isLoading, setisLoading] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState(false);

  

  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
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
    if (shouldReload) {
      //loadData();
      searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName);
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
        "&:hover": {
          color: "blue"
        },

      },
      cellStyle: {
        border: '1px solid black',
        textAlign: "right",
        padding: '5px'

      }
    },
    {
      field: "madeb.nFormNumber",
      title: "FORM NO",
      width: "7%",

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
      field: "madeb.dtFormattedReceived",
      title: "RECEIVED DATE",
      width: "8%",
      // render: rowData => Moment(rowData['madeb']['dtReceived']).format(sDateFormat),
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",

      },
      cellStyle: {
        border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      customSort: (a, b) => {
        //console(a, b);
        if (!a.madeb.dtFormattedReceived) {
          return -1;
        }
        if (!b.madeb.dtFormattedReceived) {
          return 1;
        }
        a = a ? a.madeb.dtFormattedReceived.split('-').reverse().join('') : '';
        b = b ? b.madeb.dtFormattedReceived.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "sAuthRegion",
      width: "6%",
      title: "AUTHORITY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",

      },
      cellStyle: {
        border: '1px solid black',
        textAlign: "left",
        padding: '5px'

      }
    },
    {
      field: "madeb.sName",
      title: "FULL NAME",
      width: "30%",
      headerStyle: {
        textAlign: "left",
        textAlignLast: "center",
        verticalAlign: "middle",

      },
      cellStyle: {
        border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      }
    },

    {
      field: "madeb.sFathersName",
      title: "FATHER'S NAME",
      width: "30%",
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
      field: "madeb.nSaneyFormNo",
      title: "SANEY FORM NO",
      width: "5%",
      hidden: false,
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
      field: "madeb.sDocumentAttached",
      title: "DOCUMENT ATTACHED",
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
      width: "8%",
      field: "madeb.nCurrentGBSno",
      title: "BOOK SERIAL NO.",
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
      field: "madeb.sGBID",
      title: "GB ID",
      width: "8%",
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
      field: "madeb.dtFormattedIssueAction",

      width: "8%",
      title: "ISSUE ACTION DATE",
      //   render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : '',
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

        if (!a.madeb.dtFormattedIssueAction) {
          return -1;
        }
        if (!b.madeb.dtFormattedIssueAction) {
          return 1;
        }
        a = a ? a.madeb.dtFormattedIssueAction.split('-').reverse().join('') : '';
        b = b ? b.madeb.dtFormattedIssueAction.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "sTypeIssued",
      width: "8%",
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
      field: "madeb.dtFormattedReturnEmail",
      width: "8%",
      title: "RETURN DATE",
      //render: rowData => Moment(rowData['madeb']['dtReturnEmail']).format('YYYY-MM-DD'),
      //   render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : '',
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
        if (!a.madeb.dtFormattedReturnEmail) {
          return -1;
        }
        if (!b.madeb.dtFormattedReturnEmail) {
          return 1;
        }
        a = a.madeb.dtFormattedReturnEmail.split('-').reverse().join('');
        b = b.madeb.dtFormattedReturnEmail.split('-').reverse().join('');
        return a.localeCompare(b);
      },
    },
    {
      field: "madeb.dtFormattedReject",
      title: "REJECT DATE",
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
        if (!a.madeb.dtFormattedReject) {
          return -1;
        }
        if (!b.madeb.dtFormattedReject) {
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
        if (!a.madeb.dtFormattedEmailSend) {
          return -1;
        }
        if (!b.madeb.dtFormattedEmailSend) {
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
      width: "3%",
      title: "EDIT",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <><IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
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
      title: 'Verified By',
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
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      field: 'Re-Verified By',
      title: 'Re-Verified By',
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
      madebName: 'Sarso',
      nMadebTypeId: 1
    });

    setEmailModal(true);
  }
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
    // setRejectDate(tableRowArray['madeb']['dtReject']);

    setSarsoObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sFathersName: tableRowArray['madeb']['sFathersName'],
      nSaneyFormNo: tableRowArray['madeb']['nSaneyFormNo'],
      sDocumentAttached: tableRowArray['madeb']['sDocumentAttached'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtEmailSend: tableRowArray['madeb']['dtEmailSend'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });

    console.log(sarsoObj);
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
          //alert("Edited record");
          setEditModal(false);
          setAlertMessage('Record Successfully Edited');
          setAlertType('success');
          snackbarOpen();


          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=1`)
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
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName);
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
    axios.get(`Madeb/GetNewEmptyMadeb/?nMadebTypeId=1`)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          setSelectData(resp.data);
          setAuthRegionsList(resp.data.authRegions);
          console.log("SelectData:", resp.data);
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



          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=1`)
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
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName);
          //window.location = window.location;
        }
      })
      .catch(error => {
        setAlertMessage('Error adding record ');
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
    axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${text}&madebType=1`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          // myApiData = resp.data;
          // myApiData = myApiData.map(singleMadeb=>{
          //   ...singleMadeb,
          //   singleMaded.dtReceived
          // });

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
    //searchFunction(null, null, null, null, null);
  }, []);

  // useEffect(() => {
  //   const bar = document.getElementById("searchbar").getElementsByTagName('input');
  //   if(bar){
  //     bar[0].focus();
  //   };
  // }, [dataAPI]);



  const searchFunction = (form, date, region, name, fName) => {
    const searchObj = {
      nFormNumber: form ? form : null,
      dtReceived: date ? date : null,
      sAuthRegion: region ? region : null,
      sName: name ? name : null,
      sFathersName: fName ? fName : null
    }
    console.log("Search Object", searchObj);
    //setBackdrop(true);
    axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=1`, searchObj)
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
      <Paper>
        <Grid container spacing={1} alignContent='flex-start' style={{paddingLeft: '20px', maxWidth: '70%'}} >


        

          <Grid item xs={1} lg={1} style={{paddingTop: '9px'}}>
            <TextField label={'Form No'} onChange={(e) => {
            if(e.target.value){
              setFormNumber(parseInt(e.target.value)); 
              searchFunction(parseInt(e.target.value), dtReceived, sAuthRegion, sName, sFathersName);
            }
            if(e.target.value === ''){
              setFormNumber(null);
              searchFunction(null, dtReceived, sAuthRegion, sName, sFathersName);
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
                    searchFunction(nFormNumber, dtReceived, value.sAuthRegion, sName, sFathersName);
                  }
                  else {
                    setAuthRegion(null);
                    searchFunction(nFormNumber, dtReceived, null, sName, sFathersName);
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
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, e.target.value, sFathersName); 
                }
                if(e.target.value === ''){
                  setName(null); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, null, sFathersName); 
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
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, e.target.value);
              }
              
              if(e.target.value === ''){
                setFathersName(null); 
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
                        searchFunction(nFormNumber, Moment(date, true).format(sISODateFormat), sAuthRegion, sName, sFathersName);
                      }
                      if(date === null){
                        console.log("Empty Date", date);
                        setReceivedDate(null);
                        searchFunction(nFormNumber, null, sAuthRegion, sName, sFathersName);    
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
            <MaterialTable style={{ padding: '10px', width: '100%', border: '0px', boxShadow: 'none', fontSize: '1rem', color: '#000000', fontWeight: 'bold' }}
              //isLoading={isLoading}
              tableRef={tableRef}
              icons={oTableIcons}
              title='Sarso Madeb'
              columns={columns}
              data={dataAPI}
              options={{
                ...oOptions,
                exportFileName: 'Sarso Madeb',
                search: false
              }}
              // components={{
              //   Toolbar: props => (<div id='searchbar'><MTableToolbar
              //               {...props}
              //               onSearchChanged={searchText => {
              //               console.log(searchText);
              //               axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${searchText}&madebType=1`)
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
              // components={
              //   {Toolbar: props => (<div id='searchbar'><MTableToolbar {...props}/> 
              //         <Grid container style={{maxWidth: '1000px'}} spacing={1}>
              //         <Grid item xs={2} lg={2}><TextField label={'Form Number'} onChange = {(e) =>{ console.log(e.target.value); searchFunction(e.target.value, 'F');
              //         }

              //         }/></Grid> 

              //         <Grid item xs={2} lg={2}><TextField label={'Received Date'} /></Grid>
              //         <Grid item xs={3} lg={3}><TextField label={'Authority '} /></Grid>

              //         <Grid item xs={3} lg={3}><TextField label={'Name'} /></Grid>
              //         <Grid item xs={2} lg={2}><TextField label={"Father's Name"} /></Grid>
              //       </Grid>


              //               </div>)
              //   }
              // }

              actions={[
                {
                  icon: oTableIcons.Add,
                  tooltip: 'Add Sarso Madeb',
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
            {addModal && <AddDialog
              addModal={addModal}
              classes={classes}
              selectData={selectData}
              handleAddClickClose={handleAddClickClose}
              addAPICall={addAPICall}
            />}
            {editModal && <EditDialog
              editModal={editModal}
              sarsoObj={sarsoObj}
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