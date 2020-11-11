import React, { useEffect, useState } from 'react';
import {Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link, Card, Table, Paper,CircularProgress,
  Dialog,DialogContent,DialogContentText


} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { red } from '@material-ui/core/colors';
import {InputParams} from './inputparams';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PrintIcon from '@material-ui/icons/Print';
import DoneAllIcon from '@material-ui/icons/DoneAll';
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
import { oOptions, oTableIcons } from '../../config/commonConfig';




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
    marginBottom: theme.spacing(1),
    width: '100%'
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
  oOptions.filtering = filtering;
  //validations
  const { register, handleSubmit, watch, errors } = useForm();
  
  // for dropdowns
  const [selectData, setSelectData] = useState({});
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [makeTable, setMakeTable] = useState(false);
  const [serialNo, setSerialNo] = useState(1);
  const [filtering, setFiltering] = React.useState(false);
  const [makeListParams, setMakeListParams] = useState({});


  const columns = [
    {
      field: "nSerialNo",
      title: "Sr No.",
      headerStyle: {
        padding:'0px',
        width:'4%',
        textAlign:'right'
      },
      cellStyle: {
       // padding:'0px',
        padding:'10px',
        width:'4%',
        textAlign:'center'
      }
    },
    {
      field: "sName",
      title: "Name",
      headerStyle: {
        padding:'0px',
        width:'10%',
        textAlign:'center'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'10%',
        textAlign:'left'
        
      },
    },
    {
      field: "sFathersName",
      title: "Father's Name",
      headerStyle: {
        padding:'0px',
        width:'10%',
        textAlign:'center'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'10%',
        textAlign:'left'
        
      },
    },
    {
      field: "sCity",
      title: "City",
      headerStyle: {
        padding:'0px',
        width:'9%',
        textAlign:'left'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'9%',
        textAlign:'left'
        
      },
    },
    {
      field: "sOldGreenBkNo",
      title: "Old Book No",
      headerStyle: {
        padding:'0px',
        width:'15%',
        textAlign:'left'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'15%',
        textAlign:'left'
        
      },
    },
    {
      field: "sGBID",
      title: "New GB No.",
      headerStyle: {
        padding:'0px',
        width:'9%',
        textAlign:'left'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'7%',
        textAlign:'left'
        
      },
    },
    {
      field: "signature",
      title: "Signature",
      headerStyle: {
        padding:'0px',
        width:'5%',
        textAlign:'left'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'9%',
        textAlign:'left'
        
      },
    },
    {
      field: "sAddress1",
      title: "Address",
      headerStyle: {
        padding:'0px',
        width:'15%',
        textAlign:'left'
      },
      cellStyle: {
        padding:'0px',
        paddingLeft:'10px',
        width:'15%',
        textAlign:'left',
        height:'50px'
        
      },
    }
  ];

  function setPrinted(){
    console.log("Set Printed called.");
    axios.post(`MakeList/SetPrinted`, makeListParams)
    .then(resp => {
      if(resp.status === 200){
        console.log("Printed marked. ", resp.data);
        setdataAPI([]);
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
    });
  }

  const makeList = (makeListParams) => {
    setLoading(true);
    console.log("Make List Params recd. \n", makeListParams);
    axios.post(`MakeList/MakeList`, makeListParams)
    .then(resp => {
      if(resp.status === 200){
        let i = 1;
        resp.data.forEach((element) => {
          element.nSerialNo = i;
          i++;
        })
        setdataAPI(resp.data);
        if(!makeListParams.bPrinted){
          setMakeTable(true);
        }
        else {
          setMakeTable(false);
        }
        setLoading(false);
        setMakeListParams(makeListParams);
        console.log("After adding serial number", dataAPI);
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
      setLoading(false);
    });
  }
 
 

  useEffect(() => {
    //debugger
    axios.get(`Madeb/GetNewEmptyMadeb`)
    .then(resp => {
      if (resp.status === 200) {
        setSelectData(resp.data);
        console.log("Got List of AuthRegions & MadebTypes\n", resp.data);
        setDataReady(true);
        
      // setdataAPI(resp.data)
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
    })

    
  }, []);

  return (
    <div>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Make List</Typography>
          </Breadcrumbs>
      <br />
      <Paper style={{padding:'15px',paddingTop:'20px'}}>
  
      { dataReady && (<InputParams 
        selectData = {selectData}
        classes = {classes}
        makeList = {makeList}
      />)}
      <br />
      
      { dataAPI.length !=0 &&
      
        <MaterialTable 
        style={{padding:'10px',width:'100%', border:'2px solid grey',borderRadius:'10px'}}
        isLoading = {loading}
        icons={tableIcons}
        title="Make List"
        columns={columns}
        data={dataAPI}        
        options={{
          //filtering,
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
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              {makeTable && (<div>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.button}
                startIcon={<DoneAllIcon />}
                onClick = {() => {
                  setPrinted();
                }}
              >
              Set Printed
              </Button> </div>)}
            </div>
          ),
        }}
        options={oOptions}
        actions={
          [
            
            // {
            //   icon: Search,
            //   tooltip: 'Show Filter',
            //   isFreeAction: true,
            //   onClick: (event) => {setFiltering(currentFilter => !currentFilter)}
            // },
            // {
            //   icon: PrintIcon,
            //   iconProps: {fontSize: 'large', color: 'primary'},
            //   tooltip: 'Mark Printed',
            //   isFreeAction: true,
            //   onClick:((event, data) => {
            //     setPrinted();
            //   })
            // }
          ]
        }
      />
        }
      </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={12} style={{justifyContent: 'center', display: 'flex' }}>
          <FormControl style={{justifyContent: 'center'}}>
            <Button type="button" color="primary" style={{fontSize: '1em'}}>Set Printed</Button>
          </FormControl>
        </Grid> */}
      </Grid>
    </div>
  );

}