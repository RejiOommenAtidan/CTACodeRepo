import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import theme from '../../../theme/theme/theme;

import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
//import { ThemeProvider } from '@material-ui/styles';

import Slide from '@material-ui/core/Slide';
import Moment from 'moment';

// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';

import { useHistory } from 'react-router-dom';


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
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
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

export default function EnhancedTable() {
  Moment.locale('en');
  let history = useHistory()
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  //VAR
  const [countryID, setCountryID] = React.useState('');
  const [countryName, setCountryName] = React.useState('');
  const [countryPK, setCountryPK] = React.useState(0);
  const [countryObj, setCountryObj] = useState({});

  const handleEditClickOpen = () => {
    setEditModal(true);
  };
  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickOpen = () => {
    setAddModal(true);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  const options = {
    textLabels: {
      body: {
        noMatch: "Loading..."
      }
    },
    //filterType: 'textField',
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
            //value
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
              onClick={() => { history.push('/NewEntry'); }}
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
          console.log(typeof(resp.data[0].dtDate));
          setdataAPI(resp.data)
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
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="lg" disableGutters={true}><br/>
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
        {addModal && <AddDialog
          addModal={addModal}
          classes={classes}
          handleAddClickClose={handleAddClickClose}
        />}
        {editModal && <EditDialog
          editModal={editModal}
          countryObj={countryObj}
          classes={classes}
          handleEditClickClose={handleEditClickClose}
        />}
        {deleteModal && <DeleteDialog
          deleteModal={deleteModal}
          countryName={countryName}
        />}
      </Container>
    </Box>
  );
}
