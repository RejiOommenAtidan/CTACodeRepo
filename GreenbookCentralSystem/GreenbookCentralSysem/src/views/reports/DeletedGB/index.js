import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import {
  Button,
  FormControl,
  TextField,
  Paper,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

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
  const classes = useStyles();
  let history = useHistory();
  const [deletedGBData, SetDeletedGBData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [dtFrom, SetdtFrom] = React.useState('');
  const [dtTo, SetdtTo] = React.useState('');
  const [orderBy, SetOrderBy] = React.useState('');
  const [title, setTitle] = useState();
  const [rcheader, setRCHeader] = useState();
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
  const [backdrop, setBackdrop] = React.useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  const columns = [
    {
      field: "no",
      title: "Sr. No.",
      
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
        borderRight: '1px solid grey'


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
        borderRight: '1px solid grey'


      },
    },

    {
      field: "sAuthRegion",
      title: "Authority",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        borderRight: '1px solid grey'


      },
    },
    {
      field: "sFullName",
      title: "Deleted By",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        borderRight: '1px solid grey'


      },
    },
    {
      field: "dtFormattedEntered",
      title: "Delete Date",
      // render: rowData => rowData.dtIssuedDate ? Moment(rowData.dtIssuedDate).format('DD-MM-YYYY') : '',
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        borderRight: '1px solid grey'


      },
    },

  ]
  const deletedGB = () => {
    if (dtFrom === '' || dtTo === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();
    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportGreenBookDeleted/?dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo )
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            setTitle(`Delete GB Report from ${Moment(dtFrom).format(sDateFormat)} to ${Moment(dtTo).format(sDateFormat)}` );
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetDeletedGBData([]);
            }
            else {
              let x = 1;
              resp.data.forEach((element) => {
                element.dtFormattedEntered = element.dtEntered ? Moment(element.dtEntered).format(sDateFormat) : null;
                element.no = x;
                x = x + 1;
              })
              SetDeletedGBData(resp.data);
              modifyHeaders();
            }
          }
        })
        .catch(error => {
          setBackdrop(false);
          setAlertMessage('Error Fetching Data...');
            setAlertType('error');
            snackbarOpen();
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
          console.log(error.message);
        })
        .then(release => {
          //console.log(release); => udefined
        });
    }
  }
 
  useEffect(() => {
    deletedGBData.length > 0 && modifyHeaders()
  }, [deletedGBData]);
  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Deleted Green Book Report </h1>
      
        <FormControl className={classes.formControl}>

          <TextField
            type="date"
            id='dtFrom'
            onChange={(e) => { SetdtFrom(e.target.value); }}
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
            onChange={(e) => { SetdtTo(e.target.value); }}

            value={dtTo}
            label="Date To"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
       

        <FormControl className={classes.formControl}>
          <Button type="button"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report"
            onClick={() => { deletedGB(); }} >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {deletedGBData.length > 0 &&
            <Button
              type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>

        {
          deletedGBData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={title}
            columns={columns}
            data={deletedGBData}
            options={oOptions}
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
