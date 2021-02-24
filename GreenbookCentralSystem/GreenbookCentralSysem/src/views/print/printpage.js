
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
  Table
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { red } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import { Alerts } from '../alerts';
import { PrintCard } from './printcard';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../config/commonConfig";
import { BackdropComponent } from '../backdrop/index';

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
  const classes = useStyles();
  const [backdrop, setBackdrop] = React.useState(false);
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
  const [selected, setSelected] = React.useState([]);
  const [obj, setObj] = React.useState([]);
  const [searchObj, setSearchObj] = React.useState([]);
  const [regionData, setRegionData] = React.useState([]);
  const [regionName, setRegionName] = React.useState("");
  const [regionCode, setRegionCode] = React.useState("");
  const [sGBID, setsGBID] = React.useState(0);

  const [showPrintDiv, setShowPrintDiv] = React.useState(false);

  const [finalPrintTable, setFinalPrintTable] = React.useState(false);

  const isChecked = (row) => {
    if (row.sRegion_code && row.sRegion_code != null) {
      setAlertMessage('Record Added to Print List');
      setAlertType('info');
      snackbarOpen();
      handleChange(row);
    }
    else {
      setAlertMessage('Please Select Region');
      setAlertType('info');
      snackbarOpen();
    }
  };

  const handleChange = (row) => {
    const selectedIndex = selected.map((i) => i.id).indexOf(row.nCurrentBookNo);

    let newSelected = [];

    if (selectedIndex === -1) {

      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    };

    const objIndex = obj.map((i) => i.nCurrentBookNo).indexOf(row.nCurrentBookNo);
    let newObj = [];
    newObj = newObj.concat(
      obj.slice(0, objIndex),
      obj.slice(objIndex + 1),
    );
    setObj(newObj);
    setSelected(newSelected);
    setFinalPrintTable(true);
    setShowPrintDiv(true);
  };

  const removeFromFinal = (row) => {
    const selectedIndex = selected.map((i) => i.nCurrentBookNo).indexOf(row.nCurrentBookNo);
    let newSelected = [];
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
    let newObj = [];

    newObj = newObj.concat(obj, row);
    setObj(newObj);
    setSelected(newSelected);
    //       setFinalPrintTable(true);
  };

  const getRegion = () => {
    setBackdrop(true);
    axios.get(`Region/GetRegion`)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setRegionData(resp.data);
          getData();
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

  const search = (sGBID) => {
    console.log("Search by GBID called...");
    if (sGBID === 0) {
      setAlertMessage('Enter GB Number');
      setAlertType('error');
      snackbarOpen();
    }
    else {
      getSearchData(sGBID);
    }

  };

  const getSearchData = (sGBID) => {
    setBackdrop(true);
    axios.get(`PrintGreenBook/GetGreenBookByGBID/?sGBID=` + sGBID)
      //  axios.get(`PrintGreenBook/GetPrintList/?records=10`)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setObj([resp.data]);
          setBackdrop(false);
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

  };

  const getData = () => {
    axios.get(`PrintGreenBook/GetPrintList/?records=10`)
      .then(resp => {
        if (resp.status === 200) {
          //alert(JSON.stringify(resp.data));
          setObj(resp.data.reverse());
          setBackdrop(false);
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
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const showPrint = () => {
    //var controls = new Array();
    //controls.push("controls1");
    //controls.push("controls2");
    console.log(userId)
    axios.get(`/PrintGreenBook/AddPrintActionLog/?nUserId=` + userId)
      .then(resp => {
        if (resp.status === 200) {
          sessionStorage.setItem("printObj", JSON.stringify(selected));
          window.open('/PrintPage');
        }
      })
      .catch(error => {
        console.log(error.message);
      })
  }
  useEffect(() => {

    getRegion();
    //getData();
    //  setObj([{id:1},{id:2},{id:3},{id:4},{id:5}]);

  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>

          {/*<Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/Home" >
        Home
    </Link>

      <Typography color="textPrimary">Print Green Book</Typography>
  </Breadcrumbs>*/}
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Paper elevation={3} style={{ padding: 30 }}>

                <Typography color="textPrimary">Enter Green Book Number To Print:</Typography>
                <form onSubmit={(e) => {e.preventDefault();search(sGBID);}}>
                <TextField id="standard-basic" type='number' label="Green Book No."
                  onChange={(e) => { setsGBID(e.target.value) }}
                />
                { /* <Button   style={{marginTop:8,marginLeft:5 }} type='submit' onClick={searchGbId}  variant="outlined">Show</Button>*/}
                { /*     <Button   style={{marginTop:8,marginLeft:5 }} type='submit' onClick={()=>{setHistoryTable(true);setGbId(tempGbId.toString());}}  variant="outlined">Show</Button> */}
                <Button
                  style={{ marginTop: 8, marginLeft: 5 }}
                  type='submit'
                  variant={sButtonVariant}
                  color={sButtonColor}
                  size={sButtonSize}
                >Search</Button>
                </form>
                <br />
                <br />

                {
                  obj.length > 0 &&
                  <Table className="table table-hover table-striped table-bordered" size={"small"} >
                    <thead className="thead-dark">
                      <tr>
                        <th>Book Sr No</th>
                        <th>GB ID</th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Print</th>
                      </tr>
                    </thead>
                    <tbody>
                      {obj.map((row, index) => (
                        <tr style={{ padding: '0px' }}>
                          <td>{row.nCurrentBookNo}</td>
                          <td>{row.sGBID}</td>
                          <td>{row.sName}</td>
                          <td style={{ width: 300 }}>
                            <Autocomplete
                              openOnFocus
                              clearOnEscape
                              onChange={
                                (e, value) => {
                                  if (value !== null) {

                                    row.sRegion_code = value.sRegion_code;
                                    row.sRegion_name = value.sRegion_name;
                                  }
                                  else {
                                    row.sRegion_code = null;
                                    row.sRegion_name = null;
                                  }
                                }
                              }
                              //  value={valueAuthRegion} 
                              id="region"
                              options={regionData}
                              /*  classes={{
                                    option: classes.option,
                                }}
                                className={classes.textField}*/
                              autoHighlight
                              value={[]}
                              getOptionLabel={(option) => option.sRegion_name}
                              renderOption={(option) => (
                                <React.Fragment>
                                  <span>{option.sRegion_name}</span>
                                </React.Fragment>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Region"
                                  variant="standard"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          </td>
                          <td>
                            <IconButton color="primary" onClick={() => isChecked(row)} aria-label="upload picture" component="span" style={{ padding: '0px' }}>
                              <PrintIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>}
                {selected.length != 0 &&
                  <>
                    <Typography color="textPrimary">Print List</Typography>
                    <div>
                      <Table className="table table-hover table-striped table-bordered" size={"small"} >
                        <thead className="thead-dark">
                          <tr>
                            <th>Book Sr No</th>
                            <th>GB ID</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.map((row1, index) => (
                            <tr style={{ padding: '0px' }}>
                              <td>{row1.nCurrentBookNo}</td>
                              <td>{row1.sGBID}</td>
                              <td>{row1.sName}</td>
                              <td>{row1.sRegion_name}</td>
                              <td>
                                <IconButton color="primary" onClick={() => { removeFromFinal(row1) }} aria-label="upload picture" component="span" style={{ padding: '0px' }}>
                                  <DeleteIcon />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    <div style={{ textAlign: 'left' }}> <i>* Maximum Four on a Single A4 Page</i></div>
                    </div>
                    <Typography color="textPrimary">Print Preview</Typography>
                    <Button
                      variant={sButtonVariant}
                      color={sButtonColor}
                      size={sButtonSize}
                      onClick={() => { showPrint() }}
                    >Print</Button>
                    <div id="toPrint" className="mt4" style={{
                      marginLeft: '25px', marginTop: '30px', fontSize: '14px', fontFamily: '"Times New Roman", Georgia, Serif', color: '#000000'
                    }}>

                      {selected.map((row, index) => (
                        <>
                          <PrintCard data={row} />
                          {(index + 1) % 2 === 0 && <br />}
                        </>
                      ))}
                    </div>
                  </>
                }
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      { snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />}
      {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
    </>
  );
}