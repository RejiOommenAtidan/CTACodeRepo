
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
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage, modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles(() => ({
  // MTableOverride = {
  //   //MuiTableSortLabel-root.MuiTableSortLabel-active:
  // }
}));

export default function Chatrel() {
  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [nCTAConfigPK, setnCTAConfigPK] = useState(0);
  const [sKey, setsKey] = useState("");
  const [sValue, setsValue] = useState("");
  const [oCTAConfig, setoCTAConfig] = useState({});
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
        textAlign: "right",
        padding: '5px',
        width: "10%"
      },
      export: true
    },
    {
      field: "sKey",
      title: "KEY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "55%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "55%"
      }
    },
    {
      field: "sValue",
      title: "VALUE",
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
    },
  ];

  const editClick = (tableRowArray) => {
    setnCTAConfigPK(tableRowArray["id"]);
    setsKey(tableRowArray["sKey"]);
    setsValue(tableRowArray["sValue"]);
    setoCTAConfig({
      id: tableRowArray["id"],
      sKey: tableRowArray["sKey"],
      sValue: tableRowArray["sValue"]
    });
    setEditModal(true);
  };

  const editAPICall = (ctaConfigObj) => {
    setBackdrop(true);
    axios.post(`/CTAConfig/EditCTAConfig/ID=` + nCTAConfigPK, ctaConfigObj)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          axios.get(`/CTAConfig/GetAllCTAConfig`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((item,index)=>{
                  if(item.sKey === "CTAAdminEmailPassword" )
                  resp.data[index].sValue = '*****' 
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
      }) 
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const addAPICall = (ctaConfigObj) => {
    setBackdrop(true);
    axios.post(`/CTAConfig/AddCTAConfig`, ctaConfigObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/CTAConfig/GetAllCTAConfig`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((item,index)=>{
                  if(item.sKey === "CTAAdminEmailPassword" )
                  resp.data[index].sValue = '*****' 
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
      }) 
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const loadCTAConfig = () => {
    axios.get(`/CTAConfig/GetAllCTAConfig`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          resp.data.forEach((item,index)=>{
            if(item.sKey === "CTAAdminEmailPassword" )
            resp.data[index].sValue = '*****' 
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
    loadCTAConfig();
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/*<Typography variant="h4" gutterBottom>Type Issued</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            className={classes.MTableOverride}
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="CTA Configuration"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add CTA Configuration',
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
        oCTAConfig={oCTAConfig}
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
