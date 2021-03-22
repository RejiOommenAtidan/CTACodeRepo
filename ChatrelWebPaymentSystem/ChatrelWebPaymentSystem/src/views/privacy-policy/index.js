
import React, { useEffect } from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button,CardContent,Tooltip, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableBodyRow } from 'mui-datatables';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { subMinutes } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import Moment from 'moment';
import avatar1 from '../../assets/images/avatars/avatar1.jpg';

import stock3 from '../../assets/images/stock-photos/stock-3.jpg';

import newback from '../../assets/images/new-background.jpg';
import projectLogo from '../../assets/images/CTALogo.png';


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


export default function Privacy () {
  const classes = useStyles();
  const theme = useTheme();
  const htmlString =``

  // useEffect(() => {
  //   var x = document.getElementById('content');
  //   x.innerHTML=htmlString;


  // }, []);

  return (
    <>
   
     <div  style={{background:`url(${newback})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100% 100%'}}>
     {/* <div  style={{ backgroundColor:'#298851'}}> */}
   
     <Grid container spacing={1} style={{padding:'30px'}}>
      <Grid item xs={12} sm={2} ></Grid>
      <Grid item xs={12} sm={8}>
      <Box display={{ xs: 'block', md: 'none' }}>
      <div  className="app-sidebar-logo "   style={{marginLeft:'20%',paddingLeft:'20px' }}>
              <img
                alt="Chatrel"
                src={projectLogo}
                width="60px"
               
              />
                    
            

             {/* <b style={{color:'#2a5cff',fontSize:"32px" } } >Chatrel</b> */}
             <b style={{color:'#fff',fontSize:"32px" } } >Chatrel</b>
          
            </div>
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
<div  className="app-sidebar-logo "   style={{marginLeft:'40%', }}>
              <img
                alt="Chatrel"
                src={projectLogo}
                width="60px"
               
              />
                    
            

            {/* <b style={{color:'#2a5cff',fontSize:"32px" } } >Chatrel</b> */}
            <b style={{color:'#fff',fontSize:"32px",marginLeft:'10px' } } >Chatrel</b>

          
            </div>
</Box>
      
        <div>
      <Card className="card-box card-box-alt  mx-auto mt-4" style={{borderBottomLeftRadius:'0',borderBottomRightRadius:'0'}}>
        
      <div className="card-content-overlay text-left">
      <div className="px-4">
                                        <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                                            <FontAwesomeIcon icon={['fas', 'envelope-open-text']} className="display-3" />
                                        </div>
                                        <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                                            Privacy Policy
                                        </div>
                                        <div className="text-black" id="content">
                                        <div>
  <p>This Privacy Policy applies to all information received by Central Tibetan Administration on this website or the Chatrel Mobile app – both Android and iOS. </p>
  <p>We will not sell, share, or trade our names or Personal Information of any website visitors with any other entity, nor send mailings to our donors on behalf of other organizations. By visiting this website and/or using the Chatrel Mobile App, you agree to the terms (“Terms”) of this Privacy Policy and our accompanying Terms of Use. If you do not agree to this Privacy Policy or the Terms of Use (collectively, this “Agreement”), please do not use this website and/or the Chatrel Mobile App. </p>
  <p>No content produced by the team of Chatrel.net website and/or Chatrel Mobile App may be reproduced in its entirety. </p>
  <p>When using Chatrel.net as news source, Chatrel.net website and/or Chatrel Mobile App must be credited as the original source/publisher of the story. </p>
  <p>Any photos and illustrations originally produced by Chatrel.net website and/or Chatrel Mobile App, if reproduced should be duly credited. </p>
  <p>No images or screenshots of the Chatrel.net website and/or Chatrel Mobile App can be reproduced or used in any publication online/offline without the written consent of Central Tibetan Administration. </p>

  <p>If there are any questions regarding this privacy policy, you may contact us using the information below. <br/>
  chatrelonline@tibet.net<br/>
  chatrel@tibet.net</p>
  <p>We reserve the right to change this Privacy Policy from time to time.  </p>

  <p>The Secretary,<br/>
  Department of Finance<br/>
  Central Tibetan Administration,<br/>
  Dharamshala – 176215 (H.P.)<br/>
  India</p>
  </div>

                                      </div>
      </div>
          <div className="divider mt-4" />
         
         
         
      </div>
    {/*    <Button variant="outlined" color="primary" type="submit" >Verify &amp; Pay</Button>*/}
                            </Card></div>
         
     
     </Grid>
     <Grid item xs={12} sm={2} ></Grid>
     </Grid>
                        
                            </div>
    
    </>
  );
}