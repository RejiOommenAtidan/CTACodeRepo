import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
}));

export default function Region() {
  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [regionID, setRegionID] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [regionPK, setRegionPK] = React.useState(0);
  const [regionObj, setRegionObj] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

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
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
      },
      export: true
    },
    {
      field: "sRegion_code",
      title: "Region ID",
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
      field: "sRegion_name",
      title: "Region",
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
      field: 'edit',
      title: 'Edit',
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
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
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
    setisLoading(true);
    axios.post(`/Region/EditRegion/ID=` + regionPK, regionObj/*RegionToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/Region/GetRegion`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setDataChanged(true);
                setisLoading(false);
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

  const addAPICall = (regionObj) => {
    setisLoading(true);
    axios.post(`/Region/AddRegion/`, regionObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/Region/GetRegion`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setisLoading(false);
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

  useEffect(() => {
    axios.get(`/Region/GetRegion`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
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
                icon: oTableIcons.Filter,
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
    </Container>
  );
}
