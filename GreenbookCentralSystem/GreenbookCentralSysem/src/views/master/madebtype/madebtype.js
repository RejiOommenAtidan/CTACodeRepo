// hi
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField
  
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import theme from '../../../theme/theme/theme'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MUIDataTable from "mui-datatables";
//import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
import MaterialTable, { MTableToolbar }  from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";

const tableIcons = oTableIcons;




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function EnhancedTable() {
  const classes = useStyles();
 // const navigate = useNavigate();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  // const [loadingProp, setloadingProp] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);


  //VAR
  const [madebType, setMadebType] = React.useState('');
  const [madebTypePK, setMadebTypePK] = React.useState(0);
  const [madebTypeObj, setMadebTypeObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);

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

  const [filtering, setFiltering] = React.useState(false);
  
  oOptions.filtering = filtering;
  const history = useHistory();

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
      field: "sMadebType",
      title: "Madeb Type",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      align:"center",
      field: "edit",
      title: "Edit",
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
      },
    },
   
  ];

  const editClick = (tableRowArray) => {
    setMadebTypePK(tableRowArray["id"]);
    setMadebType(tableRowArray["sMadebType"]);
    setEditModal(true);
    setMadebTypeObj({
      id: tableRowArray["id"],
      madebType: tableRowArray["sMadebType"]
    });
  }

  const editAPICall = (madebTypeObj) => {
    // let MadebTypeID = madebTypePK;
    // let madebTypeToUpdate = {
    //   ID : madebTypePK,
    //   sMadebTypeID: madebTypeID,
    //   sMadebType: madebTypeName,
    // };
    axios.post(`/MadebType/EditMadebType/madebTypeID=` + madebTypePK, madebTypeObj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/MadebType/GetMadebTypes`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              console.log(error.message);
              handleError(error, history);
            })
        }
      })
      .catch(error => {
        console.log(error.message);
        handleError(error, history);
      })
  };
  const addAPICall = (madebTypeObj) => {

    // let madebTypeToAdd = {
    //   sMadebTypeID: madebTypeID,
    //   sMadebType: madebTypeName,
    // };
    axios.post(`/MadebType/AddMadebType/`, madebTypeObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/MadebType/GetMadebTypes`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              console.log(error.message);
              handleError(error, history);
            })
        }
      })
      .catch(error => {
        console.log(error.message);
        handleError(error, history);
      })
  };

  const deleteClick = (tableRowArray) => {

    setDeleteModal(true);
    setMadebTypePK(tableRowArray["id"]);
    setMadebType(tableRowArray["sMadebType"]);
    
  };

  const handleClose = () => {
    setDeleteModal(false);

  };

  const deleteAPICall = () => {
    // console.log(this.state.selectedUser);
    // let MadebTypeID = madebTypePK;
    const madebTypeToDelete = {
      ID: madebTypePK,
      sMadebType: madebType
    };
    axios.post(`/MadebType/DeleteMadebType`, madebTypeToDelete)
      .then(resp => {
        console.log(madebTypeToDelete);
        if (resp.status === 200) {
          console.log(resp.data);
          setDeleteModal(false);
          axios.get(`/MadebType/GetMadebTypes`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              console.log(error.message);
              handleError(error, history);
            })
          }
      })
      .catch(error => {
        console.log(error.message);
        handleError(error, history);
      })
  };

  useEffect(() => {
    axios.get(`/MadebType/GetMadebTypes`)
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
  }, []);

  return (

      
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          style={{ paddingTop: '50px' }}
        >
          <Container maxWidth="lg" disableGutters={true}>
            {/* <Typography variant="h4" gutterBottom>MadebType
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
          icons={tableIcons}
          title="Madeb Types"
          data={dataAPI} 
          columns={columns} 
          options={oOptions}
          actions={[
            {
              icon: AddBox,
              tooltip: 'Add Madeb Type',
              isFreeAction: true,
              onClick: (event) => setAddModal(true)
            },
            {
              icon: FilterList,
              tooltip: 'Show Filter',
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
              madebTypeObj={madebTypeObj}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
            />}
            {deleteModal && <DeleteDialog
              deleteModal={deleteModal}
              madebType={madebType}
              handleClose={handleClose}
              deleteAPICall={deleteAPICall}
            />}
          </Container>
        </Box>
   


          
  );
}
