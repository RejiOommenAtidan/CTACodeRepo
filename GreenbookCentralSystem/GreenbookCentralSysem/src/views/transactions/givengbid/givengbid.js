import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import { assign, filter } from 'lodash';
import { useHistory } from 'react-router-dom';
//Local
import { AssignDialog } from './assigndialog';
import { oOptions, oTableIcons, sDateFormat } from '../../../config/commonConfig';

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

  // Table Column def
  const columns = [
    {
      field: "nFormNumber",
      title: "Form Number",
      //filterPlaceholder: "Search...",
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
      field: "dtReceived",
      title: "Received Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
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
      title: "Generate",
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
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
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

    axios.post(`GivenGBID/AddGivenGBID`, gbidObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Added record to givengbid table");
          setAssignModal(false);
          axios.get(`Madeb/GetFormsWithoutGBId`)
            .then(resp => {
              if (resp.status === 200) {
                console.log("Added record & reload.", resp.data);
                setdataAPI(resp.data);
                setLoading(false);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
              setLoading(false);
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get(`Madeb/GetFormsWithoutGBId`)
      .then(resp => {
        debugger
        if (resp.status === 200) {
          //console.log(resp.data);
          setdataAPI(resp.data);
          setLoading(false);
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
            dtReceived={dtReceived}
            classes={classes}
            handleDialogClose={handleDialogClose}
            handleAssignGBID={handleAssignGBID}
          />}
        </Grid>
      </Grid>
    </div>
  );
}