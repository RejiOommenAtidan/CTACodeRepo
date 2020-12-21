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
import {useSelector} from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Moment from 'moment';
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
import { sDateFormatMUIDatepicker,sButtonColor,sButtonSize,sButtonVariant,sDDMMYYYYRegex } from '../../../config/commonConfig';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/pageBackDrop';;

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
  },
  expansionPanel:{
    backgroundColor:'#4e5287'
  },
  expansionHeading:{
    color:'#ffffff'
  }
});

export default function NewEntry(props) {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [backdrop, setBackdrop] = React.useState(true);
  const classes = useStyles();
  let history = useHistory();
  const [expanded, setExpanded] = React.useState('');
  const [lAuthRegion, setlAuthRegion] = useState([]);
  const [lCountry, setlCountry] = useState([]);
  const [lDOBApprox, setlDOBApprox] = useState([]);
  const [lOccupation, setlOccupation] = useState([]);
  const [lProvince, setlProvince] = useState([]);
  const [lQualification, setlQualification] = useState([]);
  const [sGBID, setsGBID] = useState('');
  const [nAuthRegionID, setnAuthRegionID] = useState('');
  const [sFirstName, setsFirstName] = useState('');
  const [sLastName, setsLastName] = useState('');
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
  // const [sEnteredDateTime, setsEnteredDateTime] = useState('');
  const [TibetanName, setTibetanName] = useState('');
  const [TBUPlaceOfBirth, setTBUPlaceOfBirth] = useState('');
  const [TBUOriginVillage, setTBUOriginVillage] = useState('');
  const [TBUFathersName, setTBUFathersName] = useState('');
  const [TBUMothersName, setTBUMothersName] = useState('');
  const [TBUSpouseName, setTBUSpouseName] = useState('');

  //#region Alert & Snackbar
const [snackbar, setSnackbar] = React.useState(false);
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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    console.log(isExpanded ? panel : false);
  };

  const { register, handleSubmit, errors, setValue,formState } = useForm();

  const onSubmit = () => {
  
    setBackdrop(true);
    let greenbook = {
      sGBID,
      nAuthRegionID,
      sFirstName,
      sLastName,
      sFamilyName,
      sGender,
      dtDOB: Moment(dtDOB).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtDOB).format('YYYY-MM-DD') : null,
      //dtDOB,
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
      dtFormDate: Moment(dtFormDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtFormDate).format('YYYY-MM-DD') : null,
      //dtDOB,
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
      dtDeceased: Moment(dtDeceased).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtDeceased).format('YYYY-MM-DD') : null,
      //dtDeceased,
      sBookIssued,
      dtValidityDate: Moment(dtValidityDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtValidityDate).format('YYYY-MM-DD') : null,
      //dtValidityDate,
      sPaidUntil,
      // sEnteredDateTime,
      TibetanName,
      TBUPlaceOfBirth,
      TBUOriginVillage,
      TBUFathersName,
      TBUMothersName,
      TBUSpouseName,
      nEnteredBy:userId,
      nUpdatedBy:userId
    };

    axios.post(`/Greenbook/AddGreenbook/`, greenbook)
      .then(resp => {
        if (resp.status === 200) {
          setAlertMessage("Green Book Created Successfully, Hold on being Redirected");
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          setTimeout(() => { history.push("/SarsoNewGBEntry"); }, 3000);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

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
          ////Binded Fields
          let apiDataMadeb = resp.data.oGivenGBIDMadebVM.oMadeb;
          let apiDataGivenGBID = resp.data.oGivenGBIDMadebVM.oGivenGBID;
          setnAuthRegionID(apiDataMadeb===null?null:apiDataMadeb.nAuthRegionID);
          setsGBID(apiDataMadeb===null?null:apiDataMadeb.sGBID);
          if(apiDataMadeb!==null){
            if(apiDataMadeb.sName.includes(" ")){
              setsFirstName(apiDataMadeb.sName.split(" ")[0]);
              setsLastName(apiDataMadeb.sName.split(/ (.+)/)[1]);
            }
            else{
              setsFirstName(apiDataMadeb.sName);
            }
          }
      
          setsFathersName(apiDataMadeb===null?null:apiDataMadeb.sFathersName);
          setsOtherDocuments(apiDataMadeb===null?null:apiDataMadeb.sDocumentAttached);
          setsFstGreenBkNo(apiDataMadeb===null?null:apiDataMadeb.nCurrentGBSno);
          setsAliasName(apiDataMadeb===null?null:apiDataMadeb.sAlias);
          setdtFormDate(apiDataMadeb===null?null:apiDataMadeb.dtReceived);
          setsGBID(apiDataGivenGBID===null?null:apiDataGivenGBID.nGBId.toString());
          setExpanded('panel1');
          setBackdrop(false);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);

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
                expandIcon={<ExpandMoreIcon className={classes.expansionHeading}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography
                  className={classes.expansionHeading}
                >Basic Personal Details (Mandatory Fields)</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sGBID"
                        name="name_sGBID"
                        label={<>Green Book ID<span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setsGBID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        inputRef={register({
                          required: true,
                          //minLength: 7,
                          maxLength: 7
                        })}
                        InputProps={{
                          readOnly: true
                        }}
                        defaultValue={sGBID}
                      />
                      {_.get("name_sGBID.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                      {/*{_.get("name_sGBID.type", errors) === "minLength" && (
                        <span style={{ color: 'red' }}>GBID cannot subceed 7 characters</span>
                      )}*/}
                      {_.get("name_sGBID.type", errors) === "maxLength" && (
                        <span style={{ color: 'red' }}>GBID cannot exceed 7 characters</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} >
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lAuthRegion.find(authRegion => authRegion.id === nAuthRegionID)}
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
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
                          
                            label={<>Authority Region<span style={{color:'red'}}> *</span></>}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'off',
                            }}
                            name="name_nAuthRegionID"
                            inputRef={register({
                              required: true
                            })}
                          />
                        )}
                      />
                      {_.get("name_nAuthRegionID.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sFirstName"
                       
                        label={<>First Name<span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setsFirstName(e.target.value); }}
                        autoFocus
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_sFirstName"
                        inputRef={register({
                          required: true
                        })}
                        defaultValue={sFirstName}
                      />
                      {_.get("name_sFirstName.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sLastName"
                        label="Last Name"
                        
                        type="text"
                        onChange={(e) => { setsLastName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sLastName}
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
                        defaultValue={sFamilyName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TibetanName"
                      
                        label={<>Tibetan Name (Tibetan) མིང་། <span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setTibetanName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_TibetanName"
                        defaultValue={TibetanName}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {_.get("name_TibetanName.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TBUPlaceOfBirth"
                       
                        label={<> Place Of Birth (Tibetan) སྐྱེས་ཡུལ།<span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setTBUPlaceOfBirth(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        inputRef={register({
                          required: true
                        })}
                        name="name_TBUPlaceOfBirth"
                        defaultValue={TBUPlaceOfBirth}
                      />
                      {_.get("name_TBUPlaceOfBirth.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TBUOriginVillage"
                        
                        label={<>Origin Village (Tibetan) ཕ་ཡུལ། <span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setTBUOriginVillage(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_TBUOriginVillage"
                        inputRef={register({
                          required: true
                        })}
                        defaultValue={TBUOriginVillage}
                      />
                      {_.get("name_TBUOriginVillage.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              id="id_dtDOB"
                              name="name_dtDOB"
                              variant="dialog"
                              openTo="year"
                              views={["year", "month", "date"]}
                              margin="dense"
                              inputRef={register({
                                required: true,
                                pattern: 
                                {
                                  value: new RegExp(sDDMMYYYYRegex),
                                  message: "Invalid Date"
                                }
                              })}
                              label={<> DOB<span style={{ color: 'red' }}> *</span></>}
                              format={sDateFormatMUIDatepicker}
                              onChange={date => { 
                                if(date){
                                  setdtDOB(date); 
                                  setValue('name_dtDOB', date, {shouldValidate: true});
                                }
                              }}
                              value={dtDOB}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              fullWidth
                              className={classes.dateField}
                            />
                      </MuiPickersUtilsProvider>
                      {_.get("name_dtDOB.type", errors) === "required" && (
                          <span style={{ color: 'red' }}>This field is required</span>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        openOnFocus
                        value={lCountry.find(birthCountry => birthCountry.sCountryID === sBirthCountryID)}
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              setsBirthCountryID(value.sCountryID);
                            }
                            else {
                              setsBirthCountryID("");
                            }
                          }
                        }
                        id="id_sBirthCountryID"
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
                           
                            label={<>Choose a Birth Country <span style={{color:'red'}}> *</span></>}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'off',
                            }}
                            name="name_sBirthCountryID"
                            inputRef={register({
                              required: true
                            })}
                          />
                        )}
                      />
                      {_.get("name_sBirthCountryID.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sBirthPlace"
                  
                        label={<>Place of Birth <span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setsBirthPlace(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_sBirthPlace"
                        inputRef={register({
                          required: true
                        })}
                        defaultValue={sBirthPlace}
                      />
                      {_.get("name_sBirthPlace.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                </Grid>
                <Grid xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disabled={true}
                          variant="dialog"
                          openTo="year"
                          views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtFormDate"
                          name="name_dtFormDate"
                         
                          label={<> Sarso Form Date<span style={{color:'red'}}> *</span></>}
                          format={sDateFormatMUIDatepicker}
                          onChange={date => { setdtFormDate(date) }}
                          value={dtFormDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          inputRef={register({
                            required: true
                          })}
                          fullWidth
                          className={classes.dateField}
                        />
                      </MuiPickersUtilsProvider>
                      {_.get("name_dtFormDate.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sFathersName"
                        
                        label={<>Father's Name <span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setsFathersName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        inputRef={register({
                          required: true
                        })}
                        defaultValue={sFathersName}
                        name="name_sFathersName"
                      />
                      {_.get("name_sFathersName.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sFathersGBID"
                        name="name_sFathersGBID"
                        
                        label={<>Father's GB No </>}
                        type="text"
                        onChange={(e) => { setsFathersGBID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sFathersGBID}
                        inputRef={register({
                          //minLength: 7,
                          maxLength: 7
                        })}
                      />
                      {/*{_.get("name_sFathersGBID.type", errors) === "minLength" && (
                        <span style={{ color: 'red' }}>Father's GB ID cannot subceed 7 characters</span>
                      )}*/}
                      {_.get("name_sFathersGBID.type", errors) === "maxLength" && (
                        <span style={{ color: 'red' }}>Father's GB ID cannot exceed 7 characters</span>
                      )}
                    </FormControl>
                  </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TBUFathersName"
                  
                        label={<> Father's Name (Tibetan) ཕ་མིང་།<span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setTBUFathersName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_TBUFathersName"
                        defaultValue={TBUFathersName}
                      
                        inputRef={register({
                          required: true
                        })}
                      />
                      {_.get("name_TBUFathersName.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sMothersName"
                 
                        label={<> Mother's Name<span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setsMothersName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_sMothersName"
                        defaultValue={sMothersName}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {_.get("name_sMothersName.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sMothersGBID"
                        name="name_sMothersGBID"
                        label={<>Mother's GB No</>}
                     
                        type="text"
                        onChange={(e) => { setsMothersGBID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sMothersGBID}
                        inputRef={register({
                          //minLength: 7,
                          maxLength: 7
                        })}
                      />
                      {/*{_.get("name_sMothersGBID.type", errors) === "minLength" && (
                        <span style={{ color: 'red' }}>Mother's GB ID cannot subceed 7 characters</span>
                      )}*/}
                      {_.get("name_sMothersGBID.type", errors) === "maxLength" && (
                        <span style={{ color: 'red' }}>Mother's GB ID cannot exceed 7 characters</span>
                      )}
                    </FormControl>
                  </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TBUMothersName"
                        
                        label={<>Mother's Name (Tibetan) མ་མིང་།<span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setTBUMothersName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_TBUMothersName"
                        defaultValue={TBUMothersName}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {_.get("name_TBUMothersName.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sAddress1"
                        
                        label={<>Address 1 <span style={{color:'red'}}> *</span></>}
                        type="text"
                        onChange={(e) => { setsAddress1(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        multiline={true}
                        rows={1}
                        rowsMax={3}
                        name="name_sAddress1"
                        defaultValue={sAddress1}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {_.get("name_sAddress1.type", errors) === "required" && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
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
                        defaultValue={sAddress2}
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
                          defaultValue={sCity}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sState"
                          
                          label={<> State<span style={{color:'red'}}> *</span></>}
                          type="text"
                          onChange={(e) => { setsState(e.target.value); }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          name="name_sState"
                          inputRef={register({
                            required: true
                          })}
                          defaultValue={sState}
                        />
                        {_.get("name_sState.type", errors) === "required" && (
                          <span style={{ color: 'red' }}>This field is required</span>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <Autocomplete
                          value={lCountry.find(country => country.sCountryID === sCountryID)}
                          openOnFocus
                          clearOnEscape
                          onChange={
                            (e, value) => {
                              if (value !== null) {
                                setsCountryID(value.sCountryID);
                              }
                              else {
                                setsCountryID("");
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
                              
                              label={<> Country<span style={{color:'red'}}> *</span></>}
                              variant="standard"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off',
                              }}
                              name="name_sCountryID"
                              inputRef={register({
                                required: true
                              })}
                            />
                          )}
                        />
                        {_.get("name_sCountryID.type", errors) === "required" && (
                          <span style={{ color: 'red' }}>This field is required</span>
                        )}
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
                          defaultValue={sPCode}
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
                expandIcon={<ExpandMoreIcon className={classes.expansionHeading}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography
                  className={classes.expansionHeading}
                >Personal Information</Typography>
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
                        defaultValue={sAliasName}
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
                          value={sGender}
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
                          onChange={(e) => { setsPaidUntil(e.target.value); }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          defaultValue={sPaidUntil}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lProvince.find(province => province.id.toString() === sOriginProvinceID)}
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
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
                              autoComplete: 'off', // disable autocomplete and autofill
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
                        className={classes.textField}
                        defaultValue={sFstGreenBkNo}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lQualification.find(qualification => qualification.sQualificationID === sQualificationID)}
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              setsQualificationID(value.sQualificationID);
                            }
                            else {
                              setsQualificationID("");
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
                        className={classes.textField}
                        defaultValue={sOtherDocuments}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="id_sMarried">Marital Status</InputLabel>
                      <Select
                      MenuProps={{
                        disableScrollLock: false,
                      }}
                        id="id_sMarried"
                        label="Marital Status"
                        type="text"
                        onChange={(e) => { setsMarried(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        value={sMarried}
                      >
                        <MenuItem value={"Y"}>Married</MenuItem>
                        <MenuItem value={"N"}>Single</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant="dialog"
                          openTo="year"
                          views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtValidityDate"
                          name="name_dtValidityDate"
                          label="Validity Date"
                          format={sDateFormatMUIDatepicker}
                          onChange={date => 
                            { 
                              if(date){
                                setdtValidityDate(date); 
                                setValue('name_dtValidityDate', date, {shouldValidate: true});
                              }
                            }
                          }
                          value={dtValidityDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          fullWidth
                          className={classes.dateField}
                          inputRef={register({
                            pattern: 
                            {
                              value: new RegExp(sDDMMYYYYRegex),
                              message: "Invalid Date"
                            }
                          })}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lDOBApprox.find(dobapprox => dobapprox.sDOBApproxID === sDOBApprox)}
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              setsDOBApprox(value.sDOBApproxID);
                            }
                            else {
                              setsDOBApprox("");
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
                              autoComplete: 'off'
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
                        defaultValue={sOriginVillage}
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
                        defaultValue={sOldGreenBKNo}
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
                        defaultValue={sResidenceNumber}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lOccupation.find(occupation => occupation.id.toString() === sOccupationID)}
                        openOnFocus
                        clearOnEscape
                        onChange={
                          (e, value) => {
                            if (value !== null) {
                              setsOccupationID(value.id.toString());
                            }
                            else {
                              setsOccupationID("0");
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
                              autoComplete: 'off', // disable autocomplete and autofill
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
                          variant="dialog"
                          openTo="year"
                          views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtDeceased"
                          name="name_dtDeceased"
                          label="Deceased Date"
                          format={sDateFormatMUIDatepicker}
                          onChange={date => 
                            { 
                              if(date){
                                setdtDeceased(date); 
                                setValue('name_dtDeceased', date, {shouldValidate: true});
                              }
                            }
                          }
                          value={dtDeceased}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          fullWidth
                          className={classes.dateField}
                          inputRef={register({
                            pattern: 
                            {
                              value: new RegExp(sDDMMYYYYRegex),
                              message: "Invalid Date"
                            }
                          })}
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
                expandIcon={<ExpandMoreIcon className={classes.expansionHeading}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography
                  className={classes.expansionHeading}
                >Relation & Contact Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={6}>
                <Grid xs={12} style={{ display: 'flex' }}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sFathersID"
                        label="Father's Old GB No"
                        type="text"
                        onChange={(e) => { setsFathersID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sFathersID}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sMothersID"
                        label="Mother's Old GB No"
                        type="text"
                        onChange={(e) => { setsMothersID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sMothersID}
                      />
                    </FormControl>
                  </Grid>
                  </Grid>
                  <Grid xs={12} style={{ display: 'flex' }}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sSpouseName"
                        label="Spouse Name"
                        type="text"
                        onChange={(e) => { setsSpouseName(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sSpouseName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sSpouseGBID"
                        name="name_sSpouseGBID"
                        label="Spouse GB No"
                        type="text"
                        onChange={(e) => { setsSpouseGBID(e.target.value); }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sSpouseGBID}
                        inputRef={register({
                          //minLength: 7,
                          maxLength: 7
                        })}
                      />
                      {/*{_.get("name_sSpouseGBID.type", errors) === "minLength" && (
                        <span style={{ color: 'red' }}>Spouse's GB ID No cannot subceed 7 characters</span>
                      )}*/}
                      {_.get("name_sSpouseGBID.type", errors) === "maxLength" && (
                        <span style={{ color: 'red' }}>Spouse's GB No cannot exceed 7 characters</span>
                      )}
                    </FormControl>
                  </Grid>
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
                        defaultValue={sSpouseID}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
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
                        defaultValue={TBUSpouseName}
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
                          defaultValue={sFax}
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
                          defaultValue={sPhone}
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
                        margin="dense"
                        className={classes.textField}
                        defaultValue={sEmail}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <br />
            <Grid item xs={12}>
              <Button 
              variant={sButtonVariant}
              size={sButtonSize}
              color={sButtonColor}
                onClick={() => { history.push('/SarsoNewGBEntry') }}
                style={{ marginRight: "10px" }}
              >Cancel
              </Button>
              <Button
              disabled={formState.isSubmitting || formState.isSubmitted}
                variant={sButtonVariant}
                size={sButtonSize}
                color={sButtonColor}
                type="submit"
                onClick={() => {setExpanded('panel1') }}
                >Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>  
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />
      }
    {backdrop && <BackdropComponent
        backdrop={backdrop}
    />}
    </Container>
  );
}
