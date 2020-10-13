import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {
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
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { useHistory } from 'react-router-dom';
import handleError from '../../../auth/_helpers/handleError';

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingBottom: 0.01875,
    paddingTop: 0.01875,
    flexGrow: 1,
    'label + &': {
      marginTop: 1.5
    }
  },
  selectEmpty: {
    marginTop: 0.5,
  },
  formControl: {
    margin: 0.01875,
    width: '95%'
  },
  paper: {
    padding: 0.01875,
    textAlign: 'center'
  },
  textField: {
    marginTop: 0.01875,
    marginBottom: 0.01875
  },
  dateField: {
    marginTop: 0.01875,
    marginBottom: 0.01875
  },
  box: {
    marginBottom: 0.01875,
    marginTop: 0.01875
  },
  button: {
    margin: 0.01875
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
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
  },
  option: {
    fontSize: 10,
    '& > span': {
      marginRight: 5,
      fontSize: 16
    }
  }
});

export default function NewEntry(props) {
  const classes = useStyles();
  const history = useHistory(); 
  const [expanded, setExpanded] = React.useState('panel1');
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [lAuthRegion, setlAuthRegion] = useState([]);
  const [lCountry, setlCountry] = useState([]);
  const [lDOBApprox, setlDOBApprox] = useState([]);
  const [lOccupation, setlOccupation] = useState([]);
  const [lProvince, setlProvince] = useState([]);
  const [lQualification, setlQualification] = useState([]);

  const [sGBID, setsGBID] = useState('');
  const [nAuthRegionID, setnAuthRegionID] = useState('');
  const [sFirstName, setsFirstName] = useState('');
  const [sMiddleName, setsMiddleName] = useState('');
  const [sFamilyName, setsFamilyName] = useState('');
  const [sGender, setsGender] = useState('');
  const [dtDOB, setdtDOB] = useState(null);
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
  const [dtFormDate, setdtFormDate] = useState(null);
  const [sFathersName, setsFathersName] = useState('');
  const [sFathersID, setsFathersID] = useState('');
  const [sFathersGBID, setsFathersGBID] = useState('');
  const [sMothersName, setsMothersName] = useState('');
  const [sMothersID, setsMothersID] = useState('');
  const [sMothersGBID, setsMothersGBID] = useState('');
  const [sSpouseName, setsSpouseName] = useState('');
  const [sSpouseID, setsSpouseID] = useState('');
  const [sSpouseGBID, setsSpouseGBID] = useState('');
  const [nChildrenM, setnChildrenM] = useState(0);
  const [nChildrenF, setnChildrenF] = useState(0);
  const [sAddress1, setsAddress1] = useState('');
  const [sAddress2, setsAddress2] = useState('');
  const [sCity, setsCity] = useState('');
  const [sState, setsState] = useState('');
  const [sPCode, setsPCode] = useState('');
  const [sCountryID, setsCountryID] = useState('');
  const [sEmail, setsEmail] = useState('');
  const [sPhone, setsPhone] = useState('');
  const [sFax, setsFax] = useState('');
  const [dtDeceased, setdtDeceased] = useState(null);
  const [sBookIssued, setsBookIssued] = useState('');
  const [dtValidityDate, setdtValidityDate] = useState(null);
  const [sPaidUntil, setsPaidUntil] = useState('');
  const [sEnteredDateTime, setsEnteredDateTime] = useState('');
  const [TibetanName, setTibetanName] = useState('');
  const [TBUPlaceOfBirth, setTBUPlaceOfBirth] = useState('');
  const [TBUOriginVillage, setTBUOriginVillage] = useState('');
  const [TBUFathersName, setTBUFathersName] = useState('');
  const [TBUMothersName, setTBUMothersName] = useState('');
  const [TBUSpouseName, setTBUSpouseName] = useState('');

  useEffect(() => {
    axios.get(`/Greenbook/GetGBDataNewEntry/Id=` + props.match.params.FORMNO)
      .then(resp => {
        if (resp.status === 200) {
          //Masters
          setlAuthRegion(resp.data.lAuthRegion);
          setlCountry(resp.data.lCountry);
          setlDOBApprox(resp.data.lDOBApprox);
          setlOccupation(resp.data.lOccupation);
          setlProvince(resp.data.lProvince);
          setlQualification(resp.data.lQualification);
          //Binded Fields
          setnAuthRegionID(resp.data.oMadeb.nAuthRegionID);
          //GBID
          setsGBID(resp.data.oMadeb.sGBID);
          //Name
          setsFirstName(resp.data.oMadeb.sName);
          //Father's name
          setsFathersName(resp.data.oMadeb.sFathersName);
          //Docs Attached
          setsOtherDocuments(resp.data.oMadeb.sFathersName);
          //Current GB Serial Number
          setsFstGreenBkNo(resp.data.oMadeb.nCurrentGBSno);
          //sAlias
          setsAliasName(resp.data.oMadeb.sAlias);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = () => {
    let greenbook = {
      sGBID,
      nAuthRegionID,
      sFirstName,
      sMiddleName,
      sFamilyName,
      sGender,
      dtDOB,
      sDOBApprox,
      sBirthPlace,
      sBirthCountryID,
      sOriginVillage,
      sOriginProvinceID,
      sMarried,
      sOtherDocuments,
      sResidenceNumber,
      sQualificationID,
      sOccupationID,
      sAliasName,
      sOldGreenBKNo,
      sFstGreenBkNo,
      dtFormDate,
      sFathersName,
      sFathersID,
      sFathersGBID,
      sMothersName,
      sMothersID,
      sMothersGBID,
      sSpouseName,
      sSpouseID,
      sSpouseGBID,
      nChildrenM,
      nChildrenF,
      sAddress1,
      sAddress2,
      sCity,
      sState,
      sPCode,
      sCountryID,
      sEmail,
      sPhone,
      sFax,
      dtDeceased,
      sBookIssued,
      dtValidityDate,
      sPaidUntil,
      sEnteredDateTime,
      TibetanName,
      TBUPlaceOfBirth,
      TBUOriginVillage,
      TBUFathersName,
      TBUMothersName,
      TBUSpouseName
    };

    console.table(greenbook);
    // axios.post(`/Greenbook/AddGreenbook/`, greenbook)
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       history.push("/SarsoNewGBEntry");
    //     }
    //   })
    //   .catch(error => {
    //     handleError(error, history);
    //   })
    //   .then(release => {
    //     //console.log(release); => udefined
    //   });
  };

  return (
    <Container maxWidth="lg" disableGutters={true}><br />
      <Typography variant="h5" gutterBottom>New Entry - {sGBID}</Typography>
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
                <Typography
                  className={"font-weight-bold font-size-sm mb-1 text-black"}
                >Personal Information</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sGBID"
                        name="name_sGBID"
                        label="Greenbook ID"
                        type="text"
                        value={sGBID}
                        onChange={(e) => { setsGBID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        inputRef={register({
                          required: true,
                          maxLength: 9
                        })}
                        required
                      />
                      {_.get("name_sGBID.type", errors) === "required" && (
                        <p>This field is required</p>
                      )}
                      {_.get("name_sGBID.type", errors) === "maxLength" && (
                        <p>GBID cannot exceed 9 characters</p>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} >
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              console.log(value.id);
                              setnAuthRegionID(value.id);
                            }
                            else {
                              setnAuthRegionID(0);
                            }
                          }
                        }
                        id="id_nAuthRegionID"
                        options={lAuthRegion}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
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
                              autoComplete: 'new-password',
                            }}
                          />
                        )}
                      />
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
                        margin="dense"
                        className={classes.textField}
                        value={sFirstName}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sMiddleName"
                        label="Middle Name"
                        type="text"
                        onChange={(e) => { setsMiddleName(e.target.value); }}
                        fullWidth
                        margin="dense"

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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
                        className={classes.textField}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
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
                      <Autocomplete
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              console.log(value.id);
                              setsBirthCountryID(value.id.toString());
                            }
                            else {
                              setsBirthCountryID("0");
                            }
                          }
                        }
                        id="country-select-demo"
                        options={lCountry}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
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
                            label="Choose a Birth Country"
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password',
                            }}
                          />
                        )}
                      />
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
                        margin="dense"
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
                          margin="dense"
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
                        margin="dense"
                        className={classes.textField}
                        required
                        value={sFathersName}
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"

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
                        margin="dense"
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
                        margin="dense"
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
                          margin="dense"
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
                          margin="dense"
                          className={classes.textField}
                          require
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <Autocomplete
                          openOnFocus
                          clearOnEscape
                          onChange={
                            (e, value) => {
                              if (value !== null) {
                                console.log(value.id);
                                setsCountryID(value.id.toString());
                              }
                              else {
                                setsCountryID("0");
                              }
                            }
                          }
                          id="id_sCountryID"
                          options={lCountry}
                          classes={{
                            option: classes.option,
                          }}
                          className={classes.textField}
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
                                autoComplete: 'new-password',
                              }}
                            />
                          )}
                        />
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
                          margin="dense"
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
                <Typography
                  className={"font-weight-bold font-size-sm mb-1 text-black"}
                >Basic Personal Information</Typography>
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
                        margin="dense"
                        className={classes.textField}
                        value={sAliasName}
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
                          margin="dense"
                          className={classes.textField}
                          onChange={(e) => { setsGender(e.target.value) }}
                        >
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sPaidUntil"
                          label="Paid Until"
                          type="number"
                          onChange={(e) => { setsPaidUntil(e.target.value); }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              console.log(value.id);
                              setsOriginProvinceID(value.id.toString());
                            }
                            else {
                              setsOriginProvinceID("0");
                            }
                          }
                        }
                        id="id_sOriginProvinceID"
                        options={lProvince}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sProvince}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sProvince}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Province Name"
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
                      <TextField
                        id="id_sFstGreenBkNo"
                        label="First GB Number"
                        type="text"
                        onChange={(e) => { setsFstGreenBkNo(e.target.value); }}
                        fullWidth
                        margin="dense"
                        value={sFstGreenBkNo}
                        className={classes.textField}
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
                              console.log(value.id);
                              setsQualificationID(value.id.toString());
                            }
                            else {
                              setsQualificationID("0");
                            }
                          }
                        }
                        id="id_sQualificationID"
                        options={lQualification}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sQualification}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sQualification}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Qualification"
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password'
                            }}
                          />
                        )}
                      />
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
                        margin="dense"
                        value={sOtherDocuments}
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
                        margin="dense"
                        className={classes.textField}
                      >
                        <MenuItem value={"Y"}>Yes</MenuItem>
                        <MenuItem value={"N"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
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
                      <Autocomplete
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              console.log(value);
                              setsDOBApprox(value.id.toString());
                            }
                            else {
                              setsDOBApprox("0");
                            }
                          }
                        }
                        id="id_sDOBApprox"
                        options={lDOBApprox}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sDOBApproxName}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sDOBApproxName}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="DOB Approx"
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password'
                            }}
                          />
                        )}
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
                        className={classes.textField}
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
                              setsOccupationID(value.id.toString());
                            }
                            else {
                              setsOccupationID(0);
                            }
                          }
                        }
                        id="id_sOccupationID"
                        options={lOccupation}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sOccupationDesc}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sOccupationDesc}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Occupation"
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
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
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
                <Typography
                  className={"font-weight-bold font-size-sm mb-1 text-black"}
                >Relation & Contact Details</Typography>
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                        margin="dense"
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
                          margin="dense"
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
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sEmail"
                        name="name_sEmail"
                        label="Email"
                        type="email"
                        onChange={(e) => { setsEmail(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {_.get("name_sEmail.type", errors) === "required" && (
                        <p>This field is required</p>
                      )}
                    </FormControl>
                  </Grid>

                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <br />
            <Grid item xs={12}>
              <Button
                variant="outlined"
                type="submit"
                color="primary"
                style={{ marginRight: "10px" }}>Save</Button>
              <Button variant="outlined"
                onClick={() => { history.push('/SarsoNewGBEntry') }}
              >Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
