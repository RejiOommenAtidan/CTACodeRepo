
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
import { useForm, Controller } from "react-hook-form";
import { Alerts } from '../../alerts';
import _ from "lodash/fp";
import { BackdropComponent } from '../../backdrop/index';
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
    const [changesLogData, SetChangesLogData] = React.useState();
    
    const [dtFrom, SetdtFrom] = React.useState('');
    
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
      field: "sGBId",
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
      field: "sName",
      title: "Name",
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
      field: "sFeature",
      title: "Feature",
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
      field: "sFieldValuesOld",
      title: "Old Value",
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
      field: "sFieldValuesNew",
      title: "New Value",
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
      field: "sFullName",
      title: "Full Name",
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
      field: "dtEntered",
      title: "Date Entered",
      render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
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
    const changesLog=()=>{
        if(dtFrom === ''){
          setAlertMessage('Date From field is required !');
          setAlertType('error');
          snackbarOpen();

        }
        else{
          setBackdrop(true);
          axios.get(`/Report/GetReportCTAChangesLog/?&dtRecordFrom=`+dtFrom)
          .then(resp => {
            setBackdrop(false);
            if (resp.status === 200) {
            
              SetChangesLogData(resp.data);
              console.log(resp.data);
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
        }

      
     
    }
   
    return (
    <>
      <Paper style={{padding:'30px',textAlign:'center'}} >
        <h1>Changes Log Report</h1>

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
                                        <Button type="button" variant='outlined' value="Report" onClick={()=>{changesLog();}} >Show</Button>
                                        </FormControl>
                                   <FormControl className={classes.formControl}>
                                        { changesLogData &&
                                        <Button type="button" variant='outlined' onClick={()=>{SetChangesLogData();}} >Clear</Button>
                                        }
                                    </FormControl>
                                  

            {
                changesLogData && 
              
                  <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
                    //isLoading={isLoading}
                    icons={tableIcons}
                    title="Changes Log"
                    columns={columns}
                    data={changesLogData}
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
           {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
    </>
  );
}
