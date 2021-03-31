
import React,{useEffect} from 'react';
import { Card } from '@material-ui/core';
import { Grid, CardContent} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';

import Moment from 'moment';

import axios from 'axios';
import { Alerts } from '../alerts';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {storeSession} from '../../actions/transactions/SessionAction';
import BackGroundImage from '../../assets/images/potala-profile.jpg';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
    alignContent: "center",
    textAlign: "center"
  },
  table: {
    minWidth: 650,
  },
  TextField: {
    width:200
  }
}));


export default function Friends () {
  const classes = useStyles();
  const theme = useTheme();
  const [sFirstName,setFirstName]=React.useState("");
  const [sLastName,setLastName]=React.useState("");
  const [sGBID,setGBID]=React.useState("");
  const [dtDob,setDOB]=React.useState("");
  const dispatch = useDispatch();
  const [backdrop, setBackdrop] = React.useState(true);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
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

  
const userObj = useSelector(state => state.GLoginReducer.oGoogle);
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
console.log("UserObj",userObj);
console.log("UserGBObj",userGBObj);

useEffect(() => {
    console.log('Test 1');
    setBackdrop(true);
    axios.get(`/ChatrelPayment/Ping`)
    .then(resp => {
      if (resp.status === 200) {
	setBackdrop(false);
  console.log('Test 2');
        console.log(resp.data);
        const oSession={
          sJwtToken:resp.data.token,
          bSession:true
        }
        dispatch(storeSession(oSession));
      }
    })
    .catch(error => {
      console.log("Error ", error.response);
      if(error.response.status!==401){
        setBackdrop(false);
        setAlertMessage('Something went wrong, please try again later');
        setAlertType('error');
        snackbarOpen();
      }
    })
    .then(release => {
      //console.log(release); => udefined
    });
     }, []);

  return (
    <>
    <div style={{background:`url(${BackGroundImage}) no-repeat center`,backgroundSize:'auto'}}>
    <Grid container spacing={1} style={{padding:'30px'}}>
      <Grid item xs={12} sm={3} ></Grid>
      <Grid item xs={12} sm={6}>
     <Card className="mx-auto shadow-lg " style={{paddingTop:'100px',margin:'40px'}}>
                               
                                <CardContent className="text-center card-body-avatar">
                                    <a href="#/" onClick={e => e.preventDefault()} className="avatar-icon-wrapper shadow-lg rounded-circle card-box-hover-rise hover-scale-lg d-130">
                                        <div className="avatar-icon rounded-circle">
                                            <img alt="..." className="img-fluid" src={userObj.imageUrl} />
                                        </div>
                                    </a>
                                    <h3 className="font-weight-bold mt-4 mb-3 text-black">{userObj.name} </h3>
                                    
                                    <Grid container spacing={0}>
                                            <Grid item md={12} lg={6}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'envelope']} className="font-size-xxl text-warning" />
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-md text-black">{userObj.email}</b>
                                                        
                                                        <span className="text-black-50 d-block">Email Address</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item md={6}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'id-card']} className="font-size-xxl text-info" />
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-lg text-black">{userGBObj.sCountryID+userGBObj.sGBID}</b>
                                                        <span className="text-black-50 d-block">Green Book Number</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                           
                                            
                                            <Grid item md={6}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'id-card-alt']} className="font-size-xxl text-success" />
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-lg text-black">{Moment().diff(userGBObj.dtDob ,'years')}</b>
                                                        <span className="text-black-50 d-block">Age</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item  md={12} lg={6}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="font-size-xxl text-danger" />
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-lg text-black">{userGBObj.sAuthRegion}</b>
                                                        <span className="text-black-50 d-block">Authority Region</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                </CardContent>
                            </Card>
                            </Grid>
                            <Grid item xs={12} sm={3} ></Grid>
                            </Grid>
                        
                            </div>

                            {snackbar && (
            <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
            
          )}
               <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>

    </>
  );
}