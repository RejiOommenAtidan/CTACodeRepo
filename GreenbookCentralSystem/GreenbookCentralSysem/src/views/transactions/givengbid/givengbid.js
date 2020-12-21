import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Moment from 'moment';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { AssignDialog } from './assigndialog';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sISODateFormat, sDateFormatMUIDatepicker,sButtonColor, sButtonSize, sButtonVariant,sDDMMYYYYRegex } from '../../../config/commonConfig';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  dateBoxes: {
    //border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '10px'
  },
  divInline:{
    display: 'inline'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
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

export default function GiveGBId() {
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();


  // Common properties
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [value, setRadioValue] = useState('generate');
  const [randomGBID, setRandomGBID] = useState(0);
  const [nFormNumber, setFormNumber] = useState(0);
  const [dtReceived, setReceivedDate] = useState('');
  const [reportDate, setReportDate] = useState(new Date(Date.now()));
  const [disabled, setDisabled] = useState(true);
  let history = useHistory();
  const dispatch = useDispatch();

  const [assignModal, setAssignModal] = useState(false);
  const [loading, setLoading] = useState(true); // for animation
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const snackbarClose = () => {
    setSnackbar(false);
  };
  //#endregion

  const columns2 = [
    {
    field: "nSerialNo",
      title: "SR. NO.",
      //filterPlaceholder: "Search...",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '2%'
      },
      cellStyle: {
        textAlign: "center",
        paddingRight: '2px',
        width: '2%'
      }
    },
    
    {
      field: "nGBId",
      title: "GREEN BOOK ID",
      //hidden: true,
      //filterPlaceholder: "Search...",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      }
    },
    {
      field: "nFormNumber",
      title: "FORM NUMBER",
      //filterPlaceholder: "Search...",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      }
    },
    {
      field: "dtDate",
      title: "GENERATED DATE",
      //hidden: true,
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      },
      //render: rowData => Moment(rowData['dtReceived']).format(sDateFormat),
    },
  ];

  const columns = [
    {
      field: "nSerialNo",
        title: "SR. NO.",
        //filterPlaceholder: "Search...",
        headerStyle: {
          textAlign: "center",
          textAlignLast: "center",
          verticalAlign: "middle",
          width: '2%'
        },
        cellStyle: {
          textAlign: "center",
          paddingRight: '2px',
          width: '2%'
        }
      },
      
    {
      field: "nFormNumber",
      title: "FORM NUMBER",
      //filterPlaceholder: "Search...",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      }
    },
    {
      field: "dtReceivedFormatted",
      title: "RECEIVED DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '10%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '10%'
      },
      //render: rowData => Moment(rowData['dtReceived']).format(sDateFormat),
    },
    
    {
      field: "edit",
      title: "GENERATE",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { assignClick(rowData) }} style={{ padding: '0px' }}
      >
        <CreateNewFolderIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: '5%'
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: '5%'
      },
    }
  ];

  // console.log("Columns:" , columns);
  // var a = columns.find(c => c.field==='nFormNumber');
  // a.hidden = true;
  // console.log("Form number column", a);

  const assignClick = (rowData) => {
    axios.get(`GivenGBID/GetRandomGBID`)
      .then(resp => {
        if (resp.status === 200) {
          setRandomGBID(resp.data);
          setFormNumber(rowData['nFormNumber']);
          setReceivedDate(rowData['dtReceived']);
          setAssignModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleDialogClose = () => {
    setAssignModal(false);
  };

  const handleAssignGBID = () => {
    //setLoading(true);
    const gbidObj = {
      nGBId: randomGBID,
      nFormNo: nFormNumber,

      bGivenOrNot: false,
      bActive: true
    };
    console.log("GBID Object:\n", gbidObj);
    console.log("date", dtReceived);
    setBackdrop(true);
    axios.post(`GivenGBID/AddGivenGBID/dtReceived=` + Moment().format(sISODateFormat), gbidObj)
      .then(resp => {
        if (resp.status === 200) {
          setAssignModal(false);
          setAlertMessage("GB ID Assigned Successfully");
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          axios.get(`Madeb/GetFormsWithoutGBId`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.dtReceivedFormatted = element.dtReceived ? Moment(element.dtReceived).format(sDateFormat) : null;
                });
                let i = 1;
                resp.data.forEach((element) => {
                  element.nSerialNo = i;
                  i++;
                })
                setdataAPI(resp.data);
                setLoading(false);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
              setAlertMessage("Couldn't Assign GB ID, Something went wrong");
              setAlertType('error');
              snackbarOpen();
              setBackdrop(false);
              setLoading(false);
            })
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage("Couldn't Assign GB ID, Something went wrong");
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
        setLoading(false);
      });
  };

  const showReport = () =>{

    console.log("Date inserted", reportDate);
    if(!reportDate){
      setAlertMessage("Please Enter valid date...");
      setAlertType('error');
      snackbarOpen();
      return;
    }
    columns.forEach(c => {
      if(c.field === 'dtReceivedFormatted' || c.field === 'edit'){
        c.hidden = true;
      }
      // if(c.field === 'nGBId' || c.field === 'dtDate'){
      //   c.hidden = false;
      // }
    });
    setLoading(true);
    axios.get(`GivenGBID/GetGivenGBIDByDate/?date=`+ Moment(reportDate).format(sISODateFormat))
      .then(resp => {
        if(resp.status === 200){
          let i = 1;
          resp.data.forEach((element) => {
            element.dtDate = Moment(element.dtDate).format(sDateFormat);
            element.nFormNumber = element.nFormNo;
            element.nSerialNo = i;
            i++;
          });
          setdataAPI(resp.data);
          setLoading(false);
        }
      })
      .catch(error =>{
        console.log(error.config);
        console.log(error.message);
        setLoading(false);
      });
  };

  const showGenerate = () => {
    //var a = columns.find(c => c.field==='nGBId');
    //a.hidden = true;
    setdataAPI([]);
    
      // if(c.field === 'dtReceivedFormatted' || c.field === 'edit'){
      //   c.hidden = false;
      // }
    
    axios.get(`Madeb/GetFormsWithoutGBId`)
      .then(resp => {
        if (resp.status === 200) {
          let i = 1;
          resp.data.forEach((element) => {
            element.dtReceivedFormatted = element.dtReceived ? Moment(element.dtReceived).format(sDateFormat) : null;
            element.nSerialNo = i;
            i++;
          });
          setdataAPI(resp.data);
          setLoading(false);
         
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setLoading(false);
      })
  }


  useEffect(() => {
    showGenerate();
    modifyHeaders();
    columns.forEach(c => {
            
      if(c.field === 'nGBId' || c.field === 'dtDate'){
        c.hidden = true;
      }
      console.log("Column", c);
    });
  }, []);

  const handleChange = (event) => {
    setRadioValue(event.target.value);
    if(event.target.value === 'report'){
      setDisabled(false);
      showReport();
    }
    else{
      setDisabled(true);
      showGenerate();
    }
  };

  return (
    <>
    <div className={classes.dateBoxes}>
     
      
      <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="generate" control={<Radio />} label="Generate Green Book ID" />
        <FormControlLabel value="report" control={<Radio />} label="" />
        
      </RadioGroup>
      <div className={classes.dateBoxes}>
      <form  onSubmit={handleSubmit(showReport)}>
     
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
placeholder="DD-MM-YYYY"
            disabled={disabled}
            variant="dialog"
            margin="dense"
            id="id_dtDate"
            name="name_dtDate"
            label={<>Report Date<span style={{ color: 'red' }}> *</span></>}
            format={sDateFormatMUIDatepicker}
            returnMoment={true}
            defaultValue={reportDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            onChange={(date) => {
              if(date){
                setReportDate(date); 
                setValue('name_dtDate', date, {shouldValidate: true});
              }
            }}
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
      {/* {_.get("name_dtDate.type", errors) === "required" && (
        <span style={{ color: "red" }}>
          This field is required
        </span>
      )} */}
    
   
    <Button
            type="submit"
            // className={props.classes.button}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
            disabled={disabled}
    >Report</Button>
   
    </form>
    </div>
    
    </div>
    <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={loading}
            icons={oTableIcons}
            title="Give Green Book ID"
            columns={value === 'generate' ? columns : columns2}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              },
              
            ]}
          ></MaterialTable>
          {assignModal && <AssignDialog
            assignModal={assignModal}
            nFormNumber={nFormNumber}
            randomGBID={randomGBID}
            dtReceived={Moment().format(sISODateFormat)}
            classes={classes}
            handleDialogClose={handleDialogClose}
            handleAssignGBID={handleAssignGBID}
          />}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
          {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
        </Grid>
      </Grid>
    </>
  );
}