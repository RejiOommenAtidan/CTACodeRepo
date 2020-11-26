import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";

const tableIcons = oTableIcons;

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
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(true);
  //VAR
  const [countryID, setCountryID] = React.useState('');
  const [authRegion, setAuthRegion] = React.useState('');
  const [authRegionPK, setAuthRegionPK] = React.useState(0);
  const [authRegionObj, setAuthRegionObj] = useState({});
  const [countryName, setCountryName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  let history = useHistory();

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
        paddingLeft: '10px'
      },
      export: true
    },
    {
      field: "sCountryID",
      title: "Short Name",
      hidden: true,
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sCountry",
      title: "Country",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sAuthRegion",
      title: "Authority Region",
      cellStyle: {
        padding: '5px',

      },
    },
    {
      field: "sCurrencyCode",
      title: "Currency",
      cellStyle: {
        padding: '5px',

      },
    },
    {
      align: "center",
      field: "edit",
      title: "Edit",
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
  }

  const editAPICall = (authRegionObj) => {
    // let CountryID = countryPK;
    // let countryToUpdate = {
    //   ID : countryPK,
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    axios.post(`/AuthRegion/EditAuthRegion/RegionID=` + authRegionPK, authRegionObj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/AuthRegionCountry/GetAllAuthRegionsCountryName`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              console.log(error.message);
              console.log(error.config);
            })
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };
  const addAPICall = (authRegionObj) => {

    // let countryToAdd = {
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    axios.post(`/AuthRegion/AddAuthRegion/`, authRegionObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/AuthRegionCountry/GetAllAuthRegionsCountryName`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
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
        console.log(authRegionToDelete);
        if (resp.status === 200) {
          console.log(resp.data);
          setDeleteModal(false);
          axios.get(`/AuthRegion/GetAuthRegions`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
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

  useEffect(() => {
    axios.get(`/AuthRegionCountry/GetAllAuthRegionsCountryName`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setdataAPI(resp.data)
          axios.get(`/Country/GetCountries`)
          .then(resp => {
            if (resp.status === 200) {
              console.log(resp.data);
              setCountryList(resp.data)
              setLoading(false);
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
            icons={tableIcons}
            title="Authority Regions"
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
                icon: oTableIcons.Filter,
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
    </Container>
  );
}
