import React, { useEffect, useState } from 'react';
import {Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import theme from '../../../theme/theme/theme'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Moment from 'moment';
import MaterialTable, { MTableToolbar }  from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom';
import { Alerts } from '../../alerts';
import handleError from "../../../auth/_helpers/handleError";
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmailIcon from '@material-ui/icons/Email';
import { AddDialog } from './dialog';

const tableIcons = oTableIcons;

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
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectData, setSelectData] = useState([]);
  const [filtering, setFiltering] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [gbSerialObj, setGBSerialObj] = useState({});
  oOptions.filtering = filtering;


  let history = useHistory();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }

  const columns =[

    {
      field: "id",
      title: "Sr No.",
      hidden:true,
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "nFormNumber",
      title: "Form Number",
      filterPlaceholder: "Search...",
      cellStyle: {
        padding:'5px',
      },
    },
    
    {
      field: "sGBID",
      title: "GB Id",
      cellStyle: {
        padding:'5px',
      },
    },
    {
      field: "dtReceived",
      title: "Received on",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      cellStyle: {
        padding:'5px',
      },
      render: rowData => rowData['dtReceived'] ? Moment(rowData['dtReceived']).format('YYYY-MM-DD') : undefined
    },
    { 
      field: "sName",
      title: "Name",
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
      field: "sAuthRegion",
      title: "Authority Region",
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
                             addClick(rowData) 
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


  const addClick = (tableRowArray) => {
    setGBSerialObj({
      id: tableRowArray['id'],
      nFormNumber: tableRowArray['nFormNumber'],
      sGBID: tableRowArray['sGBID'],
      dtReceived: tableRowArray['dtReceived'],
      sName: tableRowArray['sName'],
      sMadebType: tableRowArray['sMadebType'],
      sAuthRegion: tableRowArray['sAuthRegion'],
      
    });
      console.log("Table Array: ", tableRowArray);
      console.log("gbSerialObj: ", gbSerialObj);

      setAddModal(true);
  }


  const addAPICall = (gbSerialObj) => {
    debugger
    setLoading(true);
    console.log(gbSerialObj);
    axios.post(`GreenBookSerialNumber/AddGreenbookSerialNumber/`, gbSerialObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setAddModal(false);
          axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumberAssignList`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data)
                selectDatafunction();
                setLoading(false);
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
  };

  const handleAddClickClose = () => {
    setAddModal(false);
  };



  useEffect(() => {
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumberAssignList`)
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
            options={oOptions}
            actions={
              [
                
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
              gbSerialObj = {gbSerialObj}
              handleAddClickClose={handleAddClickClose}
              addAPICall={addAPICall}
            />}
            {/*{editModal && <EditDialog
              editModal={editModal}
              selectData={selectData}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
              gbSerialObj={gbSerialObj}
            />} */}
            
        </Grid>
      </Grid>
    </>


  );
}