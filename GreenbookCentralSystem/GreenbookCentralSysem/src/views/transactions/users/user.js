import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AddDialog, EditDialog } from './dialog';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage, modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingBottom: 3,
    paddingTop: 3,
    flexGrow: 1,
    'label + &': {
      marginTop: 3
    }
  },
  selectEmpty: {
    marginTop: 1.5,
  },
  formControl: {
    margin: 2,
    width: '95%'
  },
  paper: {
    padding: 2,
    textAlign: 'center'
  },
  textField: {
    marginTop: 0.15,
    marginBottom: 0.15
  },
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25
  },
  box: {
    marginBottom: 1.5,
    marginTop: 1.5
  },
  button: {
    margin: 1,
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  heading: {
    fontSize: 15,
    fontWeight: 10,
    flexBasis: '33.33%',
    flexShrink: 0
  },
  border: '1px solid rgba(0, 0, 0, .125)',
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&$expanded': {
    margin: 'auto'
  }
});

export default function Users() {
  let history = useHistory();
  const [isLoading, setisLoading] = React.useState(true);
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [lUserRights, setlUserRights] = React.useState([]);
  const [Id, setId] = React.useState('');
  const [sUsername, setsUsername] = React.useState('');
  const [sFullname, setsFullname] = React.useState('');
  const [nUserRightsId, setnUserRightsId] = React.useState('');
  const [sUserRightsName, setsUserRightsName] = React.useState('');
  const [sPassword, setsPassword] = React.useState('');
  const [sOffice, setsOffice] = React.useState('');
  const [oUserObj, setoUserObj] = useState({});
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

  const columns = [
    {
      field: "oUser.id",
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
      field: "oUser.sUsername",
      title: "USERNAME",
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
      field: "oUser.sFullname",
      title: "FULL NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "30%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "30%"
      }
    },
    {
      field: "sUserRightsName",
      title: "ROLES",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%"
      }
    },
    {
      field: "oUser.sOffice",
      title: "OFFICE NAME",
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
      align: "center",
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
    }
  ];

  const addAPICall = (userObj) => {
    setBackdrop(true);
    axios.post(`/User/AddUser/`, userObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/User/GetAllUsers`)
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
        if (error.response) {
          if (error.response.status === 403) {
            console.log(error);
            setAlertMessage(error.response.data.detail.substring(1));
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const editAPICall = (userObj) => {
    setBackdrop(true);
    axios.post(`/User/EditUser/Id=` + Id, userObj)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/User/GetAllUsers`)
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
              handleError(error, history);
            })
            .then(release => {
              //console.log(release); => udefined
            });
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 403) {
            console.log(error);
            setAlertMessage(error.response.data.detail.substring(1));
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const editClick = (tableRowArray) => {
    setId(tableRowArray["oUser"]["id"]);
    setsUsername(tableRowArray["oUser"]["sUsername"]);
    setsFullname(tableRowArray["oUser"]["sFullname"]);
    setsPassword(tableRowArray["oUser"]["sPassword"])
    setnUserRightsId(tableRowArray["oUser"]["nUserRightsId"]);
    setsUserRightsName(tableRowArray["oUser"]["sUserRightsName"]);
    setsOffice(tableRowArray["oUser"]["sOffice"]);
    setoUserObj({
      id: tableRowArray["oUser"]["id"],
      sUsername: tableRowArray["oUser"]["sUsername"],
      sFullname: tableRowArray["oUser"]["sFullname"],
      sPassword: tableRowArray["oUser"]["sPassword"],
      nUserRightsId: tableRowArray["oUser"]["nUserRightsId"],
      sUserRightsName: tableRowArray["oUser"]["sUserRightsName"],
      sOffice: tableRowArray["oUser"]["sOffice"],
      lUserRights: lUserRights
    });
    setEditModal(true);
  };

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

  const loadUserData = () => {
    axios.get(`/UserRights/GetUserRights`)
      .then(resp => {
        if (resp.status === 200) {
          setlUserRights(resp.data);
          axios.get(`/User/GetAllUsers`)
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
    loadUserData();
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}><br />
      {/*<Typography variant="h4" gutterBottom>Users</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="Users"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add User',
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
        lUserRights={lUserRights}
        addAPICall={addAPICall}
      />}
      {editModal && <EditDialog
        editModal={editModal}
        oUserObj={oUserObj}
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
