
import React, { useEffect, useState } from 'react';
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
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { aPageSizeArray } from '../../../config/commonConfig';
import { nPageSize } from '../../../config/commonConfig';
import { Alerts } from '../../alerts';
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
  const [pageSize, setpageSize] = useState(nPageSize);
  const [pageSizeArray, setpageSizeArray] = useState(aPageSizeArray);
    const classes = useStyles();
    const [deceasedData, SetDeceasedData] = React.useState();
    const [madebTypeData, SetMadebTypeData] = React.useState();
    const [madebType, SetMadebType] = React.useState('');
    const [dtFrom, SetdtFrom] = React.useState('');
    const [dtTo, SetdtTo] = React.useState('');
    const [orderBy, SetOrderBy] = React.useState('');
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

    const [filtering, setFiltering] = React.useState(false);
    const columns=[
      {
        field: "sGBID",
        title: "GBID",
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
        field: "sFirstName",
        title: "First Name",
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
        field: "sLastName",
        title: "Last Name",
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
        field: "dtDOB",
        title: "Date of Birth",
        render: rowData => rowData.dtDOB ? Moment(rowData.dtDOB).format('DD-MM-YYYY') : '',
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
        field: "dtDeceased",
        title: "Deceased Date",
        render: rowData => rowData.dtDeceased ? Moment(rowData.dtDeceased).format('DD-MM-YYYY') : '',
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
        field: "sPlace",
        title: "Place",
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
        field: "deathAge",
        title: "Death Age",
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
    const deceased=()=>{
      if(dtFrom === ''||dtTo === ''|| orderBy === ''  ){
        setAlertMessage('All fields are required !');
        setAlertType('error');
        snackbarOpen();
      }
      else{
        axios.get(`/Report/GetReportCTADeceasedRegionOrCountryWise/?dtRecordFrom=`+dtFrom+`&dtRecordTo=`+dtTo+`&sOrderBy=`+orderBy)
        .then(resp => {
          if (resp.status === 200) {
          
            SetDeceasedData(resp.data);
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
        <h1>Deceased Region or Country Wise Report</h1>
        
                                        <FormControl className={classes.formControl}>
                                        
                                          <TextField
                                            type="date" 
                                            id='dtFrom'
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
                                            onChange={(e)=>{SetOrderBy(e.target.value);}}
                                           // onChange={handleChange}
                                            >
                                            <MenuItem value={'lstauthregion.sAuthRegion'}>Region Wise</MenuItem>
                                            <MenuItem value={'lstcountry.sCountryID'}>Country Wise</MenuItem>
                                            
                                        </Select>
                                   </FormControl>
                    
                                    <FormControl className={classes.formControl}>
                                        <Button type="button" variant='outlined' value="Report"  onClick={()=>{deceased();}} >Show</Button>
                                        </FormControl>
                                   <FormControl className={classes.formControl}>
                                        { deceasedData &&
                                        <Button type="button" variant='outlined' onClick={()=>{SetDeceasedData();}} >Clear</Button>
                                        }
                                    </FormControl>

            {
                deceasedData && 
              
                  <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
                    //isLoading={isLoading}
                    icons={tableIcons}
                    title="Deceased Region or Country Wise"
                    columns={columns}
                    data={deceasedData}
                    options={{
                      filtering,
                      exportButton: true,
                      exportAllData: true,
                      headerStyle: {
                        padding: '0',
                        paddingLeft: '10px',
                        border: '1px solid lightgrey',
                      },
                      pageSize: pageSize,
                      pageSizeOptions: pageSizeArray
                    }}
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
    </>
  );
}
