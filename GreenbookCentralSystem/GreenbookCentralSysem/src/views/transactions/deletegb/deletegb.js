import React, { useEffect, useState } from 'react';
import {Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Card} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { red } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useForm } from "react-hook-form";


const useStyles =  makeStyles({
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

export default function GiveGBId(){
  //const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const [gbidToDelete, setGBIDToDelete] = useState(0);
  

  const handleValidation = (val) => {
    console.log("inside validation");
    const span = document.getElementById("error");
    if(!val){
      const element = document.getElementById("gbid");
      span.innerText = "Please enter GB ID to delete";
      element.focus();
      return false;
    }
    else{
      span.innerText = "";
    }
    return true;
  }

  const handleSubmit = (e) => {
    console.log("Submit Event\n", e);
    e.preventDefault();
    
    const element = document.getElementById("gbid");
    
    if(handleValidation(element.value)){
      //const sGBID = parseInt(element.value);
      const sGBID = element.value;
      console.log("gbid entered", sGBID);

      axios.post(`GreenBook/DeleteGreenBookByGBID/?sGBID=`+ sGBID)
      .then(resp => {
        if (resp.status === 200) {
          //setSelectData(resp.data);
          console.log("GreenBook ID Deleted from GreenBook\n", resp.data);
          
          alert(`GreenBook with Id ${sGBID} deleted successfully.`);
          element.value = '';
          element.focus();
        // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        alert(`GreenBook with Id ${sGBID} deletion failed.`);
        element.value = '';
        element.focus();
      })
  }
}
  return (
    <div
    style={{
        position: 'absolute', 
        left: '60%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
>

  
        <Card className={classes.root}  raised>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom variant="subtitle1" component="h2" >
            Delete GreenBook ID
            </Typography>
            <FormControl>
              <TextField 
                id="gbid" 
                //type="number" 
                margin="dense" 
                variant="outlined" 
                autoFocus="true" 
                label="GreenBook Id" 
                helperText="Enter GreenBook ID" 
                required={true}
                onChange={(e) => {handleValidation(e.target.value)}}
                // inputRef={register({
                //   required: true
                // })}
              >
              </TextField>
              <span id='error'></span>
            </FormControl>
          </CardContent>
        <CardActions>
          <Button onClick={handleSubmit} color="primary">Delete</Button>
        </CardActions>
      </Card>
    </div>
    
  );
}