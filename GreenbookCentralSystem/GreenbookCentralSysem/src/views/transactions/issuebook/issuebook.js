import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  Breadcrumbs,
  Link,
  Paper,
  InputLabel,
  Table
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import { IssueBookTable } from '../issuebooktable';
import { Alerts } from '../../alerts';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../../config/commonConfig";

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        color: 'blue',
        fontSize: 15
      }
    },
    MUIDataTableBodyCell: {
      root: {
        // backgroundColor: "#FFF",
        // width: "50px"
      }
    },
    MuiTableCell: {
      root: {
        padding: '0px',
        paddingLeft: '10px',
        paddingRight: '10px'
      }
    },
  }
})
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
  // const navigate = useNavigate();

  const [dataAPI, setdataAPI] = useState([]);
  const [latestData, setLatestData] = useState([]);

  const [bookIssueData, setBookIssueData] = useState([]);

  //VAR

  const [historyTable, setHistoryTable] = React.useState(false);
  const [latestDataTable, setLatestDataTable] = React.useState(false);

  const [id, setId] = React.useState('');
  const [tempGbId, setTempGbId] = React.useState(9116519);
  const [gbId, setGbId] = React.useState("");

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    console.log('alert');
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const searchGbId = () => {
    console.log(gbId);
    axios.get(`IssueBook/GetIssueBookJoin/GBId=` + gbId)
      .then(resp => {
        if (resp.status === 200) {
          setBookIssueData(resp.data);
          setHistoryTable(true);
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
  };
  const show = () => {
    console.log(bookIssueData);
  };
  const handleSubmit = ((e) => {
    //console.log(gbId);
    //setGbId(tempGbId.toString());
    // alert ("form submitted");
    // console.log("event ", e);
    e.preventDefault();
    if (gbId == "") {
      setAlertMessage("Enter Green Book ID");
      setAlertType("info");
      snackbarOpen();
    }
    else {
      setLatestDataTable(false);
      setHistoryTable(true);
    }
  });
  const handleLatestSubmit = (sGBID) => {
    setGbId(sGBID);
    setLatestDataTable(false);
    setHistoryTable(true);
  };

  useEffect(() => {
    axios.get(`IssueBook/GetLatestIssueBookJoin`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setLatestData(resp.data);
          setLatestDataTable(true);
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
          {/*<Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary">Issue Book</Typography>
  </Breadcrumbs>*/}
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Paper elevation={3} style={{ padding: 30 }}>
                <Typography color="textPrimary">Enter Green Book Number To Issue Book:</Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                <TextField id="standard-basic" type='number' label="Green Book No."
                  onChange={(e) => { setGbId(e.target.value.toString()) }}
                  //value={gbId}
                  autoFocus
                />
                { /* <Button   style={{marginTop:8,marginLeft:5 }} type='submit' onClick={searchGbId}  variant="outlined">Show</Button>*/}
                <Button
                  style={{ marginTop: 8, marginLeft: 5 }}
                  type='submit'
                  onClick={(e) => { handleSubmit(e) }}
                  variant={sButtonVariant}
                  color={sButtonColor}
                  size={sButtonSize}  
                >Search
             </Button>
                <Button
                  style={{ marginTop: 8, marginLeft: 5 }}
                  onClick={() => { setHistoryTable(false); setLatestDataTable(true); setGbId('') }}
                  variant={sButtonVariant}
                  color={sButtonColor}
                  size={sButtonSize}
                >Show Latest</Button></form>
                <br />
                
                {/*  <IssueBookTable
              gbId={gbId}
              />
           */ }
                {latestDataTable &&
                  <>
                    <Table className="table table-hover table-striped table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th > Madeb Date </th>
                          <th > GB ID </th>
                          <th > Why </th>
                          <th > Where </th>
                          <th > Form No </th>
                          <th > Issued Yet? </th>
                          <th > Issue Book </th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestData.map((row1, index) => (
                          <tr>
                            <td >{row1.dtReceived ? Moment(row1.dtReceived).format('DD-MM-YYYY') : ''}</td>
                            <td>{row1.sGBID} </td>
                            <td>{row1.sMadebDisplayName}</td>
                            <td>{row1.sAuthRegion}</td>
                            <td>{row1.nFormNumber}</td>
                            <td>{row1.sTypeIssued == null ? 'On Progress' : row1.sTypeIssued}</td>
                            <td>
                              {<IconButton color="primary" onClick={() => { handleLatestSubmit(row1.sGBID) }} aria-label="upload picture" component="span" style={{ padding: '0px' }}>
                                <SaveIcon />
                              </IconButton>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table></>}
                {historyTable &&
                  <IssueBookTable
                    gbId={gbId}
                  />}
              </Paper>
            </Grid>
          </Grid>
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