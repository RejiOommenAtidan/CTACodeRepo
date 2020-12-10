import React, { useEffect, useState } from 'react';
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
import { oOptions, oTableIcons } from '../../../config/commonConfig';
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
  const [issuedIndividualData, SetIssuedIndividualData] = React.useState();
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [dtFrom, SetdtFrom] = React.useState('');
  const [dtTo, SetdtTo] = React.useState('');
  const [orderBy, SetOrderBy] = React.useState('');
  const [groupBy, SetGroupBy] = React.useState('');

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
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const columns = [
    {
      field: "individualPlace",
      title: "Individual Place",
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
      field: "nCount",
      title: "Count",
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
  const issuedIndividual = () => {
    if (madebType === '' || dtFrom === '' || dtTo === '' || orderBy === '' || groupBy === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();

    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportIssuedIndividual/?sMadebDisplayKey=` + madebType + `&dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo + `&sGroupBy=` + groupBy + `&sOrderBy=` + orderBy)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            SetIssuedIndividualData(resp.data);
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
  useEffect(() => {
    axios.get(`/MadebType/GetMadebTypes`)
      .then(resp => {
        if (resp.status === 200) {
          SetMadebTypeData(resp.data);
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
  }, []);
  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Green Book Issued Individual</h1>
        <form>
          <FormControl className={classes.formControl}>
            <InputLabel id="madebTypelbl">Madeb Type</InputLabel>
            <Select
              labelId="madebTypelbl"
              id="madebType"
              name="madebType"
              onChange={(e) => { SetMadebType(e.target.value); }}
            >
              {madebTypeData && madebTypeData.map((row) => (
                <MenuItem value={row.sMadebDisplayKey}>{row.sMadebDisplayName}</MenuItem>
              ))}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              type="date"
              id='dtFrom'
              name='dtFrom'
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
              name='dtTo'
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
            <InputLabel id="orderbylbl">Order By</InputLabel>
            <Select
              labelId="orderbylbl"
              id="orderby"
              name="orderby"
              onChange={(e) => {
                if (e.target.value === "Region") {
                  SetOrderBy('lstauthregion.sAuthRegion');
                  SetGroupBy('lstauthregion.ID');
                }
                else if (e.target.value === "Country") {
                  SetOrderBy('lstcountry.sCountry');
                  SetGroupBy('lstcountry.sCountry');
                }
              }}
            >
              <MenuItem value={'Region'}>Region Wise</MenuItem>
              <MenuItem value={'Country'}>Country Wise</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button 
            type="button" 
            variant='outlined' 
            value="Report" 
            onClick={() => { issuedIndividual(); }} >Show</Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            {issuedIndividualData &&
              <Button 
              type="button" 
              variant='outlined' 
              onClick={() => { SetIssuedIndividualData(); }} >Clear</Button>
            }
          </FormControl>
        </form>

        {
          issuedIndividualData &&
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title="Green Book Issued Individual"
            columns={columns}
            data={issuedIndividualData}
            options={oOptions}
            actions={[
              {
                icon: oOptions.Search,
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
