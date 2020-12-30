
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
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage, sDateFormat, modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles(() => ({
}));

export default function Chatrel() {
  Moment.locale('en');
  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [nChatrelPK, setnChatrelPK] = useState(0);
  const [sChatrelKey, setsChatrelKey] = useState("");
  const [nChatrelValue, setnChatrelValue] = useState(0);
  const [dtChatrelFrom, setdtChatrelFrom] = useState(null);
  const [oChatrel, setoChatrel] = useState({});
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
        textAlign: "center",
        padding: '5px',
	borderRight: '1px solid grey',        width: "10%"
      },
      export: true
    },
    {
      field: "sChatrelKey",
      title: "CHATREL TERM",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "30%"
      },
     cellStyle: {
        textAlign: "left",
        padding: '5px',
	borderRight: '1px solid grey',        width: "30%"
      }
    },
    {
      field: "nChatrelValue",
      title: "VALUE",
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
      }
    },
    {
      //render: rowData => Moment(rowData['dtChatrelFrom']).format(sDateFormat),
      field: "dtChatrelFromFormatted",
      title: "STARTING FROM",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "20%"
      },
      cellStyle: {
        textAlign: "right",
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
	borderRight: '1px solid grey',        width: "10%"
      }
    },
  ];

  const editClick = (tableRowArray) => {
    setnChatrelPK(tableRowArray["id"]);
    setsChatrelKey(tableRowArray["sChatrelKey"]);
    setnChatrelValue(tableRowArray["nChatrelValue"]);
    setdtChatrelFrom(tableRowArray["dtChatrelFrom"]);
    setoChatrel({
      id: tableRowArray["id"],
      sChatrelKey: tableRowArray["sChatrelKey"],
      nChatrelValue: tableRowArray["nChatrelValue"],
      dtChatrelFrom: tableRowArray["dtChatrelFrom"]
    });
    setEditModal(true);
  };

  const editAPICall = (chatrelObj) => {
    setBackdrop(true);
    axios.post(`/Chatrel/EditChatrel/ID=` + nChatrelPK, chatrelObj)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/Chatrel/GetAllChatrel`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.dtChatrelFromFormatted = element.dtChatrelFrom ? Moment(element.dtChatrelFrom).format(sDateFormat) : null;
                });
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
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const addAPICall = (chatrelObj) => {
    setBackdrop(true);
    axios.post(`/Chatrel/AddChatrel`, chatrelObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/Chatrel/GetAllChatrel`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.dtChatrelFromFormatted = element.dtChatrelFrom ? Moment(element.dtChatrelFrom).format(sDateFormat) : null;
                });
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
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const loadChatrelConfig = () => {
    axios.get(`/Chatrel/GetAllChatrel`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.dtChatrelFromFormatted = element.dtChatrelFrom ? Moment(element.dtChatrelFrom).format(sDateFormat) : null;
          });
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
  };

  useEffect(() => {
    loadChatrelConfig();
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
            title="Chatrel Configuration"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              // {
              //   icon: oTableIcons.Add,
              //   tooltip: 'Add Chatrel',
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
        oChatrel={oChatrel}
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
