import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Select, Table } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { red } from '@material-ui/core/colors';


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
  const { register, handleSubmit, watch, errors } = useForm();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [authRegions, setAuthRegionData] = React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypesData] = React.useState(props.selectData['madebTypes']);
  const [nMadebTypeId, setMadebTypeId] = React.useState(0);
  const [nAuthRegionId, setAuthRegionId] = React.useState(0);
  const [nPrinted, setPrintStatus] = useState(0);

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
    setPrintStatus(event.target.value);
  };

  const makeListParams = {
    startDate,
    endDate,
    nMadebTypeId,
    nAuthRegionId,
    nPrinted
  };

  function handleFormSubmit() {
    console.log("Form submission called.");
    console.log("MakeList parameters\n", makeListParams);
    props.makeList(makeListParams);
  }



  return (

    <div >
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <Grid container spacing={3}>
          <Grid item xs={2}>
            <FormControl>
              <TextField
                id="startDate"
                name="startDate"
                label="Date From"
                type="date"
                //defaultValue={dtDate}
                className={props.classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => { setStartDate(e.target.value) }}
                inputRef={register({
                  required: true
                })}
              />
              {_.get("startDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>This field is required</span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <TextField
                id="endDate"
                name="endDate"
                label="Date To"
                type="date"
                //defaultValue={dtDate}
                className={props.classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => { setEndDate(e.target.value) }}
                inputRef={register({
                  required: true
                })}
              />
              {_.get("endDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>This field is required</span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl >
              <Autocomplete
                openOnFocus
                clearOnEscape
                onChange={
                  (e, value) => {
                    if (value !== null) {
                      console.log("Madeb id changed to:", value.id);
                      setMadebTypeId(value.id);
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
                autoHighlight
                getOptionLabel={(option) => option.sMadebDisplayName}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>{option.sMadebDisplayName}</span>
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Why Issued"
                    variant="standard"
                    className={props.classes.textField}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl >
              <Autocomplete
                openOnFocus
                clearOnEscape
                onChange={
                  (e, value) => {
                    if (value !== null) {
                      console.log("AuthRegion id changed to:", value.id);
                      setAuthRegionId(value.id);
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
                    label="Where Issued"
                    className={props.classes.textField}
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
          <Grid item xs={2}>
            <FormControl >
              <InputLabel id="Printed/Not">Print Status</InputLabel>
              <Select
                onChange={handlePrintStatus}
                style={{ width: 180 }}
              >
                <MenuItem value={1}>Printed</MenuItem>
                <MenuItem value={0}>Not Printed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl >
              <Button variant="outlined" type="submit" color="primary" style={{ fontSize: '1em' }}>Make List</Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );

};