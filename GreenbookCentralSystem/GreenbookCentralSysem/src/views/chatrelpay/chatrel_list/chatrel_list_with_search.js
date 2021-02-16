import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { oOptions, oTableIcons, modifyHeaders, sButtonSize, sDateFormat, sISODateFormat } from '../../../config/commonConfig';

import {
  Grid,
  Typography,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Card,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { ViewDialog } from './dialog';
import MaterialTable from 'material-table';
import { Alerts } from '../../alerts/index';
import { BackdropComponent } from '../../backdrop/index';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import stock from '../../assets/images/No_person.jpg';


const ageCoded = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124];

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
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(0),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0)
  },
  box: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: '#11cb5f'
    }
  },
  heading: {
    fontSize: 15,
    fontWeight: 10,
    flexBasis: '33.33%',
    flexShrink: 0
  },
  border: '1px solid rgba(0, 0, 0, .125)',
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&$expanded': {
    margin: 'auto'
  },
  option: {
    fontSize: 10,
    '& > span': {
      marginRight: 5,
      fontSize: 16
    }
  },
  labelAsterisk: {
    color: "red"
  },
  link: {
    text: {
      textDecoration: 'underline'
    }
  },
  expansionHeading: {
    color: '#ffffff'
  },
  expansionPanel: {
    backgroundColor: '#4e5287'
  }
}));

