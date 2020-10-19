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
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
import Moment from 'moment';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import { EmailDialog } from '../email';
import { Alerts } from '../../alerts';
import { AddDialog, EditDialog } from './dialog';
import { ViewDialog } from '../../search/dialog';
import { oOptions, oTableIcons, sDateFormat } from '../../../config/commonConfig';
const tableIcons = oTableIcons;

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

export default function EnhancedTable() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [emailModal, setEmailModal] = React.useState(false);

  const [id, setId] = React.useState('');
  const [formNumber, setFormNumber] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [authority, setAuthority] = React.useState(0);
  const [name, setName] = React.useState('');

  const [gbId, setGbId] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [currentGBSNo, setCurrentGBSNo] = useState(0);
  const [previousGBSNo, setPreviousGBSNo] = useState(0);
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [rejectDate, setRejectDate] = useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [bookFullObj, setBookFullObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
  const [emailInObj, setEmailInObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [isLoading, setisLoading] = React.useState(true);
//View GB
const [viewModal, setViewModal] = useState(false);
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
  const handleAddClickOpen = () => {
    setAddModal(true);
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
        padding: '5px'
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
     // field: "madeb.sGBID",
     render:  rowData =>rowData['madeb']['sGBID']? <Button className="m-2 btn-transparent btn-link btn-link-first" onClick={() => { viewGb(rowData['madeb']['sGBID'])}}><span>{rowData['madeb']['sGBID']}</span></Button>:'', 
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
      field: "madeb.dtReject",
      title: "Reject Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding: '5px',

      },
      render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : undefined,
    },
    {
      field: "madeb.dtReturnEmail",
      title: "Return Date",
      //type: 'date',
      //dateSetting: {locale: 'en-IN'},
      cellStyle: {
        padding: '5px',

      },
      render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : undefined,
    },
    {
      field: "email",
      title: "Email",
      filtering: false,
      sorting: false,
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
      render: rowData =>  <>{rowData.madeb.nIssuedOrNotID==2 && <IconButton color="primary" aria-label="upload picture" component="span"
      onClick={() => {  editClick(rowData) }} disabled style={{padding:'0px'}}
    >
      <EditOutlinedIcon/>
    </IconButton>}
    {rowData.madeb.nIssuedOrNotID!=2 && <IconButton color="primary" aria-label="upload picture" component="span"
      onClick={() => {  editClick(rowData) }}  style={{padding:'0px'}}
    >
      <EditOutlinedIcon/>
    </IconButton>}
    </>,
      cellStyle: {
        padding: '5px'
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

    // setId(tableRowArray['madeb']['id']);
    // setFormNumber(tableRowArray['madeb']['nFormNumber']);
    // setReceivedDate(tableRowArray['madeb']['dtReceived']);
    // setAuthority(tableRowArray['sAuthRegion']);
    // setName(tableRowArray['madeb']['sName']);
    // setGbId(tableRowArray['madeb']['sGBID']);
    // setFname(tableRowArray['madeb']['sFathersName']);
    // setSaney(tableRowArray['madeb']['nSaneyFormNo']);
    // setCurrentGBSNo(tableRowArray['madeb']['nCurrentGBSNo']);
    // setPreviousGBSNo(tableRowArray['madeb']['nPreviousGBSNo']);
    // setIssueActionDate(tableRowArray['madeb']['dtIssueAction']);
    // setIssueAction(tableRowArray['madeb']['nIssuedOrNotID']);
    // setRejectDate(tableRowArray['madeb']['dtReject']);
    // setReturnDate(tableRowArray['madeb']['dtReturnEmail']);

    setBookFullObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sFathersName: tableRowArray['madeb']['sFathersName'],
      nSaneyFormNo: tableRowArray['madeb']['nSaneyFormNo'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail']
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
          setEditModal(false);
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=5`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
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
    console.log(madeb);
    debugger
    axios.post(`Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          setAlertMessage('Created new record successfully.');
          setAlertType('success');
          snackbarOpen();
          selectDatafunction();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=5`)
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
        setAlertMessage(`Record creation failed. \nError:${error.message}.`);
        setAlertType('error');
        snackbarOpen();
      })

  };

  const handleClose = () => {
    setDeleteModal(false);

  };

  useEffect(() => {
    axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=5`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          selectDatafunction();
          setisLoading(false);
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
        setisLoading(false);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
        </Link>

            <Typography color="textPrimary">BookFull Madeb</Typography>
          </Breadcrumbs>
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={isLoading}
            icons={tableIcons}
            title="BookFull Madeb"

            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Book Full Madeb',
                isFreeAction: true,
                onClick: () => setAddModal(true)
              },
              {
                icon: Search,
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
            bookFullObj={bookFullObj}
          />}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
          {emailModal && <EmailDialog
            emailModal={emailModal}
            emailInObj={emailInObj}
            //selectData={selectData}
            classes={classes}
            handleEmailClickClose={handleEmailClickClose}
          //emailAPICall={emailAPICall}
          />}
        </Grid>
      </Grid>
    </>
  );
}