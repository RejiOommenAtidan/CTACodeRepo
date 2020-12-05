import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage,modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles(() => ({
}));

export default function Region() {

  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [regionID, setRegionID] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [regionPK, setRegionPK] = React.useState(0);
  const [regionObj, setRegionObj] = useState({});
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
      field: "sRegion_code",
      title: "REGION ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "10%"
      }
    },
    {
      field: "sRegion_name",
      title: "REGION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "70%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "70%"
      }
    },
    {
      field: 'edit',
      title: 'EDIT',
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
    setRegionPK(tableRowArray["id"]);
    setRegionID(tableRowArray["sRegion_code"]);
    setRegion(tableRowArray["sRegion_name"]);
    setEditModal(true);
    setRegionObj({
      id: tableRowArray["id"],
      regionId: tableRowArray["sRegion_code"],
      region: tableRowArray["sRegion_name"]
    });
  };

  const editAPICall = (regionObj) => {
    setBackdrop(true);
    axios.post(`/Region/EditRegion/ID=` + regionPK, regionObj/*RegionToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/Region/GetRegion`)
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
              //TODO: Error discussion
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

  const addAPICall = (regionObj) => {
    setBackdrop(true);
    axios.post(`/Region/AddRegion/`, regionObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/Region/GetRegion`)
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

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setRegionPK(tableRowArray["id"]);
    setRegionID(tableRowArray["sRegion_code"]);
    setRegion(tableRowArray["sRegion_name"]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const loadRegions = () => {
    axios.get(`/Region/GetRegion`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          setisLoading(false);
          modifyHeaders();
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
    loadRegions();
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/*<Typography variant="h4" gutterBottom>Region</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="Region"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Region',
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
        classes={classes}
        handleAddClickClose={handleAddClickClose}
        addAPICall={addAPICall}
      />}
      {editModal && <EditDialog
        editModal={editModal}
        regionObj={regionObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
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
