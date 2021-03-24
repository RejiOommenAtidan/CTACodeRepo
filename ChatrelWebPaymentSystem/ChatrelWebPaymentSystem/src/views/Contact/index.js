
import React from 'react';
import { Card } from '@material-ui/core';
import {Grid} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';


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
  

 
  
const userObj = useSelector(state => state.GLoginReducer.oGoogle);
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);

  return (
    <>
     <div /*style={{background:`url(${BackGroundImage}) no-repeat center`,backgroundSize:'auto'}}*/>
     <Grid container spacing={1} style={{padding:'30px'}}>
      <Grid item xs={12} sm={3} ></Grid>
      <Grid item xs={12} sm={6}>
      <Card className="card-box card-box-alt  mx-auto mt-4" style={{borderBottomLeftRadius:'0',borderBottomRightRadius:'0'}}>
      <div className="card-content-overlay text-left">
      <div className="px-4">
                                        <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                                            <FontAwesomeIcon icon={['fas', 'envelope-open-text']} className="display-3" />
                                        </div>
                                        <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                                            Contact Us
                                        </div>
                                            <Grid container spacing={0}>
                                            <Grid item md={12}  >
                                                <div className="bg-secondary m-3 py-3 px-3 text-left rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'map-marked-alt']} className="font-size-xxl text-warning" />
                                                        <span className="text-black-50 d-block">Postal Address</span>
                                                    </div> 
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-md text-black">
                                                            The Secretary, <br/>
                                                            Department of Finance<br/> 
                                                            Central Tibetan Administration,<br/> 
                                                            Dharamshala – 176215 (H.P.)<br/>
                                                            INDIA <br/>

                                                        </b>
                                                        
                                                       
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item md={6}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'phone']} className="font-size-xxl text-info" />
                                                        <span className="text-black-50 d-block">Telephone</span>
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-lg text-black">+91-1892-223738, 222487 </b>
                                                        
                                                    </div>
                                                </div>
                                            </Grid>
                                           
                                            
                                            <Grid item md={6}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'globe']} className="font-size-xxl text-success" />
                                                        <span className="text-black-50 d-block">Website</span>
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                        <b className="font-size-lg text-black">www.chatrel.net </b>
                                                        
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item  md={12}>
                                                <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                                                    <div>
                                                        <FontAwesomeIcon icon={['fas', 'envelope']} className="font-size-xxl text-danger" />
                                                        <span className="text-black-50 d-block">Email</span>
                                                    </div>
                                                    <div className="mt-2 line-height-sm">
                                                    <b className="font-size-lg text-black">chatrelonline@tibet.net <br/> chatrel@tibet.net</b>
                                                      
                                                    </div>
                                                </div>
                                            </Grid>
             
            
            </Grid>

      </div>
          <div className="divider mt-4" />
         
         
         
      </div>
   
                            </Card>
         
     
     </Grid>
     <Grid item xs={12} sm={3} ></Grid>
     </Grid>
                        
                            </div>
    
    </>
  );
}