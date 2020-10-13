import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import handleError from '../../../auth/_helpers/handleError';

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingBottom: 3,
    paddingTop: 3,
    flexGrow: 1,
    'label + &': {
      marginTop: 3
    }
  },
  selectEmpty: {
    marginTop: 1.5,
  },
  formControl: {
    margin: 2,
    width: '95%'
  },
  paper: {
    padding: 2,
    textAlign: 'center'
  },
  textField: {
    marginTop: 0.15,
    marginBottom: 0.15
  },
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25
  },
  box: {
    marginBottom: 1.5,
    marginTop: 1.5
  },
  button: {
    margin: 1,
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  heading: {
    fontSize: 15,
    fontWeight: 10,
    flexBasis: '33.33%',
    flexShrink: 0
  },
  border: '1px solid rgba(0, 0, 0, .125)',
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&$expanded': {
    margin: 'auto'
  }
});

export default function SarsoNewGBEntry() {
  Moment.locale('en');
  let history = useHistory();
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);

  const options = {
    textLabels: {
      body: {
        noMatch: "Loading..."
      }
    },
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30]
  };

  const columns = [
    {
      name: "nGBId",
      label: "Greenbook ID",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "nFormNo",
      label: "Form Number",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "dtDate",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            Moment(value).format('YYYY-MM-DD')
          )
        }
      }
    },
    {
      name: "gbentry",
      label: "Greenbook Entry",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => { history.push('/NewEntry/' + tableMeta.rowData[1]); }}
            >Greenbook Entry
            </Button>
          )
        }
      }
    }
  ];

  useEffect(() => {
    axios.get(`/GivenGBID/GetGivenGBIDs`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}><br />
      <Typography variant="h4" gutterBottom>Sarso New GB Entry</Typography>
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MUIDataTable
            data={dataAPI}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
