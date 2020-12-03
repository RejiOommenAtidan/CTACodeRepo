import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { Alerts } from '../../alerts';
import { useSelector } from 'react-redux';

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, setError } = useForm();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    console.log('alert');
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };

  console.log(props.bookFullObj);

  const handleSubmitEditRecord = () => {
    //alert("Form Submitted");
    props.editAPICall(madeb);

  }

  const [message, setMessage] = React.useState('');
  //const [alertType,setAlertType]=React.useState('');


  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
  const [typeIssuedData, settypeIssuedData] = React.useState(props.selectData['typeIssued']);
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);
  const [madebType, setMadebType] = React.useState(5);
  const [id, setId] = React.useState(props.bookFullObj.id);
  const [formNumber, setFormNumber] = React.useState(props.bookFullObj.nFormNumber);
  const [receivedDate, setReceivedDate] = React.useState((props.bookFullObj.dtReceived) ? props.bookFullObj.dtReceived.split('T')[0] : undefined);
  const [nAuthRegionID, setAuthRegionId] = React.useState(props.bookFullObj.nAuthRegionID);
  const [nMadebStatusID, setMadebStatusID] = React.useState(props.bookFullObj.nMadebStatusID);
  const [sName, setName] = React.useState(props.bookFullObj.sName);
  const [sGBID, setGbId] = useState(props.bookFullObj.sGBID);
  const [sFathersName, setFname] = React.useState(props.bookFullObj.sFathersName);
  const [saney, setSaney] = React.useState(props.bookFullObj.nSaneyFormNo);
  const [currentGBSno, setCurrentGBSNo] = useState(props.bookFullObj.nCurrentGBSno);
  const [previousGBSno, setPreviousGBSNo] = useState(props.bookFullObj.nPreviousGBSno);
  const [issueActionDate, setIssueActionDate] = React.useState(props.bookFullObj.dtIssueAction ? (props.bookFullObj.dtIssueAction).split('T')[0] : undefined);
  const [rejectDate, setRejectDate] = useState(props.bookFullObj.dtReject ? (props.bookFullObj.dtReject).split('T')[0] : undefined);
  const [nIssuedOrNotID, setIssueAction] = React.useState(props.bookFullObj.nIssuedOrNotID);
  const [returnDate, setReturnDate] = React.useState(props.bookFullObj.dtReturnEmail ? (props.bookFullObj.dtReturnEmail).split('T')[0] : undefined);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState(props.bookFullObj.sMadebStatusRemark);
  const [authRegion, setAuthRegion] = React.useState(props.selectData['authRegions'].find((x) => x.id === nAuthRegionID));

  console.log("Auth region is ", authRegion.sAuthRegion);

  const madeb = {
    id: id,
    nMadebTypeID: madebType,
    nFormNumber: formNumber,
    dtReceived: receivedDate,
    nAuthRegionID: nAuthRegionID,
    sName: sName,
    sGBID: sGBID,
    sFathersName: sFathersName,
    nSaneyFormNo: saney,
    nCurrentGBSno: currentGBSno,
    nPreviousGBSno: previousGBSno,
    dtIssueAction: issueActionDate,
    dtReject: rejectDate,
    nIssuedOrNotID: nIssuedOrNotID,
    dtReturnEmail: returnDate,
    nMadebStatusID,
    sMadebStatusRemark,
    nUpdatedBy: userId
  }
  console.log("Madeb Edit Object received in dialog", madeb);
  //  const childrenAuthRegion =  () => { 
  //         return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))
  //     };  
  //  const optsAuthRegion = childrenAuthRegion();
  //  let valueAuthRegion = [];

  //  authRegions.forEach(element => {
  //     if(element.id === nAuthRegionID){
  //         valueAuthRegion = element;
  //     }
  //   });

  // const childrenTypeIssued =  () => { 
  //   return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
  // const optsTypeIssued = childrenTypeIssued();
  let valueTypeIssued = [];
  console.log(nIssuedOrNotID);
  typeIssuedData.forEach(element => {
    if (element.id === nIssuedOrNotID) {
      valueTypeIssued = element;
    }

  });

  let valueMadebStatus = [];
  valueMadebStatus = madebStatuses.find((x) => x.id === nMadebStatusID);

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    setFname('');
    setAuthRegion([]);
    setValue("AuthRegion", [], {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  const formPopulate = (value) => {
    if (value === '') {
      setAlertMessage(`Please enter a valid number...`);
      setAlertType('error');
      snackbarOpen();
      return;
    }
    console.log("Value in GBID: ", value);
    const gbid = value;
    const event = new Event('change', {
      bubbles: true
    });


    axios.get(`Greenbook/GetPersonalDetailsFromGBID/?sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Got gb record\n", resp.data);

          const name = resp.data.sFirstName ? resp.data.sFirstName : '';
          const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          setName(`${name} ${mname} ${lname}`);
          setFname(resp.data.sFathersName);
          clearErrors("sName");
          const region = authRegions.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
          setAuthRegion(region);
          setAuthRegionId(region.id);
          setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
          })


        }
        else {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log("Not found", resp);
          setAlertMessage(`No record found for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 500) {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log(error);
        }
      });
  };

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
      <DialogTitle id="form-dialog-title">Edit Book Full Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nFormNumber"
                      label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                      type="number"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={formNumber}
                      onChange={(e) => { setFormNumber(e.target.value) }}

                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtDate"
                      name="dtDate"
                      label={<p>Received Date<span style={{ color: "red" }} > *</span></p>}
                      type="date"
                      value={receivedDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setReceivedDate(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("dtDate.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label={<p>GBID<span style={{ color: "red" }} > *</span></p>}
                      name="sGBID"
                      //required={true}
                      value={sGBID}
                      onChange={(e) => { handleChangeGBID(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sGBID.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                  <button type='button' style={btnstyles} onClick={() => formPopulate(sGBID)}>Get Details</button>
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
                      id="sName"
                      name="sName"
                      label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                      //required={true}
                      value={sName}
                      onChange={(e) => {
                        setValue("sName", e.target.value);
                        setName(e.target.value)
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sName.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sFathersName"
                      label="Father's Name"
                      value={sFathersName}
                      onChange={(e) => { setFname(e.target.value) }}
                    />
                  </FormControl>
                </Grid>


                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sfn"
                      label="Saney Form No"
                      type='number'
                      value={saney}
                      onChange={(e) => {
                        setSaney(parseInt(e.target.value));
                        console.log("Value of saney changed to:", e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nCurrentGBSno"
                      name="nCurrentGBSno"
                      label={<p>Current GB SNo.<span style={{ color: "red" }} > *</span></p>}
                      type='number'
                      //required={true}
                      value={currentGBSno}
                      onChange={(e) => {
                        setCurrentGBSNo(parseInt(e.target.value));
                        console.log("Value of currentGB changed to:", parseInt(e.target.value));
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nCurrentGBSno.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nPreviousGBSno"
                      name="nPreviousGBSno"
                      label="Previous GB SNo"
                      type='number'
                      // required={true}
                      value={previousGBSno}
                      onChange={(e) => {
                        setPreviousGBSNo(parseInt(e.target.value));
                        console.log("Value of previousGB changed to:", e.target.value);
                      }}
                    // inputRef={register({
                    //   required: true
                    // })}
                    />
                    {/* {_.get("nPreviousGBSno.type", errors) === "required" && (
                                        <span style={{color: 'red'}}>This field is required</span>
                                      )} */}
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
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtIssueActionDate"
                      name="dtIssueActionDate"
                      label="Issue Action Date"
                      type="date"
                      value={issueActionDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setIssueActionDate(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <InputLabel id="issue-label"> Issue Action</InputLabel>
                                        <Select
                                            labelId="issue-label"
                                            id="authority"
                                            value={valueTypeIssued}
                                             onChange={(e) => { setIssueAction(e.target.value) }}
                                            label="Issue Action"
                                            children={optsTypeIssued}
                                        >
                                          

                                        </Select>
                                    </FormControl>
                                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            console.log(value.id);
                            setIssueAction(value.id);
                          }
                          else {
                            setIssueAction(0);
                          }
                        }
                      }
                      value={valueTypeIssued}
                      id="id_nTypeIssued"
                      options={typeIssuedData}
                      autoHighlight
                      getOptionLabel={(option) => option.sTypeIssued}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sTypeIssued}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type Issued"
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
                      id="dtRejectDate"
                      name="dtRejectDate"
                      label="Reject Date"
                      type="date"
                      value={rejectDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setRejectDate(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReturnDate"
                      name="dtReturnDate"
                      label="Return Date"
                      type="date"
                      value={returnDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setReturnDate(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                {snackbar && <Alerts
                  alertObj={alertObj}
                  snackbar={snackbar}
                  snackbarClose={snackbarClose}
                />
                }
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
          <Button type="submit" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();

  // SnackBar Alerts 
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    console.log('alert');
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const handleSnackBarSubmit = () => {
    //alert("Submit form called");
    props.addAPICall(madeb);
  }

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    setFname('');
    setAuthRegion([]);
  }
  const formPopulate = (value) => {
    if (value === '') {
      setAlertMessage(`Please enter a valid number...`);
      setAlertType('error');
      snackbarOpen();
      return;
    }
    console.log("Value in GBID: ", value);
    const gbid = value;
    const event = new Event('change', {
      bubbles: true
    });

    axios.get(`Greenbook/GetPersonalDetailsFromGBID/?sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Got gb record\n", resp.data);

          const name = resp.data.sFirstName ? resp.data.sFirstName : '';
          const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          setName(`${name} ${mname} ${lname}`);
          setFname(resp.data.sFathersName);
          clearErrors("sName");
          const region = authRegions.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
          setAuthRegion(region);
          setAuthRegionId(region.id);
          setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
          })



        }
        else {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log("Not found", resp);
          setAlertMessage(`No record found for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 505) {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');
          setFname('');
          setAuthRegion([]);
          console.log(error);
        }
      });
  };

  console.log(props.selectData);
  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
  const [typeIssuedData, settypeIssuedData] = React.useState(props.selectData['typeIssued']);

  const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType, setMadebType] = React.useState(5);
  const [nAuthRegionID, setAuthRegionId] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [sName, setName] = React.useState('');
  const [sGBID, setGbId] = useState('');
  const [sFathersName, setFname] = React.useState('');
  const [saney, setSaney] = React.useState();
  const [currentGBSno, setCurrentGBSNo] = useState(null);
  const [previousGBSno, setPreviousGBSNo] = useState(null);

  const [authRegion, setAuthRegion] = React.useState([]);

  let valueAuthRegion = [];
  let valueTypeIssued = [];
  const madeb = {
    id: id,
    nMadebTypeID: madebType,
    nFormNumber: formNumber,
    dtReceived: receivedDate,
    nAuthRegionID: nAuthRegionID,
    sName: sName,
    sGBID: sGBID,
    sFathersName: sFathersName,
    nSaneyFormNo: saney,
    nCurrentGBSno: currentGBSno,
    nPreviousGBSno: previousGBSno,
    nIssuedOrNotID: 1,
    nEnteredBy: userId,
    nUpdatedBy: userId
  }
  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };
  console.log("Madeb Object in Add dialog", madeb);

  // const idsAuthRegion = authRegions.map((data) => data.sAuthRegion);
  //const childrenAuthRegion =  () => { 
  // return (idsAuthRegion.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
  //   const childrenAuthRegion =  () => { 
  //   return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))};  
  //    const optsAuthRegion = childrenAuthRegion();

  //   const childrenTypeIssued =  () => { 
  //     return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
  //   const optsTypeIssued = childrenTypeIssued();

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Book Full Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSnackBarSubmit)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="number"
                      name="nFormNumber"
                      label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                      type="number"
                      // InputProps={{
                      //     readOnly: true
                      // }}
                      value={formNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {errors.nFormNumber && <span style={{ color: 'red' }}>Enter Form Number</span>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtDate"
                      name="dtDate"
                      label={<p>Received Date<span style={{ color: "red" }} > *</span></p>}
                      type="date"
                      value={receivedDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setReceivedDate(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("dtDate.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
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
                              name="sAuthRegionText"
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
                        />
                      )}
                      name="AuthRegion"
                      control={control}
                      rules={{ required: true }}
                    />
                    {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                    {/* {errors.sAuthRegionText && <span style={{color: 'red'}}>Enter Authority Region</span>} */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                     label={<p>GBID<span style={{ color: "red" }} > *</span></p>}
                      //required={true}
                      name="sGBID"
                      value={sGBID}
                      onChange={(e) => { handleChangeGBID(e.target.value) }}
                      //onBlur={(e) => {formPopulate(e.target.value)}}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sGBID.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                  <button type='button' style={btnstyles} onClick={() => formPopulate(sGBID)}>Get Details</button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sName"
                      label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                      name="sName"
                      //required={true}
                      value={sName}
                      onChange={(e) => { setName(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sName.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}

                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sFathersName"
                      name="sFathersName"
                      label="Father's Name"
                      value={sFathersName}
                      onChange={(e) => { setFname(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sfn"
                      label="Saney Form No"
                      type='number'
                      value={saney}
                      onChange={(e) => {
                        setSaney(parseInt(e.target.value));
                        console.log("Value of saney changed to:", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nCurrentGBSno"
                      label={<p>Current GB SNo.<span style={{ color: "red" }} > *</span></p>}
                      type='number'
                      name='nCurrentGBSno'
                      //required={true}
                      value={currentGBSno}
                      onChange={(e) => {
                        setCurrentGBSNo(parseInt(e.target.value));
                        console.log("Value of currentGB changed to:", parseInt(e.target.value));
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nCurrentGBSno.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nPreviousGBSno"
                      label="Previous GB SNo"
                      type='number'
                      name='nPreviousGBSno'
                      //required={true}
                      value={previousGBSno}
                      onChange={(e) => {
                        setPreviousGBSNo(parseInt(e.target.value));
                        console.log("Value of previousGB changed to:", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                </Grid>
                {snackbar && <Alerts
                  alertObj={alertObj}
                  snackbar={snackbar}
                  snackbarClose={snackbarClose}
                />
                }
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>

          {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}

          {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

          <Button type="submit" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
