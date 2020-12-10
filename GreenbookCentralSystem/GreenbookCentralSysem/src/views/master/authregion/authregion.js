import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage, modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import handleError from "../../../auth/_helpers/handleError";

const useStyles = makeStyles(() => ({
  //   root: {
  //     backgroundColor: theme.palette.background.dark,
  //     height: '100%',
  //     paddingBottom: theme.spacing(3),
  //     paddingTop: theme.spacing(3),
  //     flexGrow: 1,
  //     'label + &': {
  //       marginTop: theme.spacing(3)
  //     }
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  //   formControl: {
  //     margin: theme.spacing(0.5),
  //     width: '100%'
  //   },
  //   paper: {
  //     padding: theme.spacing(2),
  //     textAlign: 'center',
  //     color: theme.palette.text.secondary,
  //   },
  //   textField: {
  //     marginLeft: theme.spacing(1),
  //     marginRight: theme.spacing(1),
  //     marginBottom: theme.spacing(1)
  //   },
  //   box: {
  //     marginBottom: theme.spacing(1.5),
  //     marginTop: theme.spacing(1.5)
  //   },
  //   button: {
  //     margin: theme.spacing(1),
  //   },
  //   palette: {
  //     primary: {
  //       // Purple and green play nicely together.
  //       main: red[500],
  //     },
  //     secondary: {
  //       // This is green.A700 as hex.
  //       main: '#11cb5f',
  //     },
  //   }
}));

export default function EnhancedTable() {

  let history = useHistory();
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryID, setCountryID] = React.useState('');
  const [authRegion, setAuthRegion] = React.useState('');
  const [authRegionPK, setAuthRegionPK] = React.useState(0);
  const [authRegionObj, setAuthRegionObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const snackbarClose = () => {
    setSnackbar(false);
  };
  //#endregion

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
      title: "#",
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "10%"
      },
      export: true
    },
    {
      field: "sCountryID",
      title: "SHORT NAME",
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%"
      }
    },
    {
      field: "sCountry",
      title: "COUNTRY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "20%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "20%"
      }
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "30%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "30%"
      }
    },
    {
      field: "sCurrencyCode",
      title: "CURRENCY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%"
      }
    },
    {
      field: "edit",
      title: "EDIT",
      filtering: false,
      sorting: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "10%"
      }
    },

  ];

  const editClick = (tableRowArray) => {
    setAuthRegionPK(tableRowArray["id"]);
    setCountryID(tableRowArray["sCountryID"]);
    setAuthRegion(tableRowArray["sAuthRegion"]);
    setEditModal(true);
    setAuthRegionObj({
      ID: tableRowArray["id"],
      countryID: tableRowArray["sCountryID"],
      authRegion: tableRowArray["sAuthRegion"],
      sCurrencyCode: tableRowArray["sCurrencyCode"]
    });
  };

  const editAPICall = (authRegionObj) => {
    // let CountryID = countryPK;
    // let countryToUpdate = {
    //   ID : countryPK,
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    setBackdrop(true);
    axios.post(`/AuthRegion/EditAuthRegion/RegionID=` + authRegionPK, authRegionObj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/AuthRegionCountry/GetAllAuthRegionsCountryName`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setAlertMessage(sSnackbarUpdateMessage);
                setAlertType('success');
                snackbarOpen();
                setBackdrop(false);
              }
            })
            .catch(error => {
              console.log(error.message);
              console.log(error.config);
            })
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 403){
            console.log(error);
            setAlertMessage(error.response.data.detail);
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        console.log(error.message);
        console.log(error.config);
      });
  };

  const addAPICall = (authRegionObj) => {
    // let countryToAdd = {
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    setBackdrop(true);
    axios.post(`/AuthRegion/AddAuthRegion/`, authRegionObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/AuthRegionCountry/GetAllAuthRegionsCountryName`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setAlertMessage(sSnackbarAddMessage);
                setAlertType('success');
                snackbarOpen();
                setBackdrop(false);
              }
            })
            .catch(error => {
              console.log(error.message);
              console.log(error.config);
            })
            .then(release => {
              //console.log(release); => udefined
            });
          //window.location = window.location;
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 403){
            console.log(error);
            setAlertMessage(error.response.data.detail);
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        console.log(error.message);
        console.log(error.config);
      });

  };

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setAuthRegionPK(tableRowArray["id"]);
    setCountryID(tableRowArray["sCountryID"]);
    setAuthRegion(tableRowArray["sAuthRegion"]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const deleteAPICall = () => {
    // console.log(this.state.selectedUser);
    // let CountryID = countryPK;
    const authRegionToDelete = {
      ID: authRegionPK,
      sCountryID: countryID,
      sAuthRegion: authRegion,
    };
    axios.post(`/AuthRegion/DeleteAuthRegion/`, authRegionToDelete)
      .then(resp => {
        if (resp.status === 200) {
          setDeleteModal(false);
          axios.get(`/AuthRegion/GetAuthRegions`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  const loadAuthRegions = () => {
    axios.get(`/AuthRegionCountry/GetAllAuthRegionsCountryName`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data)
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                setCountryList(resp.data)
                setLoading(false);
                modifyHeaders();
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    loadAuthRegions();
  }, []);


  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/* <Typography variant="h4" gutterBottom>Authority Regions
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
            </Typography> */}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={loading}
            icons={oTableIcons}
            title="Authority Region"
            data={dataAPI}
            columns={columns}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Authority Region',
                isFreeAction: true,
                onClick: (event) => setAddModal(true)
              },
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
        </Grid>
      </Grid>
      {addModal && <AddDialog
        addModal={addModal}
        dataAPI={dataAPI}
        countryList={countryList}
        classes={classes}
        handleAddClickClose={handleAddClickClose}
        addAPICall={addAPICall}
      />}
      {editModal && <EditDialog
        editModal={editModal}
        dataAPI={dataAPI}
        authRegionObj={authRegionObj}
        countryList={countryList}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
      {deleteModal && <DeleteDialog
        deleteModal={deleteModal}
        authRegion={authRegion}
        handleClose={handleClose}
        deleteAPICall={deleteAPICall}
      />}
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />
      }
      {backdrop && <BackdropComponent
        backdrop={backdrop}
      />}
    </Container>
  );
}
