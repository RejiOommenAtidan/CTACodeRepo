import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Checkbox,
  Switch,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import handleError from '../../../auth/_helpers/handleError';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';
import {
  oOptions, oTableIcons, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders
} from "../../../config/commonConfig";
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
    marginTop: 1.5
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
    margin: 1
  },
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: '#11cb5f'
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
  },
  option: {
    fontSize: 10,
    '& > span': {
      marginRight: 5,
      fontSize: 16
    }
  }
});

export default function FeatureUserrights() {
  const history = useHistory();
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [tableRow, settableRow] = useState([]);
  const [userightName, setuserightName] = useState("");
  const [roleID, setroleID] = useState(0);
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

  const handleClickOpen = (tableRow, userightName, roleID) => {
    setOpenDialog(true);
    settableRow(tableRow);
    setuserightName(userightName);
    setroleID(roleID);
  };

  const handleClose = () => {
    setOpenDialog(false);
    settableRow([]);
    setuserightName("");
    setroleID(0);
  };

  const editAPICall = () => {
    // let myElement = mapping.map(element=>element.sFeature===tableRow["sFeature"]);
    // console.log(myElement);
    //console.log(tableRow)
    //Id
    //nUserrightsId
    // console.log(roleID);
    //bRights
    setOpenDialog(false);
    setBackdrop(true);
    let lnkObj = {
      Id: 0,
      nFeatureID: tableRow["nFeatureID"],
      nUserrightsId: roleID
    };
    axios.post(`/FeatureUserrights/EditFeatureUserright/Id=` + lnkObj.Id, lnkObj)
      .then(resp => {
        if (resp.status === 200) {
          axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data.lFeatureUserRightsPivot);
                setAlertMessage("Mapping Changed Successfully, Hold on Page Being Refreshed");
                setAlertType('success');
                snackbarOpen();
                setBackdrop(false);
                setTimeout(() => { window.location.reload(); }, 1500);
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

  const loadUserRightsMapping = () => {
    //#region user rights mapping
    axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
      .then(resp => {
        if (resp.status === 200) {
          const roles = resp.data.lUserRights;
          console.log(resp.data);
          const generatedColumns = [];
          //Add feature to cols array & then all roles 1 by 1
          generatedColumns.push(
            {
              field: "sFeature",
              title: "FEATURE",
              headerStyle: {
                textAlign: "center",
                textAlignLast: "center",
                verticalAlign: "middle",
                width: "17.5%"
              },
              cellStyle: {
                textAlign: "left",
                padding: '3.75px',
                width: "17.5%"
              }
            }
          );
          debugger;
          roles.map((role) => {
            generatedColumns.push(
              {
                sorting: false,
                title: role.sUserRightsName.toUpperCase(),
                headerStyle: {
                  textAlign: "center",
                  textAlignLast: "center",
                  verticalAlign: "middle",
                  //width: "15%"
                },
                cellStyle: {
                  textAlign: "center",
                  padding: '3.75px',
                  //width: "15%"
                },
                render: rowData => <Checkbox
                  color="primary"
                  name="name_bRights"
                  id="id_bRights"
                  //checked={rowData["aUserRights"][role.id-1] === 1 ? true : false}
                  //5 is for Admin
                  //1-Home
                  //2-Search
                  //46-Change Password
                  disabled={role.id === 5 || rowData.nFeatureID === 1 || rowData.nFeatureID === 2 || rowData.nFeatureID === 46}
                  checked={rowData["aUserRights"][role.id - 1]}
                  onChange={() => { handleClickOpen(rowData, role.sUserRightsName, role.id) }}
                />
              }
            );
          });
          setColumns(generatedColumns);
          setdataAPI(resp.data.lFeatureUserRightsPivot);
          setIsLoading(false);
          modifyHeaders();
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
    //#endregion
  };
  useEffect(() => {
    loadUserRightsMapping();
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}><br />
      {/*<Typography variant="h4" gutterBottom>Feature Roles</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="Feature Rights"
            columns={columns}
            data={dataAPI}
            options={{
              ...oOptions,
              exportButton: false
            }}
            localization={{ toolbar: { searchPlaceholder: 'Search Feature' } }}
            actions={[
              // {
              //   icon: oTableIcons.Search,
              //   tooltip: 'Toggle Filter',
              //   isFreeAction: true,
              //   onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              // }
            ]}
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Mapping?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to change this mapping?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            startIcon={<CancelIcon />}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >
            No
          </Button>
          <Button
            onClick={editAPICall}
            autoFocus
            startIcon={<WarningIcon />}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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

{/*const editAPICall = (lnkObj) => {
    axios.post(`/FeatureUserrights/EditFeatureUserright/Id=` + Id, lnkObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setEditModal(false);
          axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
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
  };*/}

{/*const editClick = (tableRowArray) => {
    //console.log(tableRowArray)
    setId(tableRowArray["oFeatureUserrights"]["id"]);
    setnFeatureID(tableRowArray["oFeatureUserrights"]["nFeatureID"]);
    setnUserRightsID(tableRowArray["oFeatureUserrights"]["nUserRightsID"]);
    setbRights(tableRowArray["oFeatureUserrights"]["bRights"]);
    setsFeature(tableRowArray["sFeature"]);
    setsUserRightsName(tableRowArray["sUserRightsName"]);
    setoLnkObj({
      id: tableRowArray["oFeatureUserrights"]["id"],
      nFeatureID: tableRowArray["oFeatureUserrights"]["nFeatureID"],
      nUserRightsID: tableRowArray["oFeatureUserrights"]["nUserRightsID"],
      bRights: tableRowArray["oFeatureUserrights"]["bRights"],
      sFeature: tableRowArray["sFeature"],
      sUserRightsName: tableRowArray["sUserRightsName"]
    });
    setEditModal(true);
  }

  const handleEditClickOpen = () => {
    setEditModal(true);
  };
  const handleEditClickClose = () => {
    setEditModal(false);
  };*/}
