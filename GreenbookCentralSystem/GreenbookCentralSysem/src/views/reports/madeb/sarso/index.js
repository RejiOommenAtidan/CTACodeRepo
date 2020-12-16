
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  Breadcrumbs,
  Link,
  Paper,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Select,
  InputLabel,
  MenuItem
  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Rowing } from '@material-ui/icons';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { aPageSizeArray } from '../../../../config/commonConfig';
import { nPageSize } from '../../../../config/commonConfig';

import { Alerts } from '../../../alerts';
import { BackdropComponent } from '../../../backdrop/index';
const tableIcons = oTableIcons;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: 0.01875,
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));


export default function Report() {

  let history = useHistory();
  const [pageSize, setpageSize] = useState(nPageSize);
  const [pageSizeArray, setpageSizeArray] = useState(aPageSizeArray);
    const classes = useStyles();
    const [sarsoData, SetSarsoData] = React.useState([]);
    const [madebTypeData, SetMadebTypeData] = React.useState();
    const [madebType, SetMadebType] = React.useState('F');
    const [dtFrom, SetdtFrom] = React.useState('');
    const [dtTo, SetdtTo] = React.useState('');
    const [orderBy, SetOrderBy] = React.useState('');
    const [groupBy, SetGroupBy] = React.useState('');

    const [filtering, setFiltering] = React.useState(false);
    const [backdrop, setBackdrop] = React.useState(false);

    //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };
    const columns=[
      {
        field: "no",
        title: "#",
        filterPlaceholder: 'Search..',
        width:'5%',
        //hidden:true,
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
      {
        field: "sPlaceName",
        title: "Region/Country",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'left'
  
        },
      },
      {
        field: "madebPending",
        title: "Madeb Pending",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
      {
        field: "madebIssued",
        title: "Madeb Issued",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
      {
        field: "madebRejected",
        title: "Madeb Rejected",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
      {
        field: "madebDouble",
        title: "Madeb Double",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
      {
        field: "madebCancelled",
        title: "Madeb Cancelled",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
    
      {
        field: "madebTotalReceived",
        title: "Total Received",
        filterPlaceholder: 'Search..',
        headerStyle: {
          padding: '5px',
          
          textAlign: 'center'
        },
        cellStyle: {
          // padding:'0px',
          padding: '5px',
          
          textAlign: 'center'
  
        },
      },
     
    ]
    const sarso=()=>{
        if(madebType === '' ||dtFrom === ''||dtTo === ''|| orderBy === ''  ){
          setAlertMessage('All fields are required !');
          setAlertType('error');
          snackbarOpen();

        }
        else{
          setBackdrop(true);
          axios.get(`/Report/GetReportCTAMadebRegionOrCountryWise/?sMadebDisplayKey=`+madebType+`&dtRecordFrom=`+dtFrom+`&dtRecordTo=`+dtTo+`&sGroupBy=`+groupBy+`&sOrderBy=`+orderBy)
          .then(resp => {
            if (resp.status === 200) {
              setBackdrop(false);
              if(resp.data.length==0){
                setAlertMessage('No Records to display');
                setAlertType('info');
                snackbarOpen();
              }
              else{
              let x = 1;
              let total={'no':'','sPlaceName':'Total','madebPending':0,'madebIssued':0,'madebRejected':0,'madebDouble':0,'madebCancelled':0,'madebTotalReceived':0};
              resp.data.forEach((element) => {
                           //element.dtFormattedIssuedDate = element.dtIssuedDate ? Moment(element.dtIssuedDate).format(sDateFormat) : null;
                           element.no=x;
                           x=x+1;
                           total.madebPending += element.madebPending;
                           total.madebIssued += element.madebIssued;
                           total.madebRejected += element.madebRejected;
                           total.madebDouble += element.madebDouble;
                           total.madebCancelled += element.madebCancelled;
                           total.madebTotalReceived += element.madebTotalReceived; 
                         })
                         resp.data.push(total);
              SetSarsoData(resp.data);
              console.log(resp.data);
            }}
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
              setAlertMessage('Error', error.messag);
              setAlertType('error');
              snackbarOpen();
            }
            console.log(error.config);
          })
          .then(release => {
            //console.log(release); => udefined
          });
        }

      
     
    }
  
    return (
    <>
      <Paper style={{padding:'30px',textAlign:'center'}} >
        <h1>Sarso Report</h1>
      
       
                                        <FormControl className={classes.formControl}>
                                        
                                          <TextField
                                            type="date" 
                                            id='dtFrom'
                                            name='dtFrom'
                                            onChange={(e)=>{SetdtFrom(e.target.value);}}
                                             value={dtFrom} 
                                            label="Date From"
                                            className={classes.textField}
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                           
                                          />
                                           
                                       </FormControl>
                                    <FormControl className={classes.formControl}>
                                       
                                           <TextField
                                             type="date" 
                                             id='dtTo'
                                             name='dtTo'
                                             onChange={(e)=>{SetdtTo(e.target.value);}}
                                         
                                             value={dtTo} 
                                            label="Date To"
                                            className={classes.textField}
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                       
                                          />
                                          
                                  </FormControl>
                                  <FormControl className={classes.formControl}>
                                        <InputLabel id="orderbylbl">Order By</InputLabel>
                                        <Select
                                            labelId="orderbylbl"
                                            id="orderby"
                                            name="orderby"
                                            onChange={(e)=>{SetOrderBy(e.target.value)}}
                                           
                                            >
                                            <MenuItem value={'lstauthregion.sAuthRegion'}>Region Wise</MenuItem>
                                            <MenuItem value={'lstcountry.sCountry'}>Country Wise</MenuItem>
                                         
                                        </Select>
                                   </FormControl>
                                   <FormControl className={classes.formControl}>
                                        <Button type="button" variant='outlined' value="Report" onClick={()=>{sarso();}} >Show</Button>
                                        </FormControl>
                                   <FormControl className={classes.formControl}>
                                        { sarsoData.length>0 &&
                                        <Button type="button" variant='outlined' onClick={()=>{history.go(0);}} >Clear</Button>
                                        }
                                    </FormControl>
                              

            {
                sarsoData.length>0 && 
              
                  <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
                    //isLoading={isLoading}
                    icons={tableIcons}
                    title="Sarso Report"
                    columns={columns}
                    data={sarsoData}
                    options={oOptions}
                    actions={[
        
                      {
                        icon: Search,
                        tooltip: 'Show Filter',
                        isFreeAction: true,
                        onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
                      }
                    ]}
                  />
            }



      </Paper>
      {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />}
          {backdrop && <BackdropComponent
            backdrop={backdrop}
            />}
    </>
  );
}
