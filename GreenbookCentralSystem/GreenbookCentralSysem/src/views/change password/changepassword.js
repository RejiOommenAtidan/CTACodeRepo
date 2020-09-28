import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Card, Typography, Container, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import _ from "lodash/fp";
import axios from 'axios';
// import projectLogo from '../../assets/images/ctalogo.png';

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
  }
});




export default function ChangePassword() {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const [sOldPassword, setsOldPassword] = useState('');
  const [sNewPassword, setsNewPassword] = useState('');
  const [sConfirmNewPassword, setsConfirmNewPassword] = useState('');
  const onSubmit = () => {
    //Throws Error, Maybe handled by react-hook-forms itself
    //e.preventDefault();
    let changepassword = {
      sOldPassword,
      sNewPassword,
      sConfirmNewPassword
    };
    console.info(changepassword);
    //copy(changepassword);
  };
  return (
    <>
      <Container maxWidth="lg" disableGutters={true}><br />
        <Typography variant="h4" gutterBottom>Change Password</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.box}>
          <Grid container>
            {/*Old Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  name="name_sOldPassword"
                  id="id_sOldPassword"
                  label="Old Password"
                  type="password"
                  value={sOldPassword}
                  onChange={(e) => { setsOldPassword(e.target.value); }}
                  fullWidth
                  margin="normal"
                  inputRef={register({
                    required: true
                  })}
                />
                {_.get("name_sOldPassword.type", errors) === "required" && (
                  <p>This field is required</p>
                )}
              </FormControl>
            </Grid>
            {/*New Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  name="name_sNewPassword"
                  id="id_sNewPassword"
                  label="New Password"
                  type="password"
                  value={sNewPassword}
                  onChange={(e) => { setsNewPassword(e.target.value); }}
                  fullWidth
                  margin="normal"
                  inputRef={register({
                    required: true
                  })}
                />
                {_.get("name_sNewPassword.type", errors) === "required" && (
                  <p>This field is required</p>
                )}
              </FormControl>
            </Grid>

            {/*Confirm New Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  name="name_sConfirmNewPassword"
                  id="id_sConfirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  value={sConfirmNewPassword}
                  onChange={(e) => { setsConfirmNewPassword(e.target.value); }}
                  fullWidth
                  margin="normal"
                  inputRef={register({
                    required: true
                  })}
                />
                {_.get("name_sConfirmNewPassword.type", errors) === "required" && (
                  <p>This field is required</p>
                )}
              </FormControl>
            </Grid>
            <br />
            <br /><br />
            <Grid item xs={12}>
              <Button variant="outlined" type="submit" color="primary">Save</Button>&nbsp;
              <Button variant="outlined">Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
