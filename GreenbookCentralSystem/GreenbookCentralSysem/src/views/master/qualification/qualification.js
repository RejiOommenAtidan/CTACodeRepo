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
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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

export default function Qualification() {
  const classes = useStyles();
 // const navigate = useNavigate();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  // const [loadingProp, setloadingProp] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);


  //VAR
  const [qualificationID, setQualificationID] = React.useState('');
  const [qualification, setQualification] = React.useState('');
  const [qualificationPK, setQualificationPK] = React.useState(0);
  const [qualificationObj, setQualificationObj] = useState({});
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
      field: "sQualificationID",
      title: "Qualification ID",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "sQualification",
      title: "Qualification",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      }
    },
    {
      field: "edit",
      title: "Edit",
      filtering: false,
      export: false,
      sorting: false,
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
    setQualificationPK(tableRowArray["id"]);
    setQualificationID(tableRowArray["sQualificationID"]);
    setQualification(tableRowArray["sQualification"]);
    setEditModal(true);
    setQualificationObj({
      id: tableRowArray["id"],
      qualificationId: tableRowArray["sQualificationID"],
      qualification: tableRowArray["sQualification"]
    });
  }

  const editAPICall = (qualificationObj) => {
    
    axios.post(`/Qualification/EditQualification/ID=` + qualificationPK, qualificationObj/*QualificationToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/Qualification/GetQualification`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      });
  };
  const addAPICall = (qualificationObj) => {

   
    axios.post(`/Qualification/AddQualification/`, qualificationObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/Qualification/GetQualification`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
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

  

  useEffect(() => {
    axios.get(`/Qualification/GetQualification`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setdataAPI(resp.data)
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      });
  }, []);

  return (

      
        // <Box
        //   display="flex"
        //   flexDirection="column"
        //   height="100%"
        //   justifyContent="center"
        // >
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
          icons={tableIcons}
          title="Qualification" 
          data={dataAPI} 
          columns={columns} 
          options={oOptions}
          actions={[
            {
              icon: AddBox,
              tooltip: 'Add Qualification',
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
              qualificationObj={qualificationObj}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
            />}
          
          </Container>
        //</Box>
   


          
  );
}
