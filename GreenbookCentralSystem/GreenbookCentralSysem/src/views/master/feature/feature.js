import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../../../auth/_services';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import { storeDataAPI } from 'actions/masters/featureAction';
import { setCurrentSelectedFeature } from 'actions/masters/featureAction';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop';
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage } from "../../../config/commonConfig";
import handleError from '../../../auth/_helpers/handleError';

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
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
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
    margin: theme.spacing(1)
  },
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: '#11cb5f'
    }
  }
}));

export default function Feature() {
  const dataAPI = useSelector(state => state.FeatureReducer.lFeature);
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [editModal, setEditModal] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [Id, setId] = React.useState('');
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  const snackbarOpen = () => {
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  const columns = [
    {
      field: "id",
      title: "Sr No.",
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      field: "sFeature",
      title: "Feature Name",
      filterPlaceholder: 'Search..',
      headerStyle: {
        padding: '0px',
        width: '7%',
        textAlign: 'left'
      },
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      // field: "edit",
      // title: "Edit",
      // sorting: false,
      // export: false,
      // filtering: false,
      // render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
      //   onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      // >
      //   <EditOutlinedIcon />
      // </IconButton>,
      // headerStyle: {
      //   padding: '0px',
      //   width: '1%',
      //   textAlign: 'center'
      // },
      // headerStyle: {
      //   textAlign: "center",
      //   textAlignLast: "center",
      //   verticalAlign: "middle"
      // },
      // cellStyle: {
      //   textAlign: "center",
      //   padding: '5px'
      // }
    }
  ];

  const editClick = (tableRowArray) => {
    dispatch(setCurrentSelectedFeature({
      id: tableRowArray['id'],
      sFeature: tableRowArray['sFeature'],
    }));
    setId(tableRowArray['id']);
    setEditModal(true);
  };

  const editAPICall = (feature) => {
    setBackdrop(true);
    axios.post(`/Feature/EditFeature/ID=` + Id, feature/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          setEditModal(false);
          setAlertMessage("Record Successfully Edited");
          setAlertType("success");
          snackbarOpen();
          axios.get(`Feature/GetFeatures`)
            .then(resp => {
              if (resp.status === 200) {
                dispatch(storeDataAPI(resp.data));
              }
            })
            .catch(error => {
              handleError(error, history);
            })
            .then(release => {
              //console.log(release); => udefined
            });
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const addAPICall = (feature) => {
    axios.post(`/Feature/AddFeature/`, feature)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`Feature/GetFeatures`)
            .then(resp => {
              if (resp.status === 200) {
                dispatch(storeDataAPI(resp.data));
              }
            })
            .catch(error => {
              handleError(error, history);
            })
            .then(release => {
              //console.log(release); => udefined
            });
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  useEffect(() => {
    //Use === instead of ==
    if (authenticationService.currentUserValue === null) {
      history.push('/Login');
    }
  }, []);

  useEffect(() => {
    axios.get(`Feature/GetFeatures`)
      .then(resp => {
        if (resp.status === 200) {
          dispatch(storeDataAPI(resp.data));
          setisLoading(false);
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
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {/*<Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
            </Link>
          <Typography color="textPrimary">Feature</Typography>
  </Breadcrumbs>*/}
        <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
          isLoading={isLoading}
          icons={oTableIcons}
          title="Feature"
          columns={columns}
          data={dataAPI}
          options={oOptions}
          actions={[
            // {
            //   icon: oTableIcons.Add,
            //   tooltip: 'Add Feature',
            //   isFreeAction: true,
            //   onClick: () => setAddModal(true)
            // },
            {
              icon: oTableIcons.Search,
              tooltip: 'Toggle Filter',
              isFreeAction: true,
              onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
            }
          ]}
        />
        {addModal && <AddDialog
          addModal={addModal}
          classes={classes}
          handleAddClickClose={handleAddClickClose}
          addAPICall={addAPICall}
        />}
        {editModal && <EditDialog
          editModal={editModal}
          classes={classes}
          handleEditClickClose={handleEditClickClose}
          editAPICall={editAPICall}
        />}
        {snackbar && <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />}
        {backdrop && <BackdropComponent
          backdrop={backdrop}
        />}
      </Grid>
    </Grid>
  );
}