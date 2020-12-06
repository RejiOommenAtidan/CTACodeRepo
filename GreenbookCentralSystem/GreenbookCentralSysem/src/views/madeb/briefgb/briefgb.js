import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import { EmailDialog } from '../email';
import { ViewDialog } from '../../search/dialog';
import { Alerts } from '../../alerts';
import { AddDialog, EditDialog } from './dialog';
import { oOptions, oTableIcons, sDateFormat, sButtonSize, modifyHeaders } from 'config/commonConfig';
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
      width: "5%",
      field: "madeb.id",
      title: "#",
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "6%",
      field: "madeb.nFormNumber",
      title: "FORM NUMBER",
      filterPlaceholder: "Search...",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "8%",
      field: "madeb.dtReceived",
      title: "RECEIVED DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      },
      render: rowData => rowData['madeb']['dtReceived'] ? Moment(rowData['madeb']['dtReceived']).format(sDateFormat) : undefined
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
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "6%",
      field: "madeb.nCurrentGBSno",
      title: "CURRENT GB SNO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "6%",
      field: "madeb.nPreviousGBSno",
      title: "PREVIOUS GB SNO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
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
    //   cellStyle: {
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
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      width: "9%",
      field: "madeb.dtIssueAction",
      title: "ISSUE ACTION DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      },
      render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : undefined
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
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      width: "8%",
      field: "madeb.dtReject",
      title: "REJECT DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      },
      render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : undefined
    },
    {
      width: "8%",
      field: "madeb.dtReturnEmail",
      title: "RETURN DATE",
      //type: 'date',
      //dateSetting: {locale: 'en-IN'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      },
      render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : ''
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
        textAlign: "left",
        padding: '5px'
      },
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
        textAlign: "left",
        padding: '5px'
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
          onClick={() => { editClick(rowData) }} disabled={rowData.madeb.nIssuedOrNotID} style={{ padding: '0px' }}
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
        textAlign: "center",
        padding: '5px'
      }
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
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });
    //console.log(tableRowArray);
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
          selectDatafunction();
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
              }
              else {
                console.log("Response received:\n", resp);
              }
            })
            .catch(error => {
              setBackdrop(false);
              console.log(error.config);
              console.log(error.message);
            })
        }
      })
      .catch(error => {
        setAlertMessage(`Madeb Updation Failed. Error:${error.response.data}.`);
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
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
  };

  const addAPICall = (madeb) => {
    console.log(madeb);
    setBackdrop(true);
    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          selectDatafunction();
          setAlertMessage('Created new record successfully.');
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
              }
            })
            .catch(error => {
              setBackdrop(false);
              console.log(error.message);
              console.log(error.config);
            })
        }
      })
      .catch(error => {
        setAlertMessage(`Failed to create new Madeb. Error:${error.response.data}.`);
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
      })
  };

  useEffect(() => {
    axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=6`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          selectDatafunction();
          setisLoading(false);
          modifyHeaders();
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
          <MaterialTable
            style={{ 
              padding: '10px', 
              width: '100%', 
              border: '2px solid grey', 
              borderRadius: '10px'
             }}
            isLoading={loading}
            icons={oTableIcons}
            title="Brief Green Book Madeb"
            columns={columns}
            data={dataAPI}
            options={{
              ...oOptions,
              tableLayout: "fixed"
            }}
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
    </>
  );
}

