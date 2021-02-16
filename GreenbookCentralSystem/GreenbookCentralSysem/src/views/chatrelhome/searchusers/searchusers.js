import React, { useEffect, useState } from 'react';
import { Grid, Button, Paper, FormControl, TextField, } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MaterialTable, { MTableToolbar } from 'material-table';
import {
  oOptions, oTableIcons,
  sButtonColor, sButtonSize, sButtonVariant, modifyHeaders, sDateFormat
} from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import Moment from 'moment';
import { NavigateBeforeSharp } from '@material-ui/icons';
import { ViewDialog } from './dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(0.5),
    padding: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  box: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  },
  button: {
    margin: theme.spacing(1),
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  }
}));

export default () => {
  const classes = useStyles();
  oOptions.filtering = filtering;
  //validations
  const { register, handleSubmit, watch, errors } = useForm();

  
  const [selectData, setSelectData] = useState({});
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [profileGBID, setProfileGBID] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  const [error, setError] = useState(false);

  // TextFields
  const [sGBID, setGBID] = useState();
  const [sFirstName, setFirstName] = useState(null);
  const [sFathersName, setFathersName] = useState(null);
  const [sMothersName, setMothersName] = useState(null);
  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
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



  const columns = [
    {
      field: "nSerialNo",
      title: "Sr. No.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "5%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "5%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sGBID",
      title: "GB ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "5%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "5%",
        borderRight: '1px solid grey'
      },
      render: rowData =>  <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewGb(rowData['sGBID']) }}><span><u>{rowData['sGBID']}</u></span></Button>
    },

    {
      field: "sFirstName",
     // render: rowData => (rowData['sFirstName'] ? rowData['sFirstName'] : '') + " " + (rowData['sLastName'] ? rowData['sLastName'] : ''),
      title: "NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "nAge",
      title: "AGE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "5%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "5%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sCountry",
      title: "COUNTRY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sStatus",
      title: "STATUS",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "7%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "7%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "dtPayment",
      title: "LAST CHATREL DATE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "10%",
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtPayment){
          return -1;
        }
        if(!b.dtPayment){
          return 1;
        }
        a = a ? a.dtPayment.split('-').reverse().join('') : '';
        b = b ? b.dtPayment.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    
  ];

  const viewGb = (GBID) => {
    //console.log(GBID)
    setProfileGBID(GBID);
    setViewModal(true);
  }
  const handleViewClickClose = () => {
    setViewModal(false);
  };
  

  useEffect(() => {
    handleFormSubmit();
  }, [sGBID, sFirstName, sFathersName, sMothersName]);


  function handleFormSubmit() {
    //e.preventDefault();
    setLoading(true);
    setNoRecords(false);
    setdataAPI([]);
    //console.log("Form submission called.");
    
    if(!sGBID || sGBID.length < 3){
      setError(true);
      setLoading(false);
      return;
    }

    else{
      setError(false);
    }

    const searchObj = {
      sGBID,
      sFirstName,
      sFathersName,
      sMothersName
    }
    //console.log("Search parameters\n", searchObj);
    axios.get(`/ChatrelPayment/SearchUsers`, {params: searchObj})
    .then(resp => {
      setLoading(false);
      if(resp.status === 200){
        var i = 1;
        //console.log("Received Search Result", resp.data);
        resp.data.forEach((element) => {
          element.dtPayment = element.dtPayment ? Moment(element.dtPayment).format(sDateFormat) : null;
          element.nSerialNo = i++;
          element.sFirstName = element.sLastName ? `${element.sFirstName}  ${element.sLastName}` : `${element.sFirstName}`;
        });
        setdataAPI(resp.data);
      }
    })
    .catch(error =>{
      setLoading(false);
      //console.log("Error...", error.response);
    })
    
  }

  
  useEffect(() => {
    dataAPI.length > 0 && modifyHeaders();

  }, [dataAPI]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
  
          <br />
          <Paper style={{ padding: '15px', paddingTop: '20px',textAlign:'center' }}>
            <h2>Search Users</h2>
            <div>
              {/* <form onSubmit={handleFormSubmit}> */}
                <FormControl className={classes.formControl}>
                  <TextField
                    id='sGBID'
                    name='sGBID'
                    label='GreenBook ID'
                    autoFocus
                    required={true}
                    className = {classes.textField}
                    onChange={(e) => {
                      setGBID(e.target.value);
                      //handleFormSubmit();
                    }}
                  />
                  {error && <span style={{color: 'red'}}>Enter Greenbook ID</span>}
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id='sFirstName'
                    name='sFirstName'
                    label='First Name'
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      //handleFormSubmit();
                    }}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id='sFathersName'
                    name='sFathersName'
                    label="Father's Name"
                    onChange={(e) => {
                      setFathersName(e.target.value);
                      //handleFormSubmit();
                    }}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id='sMothersName'
                    name='sMothersName'
                    label="Mother's Name"
                    onChange={(e) => {
                      setMothersName(e.target.value);
                      //handleFormSubmit();
                    }}
                  />
                </FormControl>
                {/* <FormControl className={classes.formControl} >
                  <Button
                    variant={sButtonVariant}
                    color={sButtonColor}
                    size={sButtonSize}
                    type="submit"
                    style={{ fontSize: '1em', marginTop: '16px', marginLeft: '10px' }}>Search Users
                  </Button>
                </FormControl> */}
              {/* </form> */}
            </div>
            <br />
            {loading &&
              <div className={classes.root}>
                <CircularProgress />
                {noRecords && <h4>No Records Found</h4>}
              </div>
            }
            {noRecords &&
              <div className={classes.root}>
                {<h4>No Records Found</h4>}
              </div>
            }
            {dataAPI.length != 0 &&

              <MaterialTable
                style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
                icons={oTableIcons}
                title='User List'
                columns={columns}
                data={dataAPI}
              //   components={{
              //     Toolbar: props => (
              //      <>
                      
              //         <MTableToolbar {...props} />
                      
              //  <div style={{display: 'flex', justifyContent:'left'}}>
              //  <p style={{fontSize: '15px'}}>{`Total No. of Books: ${dataAPI.length}`}</p>     </div> 
              //       </>
              //     ),
              //   }}
                options={{...oOptions, exportButton: {csv: true, pdf: true}}} 
                actions={
                  [

                     {
                      icon: oTableIcons.Search,
                      tooltip: 'Show Filter',
                      isFreeAction: true,
                      onClick: (event) => {setFiltering(currentFilter => !currentFilter)}
                    },
                    // {
                    //   icon: PrintIcon,
                    //   iconProps: {fontSize: 'large', color: 'primary'},
                    //   tooltip: 'Mark Printed',
                    //   isFreeAction: true,
                    //   onClick:((event, data) => {
                    //     setPrinted();
                    //   })
                    // }
                  ]
                }
              />
            }
            {snackbar && <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
            }
             {viewModal && <ViewDialog
              viewModal={viewModal}
              classes={classes}
              handleViewClickClose={handleViewClickClose}
              sGBID={profileGBID}
              />}
          </Paper>
        </Grid>
       
      </Grid>
    </div>
  );
}