export default function ChatrelListWithSearch() {
  //const dataAPI = useSelector(state => state.FeatureReducer.lFeature);
  let history = useHistory();
  //const dispatch = useDispatch();
  const [sCurrency, setCurrency] = React.useState(null);
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [profileGBID, setProfileGBID] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [Id, setId] = React.useState('');
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [dataFromAPI, setdataFromAPI] = React.useState([]);
  const [recentGBData, setRecentGBData] = React.useState([]);
  const [sGBID, setsGBID] = React.useState(null);
  const [searchType, setSearchType] = React.useState('complex');
  const handleChange = (event) => {
    setSearchType(event.target.value);
  };
  
  const [searchFilter, setSearchFilter] = React.useState('sGBID');

  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  
  const [dtPaymentFrom, setPaymentFrom] = React.useState(null);
  const [dtPaymentTo, setPaymentTo] = React.useState(null);
  const [sReceiptNo, setReceiptNo] = React.useState(null);
  const [sPaymentMode, setPaymentMode] = React.useState(null);
  const [sCountry, setCountry] = React.useState(null);
  const [authRegions, setAuthRegions] = React.useState([]);
  const [sAuthRegion, setAuthRegion] = React.useState(null);

  

  const [countryData, setCountryData] = React.useState([]);
  const [backdrop, setBackdrop] = React.useState(false);
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


  const complexObj = {
    sFirstName: firstName,
    sLastName: lastName,
    sGBID,
    sChatrelReceiptNumber: sReceiptNo,
    sPaymentCurrency: sCurrency,
    dtPaymentFrom: Moment(dtPaymentFrom).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtPaymentFrom).format('YYYY-MM-DD') : null,
    dtPaymentTo: Moment(dtPaymentTo).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtPaymentTo).format('YYYY-MM-DD') : null,
    sPaymentMode,
    sCountry,
    sAuthRegion
  }

  const handleEditClickClose = () => {
    setEditModal(false);
  };
  // const handleViewClickClose = () => {
  //   //getRecentGB();
  //   setViewModal(false);
  // };

  // const viewGb = (GBID) => {
  //   //console.log(GBID)
  //   setsGBID(GBID);
  //   setViewModal(true);
  // }
  const columns = [
    {
      field: "nSerialNo",
      title: "Sr No.",
      hidden: true,
    },
    {
      field: "dtPayment",
      title: "PAYMENT DATE",
      //type: 'date', 
      //render: rowData => rowData['dtPayment'] ? Moment(rowData['dtPayment']).format(sDateFormat) : undefined,
      //dateSetting: 'en-IN',
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtPayment){
          return -1;
        }
        if(!b.dtPayment){
          return 1;
        }
        a = a ? a.dtPayment.split('-').reverse().join('') : '';
        b = b ? b.dtPayment.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
      //render: rowData => rowData['dtPayment'] ? Moment(rowData['dtPayment']).format(sDateFormat) : undefined,
    },
    {
      field: "sGBID",
      title: "GREENBOOK ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      render: rowData =>  <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewGb(rowData['sGBID']) }}><span><u>{rowData['sGBID']}</u></span></Button>
    },
    {
      field: "sChatrelReceiptNumber",
      title: "RECEIPT NUMBER",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      // render: rowData => <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewReceipt(rowData['sChatrelReceiptNumber']) }}><span><u>{rowData['sChatrelReceiptNumber']}</u></span></Button>
      render: rowData => 
      <>
        <Link to={{
          pathname: '/Chatrel/ChatrelReceipt',
          search: `?receiptNumber=${rowData['sChatrelReceiptNumber']}`,
          state: {sReceiptNumber: rowData['sChatrelReceiptNumber']},
          }}
          target='_blank'
        >
          <span style={{color: 'blue'}}><u>{rowData['sChatrelReceiptNumber']}</u></span>
        </Link>
      </>

    },
    {
      width: "10%",
      field: "sName",
      title: "NAME",
      headerStyle: {
        width: "10%",
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        width: '10%',
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    {
      field: "sPaidByGBId",
      title: "PAID BY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    {
      field: "sPaymentCurrency",
      title: "CURRENCY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      //hidden: true
    },
    

    {
      field: "sFinancialYear",
      title: "YEAR",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
    },
    
    {
      field: "nChatrelTotalAmount",
      title: "TOTAL",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelTotalAmount']}` : `$ ${rowData['nChatrelTotalAmount']}`
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    {
      field: "sPaymentMode",
      title: "PAYMENT MODE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    {
      field: "sCountry",
      title: "COUNTRY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    

  ];

  const viewGb = (GBID) => {
    //console.log(GBID)
    setProfileGBID(GBID);
    setViewModal(true);
  }
  const handleViewClickClose = () => {
    setViewModal(false);
  };
  
  // const openRelationGB = (newsGBID) => {
  //   handleViewClickClose();
  //   setTimeout(() => viewGb(newsGBID), 0);
  // }

  const handleSimpleSearch = (e) => {

    //setSearchField(e.target.value,//console.log(searchField))
    if (e.target.value.length > 0) {
      const simpleObj = {
        sSearchField: searchFilter,
        sSearchValue: e.target.value
      }
      //alert(JSON.stringify(simpleObj));
      axios.post(`Greenbook/GetQuickResult`, simpleObj)
        .then(resp => {
          if (resp.status === 200) {
            let i = 1;
            //console.log(resp.data);
            resp.data.forEach((element) => {
              element.nSerialNo = i;
              element.sGBIDCombo = element.sCountryID + element.sGBID;
              element.sFullName = (element.sFirstName ? element.sFirstName : '') + (element.sLastName ? (' ' + element.sLastName) : '');
              element.dtDOBFormatted = element.dtDOB ? Moment(element.dtDOB).format(sDateFormat) : '';
              i++;
            })
            setdataFromAPI(resp.data);
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
          //console.log(error.config);
        })
        .then(release => {
          ////console.log(release); => udefined
        });
    }
    else {
      setdataFromAPI([]);
    }
  }
  
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  
  const handleComplexSearch = () => {
    //   //setSearchField(e.target.value,//console.log(searchField))
    //alert(JSON.stringify(complexObj))
    //console.log("Search Object", complexObj);
    //setBackdrop(true);
    axios.post(`ChatrelPayment/GetQuickChatrelList`, complexObj)
      .then(resp => {
        if (resp.status === 200) {

          let i = 1;
          //console.log(resp.data);
          if(resp.data == 'No Data'){
            setdataFromAPI([]);
            setAlertMessage(`No Data for specified search parameters.`);
            setAlertType('info');
            snackbarOpen();
          }
          resp.data.forEach((element) => {
            element.nSerialNo = i;
            //element.sGBIDCombo = element.sCountryID + element.sGBID;
            element.sFullName = (element.sFirstName ? element.sFirstName : '') + (element.sLastName ? (' ' + element.sLastName) : '');
            element.dtPayment = element.dtPayment ? Moment(element.dtPayment).format(sDateFormat) : '';
            i++;
          })
          setdataFromAPI(resp.data);
          setBackdrop(false);
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage(`There was an error fetching search data.`);
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
        //console.log(error.config);
      })
      .then(release => {
        ////console.log(release); => udefined
      });
  }
 
  useEffect(() => {
    setBackdrop(true);
    axios.get(`Country/GetCountriesForAddNewChatrel`)
      .then(resp => {
        if (resp.status === 200) {
          setCountryData(resp.data);
          //getRecentGB();
          //modifyHeaders();
          axios.get(`AuthRegion/GetAuthRegionsForChatrelList`)
          .then(resp => {
            setAuthRegions(resp.data);
            setBackdrop(false);
          })
          .catch(error => {
            setBackdrop(false);
            setAlertMessage("Error Occured while fetching Authority Region Data.");
            setAlertType("error");
            snackbarOpen();
          })
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage("Error Occured while fetching Country Data.");
        setAlertType("error");
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
        //console.log(error.config);
      })
      .then(release => {
        ////console.log(release); => udefined
      });
  }, []);
  const currencies = [
    {
      value:null,
      symbol:''
    },
    {
      value: 'USD',
      symbol: '$',
    },

    {
      value: 'INR',
      symbol: '₹',
    }];


    const [dtFrom, setDtFrom] = useState(null);
    const [dtTo, setDtTo] = useState(null);

  useEffect(() => {
    ////console.log(JSON.parse(localStorage.getItem("currentUser")).oUser.id);

    if (firstName?.length > 2 || lastName?.length > 2 ||
      sGBID?.length > 2 || sReceiptNo?.length > 0 || Moment(dtPaymentFrom).format('YYYY-MM-DD') != 'Invalid date' || Moment(dtPaymentTo).format('YYYY-MM-DD') != 'Invalid date' || sCountry || sAuthRegion || sPaymentMode ||  sCurrency) {
      //console.log(complexObj);
      handleComplexSearch();
    }
    else{
      setdataFromAPI([]);
    }
  }, [firstName, lastName, sGBID, sReceiptNo, dtPaymentFrom, dtPaymentTo, sCountry, sAuthRegion, sPaymentMode, sCurrency]);

  
  useEffect(() => {
    dataFromAPI.length > 0 && modifyHeaders()
  }, [dataFromAPI]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={10}>
          {/*<Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Search</Typography>
  </Breadcrumbs>*/}
          {dataFromAPI.length == 0 &&
            <Paper>  <Typography color="textPrimary" align="center">No records to display </Typography> </Paper>
          }
          {dataFromAPI.length != 0 &&
            <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black' }}
              isLoading={isLoading}
              icons={oTableIcons}
              title="Search"
              columns={columns}
              data={dataFromAPI}
              options={oOptions}
              
              actions={[
                {
                  icon: oTableIcons.Search,
                  tooltip: 'Toggle Filter',
                  isFreeAction: true,
                  onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
                }
              ]}
            />}
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper style={{ padding: '10px' }}>
            {/*<Typography color="textPrimary" align="center">Search</Typography>*/}
            {/* <FormControl component="fieldset">
              <FormLabel component="legend">Search Type</FormLabel>
              <RadioGroup aria-label="search" name="search" value={searchType} onChange={handleChange}>
                 <FormControlLabel value="simple" control={<Radio />} label="Simple" /> 
                <FormControlLabel value="complex" control={<Radio />} label="Detailed" />
              </RadioGroup>
            </FormControl> */}
            <Grid container>
              {/* {searchType == 'simple' && <>
                <Typography color="textPrimary" align="center">Simple</Typography>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      autoFocus
                      id="id_searchField"
                      label="Enter Value"
                      type="text"
                      onChange={handleSimpleSearch}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="lbl-SearchFilter">Search Filter</InputLabel>
                    <Select
                      labelId="lbl-SearchFilter"
                      id="searchFilter"
                      onChange={(e) => { setSearchFilter(e.target.value) }}
                      value={searchFilter}
                    >
                      <MenuItem value="sGBID">GB Number</MenuItem>
                      <MenuItem value="sOldGreenBkNo">Old GB Number</MenuItem>
                      <MenuItem value="sFstGreenBkNo">First GB Number</MenuItem>
                      <MenuItem value="sResidenceNumber">RC Number</MenuItem>
                      <MenuItem value="sFathersGBID">Father's GB Number</MenuItem>
                      <MenuItem value="sMothersGBID">Mother's GB Number</MenuItem>
                      <MenuItem value="sSpouseGBID">Spouse GB Number</MenuItem>
                      <MenuItem value="sOtherDocuments">Other Documents</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
              } */}
              {searchType == 'complex' && <>
                <Typography color="textPrimary" align="center">Search Parameters</Typography>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      autoFocus
                      id="id_firstName"
                      label="First Name"
                      type="text"
                      onChange={(e) => { setFirstName(e.target.value); }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_LastName"
                      label="Last Name"
                      type="text"
                      onChange={(e) => { setLastName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_GBID"
                      label="Greenbook ID"
                      type="text"
                      onChange={(e) => { setsGBID(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_RecptNo"
                      label="Receipt Number"
                      type="text"
                      onChange={(e) => { setReceiptNo(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                  <TextField
                        size="small"
                        id="filled-select-currency-native"
                        select
                        label="Currency"
                        //value={sCurrency}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                          //setSymbol(e.target.options[e.target.options.selectedIndex].label);
                          ////console.log("target: ", e.target);
                        }}
                        SelectProps={{
                          native: true,
                        }}
                        > {currencies.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                <TextField
                        size="small"
                        id="filled-select-currency-native"
                        select
                        label="Payment Mode"
                        //value={sPaymentMode}
                        onChange={(e) => {
                          setPaymentMode(e.target.value);
                          //setSymbol(e.target.options[e.target.options.selectedIndex].label);
                          ////console.log("target: ", e.target);
                        }}
                        SelectProps={{
                          native: true,
                        }}
                        > <option key={0} value={null}>
                       
                      </option>
                        <option key={1} value={'Online'}>
                            Online
                          </option>
                          <option key={1} value={'Offline'}>
                          Offline
                        </option>
                      </TextField>
                      </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        placeholder="DD-MM-YYYY"
                        autoOk
                        margin="normal"
                        id="id_dtPaymentFrom"
                        label="Payment Date From "
                        format="dd-MM-yyyy"
                        onChange={(date, value) => {
                          setDtFrom(date);
                          if(date === null){
                            setPaymentFrom(null);
                            return;
                          }
                          if (Moment(date).isValid()) {
                            setPaymentFrom(Moment(date).format(sISODateFormat)) ;
                          }
                          
                        }}
                        value={dtFrom}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                        className={classes.dateField}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        placeholder="DD-MM-YYYY"
                        margin="normal"
                        autoOk
                        id="id_dtPaymentTo"
                        label="Payment Date To"
                        format="dd-MM-yyyy"
                        onChange={(date) => {
                          setDtTo(date);
                          if(date === null){
                            setPaymentTo(null);
                            return;
                          }
                          if (Moment(date).isValid()) {
                            setPaymentTo(Moment(date).format(sISODateFormat)) ;
                          }
                           }}
                        value={dtTo}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                        className={classes.dateField}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            //console.log(value.sAuthRegion);
                            setAuthRegion(value.sAuthRegion);
                          }
                          else {
                            setAuthRegion(null);
                          }
                        }
                      }
                      id="id_sCountry"
                      options={authRegions}
                      /*  classes={{
                            option: classes.option,
                        }}
                        className={classes.textField}*/
                      autoHighlight
                      getOptionLabel={(option) => option.sAuthRegion}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sAuthRegion}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Authority Region"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            //console.log(value.sCountry);
                            setCountry(value.sCountry);
                          }
                          else {
                            setCountry(null);
                          }
                        }
                      }
                      id="id_sCountry"
                      options={countryData}
                      /*  classes={{
                            option: classes.option,
                        }}
                        className={classes.textField}*/
                      autoHighlight
                      getOptionLabel={(option) => option.sCountry}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sCountry}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="lbl_gender">Gender</InputLabel>
                    
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    
                  </FormControl>
                </Grid> */}
              </>}
            </Grid>
          </Paper>
          
        </Grid>
        
        {viewModal && <ViewDialog
              viewModal={viewModal}
              classes={classes}
              handleViewClickClose={handleViewClickClose}
              sGBID={profileGBID}
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
    </>
  );
}