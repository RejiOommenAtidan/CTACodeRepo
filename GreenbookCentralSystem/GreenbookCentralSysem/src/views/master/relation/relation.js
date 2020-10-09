import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { AddDialog, EditDialog } from './dialog';

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableBodyCell: {
      root: {
      }
    },
    MUIDataTableHeadCell: {
      root: {
        color: 'blue',
        fontSize: 20
      }
    },
    MuiTableCell: {
      root: {
        padding: '0px',
        paddingLeft: '30px',

      }
    },
  }
})
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
    textLabels: {
      body: {
        noMatch: "Loading..."
      },

    },
    filter: true,
    viewColumns: false,
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 30],
    onChangePage: (number) => {
      setCurrentPage(number + 1);
      console.log('Current Page No.', number + 1)
    },
    onChangeRowsPerPage: (rows) => {
      console.log("Rows per page:", rows)
    },
    onTableChange: (action, tableState) => {
      console.log("Action:", action, "\ntableState:", tableState, "Data Changed:", dataChanged);
    }
  };

  const columns = [
    {
      name: "id",
      label: "Sr No.",
      options: {
        filter: false,
        sort: true,
        display: false
      }
    },
    {
      name: "sRelation",
      label: "Type Issued",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField'
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
            <IconButton color="primary" aria-label="upload picture" component="span"
              onClick={() => { editClick(tableMeta.rowData) }} style={{ padding: '5px' }}
            >
              <EditOutlinedIcon />
            </IconButton>
          )
        }
      }
    },
  ];

  const editClick = (tableRowArray) => {
    setRelationPK(tableRowArray[0]);
    setRelation(tableRowArray[1]);
    setEditModal(true);
    setRelationObj({
      id: tableRowArray[0],
      relation: tableRowArray[1]
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
                console.log(resp.data);
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
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/Relation/GetRelation`)
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
    <Container maxWidth="lg" disableGutters={true}>
      <Typography variant="h4" gutterBottom>Relation
             <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="large"
          onClick={() => { setAddModal(true) }}
        >
          <AddCircleIcon />
        </IconButton>
      </Typography>
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable data={dataAPI} columns={columns} options={options} />
          </MuiThemeProvider>
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
