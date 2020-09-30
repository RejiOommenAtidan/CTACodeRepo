import React, { useEffect, useState } from 'react';
import {Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Card} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { red } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


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
  const classes = useStyles();
  const [gbidToDelete, setGBIDToDelete] = useState(0);
  
  const handleSubmit = (e) => {
    console.log("Submit Event\n", e);
    e.preventDefault();
    const gbid = parseInt(document.getElementById("gbid").value);
    console.log("gbid entered", gbid);
    axios.post(`GreenBook/DeleteGreenBook`, gbid)
    .then(resp => {
      if (resp.status === 200) {
        //setSelectData(resp.data);
        console.log("GreenBook ID Deleted from GreenBook\n", resp.data);

        
      // setdataAPI(resp.data)
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
    })
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
                type="number" 
                margin="dense" 
                variant="outlined" 
                autoFocus="true" 
                label="GreenBook Id" 
                helperText="Enter GreenBook ID" 
                required={true}

              >
              </TextField>
            </FormControl>
          </CardContent>
        <CardActions>
          <Button onClick={handleSubmit} color="primary">Delete</Button>
        </CardActions>
      </Card>
    </div>
    
  );
}