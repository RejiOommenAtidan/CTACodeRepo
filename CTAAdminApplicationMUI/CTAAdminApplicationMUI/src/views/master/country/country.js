// hi
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../theme/theme/theme'
import Page from 'src/components/Page';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function EnhancedTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  // const [loadingProp, setloadingProp] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedUser, setselectedUser] = useState('');
  const [selectedUserName, setselectedUserName] = useState('');

  //VAR
  const [countryID, setCountryID] = React.useState('');
  const [countryName, setCountryName] = React.useState('');
  const [countryPK, setCountryPK] = React.useState(0);

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
    filterType: 'checkbox',
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30]
  };

  const columns = [
    {
      name: "id",
      label: "Sr No.",
      options: {
        filter: true,
        sort: true,


      }
    },
    {
      name: "sCountryID",
      label: "Country ID",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "sCountry",
      label: "Country",
      options: {
        filter: true,
        sort: true
      }
    },

    {
      name: "edit",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<EditOutlinedIcon />}
              onClick={() => { editClick(tableMeta.rowData) }}
            >Edit
            </Button>
          )
        }
      }
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (

            <Button
              variant="outlined"
              color="secondary"
              size="small"
              endIcon={<DeleteOutlinedIcon />}
              onClick={() => { deleteClick(tableMeta.rowData) }}
            >Delete
            </Button>
          )
        }
      }
    }
  ];

  const editClick = (countryObj) => {
    // //TODO: remove usage of window.location
    // window.location = 'editUser/' + user_Id.toString();
    //Done
    // navigate('/app/editUser/' + user_Id.toString());
    // console.log(user_Id);
    setCountryPK(countryObj[0]);
    setCountryID(countryObj[1]);
    setCountryName(countryObj[2]);
    setEditModal(true);
  }

  const editAPICall = ()=>{
    let CountryID = countryPK;
    let countryToUpdate = {
      ID : countryPK,
      sCountryID: countryID,
      sCountry: countryName,
    };
    axios.post(`/Country/EditCountry/CountryID=` + CountryID,countryToUpdate)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          setdataAPI(dataAPI.map((data) => {
            if(data.id === countryPK){
              return {
                ...data,
                ...countryToUpdate
              };
            }
            else{
              return data;
            }
          }));
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
  const addAPICall = ()=>{
  
    let countryToAdd = {
      sCountryID: countryID,
      sCountry: countryName,
    };
    axios.post(`/Country/AddCountry/`,countryToAdd)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          window.location=window.location;
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


  
  const deleteClick = (countryObj) => {
 
    setDeleteModal(true);
    setCountryPK(countryObj[0]);
    setCountryID(countryObj[1]);
    setCountryName(countryObj[2]);
  };

  const handleClose = () => {
    setDeleteModal(false);
    setselectedUser('');
    setselectedUserName('');
  };

  const deleteCallAPI = () => {
    // console.log(this.state.selectedUser);
    let CountryID = countryPK;
    let countryToDelete = {
      ID : countryPK,
      sCountryID: countryID,
      sCountry: countryName,
    };
    axios.post(`/Country/DeleteCountry/`,countryToDelete)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setEditModal(false);
          window.location=window.location;
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
    <ThemeProvider theme={theme}>
      <Page
        className={classes.root}
        title="Country"
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="lg" disableGutters={true}>
            <Typography variant="h4" gutterBottom>Country 
             <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
                //onClick={addClick()}
                onClick={() => { setAddModal(true) }}
             >
               <AddCircleIcon />
              </IconButton>
            </Typography>
            <Dialog open={addModal} onClose={handleAddClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Country</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_countryId"
                      label="Country ID"
                      type="text"
                      onChange={(e)=>{setCountryID(e.target.value)}}
                      

                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_CountryName"
                      label="Country Name"
                      type="text"
                      
                      onChange={(e)=>{setCountryName(e.target.value)}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClickClose} color="primary">Cancel</Button>
          <Button onClick={addAPICall} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
            <Grid container className={classes.box}>
              <Grid item xs={12}>
                <MUIDataTable
                  data={dataAPI}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
            <Dialog
              open={deleteModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-slide-title">Confirm Operation</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete country {countryName} ?
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="default">
                  No
          </Button>
                <Button onClick={deleteCallAPI} color="secondary">
                  Yes
          </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </Page>
      <Dialog open={editModal} onClose={handleEditClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Country</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_countryId"
                      label="Country ID"
                      type="text"
                      InputProps={{
                        readOnly: true
                      }}
                      value={countryID}

                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="id_CountryName"
                      label="Country Name"
                      type="text"
                      value={countryName}
                      onChange={(e)=>{setCountryName(e.target.value)}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClickClose} color="primary">Cancel</Button>
          <Button onClick={editAPICall} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
