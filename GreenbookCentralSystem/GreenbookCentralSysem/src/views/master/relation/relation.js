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
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import { makeStyles } from '@material-ui/core/styles';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';


const tableIcons = oTableIcons;

const useStyles = makeStyles(() => ({
}));

export default function Relation() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [relation, setRelation] = React.useState('');
  const [relationPK, setRelationPK] = React.useState(0);
  const [relationObj, setRelationObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);
  const [filtering, setFiltering] = React.useState(false);

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
      field: "sRelation",
      title: "Relation",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: 'edit',
      title: 'Edit',
      filtering: false,
      sorting:false,
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
    setRelationPK(tableRowArray["id"]);
    setRelation(tableRowArray["sRelation"]);
    setEditModal(true);
    setRelationObj({
      id: tableRowArray["id"],
      relation: tableRowArray["sRelation"]
    });
  }

  const editAPICall = (relationObj) => {
    axios.post(`/Relation/EditRelation/ID=` + relationPK, relationObj/*RelationToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/Relation/GetRelation`)
            .then(resp => {
              if (resp.status === 200) {
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
  const addAPICall = (relationObj) => {
    axios.post(`/Relation/AddRelation/`, relationObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/Relation/GetRelation`)
            .then(resp => {
              if (resp.status === 200) {
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

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setRelationPK(tableRowArray[0]);
    setRelation(tableRowArray[1]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    axios.get(`/Relation/GetRelation`)
      .then(resp => {
        if (resp.status === 200) {
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
    <Container maxWidth="lg" disableGutters={true}>
      {/*<Typography variant="h4" gutterBottom>Relation</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={tableIcons}
            title="Relation"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Relation',
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
        relationObj={relationObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
    </Container>
  );
}
