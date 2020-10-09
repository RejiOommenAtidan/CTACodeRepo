import React, { useEffect, useState } from 'react';
import {
  Box,
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
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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
  const [openDialog, setOpenDialog] = React.useState(false);
  const history = useHistory();
  const [filtering, setFiltering] = React.useState(false);
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);
  const [mapping, setMapping] = useState([]);
  const [lstFeature, setlstFeature] = React.useState([]);
  const [lUserRights, setlUserRights] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [tableRow, settableRow] = useState([]);
  const [userightName, setuserightName] = useState("");
  const [roleID, setroleID] = useState(0);
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
    //nRights
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
          console.log(resp.data);
          axios.get(`/FeatureUserrights/GetFeatureUserrightsUI`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setIsLoading(false);
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
    setnRights(tableRowArray["oFeatureUserrights"]["nRights"]);
    setsFeature(tableRowArray["sFeature"]);
    setsUserRightsName(tableRowArray["sUserRightsName"]);
    setoLnkObj({
      id: tableRowArray["oFeatureUserrights"]["id"],
      nFeatureID: tableRowArray["oFeatureUserrights"]["nFeatureID"],
      nUserRightsID: tableRowArray["oFeatureUserrights"]["nUserRightsID"],
      nRights: tableRowArray["oFeatureUserrights"]["nRights"],
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

  useEffect(() => {
    //#region user rights mapping
    axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
      .then(resp => {
        if (resp.status === 200) {
          //console.table(resp.data);
          setMapping(resp.data);
          //#region user rights
          axios.get(`/UserRights/GetUserRights`)
            .then(resp => {
              if (resp.status === 200) {
                setlUserRights(resp.data);
                //console.log(resp.data)
                //#region Features
                axios.get(`/Feature/GetFeatures`)
                  .then(resp => {
                    if (resp.status === 200) {
                      setlstFeature(resp.data);
                      //#region User rights(roles)
                      axios.get(`/UserRights/GetUserRights`)
                        .then(resp => {
                          if (resp.status === 200) {
                            const roles = resp.data;
                            const generatedColumns = [];
                            //Add feature to cols array & then all roles 1 by 1
                            generatedColumns.push(
                              {
                                field: "sFeature",
                                title: "Feature",
                                cellStyle: {
                                  padding: '5px',
                                  paddingLeft: '10px',
                                  borderLeft: '0'
                                }
                              }
                            );
                            roles.map((role) => {
                              generatedColumns.push(
                                {
                                  title: role.sUserRightsName,
                                  cellStyle: {
                                    padding: '5px',
                                    paddingLeft: '10px',
                                    borderLeft: '0'
                                  },
                                  render: rowData => <Checkbox
                                    color="primary"
                                    name="name_bRights"
                                    id="id_nRights"
                                    checked={rowData["n" + (role.sUserRightsName).replace(/\s/g, "")] === 1 ? true : false}
                                    onChange={() => { handleClickOpen(rowData, role.sUserRightsName, role.id) }}
                                  // size="small"
                                  />
                                }
                              );
                            });
                            setColumns(generatedColumns);
                            axios.get(`/FeatureUserrights/GetFeatureUserrightsUI`)
                              .then(resp => {
                                if (resp.status === 200) {
                                  //console.table(resp.data);
                                  setdataAPI(resp.data);
                                  setIsLoading(false);
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
                      //#endregion
                    }
                  })
                  .catch(error => {
                    handleError(error, history);
                  })
                  .then(release => {
                    //console.log(release); => udefined
                  });
                //#endregion
              }
            })
            .catch(error => {
              handleError(error, history);
            })
            .then(release => {
              //console.log(release); => udefined
            });
          //#endregion
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
        <Typography variant="h4" gutterBottom>Feature Roles</Typography>
        <Grid container className={classes.box}>
          <Grid item xs={12}>

            <MaterialTable
              //paginationType="normal"
              //toolbarButtonAlignment="left"
              isLoading={isLoading}
              style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
              icons={tableIcons}
              title="Feature Roles"
              columns={columns}
              data={dataAPI}
              options={{
                //loadingType:"linear",
                //showSelectAllCheckbox:true,
                //showTextRowsSelected:true,
                //searchFieldAlignment:"left",
                //selection:true,
                tableLayout: "auto",
                //toolbar:true,
                padding: "dense",
                columnsButton: true,
                filtering,
                exportButton: true,
                exportAllData: true,
                headerStyle: {
                  backgroundColor: '#3b3e66',
                  color: '#FFF',
                  fontSize: '18px',
                  paddingLeft: '5px',
                  border: '1px solid lightgrey'
                },
                pageSize: 23,
                pageSizeOptions: [10, 50, 100],
                // rowStyle: x => {
                //   if (x.tableData.id % 2) {
                //     return { backgroundColor: "#f2f2f2" }
                //   }
                // }
              }}
              actions={[
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

        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Toggle Mapping"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to Toggle this mapping ?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
          </Button>
            <Button onClick={editAPICall} color="primary" autoFocus>
              Yes
          </Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
}
