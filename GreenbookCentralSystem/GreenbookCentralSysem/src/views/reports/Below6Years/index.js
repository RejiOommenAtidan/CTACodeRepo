import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import {
  Button,
  FormControl,
  Paper,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonVariant, sButtonColor, sButtonSize, modifyHeaders } from '../../../config/commonConfig';
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
  let history = useHistory();
  const [backdrop, setBackdrop] = React.useState(false);
  const classes = useStyles();
  const [below6yearsData, SetBelow6yearsData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [dtFrom, SetdtFrom] = React.useState('');
  const [dtTo, SetdtTo] = React.useState('');
  const [orderBy, SetOrderBy] = React.useState('');
  const [groupBy, SetGroupBy] = React.useState('');
  const [title, setTitle] =  React.useState();
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

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
      field: "sGBId",
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
      field: "sName",
      title: "NAME",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        borderRight: '1px solid grey'

      },
    },
    {
      field: "dtFormattedDOB",
      title: "DATE OF BIRTH",
      // render: rowData => rowData.dtdtDOBEntered ? Moment(rowData.dtDOB).format('DD-MM-YYYY') : '',
      
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
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtFormattedDOB){
          return -1;
        }
        if(!b.dtFormattedDOB){
          return 1;
        }
        a = a ? a.dtFormattedDOB.split('-').reverse().join('') : '';
        b = b ? b.dtFormattedDOB.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "sPlace",
      title: "REGION/COUNTRY",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        borderRight: '1px solid grey'

      },
    },

  ]
  const below6years = () => {
    if (orderBy === '') {
      setAlertMessage('OrderBy field is required !');
      setAlertType('error');
      snackbarOpen();
    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportCTABelow6Years/?sOrderBy=` + orderBy)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            const grouping = orderBy === 'lstcountry.sCountry' ? 'Country Wise' : 'Region Wise';
            setTitle(`Below 6 years Report ${grouping}`);
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetBelow6yearsData([]);
            }
            else {

              let x = 1;
              resp.data.forEach((element) => {
                element.no = x;
                x = x + 1;

                element.dtFormattedDOB = element.dtDOB ? Moment(element.dtDOB).format(sDateFormat) : null;
              })
              SetBelow6yearsData(resp.data);
              //console.log(resp.data);
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
          }
          //console.log(error.config);
        })
        .then(release => {
          ////console.log(release); => udefined
        });
    }
  };

  useEffect(() => {
    below6yearsData.length > 0 && modifyHeaders()
  }, [below6yearsData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Below 6 Year Region or Country Wise</h1>


        <FormControl className={classes.formControl}>
          <InputLabel id="orderbylbl">Order By</InputLabel>
          <Select
            labelId="orderbylbl"
            id="orderby"
            name="orderby"
            onChange={(e) => { SetOrderBy(e.target.value); }}

          >
            <MenuItem value={'lstauthregion.sAuthRegion'}>Region Wise</MenuItem>
            <MenuItem value={'lstcountry.sCountry'}>Country Wise</MenuItem>

          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            type="button"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report"
            onClick={() => { below6years(); }} >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {below6yearsData.length > 0 &&
            <Button
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              type="button"
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>


        {
          below6yearsData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={title}
            columns={columns}
            data={below6yearsData}
            options={{ ...oOptions, tableLayout: "fixed" }}
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
