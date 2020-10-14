import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
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
import handleError from '../../../auth/_helpers/handleError';
import { sDateFormatMUIDatepicker } from '../../../config/commonConfig';

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

export default function EditEntry(props) {
    const classes = useStyles();
    let history = useHistory();
    const [expanded, setExpanded] = React.useState('');
    //Array from API
    const [lAuthRegion, setlAuthRegion] = useState([]);
    const [lCountry, setlCountry] = useState([]);
    const [lDOBApprox, setlDOBApprox] = useState([]);
    const [lOccupation, setlOccupation] = useState([]);
    const [lProvince, setlProvince] = useState([]);
    const [lQualification, setlQualification] = useState([]);
    //VARS to track
    const [Id, setnId] = useState('');
    const [sGBID, setsGBID] = useState('');
    const [nAuthRegionID, setnAuthRegionID] = useState('');
    const [sFirstName, setsFirstName] = useState('');
    const [sMiddleName, setsMiddleName] = useState('');
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

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        axios.get(`/Greenbook/GetGBDataNewEntry/Id=1001`)
            .then(resp => {
                if (resp.status === 200) {
                    //Masters
                    setlAuthRegion(resp.data.lAuthRegion);
                    setlCountry(resp.data.lCountry);
                    setlDOBApprox(resp.data.lDOBApprox);
                    setlOccupation(resp.data.lOccupation);
                    setlProvince(resp.data.lProvince);
                    setlQualification(resp.data.lQualification);
                    //Get GB Details
                    axios.get(`/Greenbook/GetGreenbook/Id=` + props.match.params.GBID.toString())
                        .then(resp => {
                            if (resp.status === 200) {
                                setnId(resp.data.id);
                                setsGBID(resp.data.sGBID);
                                setnAuthRegionID(resp.data.nAuthRegionID);
                                setsFirstName(resp.data.sFirstName);
                                setsMiddleName(resp.data.sMiddleName);
                                setsFamilyName(resp.data.sFamilyName);
                                setsGender(resp.data.sGender);
                                setdtDOB(resp.data.dtDOB);
                                setsDOBApprox(resp.data.sDOBApprox);
                                setsBirthPlace(resp.data.sBirthPlace);
                                setsBirthCountryID(resp.data.sBirthCountryID);
                                setsOriginVillage(resp.data.sOriginVillage);
                                setsOriginProvinceID(resp.data.sOriginProvinceID);
                                setsMarried(resp.data.sMarried);
                                setsOtherDocuments(resp.data.sOtherDocuments);
                                setsResidenceNumber(resp.data.sResidenceNumber);
                                setsQualificationID(resp.data.sQualificationID);
                                setsOccupationID(resp.data.sOccupationID);
                                setsAliasName(resp.data.sAliasName);
                                setsOldGreenBKNo(resp.data.sOldGreenBKNo);
                                setsFstGreenBkNo(resp.data.sFstGreenBkNo);
                                setdtFormDate(resp.data.dtFormDate);
                                setsFathersName(resp.data.sFathersName);
                                setsFathersID(resp.data.sFathersID);
                                setsFathersGBID(resp.data.sFathersGBID);
                                setsMothersName(resp.data.sMothersName);
                                setsMothersID(resp.data.sMothersID);
                                setsMothersGBID(resp.data.sMothersGBID);
                                setsSpouseName(resp.data.sSpouseName);
                                setsSpouseID(resp.data.sSpouseID);
                                setsSpouseGBID(resp.data.sSpouseGBID);
                                setnChildrenM(resp.data.nChildrenM);
                                setnChildrenF(resp.data.nChildrenF);
                                setsAddress1(resp.data.sAddress1);
                                setsAddress2(resp.data.sAddress2);
                                setsCity(resp.data.sCity);
                                setsState(resp.data.sState);
                                setsPCode(resp.data.sPCode);
                                setsCountryID(resp.data.sCountryID);
                                setsEmail(resp.data.sEmail);
                                setsPhone(resp.data.sPhone);
                                setsFax(resp.data.sFax);
                                setdtDeceased(resp.data.dtDeceased);
                                setsBookIssued(resp.data.sBookIssued);
                                setdtValidityDate(resp.data.dtValidityDate);
                                setsPaidUntil(resp.data.sPaidUntil);
                                setsEnteredDateTime(resp.data.sEnteredDateTime);
                                setTibetanName(resp.data.TibetanName);
                                setTBUPlaceOfBirth(resp.data.TBUPlaceOfBirth);
                                setTBUOriginVillage(resp.data.TBUOriginVillage);
                                setTBUFathersName(resp.data.TBUFathersName);
                                setTBUMothersName(resp.data.TBUMothersName);
                                setTBUSpouseName(resp.data.TBUSpouseName);
                                setExpanded("panel1");
                            }
                        })
                        .catch(error => {
                            handleError(error, history);
                        })
                        .then(release => {
                            //console.log(release); => udefined
                        });
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
        //e.preventDefault();
        let greenbook = {
            Id,
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
        axios.post(`/Greenbook/EditGreenbook/Id=` + props.match.params.GBID.toString(), greenbook)
            .then(resp => {
                if (resp.status === 200) {
                    history.push("/Greenbooks");
                }
            })
            .catch(error => {
                handleError(error, history);
            })
            .then(release => {
                //console.log(release); => udefined
            });
    };

    return (
        <Container maxWidth="lg" disableGutters={true}><br />
            <Typography variant="h4" gutterBottom>Edit Greenbook - {sGBID}</Typography>
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
                                    className={"font-weight-bold font-size-md mb-1 text-black"}>Personal Information</Typography>
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
                                                InputProps={{
                                                    readOnly: true
                                                }}
                                                required
                                            />
                                            {/*{_.get("name_sGBID.type", errors) === "required" && (
                                                <p>This field is required</p>
                                            )}
                                            {_.get("name_sGBID.type", errors) === "maxLength" && (
                                                <p>GBID cannot exceed 9 characters</p>
                                            )}*/}
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
                                                        label="Authority Region"
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
                                                value={sMiddleName}
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
                                                value={sFamilyName}
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
                                                value={TibetanName}
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
                                                value={TBUPlaceOfBirth}
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
                                                value={TBUOriginVillage}
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
                                                    id="id_dtDOB"
                                                    label="DOB"
                                                    format={sDateFormatMUIDatepicker}
                                                    onChange={date => { setdtDOB(date) }}
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
                                            value={lCountry.find(birthCountry => birthCountry.sCountryID === sBirthCountryID)}
                                                openOnFocus
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
                                                value={sBirthPlace}
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
                                                    variant="dialog"
                                                    openTo="year"
                                                    views={["year", "month", "date"]}
                                                    margin="dense"
                                                    id="id_dtFormDate"
                                                    label="Sarso Form Date"
                                                    format={sDateFormatMUIDatepicker}
                                                    onChange={date => { setdtFormDate(date) }}
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
                                                value={sFathersName}
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
                                                value={TBUFathersName}
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
                                                value={sFathersGBID}
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
                                                value={sMothersName}
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
                                                value={TBUMothersName}
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
                                                value={sMothersGBID}
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
                                                value={sAddress1}
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
                                                value={sAddress2}
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
                                                    value={sCity}
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
                                                    value={sState}
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
                                                            label="Country"
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
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl}>
                                                <TextField
                                                    value={sPCode}
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
                                    className={"font-weight-bold font-size-md mb-1 text-black"}
                                >Basic Personal Information</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <FormControl className={classes.formControl}>
                                            <TextField
                                                value={sAliasName}
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
                                                    value={sGender}
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
                                                    value={sPaidUntil}
                                                    id="id_sPaidUntil"
                                                    label="Paid Until"
                                                    type="text"
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
                                            value={lProvince.find(province => province.id === sOriginProvinceID)}
                                                openOnFocus
                                                clearOnEscape
                                                onChange={
                                                    (e, value) => {
                                                        if (value !== null) {
                                                            setsOriginProvinceID(value.id);
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
                                                value={sFstGreenBkNo}
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
                                                value={sOtherDocuments}
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
                                                value={sMarried}
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
                                                    variant="dialog"
                                                    openTo="year"
                                                    views={["year", "month", "date"]}
                                                    margin="dense"
                                                    id="id_dtValidityDate"
                                                    label="Validity Date"
                                                    format={sDateFormatMUIDatepicker}
                                                    onChange={date => { setdtValidityDate(date) }}
                                                    value={dtValidityDate}
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
                                                value={sOriginVillage}
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
                                                value={sOldGreenBKNo}
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
                                                value={sResidenceNumber}
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
                                            value={lOccupation.find(occupation => occupation.id === sOccupationID)}
                                                openOnFocus
                                                clearOnEscape
                                                onChange={
                                                    (e, value) => {
                                                        if (value !== null) {
                                                            setsOccupationID(value.id);
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
                                                            autoComplete: 'new-password'
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
                                                    label="Deceased Date"
                                                    format={sDateFormatMUIDatepicker}
                                                    onChange={date => { setdtDeceased(date) }}
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
                                    className={"font-weight-bold font-size-md mb-1 text-black"}
                                >Relation & Contact Details</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <FormControl className={classes.formControl}>
                                            <TextField
                                                value={sFathersID}
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
                                                value={sMothersID}
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
                                                value={sSpouseID}
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
                                                value={sSpouseGBID}
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
                                                value={sSpouseName}
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
                                                value={TBUSpouseName}
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
                                                    value={sFax}
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
                                                    value={sPhone}
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
                                                value={sEmail}
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
                                style={{ marginRight: "10px" }}
                            >Save</Button>
                            <Button variant="outlined"
                                onClick={() => { history.push('/Home') }}
                            >Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
