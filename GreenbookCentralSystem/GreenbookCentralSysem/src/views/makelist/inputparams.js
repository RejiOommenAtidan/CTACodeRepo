import React, { useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Select, Table } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from "react-hook-form";
import _ from "lodash/fp";
import { makeStyles } from '@material-ui/core/styles';
import { sButtonColor, sButtonSize, sButtonVariant, sDDMMYYYYRegex, sDateFormatMUIDatepicker } from "../../config/commonConfig";
import Moment from 'moment';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export const InputParams = (props) => {
  const selectStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const selectClasses = selectStyles();
  //validations
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [authRegions, setAuthRegionData] = React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypesData] = React.useState(props.selectData['madebTypes']);
  const [nMadebTypeId, setMadebTypeId] = React.useState(0);
  const [nAuthRegionId, setAuthRegionId] = React.useState(0);
  const [bPrinted, setPrintStatus] = useState(false);
  const [sMadebType, setMadebType] = useState();
  const [sAuthRegion, setAuthRegion] = useState();

  let valueAuthRegion = [];
  let valueMadebTypes = [];
  authRegions && authRegions.forEach(element => {
    if (element.id === nAuthRegionId) {
      valueAuthRegion = element;
    }
  });
  //console.log(nMadebTypeId);
  madebTypes && madebTypes.forEach(element => {
    if (element.id === nMadebTypeId) {
      valueMadebTypes = element;
    }
  });

  const handlePrintStatus = (event) => {
    setPrintStatus(event.target.value === "true");
  };

  const makeListParams = {
    startDate: Moment(startDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(startDate).format('YYYY-MM-DD') : null,
    endDate: Moment(endDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(endDate).format('YYYY-MM-DD') : null,
    nMadebTypeId,
    nAuthRegionId,
    bPrinted
  };

  function handleFormSubmit() {
    console.log("Form submission called.");
    console.log("MakeList parameters\n", makeListParams);
    
    props.makeList(makeListParams, sAuthRegion, sMadebType );
  }

  return (

    <div style={{ maxWidth: '1090px' }} >
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <Grid container spacing={1}>
          <Grid item xs>
            <FormControl>
              {/* {_.get("startDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>This field is required</span>
              )} */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="dialog"
                  //openTo="year"
                  //views={["year", "month", "date"]}
                  margin="dense"
                  id="startDate"
                  name="startDate"
                  autoFocus
                  label={<> Date From<span style={{ color: 'red' }}> *</span></>}
                  format={sDateFormatMUIDatepicker}
                  returnMoment={true}
                  onChange={(date) => {
                    if (date) {
                      setStartDate(date);
                      setValue('startDate', date, { shouldValidate: true });
                    };
                  }}
                  value={startDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  // fullWidth
                  //className={classes.dateField}
                  inputRef={register({
                    required: true,
                    pattern:
                    {
                      value: new RegExp(sDDMMYYYYRegex),
                      message: "Invalid Date"
                    }
                  })}
                />
              </MuiPickersUtilsProvider>
              {/*{errors.startDate && <span style={{ color: 'red' }}>Date From is required</span>}*/}
              {_.get("startDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date From is required</span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs  >
            <FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  variant="dialog"
                  //openTo="year"
                  //views={["year", "month", "date"]}
                  margin="dense"
                  id="endDate"
                  name="endDate"

                  label={<> Date To<span style={{ color: 'red' }}> *</span></>}
                  format={sDateFormatMUIDatepicker}
                  returnMoment={true}
                  onChange={(date) => {
                    if (date) {
                      setEndDate(date);
                      setValue('endDate', date, { shouldValidate: true });
                    }
                  }}
                  value={endDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  // fullWidth
                  //className={classes.dateField}
                  inputRef={register({
                    required: true,
                    pattern:
                    {
                      value: new RegExp(sDDMMYYYYRegex),
                      message: "Invalid Date"
                    }
                  })}
                />
              </MuiPickersUtilsProvider>
              {_.get("endDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date To is required</span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs >
            <FormControl style={{ paddingRight: '20px', marginTop: '4.5px' }}>
              <Controller
                render={props => (
                  <Autocomplete
                    {...props}
                    openOnFocus
                    clearOnEscape
                    autoComplete={true}
                    autoHighlight={true}
                    onChange={
                      (e, value) => {
                        props.onChange(value);
                        if (value !== null) {
                          console.log("Madeb id changed to:", value.id);
                          setMadebTypeId(value.id);
                          setMadebType(value.sMadebDisplayName);
                        }
                        else {
                          setMadebTypeId(0);
                        }
                      }
                    }
                    style={{ width: 180 }}
                    value={valueMadebTypes}
                    id="id_nMadebTypeId"
                    options={madebTypes}
                    getOptionLabel={(option) => option.sMadebDisplayName}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span>{option.sMadebDisplayName}</span>
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}

                        label={<> Why Issued<span style={{ color: 'red' }}> *</span></>}
                        variant="standard"
                        //className={props.classes.textField}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'off', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
                name="Madebs"
                control={control}
                rules={{ required: true }}
              />
              {errors.Madebs && <span style={{ color: 'red' }}>Select Madeb Type</span>}



            </FormControl>
          </Grid>
          <Grid item xs >
            <FormControl style={{ paddingRight: '20px', marginTop: '4.5px' }} >
              <Controller
                render={props => (
                  <Autocomplete
                    {...props}
                    openOnFocus
                    clearOnEscape
                    autoComplete={true}
                    autoHighlight={true}
                    onChange={
                      (e, value) => {
                        props.onChange(value);
                        if (value !== null) {
                          console.log("AuthRegion id changed to:", value.id);
                          setAuthRegionId(value.id);
                          setAuthRegion(value.sAuthRegion);
                        }
                        else {
                          setAuthRegionId(0);
                        }
                      }
                    }
                    style={{ width: 180 }}
                    value={valueAuthRegion}
                    id="id_nAuthorityId"
                    options={authRegions}

                    getOptionLabel={(option) => option.sAuthRegion}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span>{option.sAuthRegion}</span>
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Where Issued"
                        label={<> Where Issued<span style={{ color: 'red' }}> *</span></>}
                        //className={props.classes.textField}
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'off', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
                name="AuthRegion"
                control={control}
                rules={{ required: true }}
              />
              {errors.AuthRegion && <span style={{ color: 'red' }}>Select Authority Region</span>}
            </FormControl>
          </Grid>
          <Grid item  >
            <FormControl style={{ paddingRight: '20px', marginTop: '4.5px' }} >
              <InputLabel id="Printed/Not">Print Status {<span style={{ color: 'red' }}>*</span>}</InputLabel>
              <Controller
                render={props => (
                  <Select
                    onChange={(event) => {
                      props.onChange(event.target.value);
                      handlePrintStatus(event);
                    }}

                    style={{ width: 180 }}
                  >
                    <MenuItem value={"true"}>Printed</MenuItem>
                    <MenuItem value={"false"}>Not Printed</MenuItem>
                  </Select>
                )}
                name="Printed"
                control={control}
                rules={{ required: true }}
              />
              {errors.Printed && <span style={{ color: 'red' }}>Select Print Status</span>}
            </FormControl>
          </Grid>
          <Grid item  >
            <FormControl >
              <Button
                variant={sButtonVariant}
                color={sButtonColor}
                size={sButtonSize}
                type="submit"
                style={{ fontSize: '1em', marginTop: '16px', marginLeft: '10px' }}>Make List</Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};