import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  TextField
} from '@material-ui/core';
import _ from "lodash/fp";
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import theme from '../../../theme/theme/theme'

import AddIcon from '@material-ui/icons/Add';
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MUIDataTable from "mui-datatables";
//import { ThemeProvider } from '@material-ui/styles';

import Slide from '@material-ui/core/Slide';
// import IconButton from '@material-ui/core/IconButton';
// import AddCircleIcon from "@material-ui/icons/AddCircle";

// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
// import { AddAPhotoOutlined } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingBottom: 3,
    paddingTop: 3,
    flexGrow: 1,
    'label + &': {
      marginTop: 3
    }
  },
  selectEmpty: {
    marginTop: 1.5,
  },
  formControl: {
    margin: 2,
    width: '95%'
  },
  paper: {
    padding: 2,
    textAlign: 'center'
  },
  textField: {
    marginTop: 0.15,
    marginBottom: 0.15
  },
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25
  },
  box: {
    marginBottom: 1.5,
    marginTop: 1.5
  },
  button: {
    margin: 1,
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
  }
});

export default function EnhancedTable() {
  const classes = useStyles();
  //Accordion
  const [expanded, setExpanded] = React.useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //VARS to track
  const [sGBID, setsGBID] = useState('');
  const [nAuthRegionID, setnAuthRegionID] = useState('');
  const [sFirstName, setsFirstName] = useState('');
  const [sSecondName, setsSecondName] = useState('');
  const [sFamilyName, setsFamilyName] = useState('');
  const [sGender, setsGender] = useState('');
  const [dtDOB, setdtDOB] = useState(new Date());
  const [sDOBApprox, setsDOBApprox] = useState('');
  const [sBirthPlace, setsBirthPlace] = useState('');
  const [sBirthCountryID, setsBirthCountryID] = useState('');
  const [sOriginVillage, setsOriginVillage] = useState('');
  const [sOriginProvinceID, setsOriginProvinceID] = useState('');
  const [sMarried, setsMarried] = useState('');
  const [sOtherDocuments, setsOtherDocuments] = useState('');
  const [sResidenceNumber, setsResidenceNumber] = useState('');
  const [sQualificationID, setsQualificationID] = useState('');
  const [sOccupationID, setsOccupationID] = useState('');
  const [sAliasName, setsAliasName] = useState('');
  const [sOldGreenBKNo, setsOldGreenBKNo] = useState('');
  const [sFstGreenBkNo, setsFstGreenBkNo] = useState('');
  const [dtFormDate, setdtFormDate] = useState(new Date());
  const [sFathersName, setsFathersName] = useState('');
  const [sFathersID, setsFathersID] = useState('');
  const [sFathersGBID, setsFathersGBID] = useState('');
  const [sMothersName, setsMothersName] = useState('');
  const [sMothersID, setsMothersID] = useState('');
  const [sMothersGBID, setsMothersGBID] = useState('');
  const [sSpouseName, setsSpouseName] = useState('');
  const [sSpouseID, setsSpouseID] = useState('');
  const [sSpouseGBID, setsSpouseGBID] = useState('');
  const [nChildrenM, setnChildrenM] = useState('');
  const [nChildrenF, setnChildrenF] = useState('');
  const [sAddress1, setsAddress1] = useState('');
  const [sAddress2, setsAddress2] = useState('');
  const [sCity, setsCity] = useState('');
  const [sState, setsState] = useState('');
  const [sPCode, setsPCode] = useState('');
  const [sCountryID, setsCountryID] = useState('');
  const [sEmail, setsEmail] = useState('');
  const [sPhone, setsPhone] = useState('');
  const [sFax, setsFax] = useState('');
  const [dtDeceased, setdtDeceased] = useState(new Date());
  const [sBookIssued, setsBookIssued] = useState('');
  const [dtValidityDate, setdtValidityDate] = useState(new Date());
  const [sPaidUntil, setsPaidUntil] = useState('');
  const [sEnteredDateTime, setsEnteredDateTime] = useState('');
  const [TibetanName, setTibetanName] = useState('');
  const [TBUPlaceOfBirth, setTBUPlaceOfBirth] = useState('');
  const [TBUOriginVillage, setTBUOriginVillage] = useState('');
  const [TBUFathersName, setTBUFathersName] = useState('');
  const [TBUMothersName, setTBUMothersName] = useState('');
  const [TBUSpouseName, setTBUSpouseName] = useState('');

  // useEffect(() => {
  //   axios.get(`/GivenGBID/GetGivenGBIDs`)
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         console.log(resp.data);
  //         setdataAPI(resp.data)
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         console.error(error.response.data);
  //         console.error(error.response.status);
  //         console.error(error.response.headers);
  //       } else if (error.request) {
  //         console.warn(error.request);
  //       } else {
  //         console.error('Error', error.message);
  //       }
  //       console.log(error.config);
  //     })
  //     .then(release => {
  //       //console.log(release); => udefined
  //     });
  // }, []);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = () => {
    //Throws Error, Maybe handled by react-hook-forms itself
    //e.preventDefault();

    alert("In")
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="lg" disableGutters={true}><br />
        <Typography variant="h4" gutterBottom>New Entry</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.box}>
          <Grid container className={classes.box}>

            <Grid item xs={12}>
              <ExpansionPanel
                TransitionProps={{ unmountOnExit: true }}
                expanded={expanded === 'panel1'}
                onChange={handleAccordionChange('panel1')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Greenbook Required Fields</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sGBID"
                          name="GBID"
                          label="Greenbook ID"
                          type="text"
                          onChange={(e) => { setsGBID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          ref={register({
                            required: true,
                            maxLength: 9
                          })}
                        />
                        {_.get("GBID.type", errors) === "required" && (
                          <p>This field is required</p>
                        )}
                        {_.get("GBID.type", errors) === "maxLength" && (
                          <p>GBID cannot exceed 9 characters</p>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_nAuthRegionID">Authority Region</InputLabel>
                        <Select
                          id="id_nAuthRegionID"
                          label="Authority Region"
                          type="text"
                          onChange={(e) => { setnAuthRegionID(e.target.value) }}
                          fullWidth
                          margin="normal"
                          required
                        >
                          <MenuItem value={10}>Aargau</MenuItem>
                          <MenuItem value={20}>Alberta</MenuItem>
                          <MenuItem value={30}>Dharamshala</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sFirstName"
                          label="First Name"
                          type="text"
                          onChange={(e) => { setsFirstName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sSecondName"
                          label="Second Name"
                          type="text"
                          onChange={(e) => { setsSecondName(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sFamilyName"
                          label="Family Name"
                          type="text"
                          onChange={(e) => { setsFamilyName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TibetanName"
                          label="Tibetan Name (Tibetan)"
                          type="text"
                          onChange={(e) => { setTibetanName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUPlaceOfBirth"
                          label="Place Of Birth (Tibetan)"
                          type="text"
                          onChange={(e) => { setTBUPlaceOfBirth(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUOriginVillage"
                          label="Origin Village (Tibetan)"
                          type="text"
                          onChange={(e) => { setTBUOriginVillage(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
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
                            onChange={(date) => { setdtDOB(date) }}
                            value={dtDOB}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            fullWidth
                            className={classes.dateField}
                            required
                          />
                        </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_sBirthCountryID">Birth Country</InputLabel>
                        <Select
                          id="id_sBirthCountryID"
                          label="Birth Country"
                          type="text"
                          onChange={(e) => { setsBirthCountryID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        >
                          <MenuItem value={"IN"}>India</MenuItem>
                          <MenuItem value={"AF"}>Afhganistan</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sBirthPlace"
                          label="Place of Birth"
                          type="text"
                          onChange={(e) => { setsBirthPlace(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="id_dtFormDate"
                            label="Sarso Form Date"
                            format="MM/dd/yyyy"
                            onChange={(date) => { setdtFormDate(date) }}
                            value={dtFormDate}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            fullWidth
                            className={classes.dateField}
                            required
                          />
                        </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sFathersName"
                          label="Father's Name"
                          type="text"
                          onChange={(e) => { setsFathersName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUFathersName"
                          label="Father's Name (Tibetan)"
                          type="text"
                          onChange={(e) => { setTBUFathersName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sFathersGBID"
                          label="Father's GB No"
                          type="text"
                          onChange={(e) => { setsFathersGBID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sMothersName"
                          label="Mother's Name"
                          type="text"
                          onChange={(e) => { setsMothersName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUMothersName"
                          label="Mother's Name (Tibetan)"
                          type="text"
                          onChange={(e) => { setTBUMothersName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sMothersGBID"
                          label="Mother's GB No"
                          type="text"
                          onChange={(e) => { setsMothersGBID(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sAddress1"
                          label="Address 1"
                          type="text"
                          onChange={(e) => { setsAddress1(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          multiline={true}
                          rows={1}
                          rowsMax={3}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sAddress2"
                          label="Address 2"
                          type="text"
                          onChange={(e) => { setsAddress2(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                          multiline={true}
                          rows={1}
                          rowsMax={3}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="id_sCity"
                            label="City"
                            type="text"
                            onChange={(e) => { setsCity(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="id_sState"
                            label="State"
                            type="text"
                            onChange={(e) => { setsState(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            require
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="id_sCountryID">Country</InputLabel>
                          <Select
                            id="id_sCountryID"
                            label="Country"
                            type="text"
                            onChange={(e) => { setsCountryID(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            required
                          >
                            <MenuItem value={"IN"}>India</MenuItem>
                            <MenuItem value={"AF"}>Afganisthan</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="id_sPCode"
                            label="Pin Code"
                            type="text"
                            onChange={(e) => { setsPCode(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>

            <Grid item xs={12}>
              <ExpansionPanel
                TransitionProps={{ unmountOnExit: true }}
                expanded={expanded === 'panel2'}
                onChange={handleAccordionChange('panel2')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Basic Personal Information</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sAliasName"
                          label="Alias Name"
                          type="text"
                          onChange={(e) => { setsAliasName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="id_sGender">Gender</InputLabel>
                          <Select
                            id="id_sGender"
                            label="Gender"
                            type="text"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                          >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="id_sPaidUntil"
                            label="Paid Until"
                            type="text"
                            onChange={(e) => { setsPaidUntil(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_sOriginProvinceID">Province Name</InputLabel>
                        <Select
                          id="id_sOriginProvinceID"
                          label="Province Name"
                          type="text"
                          onChange={(e) => { setsOriginProvinceID(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        >
                          <MenuItem value={"IN"}>India</MenuItem>
                          <MenuItem value={"AF"}>Afhganistan</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sFstGreenBkNo"
                          label="First GB Number"
                          type="text"
                          onChange={(e) => { setsFstGreenBkNo(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_sQualificationID">Qualification</InputLabel>
                        <Select
                          id="id_sQualificationID"
                          label="Qualification"
                          type="text"
                          onChange={(e) => { setsQualificationID(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        >
                          <MenuItem value={"Grad"}>Graduation</MenuItem>
                          <MenuItem value={"Mat"}>Matriculation</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sDocuments"
                          label="Other Documents"
                          type="text"
                          onChange={(e) => { setsOtherDocuments(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_sMarried">Marital Status</InputLabel>
                        <Select
                          id="id_sMarried"
                          label="Marital Status"
                          type="text"
                          onChange={(e) => { setsMarried(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        >
                          <MenuItem value={"Yes"}>Yes</MenuItem>
                          <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="id_dtValidityDate"
                            label="Validity Date"
                            format="MM/dd/yyyy"
                            onChange={(date) => { setdtValidityDate(date) }}
                            value={dtDeceased}
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
                          id="id_sDOBApprox"
                          label="DOB Approx"
                          type="text"
                          onChange={(e) => { setsDOBApprox(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sOriginVillage"
                          label="Origin Village"
                          type="text"
                          onChange={(e) => { setsOriginVillage(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sOldGreenBKNo"
                          label="Old GB Number"
                          type="text"
                          onChange={(e) => { setsOldGreenBKNo(e.target.value); }}
                          fullWidth
                          margin="normal"

                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sResidenceNumber"
                          label="RC Number"
                          type="text"
                          onChange={(e) => { setsResidenceNumber(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_sOccupationID">Occupation</InputLabel>
                        <Select
                          id="id_sOccupationID"
                          label="Occupation"
                          type="text"
                          onChange={(e) => { setsOccupationID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        >
                          <MenuItem value={"aged"}>Aged</MenuItem>
                          <MenuItem value={"housewife"}>Housewife</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="id_dtDeceased"
                            label="Deceased Date"
                            format="MM/dd/yyyy"
                            onChange={(date) => { setdtDeceased(date) }}
                            value={dtDeceased}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            fullWidth
                            className={classes.dateField}
                          />
                        </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
            {/*Relation Details*/}
            <Grid item xs={12}>
              <ExpansionPanel
                TransitionProps={{ unmountOnExit: true }}
                expanded={expanded === 'panel3'}
                onChange={handleAccordionChange('panel3')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Relation & Contact Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sFathersID"
                          label="Father's Old GB No"
                          type="text"
                          onChange={(e) => { setsFathersID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sMothersID"
                          label="Mother's Old GB No"
                          type="text"
                          onChange={(e) => { setsMothersID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sSpouseID"
                          label="Spouse's Old GB No"
                          type="text"
                          onChange={(e) => { setsSpouseID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sSpouseGBID"
                          label="Spouse GB No"
                          type="text"
                          onChange={(e) => { setsSpouseGBID(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sSpouseName"
                          label="Spouse Name"
                          type="text"
                          onChange={(e) => { setsSpouseName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUSpouseName"
                          label="Spouse Name (Tibetan)"
                          type="text"
                          onChange={(e) => { setTBUSpouseName(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="id_sFax"
                            label="Fax Number"
                            type="text"
                            onChange={(e) => { setsFax(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            id="id_sPhone"
                            label="Phone Number"
                            type="text"
                            onChange={(e) => { setsPhone(e.target.value); }}
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sEmail"
                          label="Email"
                          type="email"
                          onChange={(e) => { setsEmail(e.target.value); }}
                          fullWidth
                          margin="normal"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" type="submit" color="primary">Save</Button>
                      <Button variant="outlined">CanceL</Button>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
