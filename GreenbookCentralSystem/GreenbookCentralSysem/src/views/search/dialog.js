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

import stock from '../../assets/images/No_person.jpg';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import EmailIcon from '@material-ui/icons/Email';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'moment';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
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
import { Rowing } from '@material-ui/icons';
/*const findImg = (obj) =>{
  var str="";
  obj.map((row) => {
     if(obj.sDocType === "Photo Identity"){
       str= obj.binFileDoc;
     }
     return str
  })
}*/

export const ViewDialog = (props) => {
  const [sFeature, setsFeature] = useState("");
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = React.useState([]);
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  

 
  useEffect(() => {
    axios.get(`GreenBook/GetDetailsFromGBID?sGBID=`+props.sGBID+`&nUserId=`+JSON.parse(localStorage.getItem("currentUser")).oUser.id)
      .then(resp => {
        if (resp.status === 200) {
          setData(resp.data);
         console.log(resp.data);
         console.log(JSON.parse(localStorage.getItem("currentUser")).oUser.id);
     
    
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);
 



 
  return (
    <>
    {data.length!=0 && 
    <Dialog open={props.viewModal} onEscapeKeyDown={props.handleViewClickClose} fullWidth='true'
      maxWidth='xl' aria-labelledby="form-dialog-title">
    {/*  <DialogTitle id="form-dialog-title">Add Feature</DialogTitle>*/}
      <DialogContent>
        <DialogContentText>
        
        <Card className="card-box mb-spacing-6-x2">
            <Grid container spacing={0}>
              <Grid item xl={5}>
                <div className="p-4 text-center">
                  <div className="avatar-icon-wrapper  mx-auto">
                    <div className="d-block p-0 avatar-icon-wrapper m-0 border-3">
                      <div className=" border-3 border-white overflow-hidden">
                       {data.sPhoto!= null  && 
                        <img alt="..." className="img-fluid" style={{width:'100px' }} src={`data:image/gif;base64,${data.sPhoto}`} /> }
                        {data.sPhoto == null  &&  
                        <img alt="..." className="img-fluid" style={{width:'100px' }} src={stock} />}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-size-lg font-weight-bold my-2">
                    {data.greenBook.sFirstName + ' ' + data.greenBook.sLastName}
                  </h4>
                  <h4 className="font-size-lg font-weight-bold my-2">
                    {data.greenBook.sCountryID+data.greenBook.sGBID }
                  </h4>



                  <div className="divider my-4" />
                  <Grid container spacing={1} style={{ textAlign: 'left' }}>
                    <Grid item sm={6}>
                      Gender : {data.greenBook.sGender == 'M' ? 'Male' : 'Female'}
                    </Grid>
                    <Grid item sm={6}>
                      Father's Name : {data.relations.sFathersName}
                    </Grid>
                    <Grid item sm={6}>
                      DOB : {data.greenBook.dtDOB ? Moment(data.greenBook.dtDOB).format('DD-MM-YYYY'): ''}
                    </Grid>
                    <Grid item sm={6}>
                      Mother's Name : {data.relations.sMothersName}
                    </Grid>
                    <Grid item sm={6}>
                      Age :{data.nAge}
                    </Grid> 
                    <Grid item sm={6}>
                      Family Name : {data.greenBook.sFamilyName}
                    </Grid>
                  </Grid>
                  <div className="divider my-4" />
                  <Grid container spacing={1} style={{ textAlign: 'left' }}>
                    <Grid item sm={6}>
                      Resident: {data.greenBook.sAddress2 ? data.greenBook.sAddress2:''  + data.greenBook.sCity + ','+ data.sCountry}
                    </Grid>
                    <Grid item sm={6}>
                      Entered By: {data.sEnteredBy}
                    </Grid>
                    <Grid item sm={6}>
                      Edited On: {data.greenBook.dtUpdated ? Moment(data.greenBook.dtUpdated).format('DD-MM-YYYY'): ''}
                    </Grid>
                  </Grid>
                  <div className="divider my-4" />
                  { data.relations.sFathersGBID != null && data.relations.sMothersGBID != null && data.relations.sSpouseGBID != null &&
                  <div className="font-weight-bold text-uppercase text-black-50 text-center mb-3">
                    Family members
                                    </div>
                                    
                                    }
                  <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">

                    { data.relations.sFathersGBID != null &&
                    <Tooltip title={data.relations.sFathersGBID+' (Father)'} classes={{ tooltip: "tooltip-danger" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon">
                          <img alt="..." src={`data:image/gif;base64,${data.relations.sFathersPhoto}`} /></div>
                      </div>
                    </Tooltip>
                      }
  { data.relations.sMothersGBID != null &&
                    <Tooltip title={data.relations.sMothersGBID+' (Mother)'} classes={{ tooltip: "tooltip-first" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={`data:image/gif;base64,${data.relations.sMothersPhoto}`} /></div>
                      </div>


                    </Tooltip>}
                    { data.relations.sSpouseGBID != null &&
                    <Tooltip title={data.relations.sSpouseGBID+' (Spouse)'} classes={{ tooltip: "tooltip-first" }} arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon"><img alt="..." src={`data:image/gif;base64,${data.relations.sSpousePhoto}`} /></div>
                      </div>


                    </Tooltip>}

               
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
                        <Typography className="font-size-lg font-weight-bold my-2">Contact Information</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      <Grid container spacing={2} >
                        <Grid item sm={6}>
                        <FormControl className={props.classes.formControl}>
                        Address 1: {data.greenBook.sAddress1}
                           </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                        <FormControl className={props.classes.formControl}>
                          Address 2 : {data.greenBook.sAddress2}
                         </FormControl>
                          </Grid>
                        <Grid item sm={6}>
                        City : {data.greenBook.sCity}
                         
                        </Grid>
                        <Grid item xs={6}>
                             State : {data.greenBook.sState}
                                
                            </Grid>
                        <Grid item sm={6}>
                             Pin Code : {data.greenBook.sPCode}
                               
                            </Grid>
                            <Grid item sm={6}>
                            Country :  {data.sCountry}
                                 
                            </Grid>
                            <Grid item sm={6}>
                              Fax Number : {data.greenBook.sFax}
                                  
                            </Grid>
                                 
                            <Grid item sm={6}>
                            Email : {data.greenBook.sEmail}
                                
                          </Grid>
                            <Grid item sm={6}>
                              Phone Number : {data.greenBook.sPhone}
                            </Grid>
                            <Grid item sm={6}>
                              Form Date : {data.greenBook.dtFormDate ? Moment(data.greenBook.dtFormDate).format('DD-MM-YYYY'): ''}
                            </Grid>
                            <Grid item sm={6}>
                             Authority Region : {data.sAuthRegion}
                                  
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
                        <Typography className="font-size-lg font-weight-bold my-2">Personal Information</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      <Grid item xs={6} >
                        <Grid container spacing={2}>                        
                        <Grid item xs={12}>
                          Place Of Birth : {data.greenBook.sBirthPlace}
                                  
                          </Grid>
                          <Grid item xs={12}>
                            Origin Village : {data.greenBook.sOriginVillage}
                                
                          </Grid>
                          <Grid item xs={12}>
                          ཕ་ཡུལ། : {data.greenBook.tbuPlaceOfBirth}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Old GB Number : {data.greenBook.sOldGreenBKNo}
                                
                          </Grid>
                          <Grid item xs={12}>
                         RC Number : {data.greenBook.sResidenceNumber}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Other Documents : {data.greenBook.sOtherDocuments}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Marital Status : {data.greenBook.sMarried}
                                
                          </Grid>
                          
                          
                          
                          </Grid>
                      </Grid>
                      <Grid item xs={6} >
                      <Grid container spacing={2}>  
                      <Grid item xs={12}>
                          Birth Country : {data.sBirthCountry}
                                  
                          </Grid>
                          <Grid item xs={12}>
                            Province : {data.sProvince}
                                
                          </Grid>
                          <Grid item xs={12}>
                            First GB number : {data.greenBook.sFstGreenBkNo}
                                
                          </Grid>
                          <Grid item xs={12}>
                            Qualification : {data.sQualification}
                                
                          </Grid>
                          <Grid item xs={12}>
                            Deceased: {data.greenBook.dtDeceased ? data.greenBook.dtDeceased : 'Not Deceased'}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Occupation : {data.sOccupationDesc}
                                
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
                        <Typography className="font-size-lg font-weight-bold my-2">Relation Details</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                        <Grid container>
                      <Grid item xs={6} >
                        <Grid container spacing={2}>                        
                        <Grid item xs={12}>
                          Father's Name : {data.relations.sFathersName}
                                  
                          </Grid>
                          <Grid item xs={12}>
                          ཕ་མིང་། : {data.greenBook.tbuFathersName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Father's Old GB : {data.greenBook.sFathersID}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Father's GB : {data.relations.sFathersGBID ?  <Button  onClick={()=>props.openRelationGB(data.relations.sFathersGBID)} className="m-2 btn-transparent btn-link btn-link-second" >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sFathersGBID}</h4></Button> : ''}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Mother's Name : {data.relations.sMothersName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          མའི་མིང་། : {data.greenBook.tbuMothersName}
                                
                          </Grid>
                          <Grid item xs={12}>
                         Number of Male Children : {data.greenBook.nChildrenM}
                                
                          </Grid>
                          
                          
                          
                          </Grid>
                      </Grid>
                      <Grid item xs={6} >
                      <Grid container spacing={2}>  
                      <Grid item xs={12}>
                          Mother's OLD GB : {data.greenBook.sMothersID}
                                  
                          </Grid>
                          <Grid item xs={12}>
                          Mother's GB : {data.relations.sMothersGBID ?  <Button className="m-2 btn-transparent btn-link btn-link-second" onClick={()=>{props.openRelationGB(data.relations.sMothersGBID)}} >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sMothersGBID}</h4></Button> : ''}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Spouse Name : {data.relations.sSpouseName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          ཟ་ཟླའི་མིང་། : {data.greenBook.tbuSpouseName}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Spouse Old GB : {data.greenBook.sSpouseID}
                                
                          </Grid>
                          <Grid item xs={12}>
                          Spouse GB :{data.relations.sSpouseGBID ?  <Button  onClick={()=>{props.openRelationGB(data.relations.sSpouseGBID)}} className="m-2 btn-transparent btn-link btn-link-second" style={{padding:'0px'}} >  <h4 className="font-size-lg font-weight-bold my-2">{data.relations.sSpouseGBID}</h4></Button> : ''}
                        

                                
                          </Grid>
                          <Grid item xs={12}>
                          No of Female Children : {data.greenBook.nChildrenF}
                                
                          </Grid>
                        
                      </Grid>
                      </Grid>
                      </Grid>
                     
                      
    
                 
                     
                    { data.children.length!=0 &&
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
                            {data.children.map((row, index) => (
                            <tr>
                                <td scope="row">{row.sName}</td>
                                <td scope="row">{row.dtDOB}</td>
                                <td scope="row">{row.sGender}</td>
                                <td scope="row">{row.sChildID}</td>
                                <td scope="row">
                                 
                                  {row.sGBIDChild ?  <Button  onClick={()=>props.openRelationGB(row.sGBIDChild)} className="m-2 btn-transparent btn-link btn-link-second" ><span>{row.sGBIDChild}</span></Button> : ''}
                                </td>
                             
                              
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> }
                   </div>
  
                      </ExpansionPanelDetails>
                    </ExpansionPanel> 
                  </Grid>
                  <Grid item xs={12}>
                    <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel4'}
                      onChange={handleAccordionChange('panel4')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="font-size-lg font-weight-bold my-2">Book Issued Details</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      { data.booksIssued.length!=0 &&
                     <Table className="table table-hover table-striped table-bordered " >
                            <thead className="thead-light" style={{padding:0}}>
                            <tr>
                                <th scope="col">Issued Date</th>
                                <th > Why Issued </th>
                                <th > Where Issued </th>
                                <th > Issue Application No </th>
                                <th > Entered Date </th>
                                                           
                            </tr>
                            </thead>
                            <tbody style={{padding:0}}>
                            {data.booksIssued.map((row, index) => (
                            <tr>
                                <td scope="row">{row.issueBook.dtIssuedDate  ? Moment(row.issueBook.dtIssuedDate).format('DD-MM-YYYY'): ''}</td>
                                <td scope="row">{row.sMadebDisplayName}</td>
                                <td scope="row">{row.sAuthRegion}</td>
                                <td scope="row">{row.issueBook.sFormNumber}</td>
                                <td scope="row">{row.issueBook.dtEntered ? Moment(row.issueBook.dtEntered).format('DD-MM-YYYY'): ''}</td>
                             
                              
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> }
                      </ExpansionPanelDetails>
                    </ExpansionPanel> 
                  </Grid>
                  <Grid item xs={12}>
                    <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel5'}
                      onChange={handleAccordionChange('panel5')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="font-size-lg font-weight-bold my-2">History</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      { data.auditLogs.length!=0 &&
                     <Table className="table table-hover table-striped table-bordered " >
                            <thead className="thead-light" style={{padding:0}}>
                            <tr>
                                <th scope="col">SR No.</th>
                                <th > Name Of Field</th>
                                <th > Change From </th>
                                <th > Changed To </th>
                                <th > Changed By </th>
                                <th > Changed At </th>
                                <th > Changed When </th>
                 
                            </tr>
                            </thead>
                            {
                            <tbody style={{padding:0}}>
                            {data.auditLogs.map((row, index) => (
                            <tr>
                                <td scope='row'>{index+1}</td>
                                <td >{row.sFeature }</td>
                                <td >{row.auditLogs.sFieldValuesOld}</td>
                                <td >{row.auditLogs.sFieldValuesNew}</td>
                                <td >{row.sEnteredBy}</td>
                                <td >{row.sOffice}</td>
                                <td >{row.auditLogs.dtEntered ? Moment(row.issueBook.dtEntered).format('DD-MM-YYYY'): ''}</td>
                             
                              
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>}
                            </Table> }

                      </ExpansionPanelDetails>
                    </ExpansionPanel> 
                  </Grid>
                  <Grid item xs={12}>
                    <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel6'}
                      onChange={handleAccordionChange('panel6')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="font-size-lg font-weight-bold my-2">Notes</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      { data.gbNotes.length!=0 &&
                     <Table className="table table-hover table-striped table-bordered " >
                            <thead className="thead-light" style={{padding:0}}>
                            <tr>
                                <th scope="col">Notes</th>
                                <th style={{width:'15%'}} > Date</th>
                                
                 
                            </tr>
                            </thead>
                            
                            <tbody style={{padding:0}}>
                            {data.gbNotes.map((row, index) => (
                            <tr>

                                <td scope="row">{row.sNote}</td>
                                <td scope="row">{row.dtEntered ? Moment(row.dtEntered).format('DD-MM-YYYY'): ''}</td>
                             
                              
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> }

                      </ExpansionPanelDetails>
                    </ExpansionPanel> 
                  </Grid>
                  <Grid item xs={12}>
                    <ExpansionPanel
                      TransitionProps={{ unmountOnExit: true }}
                      expanded={expanded === 'panel7'}
                      onChange={handleAccordionChange('panel7')}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="font-size-lg font-weight-bold my-2">Documents</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      { data.gbDocuments.length > 0 &&
                     <Table className="table table-hover table-striped table-bordered " >
                            <thead className="thead-light" style={{padding:0}}>
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th> Date </th>
                                <th> Entered By </th>
                                <th> Title </th>
                                <th style={{width:'5%'}}> Download </th>
                                <th style={{width:'5%'}}> Delete </th>
                               
                                
                 
                            </tr>
                            </thead>
                            
                            <tbody style={{padding:0}}>
                            {data.gbDocuments.map((row, index) => (
                            <tr>

                                <td scope="row">{index+1}</td>
                                <td>{row.dtEntered ? Moment(row.dtEntered).format('DD-MM-YYYY'): ''}</td> 
                                <td>{row.nEnteredBy}</td>                              
                            <td>{row.sDocType}</td>        
                                <td style={{textAlign:'center'}}>
                         
                                 <a href={`data:application/octet-stream;base64,${row.binFileDoc}`} download={row.sDocType+row.sFileExtension} className="btn-neutral-primary btn-icon btn-animated-icon btn-transition-none d-40 p-0 m-2">
                                   <span className="btn-wrapper--icon">
                                    <GetAppIcon/>
                                    </span></a>
                                 
                                  </td>        
                                <td>
                                <Button className="btn-neutral-danger btn-icon btn-animated-icon btn-transition-none d-40 p-0 m-2">
                                    <span className="btn-wrapper--icon">
                                    <DeleteForeverIcon/>
                                    </span>
                                 </Button>  
                                </td>        
                              

                             
                              
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> }

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
        <Button onClick={props.handleViewClickClose} color="primary">Close</Button>
      
      </DialogActions>
    </Dialog>
  }
  </>
  );
}

