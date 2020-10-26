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
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
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

export default function UserRights() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [userRights, setUserRights] = React.useState('');
  const [userRightsPK, setUserRightsPK] = React.useState(0);
  const [userRightsObj, setUserRightsObj] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const history = useHistory();
  const [isLoading, setisLoading] = React.useState(true);

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
      field: "sUserRightsName",
      title: "User Rights",
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
      export: false,
      sorting: false,
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
    setUserRightsPK(tableRowArray["id"]);
    setUserRights(tableRowArray["sUserRightsName"]);
    setEditModal(true);
    setUserRightsObj({
      id: tableRowArray["id"],
      userRights: tableRowArray["sUserRightsName"]
    });
  }

  const editAPICall = (userRightsObj) => {

    axios.post(`/UserRights/EditUserRights/ID=` + userRightsPK, userRightsObj/*UserRightsToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/UserRights/GetUserRights`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      });
  };
  const addAPICall = (userRightsObj) => {
    axios.post(`/UserRights/AddUserRights/`, userRightsObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/UserRights/GetUserRights`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      });
  };

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setUserRightsPK(tableRowArray["id"]);
    setUserRights(tableRowArray["sUserRightsName"]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    axios.get(`/UserRights/GetUserRights`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          setisLoading(false);
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/* <Typography variant="h4" gutterBottom>User Rights
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
            isLoading={isLoading}
            icons={tableIcons}
            title="User Rights"
            data={dataAPI}
            columns={columns}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add User Right',
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
        userRightsObj={userRightsObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
    </Container>
  );
}
