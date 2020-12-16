import { useHistory } from 'react-router-dom';
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
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sButtonColor, sButtonSize, sButtonVariant } from '../../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
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


  const classes = useStyles();
  const [abroadData, SetAbroadData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('A');
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
      field: "sPlaceName",
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
      field: "madebPending",
      title: "MADEB PENDING",
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
      title: "MADEB ISSUED",
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
      title: "MADEB REJECTED",
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
      title: "MADEB DOUBLE",
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
      title: "MADEB CANCELLED",
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
      title: "TOTAL RECEIVED",
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
  const abroad = () => {
    if (madebType === '' || dtFrom === '' || dtTo === '' || orderBy === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();

    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportCTAMadebRegionOrCountryWise/?sMadebDisplayKey=` + madebType + `&dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo + `&sGroupBy=` + groupBy + `&sOrderBy=` + orderBy)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
            }
            else {
              let x = 1;
              let total = { 'no': '', 'sPlaceName': 'Total', 'madebPending': 0, 'madebIssued': 0, 'madebRejected': 0, 'madebDouble': 0, 'madebCancelled': 0, 'madebTotalReceived': 0 };
              resp.data.forEach((element) => {
                //element.dtFormattedIssuedDate = element.dtIssuedDate ? Moment(element.dtIssuedDate).format(sDateFormat) : null;
                element.no = x;
                x = x + 1;
                total.madebPending += element.madebPending;
                total.madebIssued += element.madebIssued;
                total.madebRejected += element.madebRejected;
                total.madebDouble += element.madebDouble;
                total.madebCancelled += element.madebCancelled;
                total.madebTotalReceived += element.madebTotalReceived;
              })
              resp.data.push(total);
              SetAbroadData(resp.data);
              console.log(resp.data);
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

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Abroad Report</h1>


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
            onChange={(e) => { SetOrderBy(e.target.value) }}

          >
            <MenuItem value={'lstauthregion.sAuthRegion'}>Region Wise</MenuItem>
            <MenuItem value={'lstcountry.sCountry'}>Country Wise</MenuItem>

          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button type="button"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report" onClick={() => { abroad(); }} >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {abroadData.length > 0 &&
            <Button type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>


        {
          abroadData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            //isLoading={isLoading}
            icons={tableIcons}
            title="Abroad Report"
            columns={columns}
            data={abroadData}
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
