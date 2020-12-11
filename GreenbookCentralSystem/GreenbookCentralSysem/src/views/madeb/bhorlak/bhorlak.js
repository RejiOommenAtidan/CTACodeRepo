import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button
} from '@material-ui/core';
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
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sButtonSize } from '../../../config/commonConfig';
import { ViewDialog } from '../../search/dialog';
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
      main: red[500],
    },
    secondary: {
      main: '#11cb5f',
    },
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
  const [formNumber, setFormNumber] = React.useState(0);
  const [authority, setAuthority] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [rejectDate, setRejectDate] = React.useState('');
  const [bhorlakObj, setBhorlakObj] = useState({});
  const [emailInObj, setEmailInObj] = useState({});
  const [isLoading, setisLoading] = React.useState(true);
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
  const handleEmailClickClose = () => {

    setEmailModal(false);
  };

  const columns = [
    {
      width: "3%",
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
      width: "5%",
      field: "madeb.nFormNumber",
      title: "FORM NO.",
      filterPlaceholder: 'Search..',
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
      field: "madeb.dtFormattedReceived",
      title: "RECEIVED DATE",
     // render: rowData => Moment(rowData['madeb']['dtReceived']).format(sDateFormat),
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
      width: "9%",
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
      width: "12%",
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
        textAlign: "center",
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
        textAlign: "right",
        padding: '5px'
      }
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
        textAlign: "right",
        padding: '5px'
      }
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
        textAlign: "right",
        padding: '5px'
      }
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
        textAlign: "right",
        padding: '5px'
      }
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
        textAlign: "left",
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
      madebName: 'Bhorlak'
    });
    setEmailModal(true);
  };

  const editClick = (tableRowArray) => {
    setId(tableRowArray['madeb']['id']);
    setFormNumber(tableRowArray['madeb']['nFormNumber']);
    setAuthority(tableRowArray['sAuthRegion']);
    setReceivedDate(tableRowArray['madeb']['dtReceived']);
    setName(tableRowArray['madeb']['sName']);
    setFname(tableRowArray['madeb']['sFathersName']);
    setSaney(tableRowArray['madeb']['nSaneyFormNo']);
    setDocument(tableRowArray['madeb']['sDocumentAttached']);
    setIssueActionDate(tableRowArray['madeb']['dtIssueAction']);
    setIssueAction(tableRowArray['madeb']['nIssuedOrNotID']);
    setReturnDate(tableRowArray['madeb']['dtReturnEmail']);

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
          selectDatafunction();
          setBackdrop(false);
          setisLoading(true);    

          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=3`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
                  element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
                  element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
                  element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
                })
                setdataAPI(resp.data);
                setisLoading(false);
              }
            })
            .catch(error => {
              setisLoading(true);
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
      })
      .catch(error => {
        setAlertMessage('Error! ' + error.message);
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
    axios.get(`Madeb/GetNewEmptyMadeb`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
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
          setBackdrop(false);
          setisLoading(true);
          selectDatafunction();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=3`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
                  element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
                  element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
                  element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
                })
                setdataAPI(resp.data);
                setisLoading(false);
              }
            })
            .catch(error => {
              setisLoading(false);
              setAlertMessage('Error! ' + error.message);
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
          //window.location = window.location;
        }
      })
      .catch(error => {
        setAlertMessage('Error! ' + error.message);
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

  useEffect(() => {
    axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=3`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
            element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
            element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
            element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          })
          setdataAPI(resp.data);
          selectDatafunction()
          setisLoading(false);
          modifyHeaders();
        }
      })
      .catch(error => {
        setisLoading(false);
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
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={isLoading}
            icons={oTableIcons}
            title="Bhorlak Madeb"
            columns={columns}
            data={dataAPI}
            options={{ ...oOptions, tableLayout: "fixed" }}
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
    </>
  );
}