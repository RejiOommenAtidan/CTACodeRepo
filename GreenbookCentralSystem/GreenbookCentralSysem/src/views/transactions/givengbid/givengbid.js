import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { AssignDialog } from './assigndialog';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sISODateFormat } from '../../../config/commonConfig';
import { Alerts } from '../../alerts';
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

export default function GiveGBId() {
  // Common properties
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);
  const [randomGBID, setRandomGBID] = useState(0);
  const [nFormNumber, setFormNumber] = useState(0);
  const [dtReceived, setReceivedDate] = useState('');
  //const [gbidObj, setGBIDObj] = useState({});
  let history = useHistory();
  const dispatch = useDispatch();

  const [assignModal, setAssignModal] = useState(false);
  const [loading, setLoading] = useState(true); // for animation
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const snackbarClose = () => {
    setSnackbar(false);
  };
  //#endregion


  const columns = [
    {
      field: "nFormNumber",
      title: "FORM NUMBER",
      //filterPlaceholder: "Search...",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      }
    },
    {
      field: "dtReceivedFormatted",
      title: "RECEIVED DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      },
      render: rowData => Moment(rowData['dtReceived']).format(sDateFormat),
    },
    // {
    //   field: "sAuthRegion",
    //   title: "Authority",

    //   cellStyle: {
    //     padding:'5px',

    //   },
    // },
    // {
    //   field: "madeb.sName",
    //   title: "Name",

    //   cellStyle: {
    //     padding:'5px',

    //   },
    // },
    {
      field: "edit",
      title: "GENERATE",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { assignClick(rowData) }} style={{ padding: '0px' }}
      >
        <CreateNewFolderIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '5%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '5%'
      },
    }
  ];

  const assignClick = (rowData) => {
    axios.get(`GivenGBID/GetRandomGBID`)
      .then(resp => {
        if (resp.status === 200) {
          setRandomGBID(resp.data);
          setFormNumber(rowData['nFormNumber']);
          setReceivedDate(rowData['dtReceived']);
          setAssignModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleDialogClose = () => {
    setAssignModal(false);
  };

  const handleAssignGBID = () => {
    //setLoading(true);
    const gbidObj = {
      nGBId: randomGBID,
      nFormNo: nFormNumber,

      bGivenOrNot: false,
      bActive: true
    };
    console.log("GBID Object:\n", gbidObj);
    console.log("date", dtReceived);
    setBackdrop(true);
    axios.post(`GivenGBID/AddGivenGBID/dtReceived=` + Moment().format(sISODateFormat), gbidObj)
      .then(resp => {
        if (resp.status === 200) {
          setAssignModal(false);
          setAlertMessage("GB ID Assigned Successfully");
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          axios.get(`Madeb/GetFormsWithoutGBId`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.dtReceivedFormatted = element.dtReceived ? Moment(element.dtReceived).format(sDateFormat) : null;
                });
                setdataAPI(resp.data);
                setLoading(false);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
              setAlertMessage("Couldn't Assign GB ID, Something went wrong");
              setAlertType('error');
              snackbarOpen();
              setBackdrop(false);
              setLoading(false);
            })
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage("Couldn't Assign GB ID, Something went wrong");
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios.get(`Madeb/GetFormsWithoutGBId`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.dtReceivedFormatted = element.dtReceived ? Moment(element.dtReceived).format(sDateFormat) : null;
          });
          setdataAPI(resp.data);
          setLoading(false);
          modifyHeaders();
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setLoading(false);
      })
  }, []);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/*<Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Give GB ID</Typography>
  </Breadcrumbs>*/}
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={loading}
            icons={oTableIcons}
            title="Give Green Book ID"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          ></MaterialTable>
          {assignModal && <AssignDialog
            assignModal={assignModal}
            nFormNumber={nFormNumber}
            randomGBID={randomGBID}
            dtReceived={Moment().format(sISODateFormat)}
            classes={classes}
            handleDialogClose={handleDialogClose}
            handleAssignGBID={handleAssignGBID}
          />}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
          {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
        </Grid>
      </Grid>
    </div>
  );
}