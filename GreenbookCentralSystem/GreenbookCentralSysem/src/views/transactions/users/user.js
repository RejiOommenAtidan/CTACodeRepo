import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AddDialog, EditDialog } from './dialog';
import AddBox from '@material-ui/icons/AddBox';
import FilterList from '@material-ui/icons/FilterList';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";

const tableIcons = oTableIcons;

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
  const history = useHistory();
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

  const columns = [
    {
      field: "oUser.id",
      title: "Sr No.",
      hidden: true,
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
      },
      export: true
    },
    {
      field: "oUser.sUsername",
      title: "Username",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "oUser.sFullname",
      title: "Fullname",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sUserRightsName",
      title: "Rights",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "oUser.sOffice",
      title: "Office Name",
      cellStyle: {
        padding: '5px'
      },
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
      cellStyle: {
        padding: '5px',
        borderRight: '0',
        width: '10%'
      }
    }
  ];

  const addAPICall = (userObj) => {
    setisLoading(true);
    axios.post(`/User/AddUser/`, userObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/User/GetAllUsers`)
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

  const editAPICall = (userObj) => {
    setisLoading(true);
    axios.post(`/User/EditUser/Id=` + Id, userObj)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/User/GetAllUsers`)
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
  }

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

  useEffect(() => {
    axios.get(`/UserRights/GetUserRights`)
      .then(resp => {
        if (resp.status === 200) {
          setlUserRights(resp.data);
          axios.get(`/User/GetAllUsers`)
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
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}><br />
      {/*<Typography variant="h4" gutterBottom>Users</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={tableIcons}
            title="Users"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add User',
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
    </Container>
  );
}
