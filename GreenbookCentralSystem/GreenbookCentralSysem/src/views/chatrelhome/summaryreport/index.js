
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import {
  Button,
  FormControl,
  TextField,
  Paper,
  Grid,
  InputLabel,
  Select,
  MenuItem
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
  const [backdrop, setBackdrop] = React.useState(false);
  
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
  const modes = ['Online', 'Offline'];

  const [sPaymentMode, setPaymentMode] = useState('Offline');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataAPI, setDataAPI] = useState([]);
  const [showColumns, setShowColumns] = useState(true);
  const [sCountryID, setsCountryID] = useState(null);
  const [title, setTitle] = useState("");
 
  const columns =[
    {
      field: "no",
      title: "SR. NO.",
      sorting:false,
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
      hidden:showColumns,
    //  render: rowData =><> {rowData['sAuthRegion'] !=='Total'?(<Button className="btn-transparent btn-link btn-link-second" style={{padding:'0'}}  onClick={() => { /*getDefaulterListRegionClick(rowData['sAuthRegion'])*/ }}><span style={{fontSize:'16'}}>{rowData['sAuthRegion']}</span></Button>):rowData['sAuthRegion']}</>,
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
      customSort: (a, b) => {
        if (a.sCountry==='Total' || b.sCountry==='Total') {  
          return 1
        }
        return a.sAuthRegion.localeCompare(b.sAuthRegion);
      },
    },
    {
      field: "sCountry",
      title: "COUNTRY",
      hidden:!showColumns,
      //render: rowData => <Button className="btn-transparent btn-link btn-link-second" style={{padding:'0'}}  onClick={() => { getDefaulterListCountryClick(rowData['sCountry']) }}><span style={{fontSize:'16'}}>{rowData['sCountry']}</span></Button>,
      render: rowData =><> {rowData['sCountry'] !=='Total'?(<Button className="btn-transparent btn-link btn-link-second" style={{padding:'0'}}  onClick={() => { getSummaryReportCountryClick(rowData['sCountryID']) }}><span style={{fontSize:'16'}}>{rowData['sCountry']}</span></Button>):rowData['sCountry']}</>,
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
    
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      customSort: (a, b) => {
        if (a.sCountry==='Total' || b.sCountry==='Total') {  
          return 1
        }
        return a.sCountry.localeCompare(b.sCountry);
      },
    },
    
    {
      field: "sPaymentCurrency",
      title: "PAYMENT CURRENCY",
      // render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      customSort: (a, b) => {
        if (a.sCountry==='Total' || b.sCountry==='Total') {  
          return 1
        }
        return a.sPaymentCurrency.localeCompare(b.sPaymentCurrency);
      },
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
      field: "nCount",
      title: "TOTAL CONTRIBUTORS",
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
      customSort: (a, b) => {
        if (a.sCountry==='Total' || b.sCountry==='Total') {  
          return 1
        }
        return a.nCount.toString().localeCompare(b.nCount.toString(), 'en', {numeric: true});
      },
    },
    {
      field: "nTotalChatrel",
      title: "TOTAL CHATREL",
      // render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      hidden:showColumns,
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
      customSort: (a, b) => {
        if (a.sCountry==='Total' || b.sCountry==='Total') {  
          return 1
        }
        return a.nTotalChatrel.toString().localeCompare(b.nTotalChatrel.toString(), 'en', {numeric: true});
      },
    }


  ]
  const reportParams = {

    dtDateFrom: Moment(startDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(startDate).format('YYYY-MM-DD') : null,
    dtDateTo: Moment(endDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(endDate).format('YYYY-MM-DD') : null,
    sPaymentMode,
    sCountryID:sCountryID
  };
  console.log(reportParams);
  const getSummaryReportCountryClick=(sCountryID)=>{

   // alert(sCountryID);
    setsCountryID(sCountryID);
  
    getChatrelSummaryReport(sCountryID);

  }
  const getChatrelSummaryReport =(tempsCountryID)=>{
   
   // alert(JSON.stringify(reportParams));-
   console.log(reportParams );
   if(reportParams.dtDateFrom === null ){
    setAlertMessage("Date From is required");
    setAlertType('info');
    snackbarOpen();
   }
   else if(reportParams.dtDateTo === null ){
    setAlertMessage("Date To is required");
    setAlertType('info');
    snackbarOpen();
   }
   else{
   setBackdrop(true);
   var sql="";
   if(tempsCountryID){
    sql=`/ChatrelPayment/GetSummaryReport/?dtFrom=${reportParams.dtDateFrom}&dtTo=${reportParams.dtDateTo}&sPaymentMode=${reportParams.sPaymentMode}&sCountryID=${tempsCountryID}`
   }
   else{
    sql=`/ChatrelPayment/GetSummaryReport/?dtFrom=${reportParams.dtDateFrom}&dtTo=${reportParams.dtDateTo}&sPaymentMode=${reportParams.sPaymentMode}&sCountryID=`
   }
     axios.get(sql)
    .then(resp => {
      if (resp.status === 200) {
        setTitle(` from ${Moment(startDate).format('DD-MM-YYYY')} - ${Moment(endDate).format('DD-MM-YYYY')}`);
        setBackdrop(false);
       let x =1;
       let total=0;
       let totalChatrel=0;
       if(tempsCountryID){
        resp.data.forEach((element) => {
       
        element.no = x;
        x = x + 1;
        total = total+element.nCount;
        totalChatrel = totalChatrel+element.nTotalChatrel;
      })
      setShowColumns(false);
    }
      else{
        resp.data.forEach((element) => {
          
          element.no = x;
          x = x + 1;
          total = total+element.nCount;
          
        })
        setShowColumns(true);}
      resp.data.push( {
        "sCountryID": "NA",
        "sCountry": "Total",
        "sPaymentCurrency": "-",
        "nCount": total,
        "nTotalChatrel":Math.round(totalChatrel * 100) / 100,
        "sAuthRegion":"Total",
        "no": '',
    });
     
      console.log("Data",resp.data);
      setDataAPI(resp.data);
      }
      else if(resp.status === 204){
        setBackdrop(false);
        setAlertMessage("No Records found");
            setAlertType('info');
            snackbarOpen();
      }
    })
    .catch(error => {
      setBackdrop(false);
      
      setAlertMessage("Something went wrong");
          setAlertType('error');
          snackbarOpen();
      console.log(error.message);
      console.log(error.config);
    });
  }
  }
  const onSubmit =(e)=>{
    e.preventDefault();
   // alert(JSON.stringify(reportParams));
   getChatrelSummaryReport(null);
  }
  let constStartDate=null;
  let constEndDate=null;
  useEffect(() => {
    //var currDate=new Date('12-05-2021'); //MM-DD-YYYY
    var currDate=new Date();
    var currYear=currDate.getFullYear();
    console.log('year:'+currYear+'month:'+currDate.getMonth());
    if(currDate.getMonth()<3){
      setStartDate(Moment(parseInt(currYear)- 1 +'-04-01'));
      setEndDate(Moment(currYear + '-03-31'));
      constEndDate=Moment(currYear + '-03-31');
      constStartDate=Moment(parseInt(currYear)- 1 +'-04-01');
    }
    else{
      setStartDate(Moment(currYear+'-04-01'));
      setEndDate(Moment(parseInt(currYear)+ 1 + '-03-31'));
      constEndDate=Moment(parseInt(currYear)+ 1 + '-03-31');
      constStartDate=Moment(currYear+'-04-01');
    }
    
  
    // axios.get(`/AuthRegion/GetAuthRegionsForChatrelReport`)
    // .then(resp => {
    //   if (resp.status === 200) {
    //     //setdataAPI(resp.data)
    //     console.log("Authority List",resp.data);
    //     setAuthorityListAPI(resp.data);
    //    // setAuthorityList(resp.data);

    //   }
    // })
    // .catch(error => {
    //   console.log(error.message);
    //   console.log(error.config);
    // });
  }, []);
  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h3>Chatrel Summary Report</h3>

        <form onSubmit = {(e) => handleSubmit(onSubmit(e))}>
        <Grid container spacing={3}>
       
       <Grid item sm={1}>
       
       </Grid>
       <Grid item  sm={3}>
       <InputLabel id="madebTypelbl">Payment Mode</InputLabel>
          <Select
            fullWidth
            labelId="madebTypelbl"
            id="madebType"
            value={sPaymentMode}
            onChange={(e) => {setPaymentMode(e.target.value); }}
          >
            {modes.map((mode) => (
              <MenuItem value={mode}>{mode}</MenuItem>
            ))}


          </Select>
       </Grid>
       <Grid item  sm={3}>
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <KeyboardDatePicker
    variant="dialog"
    //openTo="year"
    //views={["year", "month", "date"]}
    margin="dense"
    id="startDate"
    name="startDate"
    autoFocus
    autoOk
    label={<> Date From<span style={{ color: 'red' }}> *</span></>}
    format={sDateFormatMUIDatepicker}
    returnMoment={true}
    onChange={(date) => {
      console.log(date);
      if (date) {
        setStartDate(date);
        setValue('startDate', date, { shouldValidate: true });
      }else{
        setStartDate(startDate);
      }
    }}
    value={startDate}
    KeyboardButtonProps={{
      "aria-label": "change date",
    }}
    // fullWidth
    //className={classes.dateField}
    inputRef={register({
      required: true,
      pattern:
      {
        value: new RegExp(sDDMMYYYYRegex),
        message: "Invalid Date"
      }
    })}
  />
</MuiPickersUtilsProvider>
{_.get("startDate.type", errors) === "required" && (
                      <span style={{ color: "red" }}>
                        Date From is required
                      </span>
                    )}
       </Grid>
       <Grid item  sm={3}>
       <MuiPickersUtilsProvider utils={DateFnsUtils} >
  <KeyboardDatePicker
    variant="dialog"
    //openTo="year"
    //views={["year", "month", "date"]}
    margin="dense"
    id="endDate"
    name="endDate"
    autoOk
    label={<> Date To<span style={{ color: 'red' }}> *</span></>}
    format={sDateFormatMUIDatepicker}
    returnMoment={true}
    onChange={(date) => {
      if (date) {
        setEndDate(date);
        setValue('endDate', date, { shouldValidate: true });
      }
    }}
    value={endDate}
    KeyboardButtonProps={{
      "aria-label": "change date",
    }}
    // fullWidth
    //className={classes.dateField}
    inputRef={register({
      required: true,
      pattern:
      {
        value: new RegExp(sDDMMYYYYRegex),
        message: "Invalid Date"
      }
    })}
  />
</MuiPickersUtilsProvider>
{_.get("endDate.type", errors) === "required" && (
                      <span style={{ color: "red" }}>
                        Date To is required
                      </span>
                    )}
       </Grid>
       <Grid item sm={2} align='left '>
       <Button
            type="submit"
            style={{marginTop: '20px',marginRight:'20px'}}
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
             >Show</Button>
              {dataAPI.length > 0 &&
            <Button
              type="button"
              style={{marginTop: '20px'}}
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { setDataAPI([]);setsCountryID(null); }} >Clear</Button>
          }
       </Grid>
     </Grid>
                   
    
      
        
        </form>

        {
          dataAPI.length > 0 &&

         <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
           title={`Chatrel Summary Report ${title}`}
        
           columns={columns}
     
            data={dataAPI}
            options={{ ...oOptions, exportFileName: 'ChatrelSummaryReport'}}
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
