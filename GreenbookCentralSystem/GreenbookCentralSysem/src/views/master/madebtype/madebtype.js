import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid
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
  /*root: {
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
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    margin: theme.spacing(1),
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  }
*/
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  //VAR
  const [madebType, setMadebType] = React.useState('');
  const [madebTypePK, setMadebTypePK] = React.useState(0);
  const [madebTypeObj, setMadebTypeObj] = useState({});

  
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

  const [filtering, setFiltering] = React.useState(false);

  oOptions.filtering = filtering;
  const history = useHistory();

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
      field: "sMadebType",
      title: "Madeb Type",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sMadebDisplayName",
      title: "Madeb Display Name",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sMadebDisplayKey",
      title: "Madeb DisplayKey",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      align: "center",
      field: "edit",
      title: "Edit",
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
      },
    },

  ];

  const editClick = (tableRowArray) => {
    setMadebTypePK(tableRowArray["id"]);
    setMadebType(tableRowArray["sMadebType"]);
    setEditModal(true);
    setMadebTypeObj({
      id: tableRowArray["id"],
      madebType: tableRowArray["sMadebType"],
      sMadebDisplayName : tableRowArray["sMadebDisplayName"],
      sMadebDisplayKey: tableRowArray["sMadebDisplayKey"],
      nMadebFeatureId: tableRowArray["nMadebFeatureId"]
    });
  }

  const editAPICall = (obj) => {
    // let MadebTypeID = madebTypePK;
    // let madebTypeToUpdate = {
    //   ID : madebTypePK,
    //   sMadebTypeID: madebTypeID,
    //   sMadebType: madebTypeName,
    // };
    console.log(obj);
    axios.post(`/MadebType/EditMadebType/madebTypeID=` + madebTypePK, obj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/MadebType/GetMadebTypes`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              handleError(error, history);
            })
        }
      })
      .catch(error => {
        handleError(error, history);
      })
  };
  const addAPICall = (madebTypeObj) => {

    // let madebTypeToAdd = {
    //   sMadebTypeID: madebTypeID,
    //   sMadebType: madebTypeName,
    // };
    axios.post(`/MadebType/AddMadebType/`, madebTypeObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/MadebType/GetMadebTypes`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              handleError(error, history);
            })
        }
      })
      .catch(error => {
        handleError(error, history);
      })
  };

  const deleteClick = (tableRowArray) => {

    setDeleteModal(true);
    setMadebTypePK(tableRowArray["id"]);
    setMadebType(tableRowArray["sMadebType"]);

  };

  const handleClose = () => {
    setDeleteModal(false);

  };

  const deleteAPICall = () => {
    // console.log(this.state.selectedUser);
    // let MadebTypeID = madebTypePK;
    const madebTypeToDelete = {
      ID: madebTypePK,
      sMadebType: madebType
    };
    axios.post(`/MadebType/DeleteMadebType`, madebTypeToDelete)
      .then(resp => {
        console.log(madebTypeToDelete);
        if (resp.status === 200) {
          console.log(resp.data);
          setDeleteModal(false);
          axios.get(`/MadebType/GetMadebTypes`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              handleError(error, history);
            })
        }
      })
      .catch(error => {
        handleError(error, history);
      })
  };

  useEffect(() => {
    axios.get(`/MadebType/GetMadebTypes`)
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
      {/* <Typography variant="h4" gutterBottom>MadebType
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
            icons={tableIcons}
            title="Madeb Types"
            data={dataAPI}
            columns={columns}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Madeb Type',
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
        classes={classes}
        handleAddClickClose={handleAddClickClose}
        addAPICall={addAPICall}
      />}
      {editModal && <EditDialog
        editModal={editModal}
        madebTypeObj={madebTypeObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
      {deleteModal && <DeleteDialog
        deleteModal={deleteModal}
        madebType={madebType}
        handleClose={handleClose}
        deleteAPICall={deleteAPICall}
      />}
    </Container>
  );
}
