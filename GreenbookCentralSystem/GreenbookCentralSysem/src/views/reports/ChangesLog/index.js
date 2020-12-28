
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import {
  Button,
  FormControl,
  TextField,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { Alerts } from '../../alerts';
import _ from "lodash/fp";
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

  const classes = useStyles();
  const [changesLogData, SetChangesLogData] = React.useState([]);

  const [dtFrom, SetdtFrom] = React.useState('');

  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [backdrop, setBackdrop] = React.useState(false);
  const [title, setTitle] =  React.useState();
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

        textAlign: 'center',
        borderRight: '1px solid grey'

      },
    },
    {
      field: "sGBId",
      title: "GB ID",
      filterPlaceholder: 'Search..',
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
      filterPlaceholder: 'Search..',
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
      field: "sFeature",
      title: "FEATURE",
      filterPlaceholder: 'Search..',
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
      field: "sFieldValuesOld",
      title: "OLD VALUE",
      filterPlaceholder: 'Search..',
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',
        borderRight: '1px solid grey',

        textAlign: 'left'

      },
    },
    {
      field: "sFieldValuesNew",
      title: "NEW VALUE",
      filterPlaceholder: 'Search..',
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
      field: "sFullName",
      title: "ENTERED BY",
      filterPlaceholder: 'Search..',
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
      field: "dtFormattedEntered",
      title: "DATE ENTERED",
      // render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      filterPlaceholder: 'Search..',
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
  const changesLog = () => {
    if (dtFrom === '') {
      setAlertMessage('Date From field is required !');
      setAlertType('error');
      snackbarOpen();

    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportCTAChangesLog/?&dtRecordFrom=` + dtFrom)
        .then(resp => {

          if (resp.status === 200) {
            setBackdrop(false);
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetChangesLogData([]);
            }
            else {
              let x = 1;
              resp.data.forEach((element) => {
                element.no = x;
                x = x + 1;
                element.dtFormattedEntered = element.dtEntered ? Moment(element.dtEntered).format(sDateFormat) : null;
              })
              SetChangesLogData(resp.data);
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
          }
          console.log(error.config);
        })
        .then(release => {
          //console.log(release); => udefined
        });
    }
  }
  useEffect(() => {
    changesLogData.length > 0 && modifyHeaders()
  }, [changesLogData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Changes Log Report</h1>

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
          <Button
            type="button"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report" onClick={() => { changesLog(); }} >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {changesLogData.length > 0 &&
            <Button
              type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>


        {
          changesLogData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={`Changes Log for Date: ${dtFrom}`}
            columns={columns}
            data={changesLogData}
            /*options={{
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
            }}*/
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
