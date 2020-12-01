
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
}));

export default function TypeIssued() {
  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [typeIssued, setTypeIssued] = React.useState('');
  const [typeIssuedPK, setTypeIssuedPK] = React.useState(0);
  const [typeIssuedObj, setTypeIssuedObj] = useState({});
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
      field: "sTypeIssued",
      title: "Type Issued",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
      }
      // customFilterAndSearch: (term, rowData)=>{
      //   console.log(term);
      //   //console.log(field);
      //   //console.log(rowData);
      // }
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
    setTypeIssuedPK(tableRowArray["id"]);
    setTypeIssued(tableRowArray["sTypeIssued"]);
    setEditModal(true);
    setTypeIssuedObj({
      id: tableRowArray["id"],
      typeIssued: tableRowArray["sTypeIssued"]
    });
  };

  const editAPICall = (typeIssuedObj) => {
    setisLoading(true);
    axios.post(`/TypeIssued/EditTypeIssued/ID=` + typeIssuedPK, typeIssuedObj/*TypeIssuedToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/TypeIssued/GetTypeIssued`)
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

  const addAPICall = (typeIssuedObj) => {
    setisLoading(true);
    axios.post(`/TypeIssued/AddTypeIssued/`, typeIssuedObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/TypeIssued/GetTypeIssued`)
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
    setTypeIssuedPK(tableRowArray[0]);
    setTypeIssued(tableRowArray[1]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    axios.get(`/TypeIssued/GetTypeIssued`)
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
            icons={oTableIcons}
            title="Type Issued"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add TypeIssued',
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
        typeIssuedObj={typeIssuedObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
    </Container>
  );
}
