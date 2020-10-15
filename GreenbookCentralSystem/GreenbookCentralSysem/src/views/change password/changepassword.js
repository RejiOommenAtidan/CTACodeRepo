import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Card, Typography, Container, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import _ from "lodash/fp";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import projectLogo from '../../assets/images/ctalogo.png';
import { authenticationService } from '../../auth/_services';

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
  let history = useHistory();
  const currentUser = authenticationService.currentUserValue;
  const oUserAuthUser = JSON.parse(currentUser.UserAuthenticationReducer);
  let nUserId = oUserAuthUser.oUserAuth.oUser.id;
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const [sOldPassword, setsOldPassword] = useState('');
  const [sNewPassword, setsNewPassword] = useState('');
  const [sConfirmNewPassword, setsConfirmNewPassword] = useState('');
  const password = useRef({});
  // password.current = watch("name_sNewPassword", "");
  // console.log(password);
  const onSubmit = () => {
    //Throws Error, Maybe handled by react-hook-forms itself
    //e.preventDefault();
    let changePassword = {
      nUserId,
      sOldPassword,
      sNewPassword,
      sConfirmNewPassword
    };
    // console.info(changePassword);
    axios.post(`/User/ChangePassword`, changePassword)
      .then(resp => {
        if (resp.status === 200) {
          //alert("Success");
          history.push("/Home");
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
          // console.error(error.response.errors);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
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
                  autoFocus
                  name="name_sOldPassword"
                  id="id_sOldPassword"
                  label="Old Password"
                  type="password"
                  value={sOldPassword}
                  onChange={(e) => { setsOldPassword(e.target.value); }}
                  fullWidth
                  margin="normal"
                  inputRef={register({
                    required: "Old Password Required"
                  })}
                />
                {errors.name_sOldPassword && <p>{errors.name_sOldPassword.message}</p>}
              </FormControl>
            </Grid>
            {/*New Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  name="name_sNewPassword"
                  id="id_sNewPassword"
                  label="New Password"
                  type="password"
                  onChange={(e) => { setsNewPassword(e.target.value); }}
                  value={sNewPassword}
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  inputRef={register({
                    required: "You must specify a password"
                  })}
                />
                {errors.name_sNewPassword && <p>{errors.name_sNewPassword.message}</p>}
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
                    required: "Please Confirm the Password",
                    //validate: value =>  value === sNewPassword || "The passwords do not match"
                    //validate: value => value === password.current || "The passwords do not match"
                  })}
                />
                {errors.name_sConfirmNewPassword && <p> {errors.name_sConfirmNewPassword.message}</p>}
              </FormControl>
            </Grid>
            <br />
            <br /><br />
            <Grid item xs={12}>
              <Button variant="outlined" type="submit" color="primary">Save</Button>&nbsp;
              <Button variant="outlined" onClick={() => { history.push("/Home") }}>Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
