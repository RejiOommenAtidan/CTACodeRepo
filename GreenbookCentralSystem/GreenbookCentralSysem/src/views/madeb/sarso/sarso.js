
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  Breadcrumbs,
  Link
  
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
import EmailIcon from '@material-ui/icons/Email';

// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
import MaterialTable, { MTableToolbar }  from 'material-table';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root:{
        color:'blue',
        fontSize:15
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
          paddingLeft: '10px',
          
          paddingRight: '10px',

         
      }
  },
  }
})
const useStyles = makeStyles((theme) => ({
  root: {
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

}));

export default function EnhancedTable() {
  const classes = useStyles();
 // const navigate = useNavigate();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  // const [loadingProp, setloadingProp] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);

  //VAR
  const [id, setId] = React.useState('');
  const [formNumber, setFormNumber] = React.useState(0);
  const [authority, setAuthority] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [sarsoObj, setSarsoObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);

  const [filtering, setFiltering] = React.useState(false);
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
      field: "madeb.id",
      title: "Sr No.",
      hidden:true,
      cellStyle: {
        padding:'5px',
        
      },
    
    },
    {
      field: "madeb.nFormNumber",
      title: "Form Number",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.dtReceived",
      title: "Received Date",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "sAuthRegion",
      title: "Authority",
     
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.sName",
      title: "Name",
     
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.sFathersName",
      title: "Father's Name",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.nSaneyFormNo",
      title: "Saney Form No",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.sDocumentAttached",
      title: "Document attached",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.dtIssueAction",
      title: "Issue Action Date",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "sTypeIssued",
      title: "Issue Action",
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "madeb.dtReturnEmail",
      title: "Return Date",
      
      cellStyle: {
        padding:'5px',
        
      },
          },
    {
      field: "email",
      title: "Email",
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
      onClick={() => { editClick(rowData) }}  style={{padding:'0px'}}
    >
      <EmailIcon/>
      </IconButton> ,
      
      cellStyle: {
        padding:'5px',
        
      },
    },
    {
      field: "edit",
      title: "Edit",
      sort: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
      onClick={() => {editClick(rowData) }}  style={{padding:'0px'}}
    >
      <EditOutlinedIcon/>
      </IconButton> ,
      
      cellStyle: {
        padding:'5px',
        
      },
    },
   
  ];

  const editClick = (tableRowArray) => { 

  setId(tableRowArray['madeb']['id']);
  setFormNumber(tableRowArray['madeb']['nFormNumber']);
  setAuthority(tableRowArray['sAuthRegion']);
  setReceivedDate(tableRowArray['madeb']['dtReceived']);
  setName(tableRowArray['madeb']['sName']);
  setFname(tableRowArray['madeb']['sFathersName']);
  setSaney(tableRowArray['madeb']['nSaneyFormNo']);
  setDocument(tableRowArray['madeb']['sDocumentAttached']);
  setIssueActionDate(tableRowArray['madeb']['dtIssueAction']);
  setIssueAction(tableRowArray['madeb']['nIssuedOrNotID']);
  setReturnDate(tableRowArray['madeb']['dtReturnEmail']);
  
  setSarsoObj({
    id: tableRowArray['madeb']['id'],
    nFormNumber: tableRowArray['madeb']['nFormNumber'],
    dtReceived: tableRowArray['madeb']['dtReceived'],
    nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
    sName: tableRowArray['madeb']['sName'],
    sFathersName    :tableRowArray['madeb']['sFathersName'],
    nSaneyFormNo   :tableRowArray['madeb']['nSaneyFormNo'],
    sDocumentAttached  :tableRowArray['madeb']['sDocumentAttached'],
    dtIssueAction  :tableRowArray['madeb']['dtIssueAction'],
    nIssuedOrNotID  :tableRowArray['madeb']['nIssuedOrNotID'],
    dtReturnEmail  :tableRowArray['madeb']['dtReturnEmail']
    });
    //console.log(tableRowArray);
    setEditModal(true);
  }

  const editAPICall = (madeb) => {
    // let CountryID = countryPK;
    // let countryToUpdate = {
    //   ID : countryPK,
    //   sCountryID: countryID,
    //   sCountry: countryName,
    // };
    axios.post(`/Madeb/EditMadeb/ID=` + id, madeb/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`MadebAuthRegionVM/GetMadebs`)
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


  const selectDatafunction = () =>{
    axios.get(`Madeb/GetNewEmptyMadeb`)
    .then(resp => {
      if (resp.status === 200) {
        setSelectData(resp.data);
        
       // setdataAPI(resp.data)
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
  const addAPICall = (madeb) => {

   
    console.log(madeb);
 
    
    axios.post(`/Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`MadebAuthRegionVM/GetMadebs`)
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



  const handleClose = () => {
    setDeleteModal(false);

  };



  useEffect(() => {
    axios.get(`MadebAuthRegionVM/GetMadebs`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setdataAPI(resp.data);
          selectDatafunction()
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
          <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary">Sarso Madeb</Typography>
        </Breadcrumbs>
          <MaterialTable style={{padding:'10px', border:'2px solid grey',borderRadius:'10px'}}
       
       icons={tableIcons}
      title="Sarso Madeb"
    columns={columns}
    data={dataAPI}        
    options={{
      filtering,
      exportButton: true,
      exportAllData: true,
      headerStyle: {
     
          padding:'0',
          paddingLeft:'10px',
       border:'1px solid lightgrey',
       
      },
     pageSize:10,
     pageSizeOptions:[10,50,100],
    
     rowStyle: x => {
      if (x.tableData.id % 2) {
          return {backgroundColor: "#f2f2f2"}
      }
    }


      
    }}
    actions={[
      {
        icon: AddBox,
        tooltip: 'Add Country',
        isFreeAction: true,
        onClick: () => setAddModal(true)
      },
      {
        icon: FilterList,
        tooltip: 'Show Filter',
        isFreeAction: true,
        onClick: (event) => {setFiltering(currentFilter => !currentFilter)}
      }
    ]}
  />
            {addModal && <AddDialog
              addModal={addModal}
              classes={classes}
              selectData={selectData}
              handleAddClickClose={handleAddClickClose}
              addAPICall={addAPICall}
            />}
            {editModal && <EditDialog
              editModal={editModal}
              sarsoObj={sarsoObj}
              selectData={selectData}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
            />}
          
          </Container>
        </Box>
   


          
  );
}