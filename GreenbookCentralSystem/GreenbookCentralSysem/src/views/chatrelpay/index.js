import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {storeCurrentGBDetails, removeCurrentGBDetails} from '../../actions/transactions/CurrentGBDetailsAction';

import {storeGBDetails, removeGBDetails} from '../../actions/transactions/GBDetailsAction';
import {useHistory} from 'react-router-dom';

import {
  Grid,
  Button,
  FormControl,
  TextField,
  Select,
} from '@material-ui/core';
import ChatrelPay from './chatrelpay';
import { Form } from 'formik';
import axios from 'axios';




const Dashboard = ()  => {

  let history = useHistory();
  const dispatch = useDispatch();
  dispatch(removeCurrentGBDetails());
  dispatch(removeGBDetails());

  const [sGBID, setGBID] = React.useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", sGBID);
    
    axios.get(`GreenBook/GetPersonalDetailsFromGBID/?sGBID=`+sGBID)
    .then(resp => {
      if (resp.status === 200) {
        
        const obj = {
          sGBID,
          from:'Chatrel for Self',
          sName: `${resp.data.sFirstName} ${resp.data.sLastName}`
        }
        console.log("Got data", resp.data);
        dispatch(storeCurrentGBDetails(obj));
        dispatch(storeGBDetails(obj));
        history.push('/ChatrelPay/MainPage')
        
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
      
    })
    
  };

  return (
    <>
    <div>
      <h2>
        Chatrel Offline Collection - Web Admins
      </h2>
    </div>
      <Grid container>
      <form onSubmit = {handleSubmit}>
        <Grid item>
            <FormControl>
              <TextField
                label="GBID"
                type="text"
                variant="standard"
                required
                name="sGBID"
                placeholder="Enter GBID..."
                autoFocus
                onChange={(e) => {setGBID(e.target.value)}}
              />
            </FormControl>
            </Grid>
            <Grid item style={{paddingTop: "15px"}}>
            <Button type='submit' variant="contained" color="primary" >Proceed</Button>
            </Grid>
            
          </form>
        
      </Grid>
      {/* <ChatrelPay /> */}
    </>
  );
};
export default Dashboard;