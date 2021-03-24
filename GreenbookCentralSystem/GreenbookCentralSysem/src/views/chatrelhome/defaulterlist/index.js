
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import {
  Button,
  FormControl,
  TextField,
  Paper,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import MaterialTable, { MTableToolbar } from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders, sDDMMYYYYRegex, sDateFormatMUIDatepicker, sISODateFormat } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { useForm, Controller } from "react-hook-form";
import { Alerts } from '../../alerts';
import _ from "lodash/fp";
import { BackdropComponent } from '../../backdrop/index';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  let history = useHistory();

  const classes = useStyles();


  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [backdrop, setBackdrop] = React.useState(true);
  
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
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const columnsRegion = [
    // {
    //   field: "no",
    //   title: "SR. NO.",
      
    //   width: '5%',
    //   //hidden:true,
    //   headerStyle: {
    //     padding: '5px',

    //     textAlign: 'center'
    //   },
    //   cellStyle: {
    //     // padding:'0px',
    //     padding: '5px',

    //     textAlign: 'center',
    //     border: '1px solid black'

    //   },
    // },
    {
      field: "sFirstName",
      title: "FIRST NAME",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        border: '1px solid black'

      },
    },
    {
      field: "sLastName",
      title: "LAST NAME",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        border: '1px solid black'

      },
    },
    {
      field: "sGBID",
      title: "GB ID",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        border: '1px solid black'

      },
    },
   
    // {
    //   field: "sLoginGmail",
    //   title: "GMAIL ID",
      
    //   headerStyle: {
    //     padding: '5px',

    //     textAlign: 'center'
    //   },
    //   cellStyle: {
    //     // padding:'0px',
    //     padding: '5px',

    //     textAlign: 'left',
    //     border: '1px solid black'

    //   },
    // },

    {
      field: "sPaidUntil",
      title: "PAID UNTIL",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',
        border: '1px solid black',

        textAlign: 'left'

      },
    }
  ]
  const columnsCountry =[
    {
      field: "no",
      title: "SR. NO.",
      
      width: '5%',
      //hidden:true,
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        border: '1px solid black'

      },
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      render: rowData =><> {rowData['sAuthRegion'] !=='Total'?(<Button className="btn-transparent btn-link btn-link-second" style={{padding:'0'}}  onClick={() => { getDefaulterListRegionClick(rowData['sAuthRegion']) }}><span style={{fontSize:'16'}}>{rowData['sAuthRegion']}</span></Button>):rowData['sAuthRegion']}</>,
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        border: '1px solid black'

      },
    },
    {
      field: "nTotal",
      title: "TOTAL",
      // render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        border: '1px solid black'

      },
    },

  ]
  const columnsAllCountry =[
    {
      field: "no",
      title: "SR. NO.",
      
      width: '5%',
      //hidden:true,
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        border: '1px solid black'

      },
    },
    {
      field: "sCountry",
      title: "COUNTRY",
      //render: rowData => <Button className="btn-transparent btn-link btn-link-second" style={{padding:'0'}}  onClick={() => { getDefaulterListCountryClick(rowData['sCountry']) }}><span style={{fontSize:'16'}}>{rowData['sCountry']}</span></Button>,
      render: rowData =><> {rowData['sCountry'] !=='Total'?(<Button className="btn-transparent btn-link btn-link-second" style={{padding:'0'}}  onClick={() => { getDefaulterListCountryClick(rowData['sCountry']) }}><span style={{fontSize:'16'}}>{rowData['sCountry']}</span></Button>):rowData['sCountry']}</>,
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        border: '1px solid black'

      },
      
    },
    {
      field: "nTotal",
      title: "TOTAL",
      // render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        border: '1px solid black'

      },
    },

  ]
  const getDefaulterList = () => {
   console.log(authority,country);
    if(authority!== null && country !==null)
        {
          var url=`ChatrelPayment/GetDefaulterList/?nAuthRegionID=${authority.id}&sCountryID=`;
          setTitle(' for Authority Region : '+ authority.sAuthRegion);
        }
      else if(authority == null && country !==null)
        {
          var url=`ChatrelPayment/GetDefaulterList/?nAuthRegionID=&sCountryID=${country.sCountryID}`;
          setTitle(' for Country : '+ country.sCountry);
        }
      else
       {
          var url=`ChatrelPayment/GetDefaulterList/?nAuthRegionID=&sCountryID=`;
          setTitle(' for All Countries ');
      }
      setBackdrop(true);
      console.log(url);
      axios.get(url)
        .then(resp => {
          setBackdrop(false);
          if (resp.status === 200) {
            console.log(resp.data);
            let tempData=[...resp.data.result];
            if(resp.data.message!=='Region'){
              var count=0;
                for(var i =0;i<tempData.length;i++){
                    count=count+tempData[i].nTotal
                    tempData[i].no=i+1;
                }
                  console.log(count);
                setTotal(' Total Defaulters : '+count );
                console.log(tempData);
                setData(tempData);
            }
            else{
              setData(tempData);
              setTotal('');
            }
            setResponseType(resp.data.message);
            //setData(resp.data.result);
                      
          }
          else if (resp.status === 204) {
            setAlertMessage("No Records found");
            setAlertType('info');
            snackbarOpen();
                      
          }
          setAuthority(null);
          setCountry(null);
          setAuthorityList([]);
        })
        .catch(error => {
          setBackdrop(false);
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
  const getDefaulterListSubmit = (e) => {
    e.preventDefault();
    getDefaulterList();
  }
  const getDefaulterListCountryClick = (sCountry) => {
   
    console.log(countryListAPI.find(element=> element.sCountry===sCountry));
  //  setAuthority(null);
   // setCountry(countryListAPI.find(element=> element.sCountry===sCountry));
    setBackdrop(true);
    setTitle(' for Country : '+ sCountry);
    axios.get(`ChatrelPayment/GetDefaulterList/?nAuthRegionID=&sCountryID=${countryListAPI.find(element=> element.sCountry===sCountry).sCountryID}`)
      .then(resp => {
        setBackdrop(false);
        if (resp.status === 200) {
          console.log(resp.data);
          
          let tempData=[...resp.data.result];
          if(resp.data.message!=='Region'){
            var count=0;
              for(var i =0;i<tempData.length;i++){
                  count=count+tempData[i].nTotal
                  tempData[i].no=i+1;
              }
              setTotal(' Total Defaulters : '+count);
              console.log(tempData);
              setData(tempData);
          }
          else{
            setData(tempData);
            setTotal('');
          }
          setResponseType(resp.data.message);
                    
        }
        else if (resp.status === 204) {
          setAlertMessage("No Records found");
          setAlertType('info');
          snackbarOpen();
                    
        }
        setAuthority(null);
          setCountry(null);
          setAuthorityList([]);
      })
      .catch(error => {
        setBackdrop(false);
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
  const getDefaulterListRegionClick = (sAuthRegion) => {
    setBackdrop(true);
   console.log(authorityListAPI.find(element=> element.sAuthRegion===sAuthRegion));
   setTitle(' for Authority Region : '+ sAuthRegion);
    axios.get(`ChatrelPayment/GetDefaulterList/?nAuthRegionID=${authorityListAPI.find(element=> element.sAuthRegion===sAuthRegion).id}&sCountryID=`)
      .then(resp => {
        setBackdrop(false);
        if (resp.status === 200) {
          console.log(resp.data);
          
          setResponseType(resp.data.message);
          setData(resp.data.result);
          setTitle(" for Authority Region : "+sAuthRegion);
          setTotal('');  
        }
        else if (resp.status === 204) {
          setAlertMessage("No Records found");
          setAlertType('info');
          snackbarOpen();
                    
        }
        setAuthority(null);
          setCountry(null);
          setAuthorityList([]);
      })
      .catch(error => {
        setBackdrop(false);
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
  const [authorityList,setAuthorityList]=React.useState([]);
  const [data,setData]=React.useState([]);
  const [responseType,setResponseType]=React.useState("");
  const [title,setTitle]=React.useState("");
  const [total,setTotal]=React.useState("");
  const [authorityListAPI,setAuthorityListAPI]=React.useState(null);
  const [countryListAPI,setCountryListAPI]=React.useState(null);
  const [authority,setAuthority]=React.useState(null);
const [country,setCountry]=React.useState(null);

  const updateCountry =(value)=>{
    console.log('Selected Country',value.sCountry);
    setCountry(value);
    let tempAuth=[];
    authorityListAPI.forEach(element => {
        if(element.sCountryID===value.sCountryID){
          console.log('Auth Added',element);
          tempAuth.push(element);
        }      
    });
    console.log("all auth",tempAuth);
    setAuthorityList(tempAuth);
  }
  useEffect(() => {
    axios.get(`/AuthRegion/GetAuthRegionsForChatrelReport`)
    .then(resp => {
      if (resp.status === 200) {
        //setdataAPI(resp.data)
        console.log("Authority List",resp.data);
        setAuthorityListAPI(resp.data);
       // setAuthorityList(resp.data);
        axios.get(`/Country/GetCountriesForChatrelReport`)
          .then(resp => {
            if (resp.status === 200) {
              console.log("Country List",resp.data);
              // setCountryList(resp.data)
              // setLoading(false);
              // modifyHeaders();
              setCountryListAPI(resp.data);
              setBackdrop(false);
            }
          })
          .catch(error => {
            console.log(error.config);
            console.log(error.message);
          });
      }
    })
    .catch(error => {
      console.log(error.message);
      console.log(error.config);
    });
  }, []);
  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h3>Chatrel Defaulter List</h3>

        <form onSubmit = {(e) => handleSubmit(getDefaulterListSubmit(e))}>
        <Grid container spacing={3}>
       
       <Grid item sm={2}>
       
       </Grid>
       <Grid item  sm={4}>
       <Autocomplete
                    fullWidth
                    //id={`${index}`}
                    openOnFocus
                    clearOnEscape
                    disableClearable
                    autoComplete={true}
                    autoHighlight={true}
                    options={countryListAPI}
                    value={country}
                    //defaultValue={authRegion}
                    getOptionLabel={(option) => option.sCountry}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span /*id={`${index}`*}*/>
                          {option.sCountry}
                        </span>
                      </React.Fragment>
                    )}
                    onChange={(e, value) => {
                       if (value !== null) {
                         updateCountry(value);
                         //console.log(value);
                       } else {
                         //setMadebStatusID(0);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
              />
              {/*{errors.startDate && <span style={{ color: 'red' }}>Date From is required</span>}*/}
              {/* {_.get("startDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date From is required</span>
              )} */}
       </Grid>
       <Grid item  sm={4}>
       <Autocomplete
                    fullWidth
                    //id={`${index}`}
                    openOnFocus
                    clearOnEscape
                    //disableClearable
                    autoComplete={true}
                    autoHighlight={true}
                    options={authorityList}
                    value={authority}
                    //defaultValue={authRegion}
                    getOptionLabel={(option) => option.sAuthRegion}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span /*id={`${index}`*}*/>
                          {option.sAuthRegion}
                        </span>
                      </React.Fragment>
                    )}
                    onChange={(e, value) => {
                      if (value !== null) {
                        setAuthority(value);
                      } else {
                        //setMadebStatusID(0);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Authority Region"
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
              />
              {/*{errors.startDate && <span style={{ color: 'red' }}>Date From is required</span>}*/}
              {/* {_.get("startDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date From is required</span>
              )} */}
       </Grid>
       <Grid item sm={2} align='left '>
       <Button
            type="submit"
            style={{marginTop: '20px',marginRight:'20px'}}
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
             >Show</Button>
              {data.length > 0 &&
            <Button
              type="button"
              style={{marginTop: '20px'}}
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { setAuthority(null); setCountry(null); setData([]); }} >Clear</Button>
          }
       </Grid>
     </Grid>
                   
    
      
        <FormControl >
         
        </FormControl>
        <FormControl >
         
        </FormControl>
        </form>

        {
          data.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
           title={`Chatrel Defaulter List ${title}`}
           components={{
            Toolbar: props => (
              <div>
              <MTableToolbar {...props} />
              <div ></div>
              <Grid container style={{maxWidth: '700px'}} spacing={1}>
                <Grid item xs={4} lg={4}><b style={{paddingLeft:'15px'}}> {total}</b></Grid> 
                </Grid>
              </div>
            ),
          }}
          //  columns={columns}
          columns={responseType==='Region'?columnsRegion:(responseType==='Country'?columnsCountry:columnsAllCountry)}
            data={data}
            options={{ ...oOptions, exportFileName: total}}
            actions={[

              {
                icon: Search,
                tooltip: 'Toggle Filter',
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
