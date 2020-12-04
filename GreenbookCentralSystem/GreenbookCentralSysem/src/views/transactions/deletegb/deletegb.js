import React, { useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Card } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { red } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useForm } from "react-hook-form";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop';
import {
  sSnackbarAddMessage, sSnackbarUpdateMessages,
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";


const useStyles = makeStyles({
  root: {
    minWidth: "30%",
    minHeight: "30%",
    alignSelf: "center"
  },
  title: {
    textAlign: "center"
  },
  pos: {
    marginBottom: 12,
  },
});

export default function GiveGBId() {
  //const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const [gbidToDelete, setGBIDToDelete] = useState(0);
  const [backdrop, setBackdrop] = React.useState(false);

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

  const handleValidation = (val) => {
    console.log("inside validation");
    const span = document.getElementById("error");
    if (!val) {
      const element = document.getElementById("gbid");
      span.innerText = "Please enter GB ID to delete";
      element.focus();
      return false;
    }
    else {
      span.innerText = "";
    }
    return true;
  };

  const handleSubmit = (e) => {
    console.log("Submit Event\n", e);
    e.preventDefault();
    const element = document.getElementById("gbid");
    if (handleValidation(element.value)) {
      //const sGBID = parseInt(element.value);
      const sGBID = element.value;
      console.log("gbid entered", sGBID);
      setBackdrop(true);
      axios.post(`GreenBook/DeleteGreenBookByGBID/?sGBID=` + sGBID)
        .then(resp => {
          if (resp.status === 200) {
            //setSelectData(resp.data);
            console.log("Green Book ID Deleted from Green Book\n", resp.data);
            setAlertMessage(`Green Book with Id ${sGBID} deleted successfully.`);
            setAlertType('success');
            snackbarOpen();
            setBackdrop(false);
            element.value = '';
            element.focus();
            // setdataAPI(resp.data)
          }
        })
        .catch(error => {
          console.log(error.config);
          console.log(error.message);

          setAlertMessage(`Green Book with Id ${sGBID} deletion failed.`);
          setAlertType('error');
          snackbarOpen();
          setBackdrop(false);
          element.value = '';
          element.focus();
        })
    }
  };
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '60%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          //border: '1px solid red'
        }}
      >
        <Card className={classes.root} raised>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom variant="subtitle1" component="h2" >
              Delete Green Book
            </Typography>
            <FormControl>
              <TextField
                id="gbid"
                //type="number" 
                margin="dense"
                variant="outlined"
                autoFocus="true"
                label="Green Book Id"
                helperText="Enter Green Book ID"
                required={true}
                onChange={(e) => { handleValidation(e.target.value) }}
              // inputRef={register({
              //   required: true
              // })}
              >
              </TextField>
              <span id='error'></span>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              variant={sButtonVariant}
              color={sButtonColor}
              size={sButtonSize}
            >Delete</Button>
          </CardActions>
          {backdrop && <BackdropComponent
            backdrop={backdrop}

          />}
        </Card>
      </div>
      <div style={{
        position: 'absolute',
        left: '60%',
        top: '80%'
      }}>

        {snackbar && <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />}
      </div>
    </>
  );
}