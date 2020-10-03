import React, { useEffect, useState } from 'react';
import {Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import theme from '../../../theme/theme/theme'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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
import Moment from 'moment';
import MaterialTable, { MTableToolbar }  from 'material-table';
import { forwardRef } from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmailIcon from '@material-ui/icons/Email';
import { AddDialog, EditDialog } from './dialog';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <div></div>),
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

export default () => {

  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);

  const [gbSerialObj, setGBSerialObj] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);
  const [filtering, setFiltering] = React.useState(false);

  const columns = [
    {
      field: "greenBookSerialNumber.id",
      title: "Sr No.",
      hidden:true,
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "greenBookSerialNumber.dtDate",
      title: "Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding:'5px',
      },
      render: rowData => rowData['greenBookSerialNumber']['dtDate'] ? Moment(rowData['greenBookSerialNumber']['dtDate']).format('YYYY-MM-DD') : undefined
    },
    {
      field: "greenBookSerialNumber.nBookNo",
      title: "Book No",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "greenBookSerialNumber.sName",
      title: "Name",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "greenBookSerialNumber.sCountryID",
      title: "Country Code",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "greenBookSerialNumber.sGBID",
      title: "GB Id",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "sMadebType",
      title: "Madeb Type",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "greenBookSerialNumber.nFormNumber",
      title: "Form Number",
      filterPlaceholder: "Search...",
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
      field: "greenBookSerialNumber.remarks",
      title: "Remarks",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "edit",
      title: "Edit",
      sorting: false,
      export:false,
      filtering:false,
      render: rowData => <IconButton 
                          color="primary" 
                          aria-label="upload picture" 
                          component="span"
                          onClick={() => {
                            editClick(rowData) 
                          }}  
                          style={{padding:'0px'}}
                        >
                          <EditOutlinedIcon/>
                        </IconButton> ,
      cellStyle: {
        padding:'5px',
      },
    }
  ];

  const options = {
    textLabels: {
      body: {
        noMatch: "Loading..."
      },
    },
    loadingType: 'linear',
    filter:true,
    viewColumns:false,
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 30],
  };

  const selectDatafunction = () =>{
    axios.get(`GreenBookSerialNumber/GetNewEmptyGreenBookSerialRecord`)
    .then(resp => {
      if (resp.status === 200) {
        setSelectData(resp.data);
        console.log("New Record Data\n", resp.data);

        
      // setdataAPI(resp.data)
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
    })
  }



  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };


  const addAPICall = (gbSerialObj) => {
    debugger
    console.log(gbSerialObj);
    axios.post(`GreenBookSerialNumber/AddGreenbookSerialNumber/`, gbSerialObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          selectDatafunction();
          axios.get(`GreenBookSerialNumber/GetgreenBookSerialNumbers/?records=10`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              console.log(error.message);
              console.log(error.config);
            })
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      })
  };


  const editClick = (tableRowArray) => {
    setGBSerialObj({
      id: tableRowArray['greenBookSerialNumber']['id'],
      nBookNo: tableRowArray['greenBookSerialNumber']['nBookNo'],
      sGBID: tableRowArray['greenBookSerialNumber']['sGBID'],
      remarks: tableRowArray['greenBookSerialNumber']['remarks'],
      dtDate: tableRowArray['greenBookSerialNumber']['dtDate'],
      sName: tableRowArray['greenBookSerialNumber']['sName'],
      sCountryID: tableRowArray['greenBookSerialNumber']['sCountryID'],
      nMadebTypeId: tableRowArray['greenBookSerialNumber']['nMadebTypeId'],
      nFormNumber: tableRowArray['greenBookSerialNumber']['nFormNumber'],
      nAuthRegionId: tableRowArray['greenBookSerialNumber']['nAuthRegionId'],
    });
      console.log("Table Array: ", tableRowArray);
      console.log("gbSerialObj: ", gbSerialObj);

      setEditModal(true);
  }

  const editAPICall = (gbSerialObj) => {
    console.log(gbSerialObj);
    debugger
    axios.post(`GreenBookSerialNumber/EditGreenbookSerialNumber/Id=` + gbSerialObj.id, gbSerialObj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          //setResult(true);
          setEditModal(false);
          axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/?records=10`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                //setDataChanged(true);
              }
              else{
                console.log("Response received:\n", resp);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            })
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      })
      
  };  

  useEffect(() => {
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/?records=10`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setdataAPI(resp.data);
          selectDatafunction();
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setLoading(false);
      })
  }, []);

  return (
    <>
      <Grid container spacing={1}>
      <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">GreenBook Serial Number</Typography>
          </Breadcrumbs>
          <MaterialTable 
            style={{padding:'10px',width:'100%', border:'2px solid grey',borderRadius:'10px'}}
            isLoading = {loading}
            icons={tableIcons}
            title="GreenBook Serial Number"
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
            actions={
              [
                {
                  icon: AddBox,
                  tooltip: 'Add GreenBook Serial Number',
                  isFreeAction: true,
                  onClick: () => setAddModal(true)
                },
                {
                  icon: Search,
                  tooltip: 'Show Filter',
                  isFreeAction: true,
                  onClick: (event) => {setFiltering(currentFilter => !currentFilter)}
                }
              ]
            }
          />
            {addModal && <AddDialog
              addModal={addModal}
              selectData={selectData}
              classes={classes}
              handleAddClickClose={handleAddClickClose}
              addAPICall={addAPICall}
            />}
            {editModal && <EditDialog
              editModal={editModal}
              selectData={selectData}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
              gbSerialObj={gbSerialObj}
            />}
            
        </Grid>
      </Grid>
    </>
  );

}