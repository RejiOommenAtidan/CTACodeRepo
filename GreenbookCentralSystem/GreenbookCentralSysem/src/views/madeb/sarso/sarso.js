import React, { useEffect, useState } from 'react'; import {
  Grid,
  Typography,
  Breadcrumbs,
  Link
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
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
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
  const [sarsoObj, setSarsoObj] = useState({});
  const [emailInObj, setEmailInObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
  const [isLoading, setisLoading] = React.useState(true);

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
  const handleEmailClickClose = () => {

    setEmailModal(false);
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
      title: "Form No.",
      filterPlaceholder: 'Search..',
      headerStyle: {
        padding: '0px',
        width: '7%',
        textAlign: 'left'
      },
      cellStyle: {
        // padding:'0px',
        padding: '10px',
        width: '7%',
        textAlign: 'left'

      },
    },
    {
      field: "madeb.dtReceived",
      title: "Received Date",
      render: rowData => Moment(rowData['madeb']['dtReceived']).format(sDateFormat),
      headerStyle: {
        padding: '0px',
        width: '7%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '9%',
        textAlign: 'left'

      },
    },
    {
      field: "sAuthRegion",
      title: "Authority",
      headerStyle: {
        padding: '0px',
        width: '7%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '7%',
        textAlign: 'left'

      },
    },
    {
      field: "madeb.sName",
      title: "Name",
      headerStyle: {
        padding: '0px',
        width: '15%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '15%',
        textAlign: 'left'

      },
    },
    {
      field: "madeb.sGBID",
      title: "GB ID",
      headerStyle: {
        padding: '0px',
        width: '7%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '7%',
        textAlign: 'left'
      },
    },
    {
      field: "madeb.sFathersName",
      title: "Father's Name",
      headerStyle: {
        padding: '0px',
        width: '15%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '15%',
        textAlign: 'left'

      },
    },
    {
      field: "madeb.nSaneyFormNo",
      title: "Saney Form No",
      hidden: true,
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "madeb.sDocumentAttached",
      title: "Document Att.",
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
      field: "madeb.dtIssueAction",
      title: "Issue Action Dt.",
      render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : '',
      // render: rowData => Moment(rowData['madeb']['dtIssueAction']).format('YYYY-MM-DD'),
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
      field: "sTypeIssued",
      title: "Issue Action",

      headerStyle: {
        padding: '0px',
        width: '11%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '9%',
        textAlign: 'left'

      },
    },
    {
      field: "madeb.dtReturnEmail",
      title: "Return Date",
      //render: rowData => Moment(rowData['madeb']['dtReturnEmail']).format('YYYY-MM-DD'),
      render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : '',
      headerStyle: {
        padding: '0px',
        width: '12%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '12%',
        textAlign: 'left'
      },
    },
    {
      field: "madeb.dtReject",
      title: "Reject Date",
      render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : '',
      headerStyle: {
        padding: '0px',
        width: '8%',
        textAlign: 'left'
      },
      cellStyle: {
        padding: '0px',
        paddingLeft: '10px',
        width: '8%',
        textAlign: 'left'
      },
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
      render: rowData => <>{rowData.madeb.nIssuedOrNotID==2 && <IconButton color="primary" aria-label="upload picture" component="span"
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
      madebName: 'Sarso'
    });

    setEmailModal(true);
  }
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
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail']
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

    axios.post(`/Madeb/EditMadeb/ID=` + id, madeb/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          setAlertMessage('Record Successfully Edited');
          setAlertType('success');
          snackbarOpen();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=1`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);

                setDataChanged(true);
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
  }
  const addAPICall = (madeb) => {

    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          setAlertMessage('Record Successfully Added');
          setAlertType('success');
          snackbarOpen();
          selectDatafunction();
          axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=1`)
            .then(resp => {
              if (resp.status === 200) {
                //console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
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
    axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=1`)
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
            icons={tableIcons}
            title="Sarso Madeb"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Sarso Madeb',
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
        </Grid>
      </Grid>
    </>
  );
}