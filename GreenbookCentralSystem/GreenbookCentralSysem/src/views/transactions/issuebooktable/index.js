
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
  Link,
  Paper,
  InputLabel,
  Table
  
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
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmailIcon from '@material-ui/icons/Email';


import { SaveDialog,  EditDialog } from './dialog';
import {Alerts} from '../../alerts';

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
import SaveIcon from '@material-ui/icons/Save';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';


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


    export const IssueBookTable = (props) => {
      const [editModal, setEditModal] = React.useState(false);
      const [saveModal, setSaveModal] = React.useState(false);
      const [selectData, setSelectData] = useState([]);
      const [saveObj, setSaveObj] = useState([]);
      const [editObj, setEditObj] = useState([]);
        const hi = () => {
            console.log(props.gbId)
          };
        

  Moment.locale('en');
  const classes = useStyles();
 // const navigate = useNavigate();

  const [dataAPI, setdataAPI] = useState([]);
  
  const [historyData, setHistoryData] = useState([]);
  const [pendingData, setPendingData] = useState([]);


  //VAR

  const [historyTable, setHistoryTable] = React.useState(false);

  const [id, setId] = React.useState('');
  const [gbId, setGbId] = React.useState(props.gbId);
  const [formNumber, setFormNumber] = React.useState(0);
  const [authority, setAuthority] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
 
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
 
  const [rowsPerPage, setRowsPerPage] = useState(process.env.REACT_APP_ROWS_PER_PAGE);




 //Alert
 const [alertMessage, setAlertMessage] = useState("");
 const [alertType, setAlertType] = useState("");
  const alertObj={
    alertMessage:alertMessage,
    alertType:alertType
  }
  const [snackbar,setSnackbar]=React.useState(false);
  const snackbarOpen = () => {
    console.log('alert');
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const historyGbId = () =>{
    console.log('GBID:'+props.gbId);
   axios.get(`IssueBook/GetIssueBookJoin/GBId=`+props.gbId)
    .then(resp => {
      if (resp.status === 200) {
        setHistoryData(resp.data);
     //   setHistoryTable(true);
       // console.log(resp.data);
       // setdataAPI(resp.data)
       pendingGbId();
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
  const pendingGbId = () =>{
    
   axios.get(`Madeb/GetMadebforIssueBook/GBId=`+props.gbId)
    .then(resp => {
      if (resp.status === 200) {
        setPendingData(resp.data);
        setHistoryTable(true);
        console.log(resp.data);
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
 const saveClick = (row)=>{
  // selectDatafunction();
   setSaveObj(row);
   setSaveModal(true);
 }
 const editClick = (row)=>{
  // selectDatafunction();
   setEditObj(row);
   setEditModal(true);
 }
 const hello = ()=>{
  console.log(selectData);
  console.log(saveObj);
}
const editModalClose =() =>{
  setEditModal(false);
}
const saveModalClose =() =>{
  setSaveModal(false);
}

const saveAPICall = (obj,changeObj) =>{
  setSaveModal(false);
  console.log(obj);
 axios.post(`IssueBook/AddIssueBook`,obj)
  .then(resp => {
    if (resp.status === 200) {
      
          changeIssueTypeAPICall(changeObj);
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

const changeIssueTypeAPICall = (changeObj) =>{


 axios.post(`Madeb/EditMadeb/Id=`+changeObj.id,changeObj)
  .then(resp => {
    if (resp.status === 200) {
      saveModalClose();
       setAlertMessage('Record Successfully Saved');
          setAlertType('success');
          snackbarOpen();
          historyGbId();
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

const editAPICall = (obj) =>{
  
 
 axios.post(`IssueBook/EditIssueBook/Id=`+obj.id,obj)
  .then(resp => {
    if (resp.status === 200) {
      editModalClose();
       setAlertMessage('Record Successfully Edited');
          setAlertType('success');
          snackbarOpen();
          historyGbId();
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
    alert(error.message);
  })
  .then(release => {
    //console.log(release); => udefined
  }); 
  
 
}
  useEffect(() => { 
    setGbId(props.gbId);
    selectDatafunction();
    historyGbId();
   

   
     }, [props.gbId]);

  return (

      <>
     
     {
     

       <Grid container spacing={1}>
        <Grid item xs={12}>
               <br/> 
          {historyTable &&     <>
            {historyData.length!=0 &&
    <Table className="table table-hover table-striped table-bordered">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">SR</th>
                                <th > Book Issued </th>
                                <th > Entered </th>
                                <th > Why </th>
                                <th > Where </th>
                                <th > Form No </th>
                                <th > Issued Yet? </th>    
                                <th > Remark </th> 
                                <th > Edit </th>                           
                            </tr>
                            </thead>
                            <tbody>
                            {historyData.map((row, index) => (
                            <tr>
                                <td scope="row">{index+1}</td>
                               
                                <td scope="row">{row.dtIssuedDate ? Moment(row.dtIssuedDate).format('YYYY-MM-DD') : ''}</td>
                                <td scope="row">{row.dtEntered ? Moment(row.dtEntered).format('YYYY-MM-DD HH:mm:ss') : ''}</td>
                             
                                <td scope="row">{row.sMadebDisplayName}</td>
                                <td scope="row">{row.sAuthRegion}</td>
                                <td scope="row">{row.sFormNumber}</td>
                  
                                <td scope="row">{row.sTypeIssued}</td>
                                <td scope="row">{row.sRemarks}</td>
                                <td scope="row">
                            <IconButton color="primary"  onClick={() => { editClick(row) } } aria-label="upload picture" component="span" style={{padding:'0px'}}>
                                    <EditOutlinedIcon/>
                                  </IconButton>
                                </td>
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> }
              {pendingData.length!=0 &&
                <Table className="table table-hover table-striped table-bordered">
                            <thead className="thead-light">
                            <tr>
                              
                                <th > Issued Date </th>
                                <th > Why </th>
                                <th > Where </th>
                                <th > Form No </th>
                                <th > Issued Yet? </th>    
                             
                                <th > Issue Book </th>                           
                            </tr>
                            </thead>
                            <tbody>
                            {pendingData.map((row1, index) => (
                            <tr>
                             
                                <th scope="row">{row1.dtReceived ? Moment(row1.dtReceived).format('YYYY-MM-DD') : ''}</th>
                               
                             
                                <th scope="row">{row1.sMadebDisplayName}</th>
                                <th scope="row">{row1.sAuthRegion}</th>
                             
                                <th scope="row">{row1.nFormNumber}</th>
                                <th scope="row">{row1.sTypeIssued == null  ?  'On Progress' : row1.sTypeIssued }</th>
                        
                                
                                <th scope="row">
                                  <IconButton color="primary"   onClick={() => { saveClick(row1) }} aria-label="upload picture" component="span" style={{padding:'0px'}}>
                                    <SaveIcon/>
                                  </IconButton>
                                </th>
                                                                    
                            </tr>
                            

                            ))}
                            </tbody>
                            </Table> }
                 </> }
                            
                            {saveModal && <SaveDialog
                              saveModal={saveModal}
                              classes={classes}
                              saveObj={saveObj}
                              selectData={selectData}
                              saveAPICall={saveAPICall}
                              saveModalClose={saveModalClose}
              //addAPICall={addAPICall}
            />}
            {editModal && <EditDialog
              editModal={editModal}
              editObj={editObj}
              selectData={selectData}
              classes={classes}
              editModalClose={editModalClose}
            editAPICall={editAPICall}
            />}
            { snackbar && <Alerts
       alertObj={alertObj}
       snackbar={snackbar}
       snackbarClose={snackbarClose}
       /> }
          
          </Grid>
        </Grid> }
            </>


          
  );
}