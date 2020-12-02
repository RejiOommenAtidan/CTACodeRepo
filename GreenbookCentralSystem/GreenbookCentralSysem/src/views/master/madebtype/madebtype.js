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

  let history = useHistory();

  const columns = [
    {
      field: "id",
      title: "Sr No.",
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "15%"
      },
      export: true
    },
    {
      field: "sMadebType",
      title: "Madeb Type",
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
      field: "sMadebDisplayName",
      title: "Madeb Display Name",
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
      field: "sMadebDisplayKey",
      title: "Madeb DisplayKey",
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
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "15%"
      }
    },
  ];

  const editClick = (tableRowArray) => {
    setMadebTypePK(tableRowArray["id"]);
    setMadebType(tableRowArray["sMadebType"]);
    setEditModal(true);
    setMadebTypeObj({
      id: tableRowArray["id"],
      madebType: tableRowArray["sMadebType"],
      sMadebDisplayName: tableRowArray["sMadebDisplayName"],
      sMadebDisplayKey: tableRowArray["sMadebDisplayKey"],
      nMadebFeatureId: tableRowArray["nMadebFeatureId"]
    });
  };

  const editAPICall = (obj) => {
    // let MadebTypeID = madebTypePK;
    // let madebTypeToUpdate = {
    //   ID : madebTypePK,
    //   sMadebTypeID: madebTypeID,
    //   sMadebType: madebTypeName,
    // };
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
            icons={oTableIcons}
            title="Madeb Types"
            data={dataAPI}
            columns={columns}
            options={oOptions}
            actions={[
              // {
              //   icon: oTableIcons.Add,
              //   tooltip: 'Add Madeb Type',
              //   isFreeAction: true,
              //   onClick: (event) => setAddModal(true)
              // },
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
