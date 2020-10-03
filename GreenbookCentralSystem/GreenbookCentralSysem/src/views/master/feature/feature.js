import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
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
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { storeDataAPI } from 'actions/masters/featureAction';
import { setCurrentSelectedFeature } from 'actions/masters/featureAction';
import { aPageSizeArray } from '../../../config/commonConfig';
import { nPageSize } from '../../../config/commonConfig';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <div></div>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
  const [pageSize, setpageSize] = useState(nPageSize);
  const [pageSizeArray, setpageSizeArray] = useState(aPageSizeArray);
  const [filtering, setFiltering] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);

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
      cellStyle: {
        padding: '5px',
      },
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
      cellStyle: {
        // padding:'0px',
        padding: '10px',
        width: '7%',
        textAlign: 'left'

      },
    },
    {
      field: "edit",
      title: "Edit",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      headerStyle: {
        padding: '0px',
        width: '1%',
        textAlign: 'center'
      },
      cellStyle: {
        padding: '0px',
        width: '1%',
        textAlign: 'center'

      },
    }
  ];

  const editClick = (tableRowArray) => {
    dispatch(setCurrentSelectedFeature({
      id: tableRowArray['id'],
      sFeature: tableRowArray['sFeature'],
    }));
    console.log(tableRowArray);
    setId(tableRowArray['id']);
    setEditModal(true);
  }

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
        setBackdrop(false);
        setAlertMessage('Error! ' + error.message);
        setAlertType('error');
        snackbarOpen();
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

  const addAPICall = (feature) => {
    console.log(feature);
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
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Feature</Typography>
          </Breadcrumbs>
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={isLoading}
            icons={tableIcons}
            title="Feature"
            columns={columns}
            data={dataAPI}
            options={{
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
            }}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Feature',
                isFreeAction: true,
                onClick: () => setAddModal(true)
              },
              {
                icon: Search,
                tooltip: 'Show Filter',
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
    </>
  );
}