//REMOVE: Unnecessary IMPORTS as Well as Unncecessary Code after Working Stuff Out  
//NOTE: Request to Follow IMPORT Order For Consistency throughout
//REACT IMPORTS
//REDUX IMPORTS
//ACTIONS IMPORTS
//REDUCERS IMPORTS
//ROUTING IMPORTS
//AUTH SERVICE IMPORTS
//MOMENT IMPORT
//AXIOS IMPORT
//MUI IMPORTS
//MATERIAL-TABLE IMPORT
//LOCAL IMPORTS
//ANY OTHER IMPORTS AFTER THESE
//ENSURE SEMICOLON AFTER EACH IMPORT!!


//import avatar1 from '../../../public/ctalogo.png';
import avatar1 from '../../assets/images/avatars/avatar1.jpg';

import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import stock6 from '../../assets/images/stock-photos/stock-6.jpg';

import EmailIcon from '@material-ui/icons/Email';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Tooltip,
  Card,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Table
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const ViewDialog = (props) => {
  const [sFeature, setsFeature] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Dialog open={props.viewModal} fullWidth='true'
      maxWidth='xl' aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Feature</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* 
          <Grid container className={classes.box}>

          
          </Grid>*/}

          <Card className="card-box mb-spacing-6-x2">
            <Grid container spacing={0}>
              <Grid item xl={5}>
                <div className="p-4 text-center">
                  <div className="avatar-icon-wrapper rounded-circle mx-auto">
                    <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-first">
                      <div className="rounded-circle border-3 border-white overflow-hidden">
                        <img alt="..." className="img-fluid" src={avatar5} />
                      </div>
                    </div>
                  </div>
                  <h4 className="font-size-lg font-weight-bold my-2">
                    {props.data.greenBook.sFirstName + ' ' + props.data.greenBook.sLastName}
                  </h4>


                  <div className="divider my-4" />
                  <Grid container spacing={1} style={{ textAlign: 'left' }}>
                    <Grid item sm={6}>
                      Gender : {props.data.greenBook.sGender == 'M' ? 'Male' : 'Female'}
                    </Grid>
                    <Grid item sm={6}>
                      DOB : {props.data.greenBook.dtDOB}
                    </Grid>
                    <Grid item sm={6}>
                      Age :{props.data.nAge}
                    </Grid>
                    <Grid item sm={6}>
                      Father's Name : {props.data.greenBook.sFathersName}
                    </Grid>
                    <Grid item sm={6}>
                      Mother's Name : {props.data.greenBook.sMothersName}
                    </Grid>
                    <Grid item sm={6}>
                      Family Name : {props.data.greenBook.sFamilyName}
                    </Grid>
                  </Grid>
                  <div className="divider my-4" />
                  <Grid container spacing={1} style={{ textAlign: 'left' }}>
                    <Grid item sm={6}>
                      Resident: {props.data.greenBook.sAddress2 + props.data.greenBook.sCity + ',' + props.data.greenBook.sState, +',', props.data.greenBook.sCountryID}
                    </Grid>
                    <Grid item sm={6}>
                      Entered By: {props.data.greenBook.nEnteredBy}
                    </Grid>
                    <Grid item sm={6}>
                      Edited On: {props.data.greenBook.dtUpdated}
                    </Grid>
                  </Grid>
                  <div className="divider my-4" />
                  <div className="font-weight-bold text-uppercase text-black-50 text-center mb-3">
                    Family members
                                    </div>
                  <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">
                    <Tooltip title="Chelsey Delaney" classes={{ tooltip: "tooltip-danger" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={avatar1} /></div>
                      </div>


                    </Tooltip>

                    <Tooltip title="Laibah Santos" classes={{ tooltip: "tooltip-first" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={avatar7} /></div>
                      </div>


                    </Tooltip>

                    <Tooltip title="Ksawery Weber" classes={{ tooltip: "tooltip-second" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={avatar1} /></div>
                      </div>


                    </Tooltip>

                    <Tooltip title="Killian Magana" classes={{ tooltip: "tooltip-info" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={avatar2} /></div>
                      </div>


                    </Tooltip>

                    <Tooltip title="Kean Banks" classes={{ tooltip: "tooltip-success" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={avatar6} /></div>
                      </div>


                    </Tooltip>
                  </div>

                </div>
              </Grid>
              <Grid item xl={7}>
                <Grid container className={props.classes.box}>
                  <Grid item xs={12}>
                    <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel1'}
                      onChange={handleAccordionChange('panel1')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={props.classes.heading}>Contact Information</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      <Grid container spacing={2} >
                        <Grid item sm={6}>
                        <FormControl className={props.classes.formControl}>
                        Address 1: {props.data.greenBook.sAddress1}
                           </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                        <FormControl className={props.classes.formControl}>
                          Address 2 : {props.data.greenBook.sAddress2}
                         </FormControl>
                          </Grid>
                        <Grid item sm={6}>
                        City : {props.data.greenBook.sCity}
                         
                        </Grid>
                        <Grid item xs={6}>
                             State : {props.data.greenBook.sState}
                                
                            </Grid>
                        <Grid item sm={6}>
                             Pin Code : {props.data.greenBook.sPCode}
                               
                            </Grid>
                            <Grid item sm={6}>
                            Country :  {props.data.greenBook.sCountryID}
                                 
                            </Grid>
                            <Grid item sm={6}>
                              Fax Number : {props.data.greenBook.sFax}
                                  
                            </Grid>
                                 
                            <Grid item sm={6}>
                            Email : {props.data.greenBook.sEmail}
                                
                          </Grid>
                            <Grid item sm={6}>
                              Phone Number : {props.data.greenBook.sPhone}
                            </Grid>
                            <Grid item sm={6}>
                              Form Date : {props.data.greenBook.dtFormDate}
                            </Grid>
                            <Grid item sm={6}>
                             Authority Region : {props.data.sAuthRegion}
                                  
                            </Grid>
                      
                          </Grid>
       
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>

                  <Grid item xs={12}>
                    <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel2'}
                      onChange={handleAccordionChange('panel2')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={props.classes.heading}>Personal Information</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      <Grid item xs={6} >
                        <Grid container spacing={2}>                        
                        <Grid item xs={12}>
                          Place Of Birth : {props.data.greenBook.sBirthPlace}
                                  
                          </Grid>
                          <Grid item xs={12}>
                            Origin Village : {props.data.greenBook.sOriginVillage}
                                
                          </Grid>
                          <Grid item xs={12}>
                          ཕ་ཡུལ། : {props.data.greenBook.tbuPlaceOfBirth}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Old GB Number : {props.data.greenBook.sOldGreenBKNo}
                                
                          </Grid>
                          <Grid item xs={12}>
                         RC Number : {props.data.greenBook.sResidenceNumber}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Other Documents : {props.data.greenBook.sOtherDocuments}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Marital Status : {props.data.greenBook.sMarried}
                                
                          </Grid>
                          
                          
                          
                          </Grid>
                      </Grid>
                      <Grid item xs={6} >
                      <Grid container spacing={2}>  
                      <Grid item xs={12}>
                          Birth Country : {props.data.greenBook.sBirthCountryID}
                                  
                          </Grid>
                          <Grid item xs={12}>
                            Province : {props.data.sProvince}
                                
                          </Grid>
                          <Grid item xs={12}>
                            First GB number : {props.data.greenBook.sFstGreenBkNo}
                                
                          </Grid>
                          <Grid item xs={12}>
                            Qualification : {props.data.sQualification}
                                
                          </Grid>
                          <Grid item xs={12}>
                            Deceased: {props.data.greenBook.dtDeceased ? props.data.greenBook.dtDeceased : 'Not Deceased'}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Occupation : {props.data.sOccupationDesc}
                                
                          </Grid>
                        
                      </Grid>
                      </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel> 
                  </Grid>

                  <Grid item xs={12}>
                 <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel3'}
                      onChange={handleAccordionChange('panel3')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={props.classes.heading}>Relation Details</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      <Grid item xs={6} >
                        <Grid container spacing={2}>                        
                        <Grid item xs={12}>
                          Father's Name : {props.data.greenBook.sFathersName}
                                  
                          </Grid>
                          <Grid item xs={12}>
                          ཕ་མིང་། : {props.data.greenBook.tbuFathersName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Father's Old GB : !!!!!!!!!!!!!
                                
                          </Grid>
                          <Grid item xs={12}>
                          Father's GB : {props.data.greenBook.sFathersGBID ?  <Button className="m-2 btn-transparent btn-link btn-link-second" ><span>{props.data.greenBook.sFathersGBID}</span></Button> : ''}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Mother's Name : {props.data.greenBook.sMothersName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          མའི་མིང་། : {props.data.greenBook.tbuMothersName}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Number of Male Children : {props.data.greenBook.nChildrenM}
                                
                          </Grid>
                          
                          
                          
                          </Grid>
                      </Grid>
                      <Grid item xs={6} >
                      <Grid container spacing={2}>  
                      <Grid item xs={12}>
                          Mother's OLD GB : !!!!!!!!!!!!!!!
                                  
                          </Grid>
                          <Grid item xs={12}>
                          Mother's GB : {props.data.sMothersGBID}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Spouse Name : {props.data.greenBook.sSpouseName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          ཟ་ཟླའི་མིང་། : {props.data.greenBook.tbuSpouseName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Spouse Old GB : !!!!!!!!!!!!!!!!!!!!
                                
                          </Grid>
                          <Grid item xs={12}>
                          Spouse GB : {props.data.greenBook.sSpouseGBID}
                        

                                
                          </Grid>
                          <Grid item xs={12}>
                          No of Female Children : {props.data.greenBook.nChildrenF}
                                
                          </Grid>
                        
                      </Grid>
                      </Grid>
                      <div className="divider my-4" />
                        <div>
                      <Table className="table table-hover table-striped table-bordered">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th > DOB </th>
                                <th > Gender </th>
                                <th > Old GB </th>
                                <th > GB Number </th>
                                                           
                            </tr>
                            </thead>
                            <tbody>
                            {props.data.children.map((row, index) => (
                            <tr>
                                <td scope="row">{row.sName}</td>
                                <td scope="row">{row.dtDOB}</td>
                                <td scope="row">{row.sGender}</td>
                                <td scope="row">!!!!!!!!!!!!!</td>
                                <td scope="row">{row.id}</td>
                             
                              
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> 
                            </div>
                       
                      </ExpansionPanelDetails>
                    </ExpansionPanel> 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>


        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleViewClickClose} color="primary">Cancel</Button>
        <Button color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

