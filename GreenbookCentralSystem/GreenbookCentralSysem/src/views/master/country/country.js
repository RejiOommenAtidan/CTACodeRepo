// hi
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
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

} from '@material-ui/core';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
import MaterialTable, { MTableToolbar } from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";
import {Alerts} from '../../alerts';

const tableIcons = oTableIcons;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  /*root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    }
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
*/
}));

export default function EnhancedTable() {
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
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const history = useHistory();
  


  // SnackBar Alerts 

const [alertMessage, setAlertMessage] = useState("");
const [alertType, setAlertType] = useState("");
const alertObj={
  alertMessage:alertMessage,
  alertType:alertType
}
const [snackbar,setSnackbar]=React.useState(false);
const snackbarOpen = () => {
  console.log('alert');
  setSnackbar(true);
}
const snackbarClose = () => {
  setSnackbar(false);
};


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

  

  
  const columns = [
    {
      field: "id",
      title: "Sr No.",
      hidden: true,
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',

      },
      export: true

    },
    {
      field: "sCountryID",
      title: "Country ID",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',

        borderLeft: '0'
      },

    },
    {
      field: "sCountry",
      title: "Country",
      cellStyle: {
        padding: '5px',

      },
    },

    {
      field: 'edit',
      title: 'Edit',
      filtering: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      cellStyle: {
        padding: '5px',
        borderRight: '0',
        width: '10%'
      },

    },
    {
      field: "verifiedby",
      title: "Verified By",
      export: true,
      hidden: true,
    },
    {
      field: "reverifiedby",
      title: "Re-verified By",
      export: true,
      hidden: true,
    },

  ];

  const editClick = (tableRowArray) => {

    setCountryPK(tableRowArray['id']);
    setCountryID(tableRowArray['sCountryID']);
    setCountryName(tableRowArray['sCountry']);
    setEditModal(true);
    setCountryObj({
      id: tableRowArray['id'],
      countryId: tableRowArray['sCountryID'],
      countryName: tableRowArray['sCountry']
    });
  }

  const editAPICall = (countryObj) => {
    
    axios.post(`/Country/EditCountry/CountryID=` + countryPK, countryObj/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                setDataChanged(true);
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
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setAlertMessage(`Record updation failed. \nError:${error.message}.` );
          setAlertType('error');
          snackbarOpen();
      })
  };
  const addAPICall = (countryObj) => {

    axios.post(`/Country/AddCountry/`, countryObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          setAlertMessage('Created new record successfully.');
          setAlertType('success');
          snackbarOpen();
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
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
            
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
        setAlertMessage(`Record creation failed. \nError:${error.message}.` );
        setAlertType('error');
        snackbarOpen();
      })
  };

  const deleteClick = (tableRowArray) => {

    setDeleteModal(true);
    setCountryPK(tableRowArray[0]);
    setCountryID(tableRowArray[1]);
    setCountryName(tableRowArray[2]);
  };

  const handleClose = () => {
    setDeleteModal(false);

  };

  const deleteAPICall = () => {
    // console.log(this.state.selectedUser);
    // let CountryID = countryPK;
    const countryToDelete = {
      ID: countryPK,
      sCountryID: countryID,
      sCountry: countryName,
    };
    axios.post(`/Country/DeleteCountry/`, countryToDelete)
      .then(resp => {
        console.log(countryToDelete);
        if (resp.status === 200) {
          console.log(resp.data);
          setDeleteModal(false);
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
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
          //window.location = window.location;
          // setdataAPI(dataAPI.filter((data) => {
          //   return (data.id !== countryToDelete.ID);
          // }));
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
  };

  useEffect(() => {
    axios.get(`/Country/GetCountries`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
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


    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   height="100%"
    //   justifyContent="center"
    //   style={{ paddingTop: '50px' }}

    // >
      <Container maxWidth="lg" disableGutters={true}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary"> Country</Typography>
  </Breadcrumbs> */}
        <Grid container className={classes.box} >
          <Grid item xs={12}>


            <MaterialTable 
              style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
              icons={tableIcons}
              title="Country"
              columns={columns}
              data={dataAPI}
              options={oOptions}
              actions={[
                {
                  icon: AddBox,
                  tooltip: 'Add Country',
                  isFreeAction: true,
                  onClick: (event) => setAddModal(true)
                },
                {
                  icon: FilterList,
                  tooltip: 'Show Filter',
                  isFreeAction: true,
                  onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
                }
              ]}
            />
          </Grid>
        </Grid>
        {addModal && <AddDialog
          addModal={addModal}
          classes={classes}
          handleAddClickClose={handleAddClickClose}
          addAPICall={addAPICall}
        />}
        {editModal && <EditDialog
          editModal={editModal}
          countryObj={countryObj}
          classes={classes}
          handleEditClickClose={handleEditClickClose}
          editAPICall={editAPICall}
        />}
        { snackbar && <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
              /> 
            }
        {deleteModal && <DeleteDialog
          deleteModal={deleteModal}
          countryName={countryName}
          handleClose={handleClose}
          deleteAPICall={deleteAPICall}
        />}
      </Container>
    //</Box>
  );
}
