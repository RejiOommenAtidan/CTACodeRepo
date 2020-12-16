import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Card } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop';
import {
  sSnackbarAddMessage, sSnackbarUpdateMessages,
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";
import { text } from '@fortawesome/fontawesome-svg-core';


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
  span: {
    color: 'red'
  },
  cardaction: {
    display: 'flex', 
    justifyContent: 'center'
  }
});

export default function GiveGBId() {
  //const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const [gbidToDelete, setGBIDToDelete] = useState(0);
  const [backdrop, setBackdrop] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [sGBID, setGBID] = useState('');
  const [span, setSpan] = useState();
  const [textBox, setTextBox] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
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

  const handleClose = () => {
    setOpenDialog(false);
    textBox.focus();
  };

  const isEmpty = (val) => {
    if (!val) {
      span.innerText = "Please enter GB ID to delete";
      textBox.focus();
      setCanSubmit(false);
      return true;
    }
    else{
      span.innerText = '';
      setCanSubmit(true);
      return false;
    }
  };

  const handleSubmit = () => {
    const sGBIDEntered = textBox.value;
    console.log("gbid entered", sGBIDEntered);

    if(isEmpty(sGBIDEntered)){
      return;
    }
    console.log("Submit Event\n");
    setOpenDialog(true);
  };

  const submit = () => {
    setOpenDialog(false);
    setBackdrop(true);
      axios.post(`GreenBook/DeleteGreenBookByGBID/?sGBID=` + sGBID)
        .then(resp => {
          if (resp.status === 200) {
            setAlertMessage(`Green Book ID ${sGBID} deleted successfully.`);
            setAlertType('success');
            snackbarOpen();
            setBackdrop(false);
            setGBID('');
            textBox.value = '';
            textBox.focus();
          }
        })
        .catch(error => {
          console.log(error.message);
          if(error.response){
            if(error.response.status === 403){
              //setAlertMessage(`Green Book ID ${sGBID} does not exists`);
              // setAlertType('error');
              // snackbarOpen();
              setBackdrop(false);
              span.innerText = `Green Book ID '${sGBID}' does not exist`;
              return;
            }
            if(error.response.status === 500){
              setAlertMessage(`Deletion of Green Book ID '${sGBID}' failed`);
              setAlertType('error');
              snackbarOpen();
              setBackdrop(false);
              return;
            }
          }
          setAlertMessage(error.message);
          setAlertType('error');
          snackbarOpen();
          //element.value = '';
          textBox.focus();
          setBackdrop(false);
        })
  };

  useEffect(() => {
    setSpan(document.getElementById("error"));
    setTextBox(document.getElementById('gbid'))
  });
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
        <form onSubmit = {(e) => {
          e.preventDefault();
          handleSubmit();
          }}>
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
                label="Green Book ID"
                helperText="Enter Green Book ID"
                onChange={(e) => { setGBID(e.target.value); isEmpty(e.target.value); }}
              // inputRef={register({
              //   required: true
              // })}
              >
              </TextField>
              <span id='error' className={classes.span}></span>
            </FormControl>
          </CardContent>
          <CardActions className={classes.cardaction} >
            <Button
              onClick={(handleSubmit)}
              variant={sButtonVariant}
              color={sButtonColor}
              size={sButtonSize}
            >Delete</Button>
            
          </CardActions>
          </form>
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
      <Dialog
        open={openDialog}
        onClose={handleClose}
        
      >
        <DialogTitle id="alert-dialog-title">{`Delete Green book ID?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to delete Green book ID ${sGBID}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            startIcon={<CancelIcon />}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            startIcon={<WarningIcon />}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}