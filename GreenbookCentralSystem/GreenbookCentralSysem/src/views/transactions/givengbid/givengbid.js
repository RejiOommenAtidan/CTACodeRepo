import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import { red } from '@material-ui/core/colors';
import { assign, filter } from 'lodash';
import { authenticationService } from '../../../auth/_services';
import { useHistory } from 'react-router-dom';
import { removeAuthDetails } from '../../../actions/userAuthenticateAction';
//Local
import { AssignDialog } from './assigndialog';
import { oOptions, oTableIcons, sDateFormat } from '../../../config/commonConfig';



// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <div></div>),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
// };

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
  const authUser = useSelector(state => state.UserAuthenticationReducer.oUserAuth);
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
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [loading, setLoading] = useState(true); // for animation
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  // Table Column def
  const columns = [
    {
      field: "nFormNumber",
      title: "Form Number",
      //filterPlaceholder: "Search...",
      cellStyle: {
        padding: '5px',

      },
    },
    {
      field: "dtReceived",
      title: "Received Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding: '5px',

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

      cellStyle: {
        padding: '5px',

      },
    }

  ];

  // table options
  const options = {
    filter: true,
    viewColumns: false,
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 30],
  };

  const assignClick = (rowData) => {
    axios.get(`GivenGBID/GetRandomGBID`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
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
    }
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


  // useEffect(() => {
  //   //Use === instead of ==
  //   debugger;
  //   if (authenticationService.currentUserValue === null) {
  //     history.push('/Login');
  //   }
  //   else if(!authUser||authUser.lFeatureUserrights.find(x=>x.nFeatureID===3)===undefined){
  //     authenticationService.logout();
  //     dispatch(removeAuthDetails());
  //   history.push('/Login');
  //   }
  // }, []);

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
            title="Give GB ID"
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