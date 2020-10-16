import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
import Moment from 'moment';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
//local
import { EmailDialog } from '../email';
import { Alerts } from '../../alerts';
import { AddDialog, EditDialog } from './dialog';
import { oOptions, oTableIcons, sDateFormat } from 'config/commonConfig';

const tableIcons = oTableIcons

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
  }

}));

export default () => {

  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setisLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [emailModal, setEmailModal] = React.useState(false);

  //VAR
  const [id, setId] = React.useState('');
  const [nFormNumber, setFormNumber] = React.useState(0);
  const [dtReceivedDate, setReceivedDate] = React.useState('');
  const [nAuthRegionID, setAuthoRegionID] = React.useState(0);
  const [sName, setName] = React.useState('');
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
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
  const [result, setResult] = useState(false);
  const [emailInObj, setEmailInObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;


  // SnackBar Alerts 

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

  const handleEmailClickClose = () => {

    setEmailModal(false);
  };

  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };


  const columns = [
    {
      field: "madeb.id",
      title: "Sr No.",
      hidden: true,
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.nFormNumber",
      title: "Form Number",
      filterPlaceholder: "Search...",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.dtReceived",
      title: "Received Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding: '5px',
      },
      render: rowData => rowData['madeb']['dtReceived'] ? Moment(rowData['madeb']['dtReceived']).format(sDateFormat) : undefined
    },
    {
      field: "sAuthRegion",
      title: "Authority",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.sName",
      title: "Name",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.sGBID",
      title: "GB Id",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.sFathersName",
      title: "Father's Name",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.nReceiptNo",
      title: "Receipt No",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.nSaneyFormNo",
      title: "Saney Form No",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.nCurrentGBSno",
      title: "Current GB SNo.",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.nPreviousGBSno",
      title: "Previous GB SNo",
      cellStyle: {
        padding: '5px',
      },
    },
    {
      field: "madeb.sApprovedReject",
      title: "Approved/Rejected",

      headerStyle: {
        padding: '0px',
        width: '10%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '10%',
        textAlign: 'left'

      },

    },
    {
      field: 'Verified By',
      title: 'Verified By',
      sort: false,
      export: true,
      filtering: false,
      hidden: true,
    },
    {
      field: 'Re-Verified By',
      title: 'Re-Verified By',
      sort: false,
      export: true,
      filtering: false,
      hidden: true,
    },
    {
      field: "madeb.dtIssueAction",
      title: "Issue Action Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding: '5px',

      },
      render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : undefined
    },
    {
      field: "sTypeIssued",
      title: "Issue Action",

      cellStyle: {
        padding: '5px',

      },
    },
    {
      field: "sMadebStatus",
      title: "Status",

      cellStyle: {
        padding: '5px',

      },
    },
    {
      field: "madeb.sMadebStatusRemark",
      title: "Status Remark",

      cellStyle: {
        padding: '5px',

      },
    },
    {
      field: "madeb.dtReject",
      title: "Reject Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding: '5px',

      },
      render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : undefined
    },
    {
      field: "madeb.dtReturnEmail",
      title: "Return Date",
      //type: 'date',
      //dateSetting: {locale: 'en-IN'},
      cellStyle: {
        padding: '5px',

      },
      render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : ''
    },

    {
      field: "email",
      title: "Email",
      filtering: false,
      sort: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { emailClick(rowData) }} style={{ padding: '0px' }}
      >
        <EmailIcon />
      </IconButton>,

      headerStyle: {
        padding: '0px',
        width: '1%',
        textAlign: 'center'
      },
      cellStyle: {
        padding: '0px',
        width: '1%',
        textAlign: 'center'

      },
    },
    {
      field: "edit",
      title: "Edit",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => {
          editClick(rowData)
        }}
        style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      cellStyle: {
        padding: '5px',
      },
    }
  ];

  const emailClick = (tableRowArray) => {

    setId(tableRowArray['madeb']['id']);
    setFormNumber(tableRowArray['madeb']['nFormNumber']);
    setName(tableRowArray['madeb']['sName']);

    setEmailInObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      sName: tableRowArray['madeb']['sName'],
      madebName: 'Brief GreenBook'
    });

    setEmailModal(true);
  }


  const editClick = (tableRowArray) => {
    setBriefGBObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sFathersName: tableRowArray['madeb']['sFathersName'],
      nReceiptNo: tableRowArray['madeb']['nReceiptNo'],
      nSaneyFormNo: tableRowArray['madeb']['nSaneyFormNo'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'],
      sApprovedReject: tableRowArray['madeb']['sApprovedReject'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });
    //console.log(tableRowArray);
    setEditModal(true);
  }

  const editAPICall = (madeb) => {
    console.log(madeb);
    madeb.dtReject = madeb.dtReject === "" ? null : madeb.dtReject;
    madeb.dtReceived = madeb.dtReceived === "" ? null : madeb.dtReceived;
    madeb.dtIssueAction = madeb.dtIssueAction === "" ? null : madeb.dtIssueAction;
    madeb.dtReturnEmail = madeb.dtReturnEmail === "" ? null : madeb.dtReturnEmail;
    debugger
    axios.post(`Madeb/EditMadeb/Id=` + madeb.id, madeb)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                //setDataChanged(true);
              }
              else {
                console.log("Response received:\n", resp);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            })
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setAlertMessage(`Record updation failed. \nError:${error.message}.`);
        setAlertType('error');
        snackbarOpen();
      })

  };

  const selectDatafunction = () => {
    axios.get(`Madeb/GetNewEmptyMadeb`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);

          // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      })
  }

  const addAPICall = (madeb) => {
    debugger
    console.log(madeb);
    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          selectDatafunction();
          setAlertMessage('Created new record successfully.');
          setAlertType('success');
          snackbarOpen();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              console.log(error.message);
              console.log(error.config);
            })
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
        setAlertMessage(`Record updation failed. \nError:${error.message}.`);
        setAlertType('error');
        snackbarOpen();
      })
  };

  useEffect(() => {
    axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          selectDatafunction();
          setisLoading(false);
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setisLoading(false);
      })
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Brief GreenBook Madeb</Typography>
          </Breadcrumbs>
          <MaterialTable
            style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={loading}
            icons={tableIcons}
            title="Brief GreenBook Madeb"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={
              [
                {
                  icon: AddBox,
                  tooltip: 'Add Brief GreenBook Madeb',
                  isFreeAction: true,
                  onClick: () => setAddModal(true)
                },
                {
                  icon: Search,
                  tooltip: 'Toggle Filter',
                  isFreeAction: true,
                  onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
                }
              ]
            }
          />
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
        </Grid>
      </Grid>
    </>
  );
}

