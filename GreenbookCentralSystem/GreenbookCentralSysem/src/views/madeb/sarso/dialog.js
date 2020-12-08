import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    FormControl,
    TextField,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from "react-hook-form";
import _ from "lodash/fp";
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../../config/commonConfig";
import DateFnsUtils from "@date-io/date-fns";
import Moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  sDateFormatMUIDatepicker,
} from "../../../config/commonConfig";

 
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const EditDialog = (props) => {
    console.log("props",props.sarsoObj)
    const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const [message, setMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');
    const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
    const [typeIssuedData, settypeIssuedData] = React.useState(props.selectData['typeIssued']);
    const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);
    const [id, setId] = React.useState(props.sarsoObj.id);
    const [formNumber, setFormNumber] = React.useState(props.sarsoObj.nFormNumber);
    const [nAuthRegionID, setAuthRegionId] = React.useState(props.sarsoObj.nAuthRegionID);
    const [receivedDate, setReceivedDate] = React.useState(props.sarsoObj.dtReceived ? (props.sarsoObj.dtReceived).split('T')[0] : null);
    const [name, setName] = React.useState(props.sarsoObj.sName);
    const [fname, setFname] = React.useState(props.sarsoObj.sFathersName);
    const [saney, setSaney] = React.useState(props.sarsoObj.nSaneyFormNo);
    const [madebType, setMadebType] = React.useState(1);
    const [sGBID, setGbId] = React.useState(props.sarsoObj.sGBID);
    const [documents, setDocument] = React.useState(props.sarsoObj.sDocumentAttached);
    const [issueActionDate, setIssueActionDate] = React.useState(props.sarsoObj.dtIssueAction ? (props.sarsoObj.dtIssueAction).split('T')[0] : undefined);
    const [issueAction, setIssueAction] = React.useState(props.sarsoObj.nIssuedOrNotID);
    const [returnDate, setReturnDate] = React.useState(props.sarsoObj.dtReturnEmail ? (props.sarsoObj.dtReturnEmail).split('T')[0] : null);
    //const [rejectDate, setRejectDate] = React.useState(props.sarsoObj.dtReject.split('T')[0]);
    const [rejectDate, setRejectDate] = React.useState(props.sarsoObj.dtReject ? (props.sarsoObj.dtReject).split('T')[0] : null);
    const [authRegion, setAuthRegion] = React.useState(props.selectData['authRegions'].find((x) => x.id === nAuthRegionID));
    const [nMadebStatusID, setMadebStatusID] = React.useState(props.sarsoObj.nMadebStatusID);
    const [sMadebStatusRemark, setMadebStatusRemark] = React.useState(props.sarsoObj.sMadebStatusRemark);
    let valueMadebStatus = [];
    valueMadebStatus = madebStatuses.find((x) => x.id === nMadebStatusID);
    const { register, handleSubmit, errors, control, setValue } = useForm();
    const onSubmit = data => {
        props.editAPICall(madeb)
    };
    const madeb = {
        id: id,
        nFormNumber: formNumber,
        nMadebTypeID: madebType,
        sName: name,
        sGBID: sGBID,
        sFathersName: fname,
        nAuthRegionID: nAuthRegionID,
        nMadebStatusID,
        sMadebStatusRemark,
        dtReceived: Moment(receivedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(receivedDate).format('YYYY-MM-DD') : '',
        dtIssueAction: issueActionDate,
        nIssuedOrNotID: issueAction,
        sDocumentAttached: documents,
        nSaneyFormNo: saney,
        dtReturnEmail:  Moment(returnDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(returnDate).format('YYYY-MM-DD') : '',
        dtReject:  Moment(rejectDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(rejectDate).format('YYYY-MM-DD') : '',
        nUpdatedBy: userId
    }
    let valueAuthRegion = [];
    authRegions.forEach(element => {
        if (element.id === nAuthRegionID) {
            valueAuthRegion = element;
            console.log(valueAuthRegion);
        }
    });

    let valueTypeIssued = [];
    // console.log(issueAction);
    typeIssuedData.forEach(element => {
        if (element.id === issueAction) {
            valueTypeIssued = element;
            console.log(element);
        }
    });
    useEffect(() => {
        console.log("Inside useEffect()");
        const region = props.selectData['authRegions'].find((x) => x.id === nAuthRegionID);
        setTimeout(() => setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
        }), 0);
    });
    return (
        <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Sarso Madeb</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="number"
                                            name="form_number"
                                            label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                                            type="number"
                                            InputProps={{
                                                readOnly: false,
                                            }}
                                            inputRef={register({
                                                required: true
                                            })}
                                            value={formNumber}
                                            onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}
                                        />
                                        {_.get("form_number.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}
                                    </FormControl>
                                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl className={props.classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant="dialog"
                        //  openTo="year"
                         // views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtDate"
                          name="name_dtDate"
                          
                          label={<> Received Date<span style={{ color: 'red' }}> *</span></>}
                          format={sDateFormatMUIDatepicker}
                          returnMoment={true}
                          onChange={(date) => {
                            //console.log(date.toISOString().split("T")[0]);
                            //console.log(date.toDateString());
                            // console.log(date.toLocaleDateString());
                            //console.log(date);
                            setReceivedDate(date);
                          }}
                          value={receivedDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          
                         // className={classes.dateField}
                          inputRef={register({
                            required: true,
                          })}
                        />
                      </MuiPickersUtilsProvider>
                      {_.get("name_dtDate.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <Controller
                                            render={props => (
                                                <Autocomplete
                                                    {...props}
                                                    openOnFocus={true}
                                                    clearOnEscape
                                                    autoComplete={true}
                                                    autoHighlight={true}
                                                    options={authRegions}
                                                    getOptionLabel={(option) => option.sAuthRegion}
                                                    renderOption={(option) => (
                                                        <React.Fragment>
                                                            <span>{option.sAuthRegion}</span>
                                                        </React.Fragment>
                                                    )}
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            label={<p>Authority<span style={{ color: "red" }} > *</span></p>}
                                                            variant="standard"
                                                            name="authority_text"
                                                            inputRef={register({
                                                                required: true
                                                            })}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'off', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                    onChange={
                                                        (e, value) => {
                                                            props.onChange(value);
                                                            //alert ("onChangeFired")
                                                            if (value !== null) {
                                                                console.log(value.id);
                                                                setAuthRegionId(value.id);
                                                                setAuthRegion(value);
                                                            }
                                                            else {
                                                                setAuthRegionId(null);
                                                                setAuthRegion([]);
                                                            }
                                                        }
                                                    }
                                                    value={authRegion}
                                                //value={[]}
                                                />
                                            )}
                                            name="AuthRegion"
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                        {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="name"
                                            name='name'
                                            inputRef={register({
                                                required: true
                                            })}
                                            label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                                            value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                        {_.get("name.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="fname"
                                            name="name_fname"
                                            label={<p>Father's Name<span style={{ color: "red" }} > *</span></p>}
                                            inputRef={register({
                                                required: true
                                            })}
                                            value={fname}
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                        {_.get("name_fname.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sfn"
                                            name="name_fname"
                                            label="Saney Form No"
                                            type='number'
                                            value={saney}
                                            onChange={(e) => { setSaney(parseInt(e.target.value)) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="da"
                                            name="name_da"
                                            label={<p>Document Attached<span style={{ color: "red" }} > *</span></p>}
                                            value={documents}
                                            inputRef={register({
                                                required: true
                                            })}
                                            onChange={(e) => { setDocument(e.target.value) }}
                                        />
                                        {_.get("name_da.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}
                                    </FormControl>
                                </Grid>
                                


                                <Grid item xs={12} sm={6}>
                                <FormControl className={props.classes.formControl}>
                                    <Autocomplete
                                    openOnFocus
                                    clearOnEscape
                                    onChange={
                                        (e, value) => {
                                        if (value !== null) {
                                            console.log(value.id);
                                            setMadebStatusID(value.id);
                                        }
                                        else {
                                            setMadebStatusID(0);
                                        }
                                        }
                                    }
                                    value={valueMadebStatus}
                                    id="id_nMadebStatusID"
                                    options={madebStatuses}
                                    autoHighlight
                                    getOptionLabel={(option) => option.sMadebStatus}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                        <span>{option.sMadebStatus}</span>
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Madeb Status"
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

                                <Grid item xs={12} sm={6}>
                                <FormControl className={props.classes.formControl}>
                                    <TextField
                                    id="sMadebStatusRemark"
                                    name="sMadebStatusRemark"
                                    label="Status Remarks"
                                    //required={true}
                                    value={sMadebStatusRemark}
                                    onChange={(e) => { setMadebStatusRemark(e.target.value) }}

                                    />

                                </FormControl>
                                </Grid>
                               {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Issue Action Date"
                                            type="date"
                                            value={issueActionDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            onChange={(e) => { setIssueActionDate(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sTypeIssued"
                                            name="sTypeIssued"
                                            label="Issue Action"
                                            //required={true}
                                            value={valueTypeIssued.sTypeIssued}
                                            InputProps={{
                                                readOnly: true
                                            }}

                                        />
 
                                    </FormControl>
                                        </Grid>*/}
                                        
                            
                                <Grid item xs={12} sm={6}>
                    <FormControl className={props.classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant="dialog"
                          //openTo="year"
                          //views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtReturnDate"
                          name="name_dtReturnDate"
                          
                          label="Return Date"
                          format={sDateFormatMUIDatepicker}
                         // returnMoment={true}
                          onChange={(date) => {
                            //console.log(date.toISOString().split("T")[0]);
                            //console.log(date.toDateString());
                            // console.log(date.toLocaleDateString());
                            //console.log(date);
                            setReturnDate(date);
                          }}
                          value={returnDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          
                         
                        />
                      </MuiPickersUtilsProvider>
                     
                    </FormControl>
                  </Grid>

                                <Grid item sm={6} xs={12}>
                    <FormControl className={props.classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant="dialog"
                          //openTo="year"
                          //views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtRejectDate"
                          name="name_dtRejectDate"
                          
                          label="Reject Date"
                          format={sDateFormatMUIDatepicker}
                         // returnMoment={true}
                          onChange={(date) => {
                            //console.log(date.toISOString().split("T")[0]);
                            //console.log(date.toDateString());
                            // console.log(date.toLocaleDateString());
                            //console.log(date);
                            setRejectDate(date);
                          }}
                          value={rejectDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          
                       //   className={classes.dateField}
                          
                        />
                      </MuiPickersUtilsProvider>
                     
                    </FormControl>
                  </Grid>

                            </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={props.handleEditClickClose} 
                    color={sButtonColor}
                    variant={sButtonVariant}
                    size={sButtonSize}
                    >Cancel</Button>
                    {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}
                    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={snackbarClose} >
                        <Alert onClose={snackbarClose} severity={alertType}  >
                            {message}
                        </Alert>
                    </Snackbar>
                    <Button 
                    type='submit' 
                    color={sButtonColor}
                    variant={sButtonVariant}
                    size={sButtonSize}
                    >Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export const AddDialog = (props) => {
    const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
    const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
    const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
    const [id, setId] = React.useState(0);
    const [madebType, setMadebType] = React.useState(1);
    const [nAuthRegionID, setAuthRegionId] = React.useState(null);
    const [authRegion, setAuthRegion] = React.useState([]);
    const [receivedDate, setReceivedDate] = React.useState(null);
    const [name, setName] = React.useState('');
    const [fname, setFname] = React.useState('');
    const [saney, setSaney] = React.useState();
    const [documents, setDocument] = React.useState('');
    const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);   
    const [nMadebStatusID, setMadebStatusID] = React.useState(1);
    const [sMadebStatusRemark, setMadebStatusRemark] = React.useState('');
    const[ valueMadebStatus,setValueMadebStatus] =React.useState( madebStatuses.find((x) => x.id === 1));
   
    const madeb = {
        nFormNumber: formNumber,
        nMadebTypeID: madebType,
        sName: name,
        sFathersName: fname,
        nAuthRegionID: nAuthRegionID,
        dtReceived:  Moment(receivedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(receivedDate).format('YYYY-MM-DD') : '',
        nMadebStatusID,
        sMadebStatusRemark,
        //nIssuedOrNotID: 1,
        sDocumentAttached: documents,
        nSaneyFormNo: saney,
        nEnteredBy: userId,
        nUpdatedBy: userId
    }
    const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
    const onSubmit = data => {
        props.addAPICall(madeb);
    };
    return (
        <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Madeb Entry Form For Fresh Issue</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="form_number"
                                            label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}

                                            type="number"
                                            name='form_number'
                                            inputRef={register({
                                                required: true,
                                                min: 0
                                            })}
                                            InputProps={{
                                                readOnly: false,
                                            }}

                                            value={formNumber}
                                            onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

                                        />
                                        {_.get("form_number.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}
                                        {/*_.get("form_number.type", errors) === "maxLength" && (
                                                <p>First name cannot exceed 20 characters</p>
                                            )*/}

                                    </FormControl>
                                </Grid>
                    <Grid item sm={6} xs={12}>
                    <FormControl className={props.classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant="dialog"
                        //  openTo="year"
                         // views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtDate"
                          name="name_dtDate"
                          
                          label={<> Received Date<span style={{ color: 'red' }}> *</span></>}
                          format={sDateFormatMUIDatepicker}
                          returnMoment={true}
                          onChange={(date) => {
                            //console.log(date.toISOString().split("T")[0]);
                            //console.log(date.toDateString());
                            // console.log(date.toLocaleDateString());
                            //console.log(date);
                            setReceivedDate(date);
                          }}
                          value={receivedDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          
                         // className={classes.dateField}
                          inputRef={register({
                            required: true,
                          })}
                        />
                      </MuiPickersUtilsProvider>
                      {_.get("name_dtDate.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <Controller
                                            render={props => (
                                                <Autocomplete
                                                    openOnFocus
                                                    clearOnEscape
                                                    onChange={
                                                        (e, value) => {
                                                            props.onChange(value);
                                                            if (value !== null) {
                                                                console.log(value.id);
                                                                setAuthRegionId(value.id);
                                                                setAuthRegion(value);
                                                            }
                                                            else {
                                                                setAuthRegionId(null);
                                                                setAuthRegion([]);
                                                            }
                                                        }
                                                    }
                                                    value={authRegion}
                                                    inputRef={register({
                                                        required: true
                                                    })}
                                                    id="id_nAuthorityId"
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

                                                            label={<p>Authority<span style={{ color: "red" }} > *</span></p>}
                                                            variant="standard"

                                                            inputRef={register({
                                                                required: true
                                                            })}
                                                            name="name_authority"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'off', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />)}
                                            name="AuthRegion"
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                        {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="name"
                                            label={<p>Name<span style={{ color: "red" }} > *</span></p>}

                                            name='name'
                                            inputRef={register({
                                                required: true
                                            })}
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                        {_.get("name.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="fname"
                                            label={<p>Father's Name<span style={{ color: "red" }} > *</span></p>}
                                            name="name_fname"

                                            inputRef={register({
                                                required: true
                                            })}
                                            //value='Aayush Pandya'
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                        {_.get("name_fname.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <FormControl className={props.classes.formControl}>
                                    <Autocomplete
                                    openOnFocus
                                    clearOnEscape
                                    onChange={
                                        (e, value) => {
                                        if (value !== null) {
                                            console.log(value.id);
                                            setMadebStatusID(value.id);
                                            setValueMadebStatus(value);
                                        }
                                        else {
                                            setMadebStatusID(0);
                                            setValueMadebStatus([]);
                                        }
                                        }
                                    }
                                    value={valueMadebStatus}
                                    id="id_nMadebStatusID"
                                    options={madebStatuses}
                                    autoHighlight
                                    getOptionLabel={(option) => option.sMadebStatus}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                        <span>{option.sMadebStatus}</span>
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Madeb Status"
                                        name="madebStatusName"
                                        variant="standard"
                                        inputRef={register({
                                            required: true
                                        })}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off', // disable autocomplete and autofill
                                        }}
                                        />
                                    )}
                                    />
                                     {_.get("madebStatusName.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}
                                </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                <FormControl className={props.classes.formControl}>
                                    <TextField
                                    id="sMadebStatusRemark"
                                    name="sMadebStatusRemark"
                                    label="Status Remarks"
                                    //required={true}
                                    value={sMadebStatusRemark}
                                    onChange={(e) => { setMadebStatusRemark(e.target.value) }}

                                    />

                                </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="saney"
                                            label="Saney Form No"
                                            type='number'
                                            onChange={(e) => { setSaney(parseInt(e.target.value)) }}
                                            name="name_saney"
                                        //value='Aayush Pandya'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="da"
                                            label={<p>Document attached<span style={{ color: "red" }} > *</span></p>}
                                            name="name_da"
                                            //value='Aayush Pandya'
                                            inputRef={register({
                                                required: true

                                            })}
                                            onChange={(e) => { setDocument(e.target.value) }}
                                        />
                                        {_.get("name_da.type", errors) === "required" && (
                                            <p style={{ color: "red" }}>This field is required</p>
                                        )}

                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={props.handleAddClickClose} 
                    color={sButtonColor}
                    variant={sButtonVariant}
                    size={sButtonSize}
                    >Cancel</Button>
                    <Button 
                    type="submit" 
                    color={sButtonColor}
                    variant={sButtonVariant}
                    size={sButtonSize}
                    >Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
