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
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage,modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

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

export default function Qualification() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  //VAR
  const [qualificationID, setQualificationID] = React.useState('');
  const [qualification, setQualification] = React.useState('');
  const [qualificationPK, setQualificationPK] = React.useState(0);
  const [qualificationObj, setQualificationObj] = useState({});
  let history = useHistory();
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isLoading, setisLoading] = React.useState(true);

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
      field: "sQualificationID",
      title: "QUALIFICATION ID",
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
      field: "sQualification",
      title: "QUALIFICATION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "50%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "50%"
      }
    },
    {
      field: "edit",
      title: "EDIT",
      filtering: false,
      export: false,
      sorting: false,
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
    },
  ];

  const editClick = (tableRowArray) => {
    setQualificationPK(tableRowArray["id"]);
    setQualificationID(tableRowArray["sQualificationID"]);
    setQualification(tableRowArray["sQualification"]);
    setEditModal(true);
    setQualificationObj({
      id: tableRowArray["id"],
      qualificationId: tableRowArray["sQualificationID"],
      qualification: tableRowArray["sQualification"]
    });
  };

  const editAPICall = (qualificationObj) => {
    setBackdrop(true);
    axios.post(`/Qualification/EditQualification/ID=` + qualificationPK, qualificationObj/*QualificationToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/Qualification/GetQualification`)
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
            });
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 403){
            console.log(error);
            setAlertMessage(error.response.data.detail.substring(1));
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        handleError(error, history);
      });
  };

  const addAPICall = (qualificationObj) => {
    setBackdrop(true);
    axios.post(`/Qualification/AddQualification/`, qualificationObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/Qualification/GetQualification`)
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
            });
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 403){
            console.log(error);
            setAlertMessage(error.response.data.detail.substring(1));
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        handleError(error, history);
      });
  };

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setQualificationPK(tableRowArray["id"]);
    setQualificationID(tableRowArray["sQualificationID"]);
    setQualification(tableRowArray["sQualification"]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const loadQualifications = () => {
    axios.get(`/Qualification/GetQualification`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          setisLoading(false);
          modifyHeaders();
        }
      })
      .catch(error => {
        handleError(error, history);
      });
  };

  useEffect(() => {
    loadQualifications();
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/* <Typography variant="h4" gutterBottom>Qualification
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
            title="Qualification"
            isLoading={isLoading}
            data={dataAPI}
            columns={columns}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Qualification',
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
        addAPICall={addAPICall}
      />}
      {editModal && <EditDialog
        editModal={editModal}
        qualificationObj={qualificationObj}
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
