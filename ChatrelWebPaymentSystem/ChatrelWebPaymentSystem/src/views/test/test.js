import React from 'react';
import { Card,InputAdornment,FormControlLabel,Checkbox,List,ListItem } from '@material-ui/core';
import {Link, Box, Container, Grid,CardContent, Button, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//import newback from '../../assets/images/new-background.PNG ';
import projectLogo from '../../assets/images/CTALogo.png';
import wallpaper from '../../assets/images/wallpaper.jpg';

import { renderToString } from 'react-dom/server'
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
  typography:{
    fontFamily:'Poppins',
  }

}));

const ref = React.createRef();
export default function Test () {
  const classes = useStyles();
  const theme = useTheme();

  const fontName='Poppins';
//const rowBackGround,setRowBack

  return (
    <>
       <div className="app-wrapper min-vh-100 bg-white">
                    <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image opacity-9"
                            //  style={{backgroundImage: 'url(' + newback + ')'}}
                             />
                            <div className="bg-composed-wrapper--bg bg-second opacity-7"/>
                            <div className="bg-composed-wrapper--content p-3 p-md-5">
                                <Container>
                                    <Card className="rounded-sm modal-content p-3 bg-white-10">
                                        <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                            <Grid container spacing={0}>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column">
                                                    <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                    <div className="text-center mt-4">
                                                    <img alt="CTA" src={projectLogo} width="200px" height="200px"/>
                                                    <h4  className="display-3 mb-1 text-black">eChatrel</h4>
                                           <h6 className="display-5 mb-1 text-black ">Your go-to resource for supporting the Tibetan Government</h6>
                                                    </div>
                                                    <div className="text-center mb-3">
                                                            <Button className="m-1  btn-pill" style={{border:'1px solid black'}} >
                                            <span className="mr-2" >
                                               <img alt="..." className="img-fluid" height="50" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4T6VTQUgUYRT+3j/+1Ebmhprd7NDSLYlchQ1jV91DFEFs7KEsIg+LdEiIIvDiQTc6Z0gRXmohWYo65jqFNiGrLRV1KLBjbmvJtjaSzo7zYpZtnZEtD73be7zv430f3yNsqoXg4QapiD4GwgB8ALwAFgC8JEvcanyRzjgh5Gy+dbb2M1EcgGczcbm3iHFHGtsGvJqWt2cVgsUu/wiAS38BboyJ5oWlBBuez3ypEOS6/D0E3HeATQAJMKZY8DKYDhIQA1AgYYYaU29sSaUi1lC7FD80aa3VtJVnOUvh7r0Trz84r1k61r7LNOBpUtM5lweGKi+gKEb1B/vnzOyODgYFmtTZmS2l/LnAUGWCGGfsfu1d/djOK197neDQsH6eCHuqElr0iYqT8hWAQFnRTdltXHcudw7pb0FoqUbAIO2/CACkySnh6Wrz2OkT824JQz+HIah5w3XYZtsBA8BPyEjJi0Uot2OFI3MfTW+HECIwG01WNXFwkMW0XPkMYF8JDlwjTqEulD/5TLdke9mHHAsKZ6LJ9y7dzBSK66MEsvNg1zos80Apif7xSA+zO0jESIBoyiLOE8NHLM5uz/b/kL9ajtr5IfBddaA2Voly63hkBLx1lOVyMO35fm61RtYdn7hKK65n8j+MXGbgxj+eyT74EQvRm4kmC5VfcGpte3yqfr1IfcQUBsEHxm4AWWJMW4q4l4kmNef+b0N4yYovWTzTAAAAAElFTkSuQmCC"} />
                                            </span>
                                                  <div style={{fontFamily:'Roboto'}}>            
                                              Sign in with Google
                                                    </div>    
                                                            </Button></div  >
                                                 
                                                </Grid>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column bg-secondary">
                                                    <div className="p-3">
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'id-card']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black  font-size-lg mb-1">Map Google Account with Green Book</div>
                                                                    <p className="mb-0 text-black-75">Update your Google Account by filling <a className='text-first'> this form</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'user']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black font-weight-bold font-size-xxl mb-1">དྭང་བླངས་དཔྱ་དངུལ་དྲ</div>
                                                                    <p className="mb-0 text-black-75 font-size-xl">དྭང་བླངས་དཔྱ་དངུལ་དྲ་རྒྱའི་བརྒྱུད་གནང་བར་ཐུགས་རྗེ་ཆེ་ཞུ། དྭང་བླངས་དཔྱ་དངུལ་དྲ </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'seedling']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black  font-size-lg mb-1">Goals and Needs of Chatrel</div>
                                                                    <p className="mb-0 text-black-75">Chatrel symbolizes the Tibetan people’s recognition of CTA as their legitimate representative. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Card>
                                </Container>
                            </div>
                        </div>
                        {/* <div className="hero-footer w-100 pb-4">
                            <Container>
                                <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                                    <div className="text-center d-block mb-3 mb-md-0 text-white">
                                        Copyright &copy; 2020 - UiFort.com
                                    </div>
                                    <List component="div" className="nav-transparent text-nowrap d-flex justify-content-center">

                                            <ListItem button className="text-white-50" href="#/" onClick={e => e.preventDefault()}>
                                                Privacy Policy
                                            </ListItem>
                                                <ListItem button className="text-white-50" href="#/" onClick={e => e.preventDefault()}>
                                                Terms of Service
                                            </ListItem>

                                    </List>
                                </div>
                            </Container>
                        </div> */}
                    </div>
                </div>

                <div className="app-wrapper min-vh-100 bg-white">
                    <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image opacity-9" 
                            // style={{backgroundImage: 'url(' + newback + ')'}}
                            />
                            <div className="bg-composed-wrapper--bg bg-second opacity-7"/>
                            <div className="bg-composed-wrapper--content p-3 p-md-5">
                                <Container>
                                    <Card className="rounded-sm modal-content p-3 bg-white-10">
                                        <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                            <Grid container spacing={0}>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column">
                                                    <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                    <div className="text-center mt-4">
                                                    <img alt="CTA" src={projectLogo} width="200px" height="200px"/>
                                                    <h4  className="display-3 mb-1  text-black">eChatrel</h4>
                                           <h6 className="display-5 mb-1 text-black ">Your go-to resource for supporting the Tibetan Government</h6>
                                                    </div>
                                               
                                                </Grid>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column bg-secondary">
                                                    <div className="p-3">
                                               
                                                        <div className="text-center text-black py-2 mb-4">
                                                            Signed in with ctadummytest@gmail.com.<a className="text-first"> Sign Out?</a>
                                                        </div>
                                                        <h5 className="display-5 mb-4 text-center text-black "> Great! Just one more step now.</h5>
                                                        <div>
                                                            <div className="mb-4">
                                                                <TextField fullWidth
                                                                           variant="outlined"
                                                                           id="textfield-email"
                                                                           label="Green Book Number"
                                                                           placeholder="Enter Green Book Number"
                                                                           InputProps={{
                                                                               startAdornment: (
                                                                                   <InputAdornment position="start">
                                                                                       <FontAwesomeIcon icon={['fas', 'id-card']} />
                                                                                   </InputAdornment>
                                                                               ),
                                                                           }}
                                                                />
                                                            </div>
                                                            <div className="mb-3">
                                                                <TextField fullWidth
                                                                           variant="outlined"
                                                                           id="textfield-password"
                                                                           label="Date of Birth"
                                                                           placeholder="Enter Date of Birth"
                                                                           type="text"
                                                                           InputProps={{
                                                                               startAdornment: (
                                                                                   <InputAdornment position="start">
                                                                                     <FontAwesomeIcon icon={['fas', 'calendar']} />
                                                                                   </InputAdornment>
                                                                               ),
                                                                           }}
                                                                />
                                                            </div>
                                                     
                                                            <div className="text-center py-4">
                                                             
                                                                <Button className="m-1  btn-pill w-50" style={{border:'1px solid black'}} > VERIFY</Button>
                                                            </div>
                                                      
                                                        </div>
                                                  
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Card>
                                </Container>
                            </div>
                        </div>
                    
                    </div>
                </div>
                

    </>
  );
}
