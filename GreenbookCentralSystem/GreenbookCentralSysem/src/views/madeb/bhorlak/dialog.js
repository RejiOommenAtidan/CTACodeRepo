import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { Grid, Button, FormControl, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alerts } from '../../alerts';
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../../config/commonConfig";

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();

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
  console.log(props.bhorlakObj);

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    setAuthRegion([]);
    setPreviousGBSNo('');
  };

  const handleSubmitEditRecord = () => {
    props.editAPICall(madeb);
  }

  const [authRegions, setAuthRegionData] = React.useState(props.selectData['authRegions']);
  const [typeIssuedData, setTypeIssuedData] = React.useState(props.selectData['typeIssued']);
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);

  const [madebType, setMadebType] = React.useState(3);
  const [id, setId] = React.useState(props.bhorlakObj.id);
  const [nFormNumber, setFormNumber] = React.useState(props.bhorlakObj.nFormNumber);
  const [dtReceived, setReceivedDate] = React.useState((props.bhorlakObj.dtReceived) ? props.bhorlakObj.dtReceived.split('T')[0] : undefined);
  const [nAuthRegionID, setAuthRegionId] = React.useState(props.bhorlakObj.nAuthRegionID);

  const [sName, setName] = React.useState(props.bhorlakObj.sName);
  const [sGBID, setGbId] = useState(props.bhorlakObj.sGBID);

  const [nReceiptNo, setReceiptNo] = React.useState(props.bhorlakObj.nReceiptNo);
  const [sDocumentAttached, setDocument] = React.useState(props.bhorlakObj.sDocumentAttached);
  const [nCurrentGBSno, setCurrentGBSNo] = useState(props.bhorlakObj.nCurrentGBSno);
  const [nPreviousGBSno, setPreviousGBSNo] = useState(props.bhorlakObj.nPreviousGBSno);
  const [nMadebStatusID, setMadebStatusID] = React.useState(props.bhorlakObj.nMadebStatusID);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState(props.bhorlakObj.sMadebStatusRemark);
  const [sApprovedReject, setApprovedReject] = useState(props.bhorlakObj.sApprovedReject);
  const [dtIssueAction, setIssueActionDate] = React.useState(props.bhorlakObj.dtIssueAction ? (props.bhorlakObj.dtIssueAction).split('T')[0] : undefined);
  const [dtReject, setRejectDate] = useState(props.bhorlakObj.dtReject ? (props.bhorlakObj.dtReject).split('T')[0] : undefined);
  const [nIssuedOrNotID, setIssueAction] = React.useState(props.bhorlakObj.nIssuedOrNotID);
  const [dtReturnEmail, setReturnDate] = React.useState(props.bhorlakObj.dtReturnEmail ? (props.bhorlakObj.dtReturnEmail).split('T')[0] : undefined);

  const [authRegion, setAuthRegion] = React.useState(props.selectData['authRegions'].find((x) => x.id === nAuthRegionID));

  const madeb = {
    id: id,
    nMadebTypeID: madebType,
    nFormNumber,
    dtReceived,
    nAuthRegionID,
    sName,
    sGBID,
    sDocumentAttached,
    nReceiptNo,
    nMadebStatusID,
    //nCurrentGBSno,
    nPreviousGBSno,
    sMadebStatusRemark,
    sApprovedReject,
    dtIssueAction,
    dtReject,
    nIssuedOrNotID,
    dtReturnEmail,
    nUpdatedBy: userId
  }
  console.log("Madeb Edit Object received in dialog", madeb);
  //  const childrenAuthRegion =  () => { 
  //         return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))
  //     };  
  //  const optsAuthRegion = childrenAuthRegion();
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
    /* Need Greenbook record by passing GBID
     * from Greenbook controller. 
     * Must talk to Malay.
    */
    const sNameElement = document.getElementById("sName");
    const nCurrentGBSnoElement = document.getElementById("nCurrentGBSno");
    const nPreviousGBSnoElement = document.getElementById("nPreviousGBSno");
    axios.get(`Greenbook/GetPersonalDetailsFromGBID/?sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Got gb record\n", resp.data);
          console.log("Name Element:", sNameElement);
          const name = resp.data.sFirstName ? resp.data.sFirstName : '';
          const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          setName(`${name} ${mname} ${lname}`);
          setPreviousGBSNo(resp.data.nPreviousSrNo);
          clearErrors("sName");
          //setValue("sName");
          const region = authRegions.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
          setAuthRegion(region);
          setAuthRegionId(region.id);
          setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
          })
          /*setTimeout(() => setValue("AuthRegion", region,{
            shouldValidate: true,
            shouldDirty: true
          }), 0);*/
          //sNameElement.value=`${name} ${mname} ${lname}`;
          //  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          //   window.HTMLInputElement.prototype, "value").set;
          // nativeInputValueSetter.call(sNameElement, `${name} ${mname} ${lname}`);
          // var inputEvent = new Event("input", { bubbles: true });



          // sNameElement.dispatchEvent(inputEvent);
          //  setCurrentGBSNo(resp.data.sOldGreenBKNo);
          //  setPreviousGBSNo(resp.data.sFstGreenBkNo);
        }
        else {
          setName('');
          setPreviousGBSNo('');
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
          setPreviousGBSNo('');
          setAuthRegion([]);
          console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 500) {
          setName('');
          setPreviousGBSNo('');
          setAuthRegion([]);
          console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');
          setPreviousGBSNo('');
          setAuthRegion([]);
          console.log(error);
        }
      });
  };
  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };
  let valueAuthRegion = [];
  authRegions.forEach(element => {
    if (element.id === nAuthRegionID) {
      valueAuthRegion = element;
      console.log(valueAuthRegion);
    }

  });

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
      <DialogTitle id="form-dialog-title">Edit Bhorlak Madeb</DialogTitle>
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

                      value={nFormNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}
                      name="nFormNumber"
                    />
                    {_.get("nFormNumber.type", errors) === "required" && (
                      <p>This field is required</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReceived"
                      name="dtReceived"

                      label={<p>Received Date<span style={{ color: "red" }} > *</span></p>}
                      type="date"
                      value={dtReceived}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setReceivedDate(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("dtReceived.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
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
                          id="id_nAuthorityId"
                          options={authRegions}
                          inputRef={register({
                            required: true
                          })}
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
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                              inputRef={register({
                                required: true
                              })}
                            />
                          )}
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
                  {<button type='button' style={btnstyles} onClick={() => formPopulate(sGBID)}>Get Details</button>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sDocumentAttached"
                      name="sDocumentAttached"
                      label={<p>Document Attached <span style={{ color: "red" }} > *</span></p>}
                      value={sDocumentAttached}
                      onChange={(e) => { setDocument(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sDocumentAttached.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nReceiptNo"
                      name="nReceiptNo"

                      label={<p>Receipt No <span style={{ color: "red" }} > *</span></p>}
                      type='number'
                      value={nReceiptNo}
                      onChange={(e) => {
                        setReceiptNo(parseInt(e.target.value));
                        console.log("Value of Receipt changed to:", e.target.value);
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nReceiptNo.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nCurrentGBSno"
                      name="nCurrentGBSno"

                      label={<p>Book Serial No. <span style={{ color: "red" }} > *</span></p>}


                      type='number'
                      //required={true}
                      value={nCurrentGBSno}
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
                    </Grid>*/}
                    <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nPreviousGBSno"
                      name="nPreviousGBSno"
                      label="Previous GB SNo"
                      type='number'
                      // required={true}
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={nPreviousGBSno && {shrink:true}}
                      value={nPreviousGBSno}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        val > 0 ? setPreviousGBSNo(val) : setPreviousGBSNo(null);
                        console.log("Value of previousGB changed to:", e.target.value);
                      }}
                    />
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
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtIssueAction"
                      name="dtIssueAction"
                      label="Issue Action Date"
                      type="date"
                      value={dtIssueAction}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setIssueActionDate(e.target.value) }}
                    />
                  </FormControl>
                    </Grid>*/}
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
                {/*<Grid item xs={12} sm={6}>
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
                        </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReject"
                      name="dtReject"
                      label="Reject Date"
                      type="date"
                      value={dtReject}
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
                      id="dtReturnEmail"
                      name="dtReturnEmail"
                      label="Return Date"
                      type="date"
                      value={dtReturnEmail}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setReturnDate(e.target.value) }}
                    />
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

          {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

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

export const AddDialog = (props) => {
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);

  // SnackBar Alerts 

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const handleAddSubmit = () => {
    props.addAPICall(madeb);
  }

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    setFname('');
    setPreviousGBSNo('');
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
          setPreviousGBSNo(resp.data.nPreviousSrNo);
          clearErrors("sName");
          //setValue("sName");
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
          setPreviousGBSNo('');
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
          setPreviousGBSNo('');
          setAuthRegion([]);
          console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 500) {
          setName('');
          setPreviousGBSNo('');
          setAuthRegion([]);
          console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');
          setPreviousGBSNo('');
          setAuthRegion([]);
          console.log(error);
        }
      });
  };


  console.log(props.selectData);
  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
  const [typeIssuedData, settypeIssuedData] = React.useState(props.selectData['typeIssued']);

  const [nFormNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType, setMadebType] = React.useState(3);
  const [nAuthRegionID, setAuthRegionId] = React.useState(0);
  const [dtReceived, setReceivedDate] = React.useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [sName, setName] = React.useState('');
  const [sGBID, setGbId] = useState('');
  const [sFathersName, setFname] = React.useState('');
  const [nReceiptNo, setReceiptNo] = React.useState(0);
  const [nSaneyFormNo, setSaney] = React.useState();
  const [nCurrentGBSno, setCurrentGBSNo] = useState();
  const [nPreviousGBSno, setPreviousGBSNo] = useState();
  const [documents, setDocument] = React.useState('');
  const [authRegion, setAuthRegion] = React.useState([]);
  const [nMadebStatusID, setMadebStatusID] = React.useState(1);
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState("");

  const madeb = {
    id: id,
    nMadebTypeID: madebType,
    nFormNumber,
    dtReceived,
    nAuthRegionID,
    sName,
    sGBID,
    sDocumentAttached: documents,
    nReceiptNo,
    //nIssuedOrNotID: 1,
    //nCurrentGBSno,
    nPreviousGBSno,
    nMadebStatusID,
    sMadebStatusRemark,
    nEnteredBy: userId,
    nUpdatedBy: userId
  }

  let valueAuthRegion = [];
  let valueTypeIssued = [];
  let valueMadebStatus = props.selectData['madebStatuses'].find((x) => x.id === nMadebStatusID);

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
      <DialogTitle id="form-dialog-title">Madeb Entry Form For Lost</DialogTitle>
      <form onSubmit={handleSubmit(handleAddSubmit)}>
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

                      value={nFormNumber}
                      name="nFormNumber"
                    />
                    {_.get("nFormNumber.type", errors) === "required" && (
                      <p>This field is required</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReceived"
                      name="dtReceived"

                      label={<p>Received Date <span style={{ color: "red" }} > *</span></p>}
                      type="date"
                      value={dtReceived}
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
                          id="id_nAuthorityId"
                          inputRef={register({
                            required: true
                          })}
                          options={authRegions}
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

                              label={<p> Authority<span style={{ color: "red" }} > *</span></p>}
                              variant="standard"
                              name="authority_text"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                              inputRef={register({
                                required: true
                              })}
                            />
                          )}
                          name="authority"
                        />
                      )}
                      name="AuthRegion"
                      control={control}
                      rules={{ required: true }} />
                    {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"

                      label={<p>GBID <span style={{ color: "red" }} > *</span></p>}
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
                      id="nReceiptNo"
                      name="nReceiptNo"

                      label={<p>Receipt No <span style={{ color: "red" }} > *</span></p>}
                      type='number'
                      value={nReceiptNo}
                      onChange={(e) => {
                        setReceiptNo(parseInt(e.target.value));
                        console.log("Value of Receipt changed to:", e.target.value);
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nReceiptNo.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nCurrentGBSno"

                      label={<p>Book Sr No. <span style={{ color: "red" }} > *</span></p>}
                      type='number'
                      name='nCurrentGBSno'
                      //required={true}
                      value={nCurrentGBSno}
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
                    </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nPreviousGBSno"
                      label="Previous GB SNo"
                      type='number'
                      name='nPreviousGBSno'
                      //required={true}
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={ nPreviousGBSno && { shrink: true }}
                      value={nPreviousGBSno}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        val > 0 ? setPreviousGBSNo(val) : setPreviousGBSNo(null);
                        console.log("Value of previousGB changed to:", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="da"
                      label={<p>Document Attached <span style={{ color: "red" }} > *</span></p>}
                      name="name_da"
                      //value='Aayush Pandya'
                      inputRef={register({
                        required: true

                      })}
                      onChange={(e) => { setDocument(e.target.value) }}
                    />
                    {_.get("name_da.type", errors) === "required" && (
                      <p>This field is required</p>
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
          <Button
            onClick={props.handleAddClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>

          {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}

          {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

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
