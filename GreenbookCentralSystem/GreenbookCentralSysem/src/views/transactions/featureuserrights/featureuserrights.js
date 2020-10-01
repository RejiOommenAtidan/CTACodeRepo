import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
//import theme from '../../../theme/theme/theme;
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/Add';
//import { ThemeProvider } from '@material-ui/styles';

// import Slide from '@material-ui/core/Slide';
import Moment from 'moment';

// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
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

import { useHistory } from 'react-router-dom';

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
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
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
  Moment.locale('en');
  const [filtering, setFiltering] = React.useState(false);
  let history = useHistory();
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  //VAR
  const [lstFeature, setlstFeature] = React.useState([]);
  const [lUserRights, setlUserRights] = React.useState([]);
  const [Id, setId] = React.useState('');
  const [nFeatureID, setnFeatureID] = React.useState(0);
  const [nUserRightsID, setnUserRightsID] = React.useState(0);
  const [nRights, setnRights] = React.useState(0);
  const [sFeature, setsFeature] = React.useState('');
  const [sUserRightsName, setsUserRightsName] = React.useState('');
  const [oLnkObj, setoLnkObj] = useState({});
  const [isLoading,setIsLoading] = useState(true);


  const columns = [
    {
      field: "oFeatureUserrights.id",
      title: "Sr No.",
      hidden: true,
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
      },
      export: true,
      hiddenByColumnsButton:false,
      removable:true,
      type:"numeric"
    },
    {
      field: "sFeature",
      title: "Feature",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sUserRightsName",
      title: "Role",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      // columnsButton:true,
      //searchable:false,
      // hiddenByColumnsButton:true,
      // hidden:true,
      // removable:true,
      field: 'edit',
      tooltip:'Edit Record',
      title: 'Edit',
      filtering: false,
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

  const addAPICall = (lnkObj) => {
    axios.post(`/FeatureUserrights/AddFeatureUserright/`, lnkObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
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
          //window.location = window.location;
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
  };


  const editAPICall = (lnkObj) => {
    axios.post(`/FeatureUserrights/EditFeatureUserright/Id=` + Id, lnkObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setEditModal(false);
          axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
            .then(resp => {
              if (resp.status === 200) {
                //console.log(resp.data);
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
  };



  const editClick = (tableRowArray) => {
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
  };
  const handleAddClickOpen = () => {
    setAddModal(true);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };





  // //Get User rights
  // useEffect(() => {

  // }, []);

  useEffect(() => {
    //#region user rights mapping
    axios.get(`/FeatureUserrights/GetFeatureUserrightsMapping`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data)
          setdataAPI(resp.data);
          //#region user rights
          axios.get(`/UserRights/GetUserRights`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setlUserRights(resp.data);
                //#region Features
                axios.get(`/Feature/GetFeatures`)
                  .then(resp => {
                    if (resp.status === 200) {
                      console.log(resp.data)
                      setlstFeature(resp.data);
                      setIsLoading(false);
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
                //#endregion
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
          //#endregion
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
    //#endregion
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
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
                tableLayout:"auto",
                //toolbar:true,
                padding:"dense",
                columnsButton:true,
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
                pageSize: 10,
                pageSizeOptions: [10, 50, 100],
                rowStyle: x => {
                  if (x.tableData.id % 2) {
                    return { backgroundColor: "#f2f2f2" }
                  }
                }
              }}
              actions={[
                {
                  icon: AddBox,
                  tooltip: 'Add Feature User right',
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
          lstFeature={lstFeature}
          addAPICall={addAPICall}
        />}
        {editModal && <EditDialog
          editModal={editModal}
          oLnkObj={oLnkObj}
          classes={classes}
          handleEditClickClose={handleEditClickClose}
          editAPICall={editAPICall}
        />}
        {deleteModal && <DeleteDialog
          deleteModal={deleteModal}
        //countryName={countryName}
        />}
      </Container>
    </Box>
  );
}
