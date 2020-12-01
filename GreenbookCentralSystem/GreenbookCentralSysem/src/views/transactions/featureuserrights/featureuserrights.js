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
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage } from "../../../config/commonConfig";

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
    setIsLoading(true);
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
                setIsLoading(false);
                window.location.reload();
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
    //#region user rights mapping
    axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
      .then(resp => {
        if (resp.status === 200) {
          const roles = resp.data.lUserRights;
          //console.log(resp.data);
          const generatedColumns = [];
          //Add feature to cols array & then all roles 1 by 1
          generatedColumns.push(
            {
              field: "sFeature",
              title: "Feature",
              headerStyle: {
                textAlign: "center",
                textAlignLast: "center",
                verticalAlign: "middle"
              },
              cellStyle: {
                textAlign: "center",
                padding: '5px'
              }
            }
          );
          roles.map((role) => {
            generatedColumns.push(
              {
                sorting: false,
                title: role.sUserRightsName,
                headerStyle: {
                  textAlign: "center",
                  textAlignLast: "center",
                  verticalAlign: "middle"
                },
                cellStyle: {
                  textAlign: "center",
                  padding: '5px'
                },
                render: rowData => <Checkbox
                  color="primary"
                  name="name_bRights"
                  id="id_bRights"
                  //checked={rowData["aUserRights"][role.id-1] === 1 ? true : false}
                  disabled={role.id == 5} //5 is for Admin
                  checked={rowData["aUserRights"][role.id - 1]}
                  onChange={() => { handleClickOpen(rowData, role.sUserRightsName, role.id) }}
                />
              }
            );
          });
          setColumns(generatedColumns);
          setdataAPI(resp.data.lFeatureUserRightsPivot);
          setIsLoading(false);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
    //#endregion
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
            title="Feature Roles"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
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
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Mapping ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to change this mapping ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            size={"small"}
            color={"primary"}
            startIcon={<CancelIcon />}
          >
            No
          </Button>
          <Button
            onClick={editAPICall}
            autoFocus
            variant="contained"
            size={"small"}
            color={"primary"}
            startIcon={<WarningIcon />}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
