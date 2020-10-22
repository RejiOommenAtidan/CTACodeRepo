
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';

const tableIcons = oTableIcons;

const useStyles = makeStyles(() => ({
  // MTableOverride = {

  // }
}));

export default function Chartel() {

  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [nCTAConfigPK, setnCTAConfigPK] = useState(0);
  const [sKey, setsKey] = useState("");
  const [sValue, setsValue] = useState("");
  const [oCTAConfig, setoCTAConfig] = useState({});
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
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px'
      },
      export: true
    },
    {
      field: "sKey",
      title: "Key",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sValue",
      title: "Value",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      },
    },
    {
      align: "center",
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
      cellStyle: {
        padding: '5px',
        borderRight: '0',
        width: '10%'
      }
    },
  ];

  const editClick = (tableRowArray) => {
    setnCTAConfigPK(tableRowArray["id"]);
    setsKey(tableRowArray["sKey"]);
    setsValue(tableRowArray["sValue"]);
    setoCTAConfig({
      id: tableRowArray["id"],
      sKey: tableRowArray["sKey"],
      sValue: tableRowArray["sValue"]
    });
    setEditModal(true);
  };

  const editAPICall = (ctaConfigObj) => {
    setisLoading(true);
    axios.post(`/CTAConfig/EditCTAConfig/ID=` + nCTAConfigPK, ctaConfigObj)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/CTAConfig/GetAllCTAConfig`)
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

  const addAPICall = (ctaConfigObj) => {
    setisLoading(true);
    axios.post(`/CTAConfig/AddCTAConfig`, ctaConfigObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/CTAConfig/GetAllCTAConfig`)
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

  useEffect(() => {
    axios.get(`/CTAConfig/GetAllCTAConfig`)
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
      {/*<Typography variant="h4" gutterBottom>Type Issued</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={tableIcons}
            title="CTA Config"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add CTA Config',
                isFreeAction: true,
                onClick: (event) => setAddModal(true)
              },
              {
                icon: FilterList,
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
        oCTAConfig={oCTAConfig}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
    </Container>
  );
}
