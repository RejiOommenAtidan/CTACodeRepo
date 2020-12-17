import React, { useEffect, useState } from 'react';
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
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import { useHistory } from 'react-router-dom';

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
  const classes = useStyles();
  const [issuedIndividualData, SetIssuedIndividualData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [dtFrom, SetdtFrom] = React.useState('');
  const [dtTo, SetdtTo] = React.useState('');
  const [orderBy, SetOrderBy] = React.useState('');
  const [groupBy, SetGroupBy] = React.useState('');
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
  const [backdrop, setBackdrop] = React.useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const columns = [
    {
      field: "no",
      title: "#",
      filterPlaceholder: 'Search..',
      width: '5%',
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
      field: "individualPlace",
      title: "REGION/COUNTRY",
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
      field: "nCount",
      title: "COUNT",
      // render: rowData => rowData.dtIssuedDate ? Moment(rowData.dtIssuedDate).format('DD-MM-YYYY') : '',
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
    if (madebType === '' || dtFrom === '' || dtTo === '' || orderBy === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();
    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportIssuedOverAll/?sMadebDisplayKey=` + madebType + `&dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo + `&sGroupBy=` + groupBy + `&sOrderBy=` + orderBy)
        .then(resp => {
          if (resp.status === 200) {

            setBackdrop(false);
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetIssuedIndividualData([]);
            }
            else {
              let x = 1;
              let total = 0;
              resp.data.forEach((element) => {
                //element.dtFormattedIssuedDate = element.dtIssuedDate ? Moment(element.dtIssuedDate).format(sDateFormat) : null;
                element.no = x;
                total = total + element.nCount;
                x = x + 1;
              })
              resp.data.push({ 'no': '', 'individualPlace': 'Total', 'nCount': total })
              SetIssuedIndividualData(resp.data);
            }
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
          //console.log(resp.data);
          SetMadebTypeData(resp.data)
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
        <h1>Green Book Issued Overall </h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="madebTypelbl">Madeb Type</InputLabel>
          <Select
            labelId="madebTypelbl"
            id="madebType"

            onChange={(e) => { SetMadebType(e.target.value); }}
          >
            {madebTypeData && madebTypeData.map((row) => (
              <MenuItem value={row.id}>{row.sMadebDisplayName}</MenuItem>
            ))}


          </Select>
        </FormControl>
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
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report" onClick={() => { issuedIndividual(); }} >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {issuedIndividualData.length > 0 &&
            <Button
              type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>

        {
          issuedIndividualData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title="Green Book Issued Overall"
            columns={columns}
            data={issuedIndividualData}
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
