import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../../auth/_services';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link, Paper,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { storeDataAPI } from 'actions/masters/featureAction';
import { setCurrentSelectedFeature } from 'actions/masters/featureAction';
import { aPageSizeArray } from '../../config/commonConfig';
import { nPageSize } from '../../config/commonConfig';
import { Alerts } from '../alerts/index';
import { BackdropComponent } from '../backdrop/index';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <div></div>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
    margin: theme.spacing(0.5),
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
    marginBottom: theme.spacing(1)
  },
  box: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
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
  }
}));


export default function Feature() {
  const dataAPI = useSelector(state => state.FeatureReducer.lFeature);
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [editModal, setEditModal] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [Id, setId] = React.useState('');
  const [pageSize, setpageSize] = useState(nPageSize);
  const [pageSizeArray, setpageSizeArray] = useState(aPageSizeArray);
  const [filtering, setFiltering] = React.useState(false);
  const [dataFromAPI, setdataFromAPI] = React.useState([]);

  const [searchType, setSearchType] = React.useState('simple');

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };
  const [searchField, setSearchField] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState('sGBID');

  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');
  const [familyName, setFamilyName] = React.useState('');
  const [spouseName, setSpouseName] = React.useState('');
  const [fatherName, setFatherName] = React.useState('');
  const [motherName, setMotherName] = React.useState('');
  const [dob, setDob] = React.useState(null);
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [minAge, setMinAge] = React.useState('');
  const [maxAge, setMaxAge] = React.useState('');
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

  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  const columns = [
    {
      field: "id",
      title: "Sr No.",
      hidden: true,
      cellStyle: {
        padding: '5px',
      },
    },
    {
      render: rowData => rowData['greenBook']['sCountryID'] + rowData['greenBook']['sGBID'],
      //field: "greenBook.sGBID",
      title: "GB ID",
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
      render: rowData => rowData['greenBook']['sFirstName'] + " " + rowData['greenBook']['sLastName'],
      //field: "abc",
      title: "Name",
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
      field: "greenBook.sFamilyName",
      title: "Family Name",
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
      field: "greenBook.dtDOB",
      title: "DOB",
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
      field: "nAge",
      title: "Age",
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
      field: "greenBook.sFathersName",
      title: "Father's Name",
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
      field: "greenBook.sMothersName",
      title: "Mother's Name",
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
      field: "greenBook.sCity",
      title: "City/Town",
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
      hidden: true,
      field: "edit",
      title: "Edit",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
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
    }
  ];

  const editClick = (tableRowArray) => {
    dispatch(setCurrentSelectedFeature({
      id: tableRowArray['id'],
      sFeature: tableRowArray['sFeature'],
    }));
    console.log(tableRowArray);
    setId(tableRowArray['id']);
    setEditModal(true);
  }

  const editAPICall = (feature) => {
    setBackdrop(true);
    axios.post(`/Feature/EditFeature/ID=` + Id, feature/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          setEditModal(false);
          setAlertMessage("Record Successfully Edited");
          setAlertType("success");
          snackbarOpen();
          axios.get(`Feature/GetFeatures`)
            .then(resp => {
              if (resp.status === 200) {
                dispatch(storeDataAPI(resp.data));
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
      })
      .catch(error => {
        setBackdrop(false);
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

  const addAPICall = (feature) => {
    console.log(feature);
    axios.post(`/Feature/AddFeature/`, feature)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`Feature/GetFeatures`)
            .then(resp => {
              if (resp.status === 200) {
                dispatch(storeDataAPI(resp.data));
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



  const handleSimpleSearch = (e) => {

    //setSearchField(e.target.value,console.log(searchField))
    if (e.target.value.length > 3) {
      const simpleObj = {

        sSearchField: searchFilter,
        sSearchType: e.target.value
      }
      //alert(JSON.stringify(simpleObj));
      axios.post(`Greenbook/GetGreenBookVM`, simpleObj)
        .then(resp => {
          if (resp.status === 200) {
            const mydata = [resp.data]
            console.log(mydata);
            setdataFromAPI(mydata);
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
    }

  }
  const complexObj = {


    sFirstname: firstName,
    sSecondname: secondName,
    sFamilyname: familyName,
    sSpousename: spouseName,
    sFathername: fatherName,
    sMothername: motherName,
    dtDOB: dob,
    sCity: city,
    sState: state,
    sCountry: country,
    sGender: gender,
    nFromAge: minAge,
    nToAge: maxAge
  }
  // const handleComplexSearch = () => {
  //   //setSearchField(e.target.value,console.log(searchField))
  //   alert(JSON.stringify(complexObj))
  // }
  useEffect(() => {
    //Use === instead of ==
    if (authenticationService.currentUserValue === null) {
      history.push('/Login');
    }
  }, []);

  useEffect(() => {
    axios.get(`Country/GetCountries`)
      .then(resp => {
        if (resp.status === 200) {
          setCountryData(resp.data);
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

  useEffect(() => {
    if (firstName.length > 3 || secondName.length > 3 ||
      familyName.length > 3 || spouseName.length > 3 ||
      fatherName.length > 3 || motherName.length > 3 ||
      city.length > 3 || state.length > 3 ||
      dob || country || minAge || maxAge) {
      alert(JSON.stringify(complexObj));
    }
  }, [firstName, secondName, familyName, spouseName, fatherName, motherName, city, state, dob, country, gender, minAge, maxAge]);

  return (
    <>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={9}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Search</Typography>
          </Breadcrumbs>
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={isLoading}
            icons={tableIcons}
            title="Feature"
            columns={columns}
            data={dataFromAPI}
            options={{
              filtering,
              exportButton: true,
              exportAllData: true,
              headerStyle: {
                padding: '0',
                paddingLeft: '10px',
                border: '1px solid lightgrey',
              },
              pageSize: pageSize,
              pageSizeOptions: pageSizeArray
            }}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Feature',
                isFreeAction: true,
                onClick: () => setAddModal(true)
              },
              {
                icon: Search,
                tooltip: 'Show Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />

        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper style={{ padding: '10px' }}>
            {/*<Typography color="textPrimary" align="center">Search</Typography>*/}
            <FormControl component="fieldset">
              <FormLabel component="legend">Search Category</FormLabel>
              <RadioGroup aria-label="search" name="search" value={searchType} onChange={handleChange}>
                <FormControlLabel value="simple" control={<Radio />} label="Simple Search" />
                <FormControlLabel value="complex" control={<Radio />} label="Detailed Search" />
              </RadioGroup>
            </FormControl>
            <Grid container>

              {searchType == 'simple' && <>
                <Typography color="textPrimary" align="center">Simple Search</Typography>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      autoFocus
                      id="id_searchField"
                      label="Search Field"
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
                      <MenuItem value="OldGreenBkNo">Old GB Number</MenuItem>
                      <MenuItem value="sOldGreenBKNo">First GB Number</MenuItem>
                      <MenuItem value="sResidenceNumber">Residence Number</MenuItem>
                      <MenuItem value="sFathersGBID">Father's GB Number</MenuItem>
                      <MenuItem value="sMothersGBID">Mother's GB Number</MenuItem>
                      <MenuItem value="sSpouseID">Spouse GB Number</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
              }
              {searchType == 'complex' && <>
                <Typography color="textPrimary" align="center">Complex Search</Typography>
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

                      id="id_SecondName"
                      label="Second Name"
                      type="text"
                      onChange={(e) => { setSecondName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField

                      id="id_FamilyName"
                      label="Family Name"
                      type="text"
                      onChange={(e) => { setFamilyName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField

                      id="id_SpouseName"
                      label="SpouseName"
                      type="text"
                      onChange={(e) => { setSpouseName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField

                      id="id_FatherName"
                      label="Father's Name"
                      type="text"
                      onChange={(e) => { setFatherName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField

                      id="id_MotherName"
                      label="Mother's Name"
                      type="text"
                      onChange={(e) => { setMotherName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="id_dtDOB"
                        label="DOB"
                        format="MM/dd/yyyy"
                        onChange={(date) => { setDob(date) }}
                        value={dob}
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
                    <TextField

                      id="id_city"
                      label="City/Town"
                      type="text"
                      onChange={(e) => { setCity(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_state"
                      label="State"
                      type="text"
                      onChange={(e) => { setState(e.target.value) }}
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
                            console.log(value.sCountryID);
                            setCountry(value.sCountryID);
                          }
                          else {
                            setCountry('');
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
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="lbl_gender">Gender</InputLabel>
                    <Select
                      labelId="lbl_gender"
                      id="id_gender"
                      onChange={(e) => { setGender(e.target.value) }}
                    >
                      <MenuItem value={'M'}>Male</MenuItem>
                      <MenuItem value={'F'}>Female</MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="lbl_minAge">Min Age</InputLabel>
                    {/*<TextField
                      id="id_minAge"
                      label="Min Age"
                      type="number"
                      onChange={(e) => { setMinAge(e.target.value) }}
                    />*/}
                    <Select
                      labelId="lbl_minAge"
                      id="id_minAge"
                      onChange={(e) => { setMinAge(e.target.value) }}
                    >
                      {
                        ageCoded.map((singleage) => {
                          return <MenuItem value={singleage}>{singleage}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="lbl_maxAge">Max Age</InputLabel>
                    {/*<TextField
                      id="id_maxAge"
                      label="Max Age"
                      type="number"
                      onChange={(e) => { setMaxAge(e.target.value) }}
                    />*/}
                    <Select
                      labelId="lbl_maxAge"
                      id="id_maxAge"
                      onChange={(e) => { setMaxAge(e.target.value) }}
                    >
                      {
                        ageCoded.map((singleage) => {
                          return <MenuItem value={singleage}>{singleage}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </>}
            </Grid>
          </Paper>
        </Grid>
        {addModal && <AddDialog
          addModal={addModal}
          classes={classes}
          handleAddClickClose={handleAddClickClose}
          addAPICall={addAPICall}
        />}
        {editModal && <EditDialog
          editModal={editModal}
          classes={classes}
          handleEditClickClose={handleEditClickClose}
          editAPICall={editAPICall}
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