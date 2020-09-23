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



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root:{
        color:'blue',
        fontSize:20
      }
    },
    MUIDataTableBodyCell: {
      root: {
        // backgroundColor: "#FFF",
        // width: "50px"
      }

    },
    MuiTableCell: {
      root: {
          padding: '0px',
          paddingLeft: '30px',
         
      }
  },
  }
})
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
  const [occupationPK, setOccupationPK] = React.useState(0);
  const [occupationDesc, setOccupationDesc] = React.useState('');
  const [occupationDescTibetan, setOccupationDescTibetan] = React.useState('');
  const [occupationObj, setOccupationObj] = useState({});
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

  const options = {
    textLabels: {
      body: {
        noMatch: "Loading..."
      },
     
    },
    filter:true,
    viewColumns:false,
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 30],
    onChangePage: (number) => {
      setCurrentPage(number + 1);
      console.log('Current Page No.', number + 1)
    },
    onChangeRowsPerPage: (rows) => {
      console.log("Rows per page:", rows)
    },
    onTableChange: (action, tableState) => {
      console.log("Action:", action, "\ntableState:", tableState, "Data Changed:", dataChanged);
      
    }
  };

  const columns = [
    {
      name: "id",
      label: "Sr No.",
      options: {
        filter: false,
        sort: true,
        display:false
      }
    },
    {
      name: "sOccupationDesc",
      label: "Occupation",
      options: {
        filter: true,
        sort: true, 
        filterType: 'textField'      }
    },
    {
      name: "sOccupationDescTibetan",
      label: "Occupation (in Tibetan)",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField'
      }
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton color="primary" aria-label="upload picture" component="span"
              onClick={() => { editClick(tableMeta.rowData) }}  style={{padding:'5px'}}
            >
              <EditOutlinedIcon/>
              </IconButton>
            
          )
        }
      }
    },
   
  ];

  const editClick = (tableRowArray) => {
    setOccupationPK(tableRowArray[0]);
    setOccupationDesc(tableRowArray[1]);
    setOccupationDescTibetan(tableRowArray[2]);
    setEditModal(true);
    setOccupationObj({
      id: tableRowArray[0],
      occupationDesc: tableRowArray[1],
      occupationDescTibetan: tableRowArray[2]
    });
  }

  const editAPICall = (occupationObj) => {
    // let CountryID = countryPK;
    // let countryToUpdate = {
    //   ID : countryPK,
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    axios.post(`/Occupation/EditOccupation/occupationId=` + occupationPK, occupationObj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/Occupation/GetOccupations`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                setDataChanged(true);
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
          // setdataAPI(dataAPI.map((data) => {
          //   console.log(data);
          //   if(data.id === countryObj.id){
          //     console.log(data);
          //     return {
          //       ...data,
          //       ...countryObj
          //     };
          //   }
          //   else{
          //     console.log(data)
          //     return data;
          //   }
          // }))
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
  const addAPICall = (occupationObj) => {

    // let countryToAdd = {
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    axios.post(`/Occupation/AddOccupation`, occupationObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`/Occupation/GetOccupations`)
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

  const deleteClick = (tableRowArray) => {
    setOccupationPK(tableRowArray[0]);
    setOccupationDesc(tableRowArray[1]);
    setOccupationDescTibetan(tableRowArray[2]);
    setDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);

  };

  const deleteAPICall = () => {
    // console.log(this.state.selectedUser);
    // let CountryID = countryPK;
    const occupationToDelete = {
      ID: occupationPK,
      sOccupationDesc: occupationDesc,
      sOccupationDescTibetan: occupationDescTibetan
    };
    axios.post(`/Occupation/DeleteOccupation`, occupationToDelete)
      .then(resp => {
        console.log(occupationToDelete);
        if (resp.status === 200) {
          console.log(resp.data);
          setDeleteModal(false);
          axios.get(`/Occupation/GetOccupations`)
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
          // setdataAPI(dataAPI.filter((data) => {
          //   return (data.id !== countryToDelete.ID);
          // }));
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

  useEffect(() => {
    axios.get(`/Occupation/GetOccupations`)
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
        >
          <Container maxWidth="lg" disableGutters={true}>
            <Typography variant="h4" gutterBottom>Occupation
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
            </Typography>
            <Grid container className={classes.box}>
              <Grid item xs={12}>
              <MuiThemeProvider theme={getMuiTheme}>
        <MUIDataTable  data={dataAPI} columns={columns} options={options} />
      </MuiThemeProvider>
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
              occupationObj={occupationObj}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
            />}
            {deleteModal && <DeleteDialog
              deleteModal={deleteModal}
              occupationDesc={occupationDesc}
              handleClose={handleClose}
              deleteAPICall={deleteAPICall}
            />}
          </Container>
        </Box>
   


          
  );
}