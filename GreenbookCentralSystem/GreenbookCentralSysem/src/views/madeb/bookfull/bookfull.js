import React, { useEffect, useState } from 'react';
import {  Grid, TextField,  Typography,  Paper,  Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import MaterialTable, { MTableToolbar } from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import { EmailDialog } from '../email';
import { Alerts } from '../../alerts';
import { AddDialog, EditDialog } from './dialog';
import { ViewDialog } from '../../search/dialog';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sISODateFormat, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MyComp from '../../common/filtercomponent';
import { BackdropComponent } from '../../backdrop/index';

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
  },
  expansionHeading: {
    color: '#ffffff'
  },
  expansionPanel: {
    backgroundColor: '#4e5287'
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [emailModal, setEmailModal] = React.useState(false);

  const [id, setId] = React.useState('');
  //const [formNumber, setFormNumber] = React.useState(0);
  //const [receivedDate, setReceivedDate] = React.useState('');
  const [authority, setAuthority] = React.useState(0);
  //const [name, setName] = React.useState('');

  const [nFormNumber, setFormNumber] = React.useState(null);
  const [sAuthRegion, setAuthRegion] = React.useState(null);
  const [authRegions, setAuthRegionsList] = React.useState([]);
  const [dtReceived, setReceivedDate] = React.useState(null);
  const [sName, setName] = React.useState(null);
  const [sGBIDForSearch, setGBIDForSearch] = React.useState(null);
  const [sFathersName, setFathersName] = React.useState(null);

  const [gbId, setGbId] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [currentGBSNo, setCurrentGBSNo] = useState(0);
  const [previousGBSNo, setPreviousGBSNo] = useState(0);
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [rejectDate, setRejectDate] = useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');
  const [bookFullObj, setBookFullObj] = useState({});
  const [emailInObj, setEmailInObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  //const [isLoading, setisLoading] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState(false);


  //View GB
  const [viewModal, setViewModal] = useState(false);

  // For Custom Filter

  const [myarray, setMyArray] = useState([]);
  // const [myElement, setMyElement] = useState(null);
  // const [myValue, setMyValue] = useState({});
  const [currId, setCurrId] = useState('');
  //let ele = null;
  const [searching, setSearching] = useState(false);
  console.log("myarray: ", myarray);

  const buildArray = () => {
    let tmp = []
    if (columns) {
      columns.forEach(col => tmp.push({ id: col.field, val: '' }));
    }
    setMyArray(tmp);
  };

  const updateArray = (newObj) => {
    const newArray = myarray.map(d => {
      if (d.id === newObj.id) {
        return newObj;
      }
      else {
        return d;
      }
    });
    setMyArray(newArray);
  };

  const changeHandler = (e) => {
    updateArray({ id: e.target.id, val: e.target.value });
    //searchColumn(e.target.value, e.target);
    setSearching(true);
    //setMyElement(e.target);
    setCurrId(e.target.id);
    //setVal(e.target.value);
  };

  const handleViewClickClose = () => {
    setViewModal(false);
  };

  const viewGb = (GBID) => {
    console.log(GBID)
    setGbId(GBID);
    setViewModal(true);
  };
  const openRelationGB = (newsGBID) => {
    handleViewClickClose();
    setTimeout(() => viewGb(newsGBID), 0);
  };

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const handleEmailClickClose = (shouldReload) => {
    setEmailModal(false);
    if(shouldReload){
      searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,  sFathersName, sGBIDForSearch);
    }
    
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

  // Filter functions
  //const searchColumn = () => console.log("Hello from searchColumn function.");


  const columns = [
    {
      field: "madeb.id",
      title: "#",
      hidden: true,
      export: false,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      width: "5%",
      field: "madeb.nFormNumber",
      title: "FORM NO.",
       
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     name="FORM NUMBER"
      //     field="madeb.nFormNumber"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"nFormNumber"}
      //   />
    },
    {
      width: "8%",
      field: "madeb.dtFormattedReceived",
      title: "RECEIVED DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'}, 
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
    
      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.madeb.dtFormattedReceived){
          return -1;
        }
        if(!b.madeb.dtFormattedReceived){
          return 1;
        }
        a = a ? a.madeb.dtFormattedReceived.split('-').reverse().join('') : '';
        b = b ? b.madeb.dtFormattedReceived.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
     // render: rowData => rowData['madeb']['dtReceived'] ? Moment(rowData['madeb']['dtReceived']).format(sDateFormat) : undefined,
      // filterComponent: () =>
      //   <MyComp
      //     name="RECEIVED DATE"
      //     field="madeb.dtReceived"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"dtReceived"}
      //   />
    },
    {
      width: "9%",
      field: "sAuthRegion",
      title: "AUTHORITY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     name="AUTHORITY"
      //     field="sAuthRegion"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"sAuthRegion"}
      //   />
    },
    {
      width: "12%",
      field: "madeb.sName",
      title: "FULLNAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     name="NAME"
      //     field="madeb.sName"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.sName"}
      //   />
    },

    {
      width: "9%",
      field: "madeb.sGBID",
      render: rowData => rowData['madeb']['sGBID'] ? <Button className="m-2 btn-transparent btn-link btn-link-first" size={"small"} onClick={() => { viewGb(rowData['madeb']['sGBID']) }}><span>{rowData['madeb']['sGBID']}</span></Button> : '',
      title: "GB ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '3px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.sGBID"
      //     name="GB ID"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.sGBID"}
      //   />
    },

    {
      width: "10%",
      field: "madeb.sFathersName",
      title: "FATHER'S NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.sFathersName"
      //     name="FATHER'S NAME"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.sFathersName"}
      //   />
    },
    {
      width: "6%",
      field: "madeb.nSaneyFormNo",
      title: "SANEY FORM NO",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.nSaneyFormNo"
      //     name="SANEY FORM NO"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.nSaneyFormNo"}
      //   />
    },
    {
      width: "8%",
      field: "madeb.nCurrentGBSno",
      title: "CURRENT GB SR NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
    },
    {
      width: "8%",
      field: "madeb.nPreviousGBSno",
      title: "PREVIOUS GB SR NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
    },
    {
      width: "8%",
      field: "sMadebStatus",
      title: "STATUS",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="sMadebStatus"
      //     name="STATUS"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"sMadebStatus"}
      //   />
    },

   


    {
      width: "10%",
      field: "madeb.dtFormattedIssueAction",
      title: "ISSUE ACTION DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px',
      },
      customSort: (a, b) => {
        
        if(!a.madeb.dtFormattedIssueAction){
          return -1;
        }
        if(!b.madeb.dtFormattedIssueAction){
          return 1;
        }
        a = a ? a.madeb.dtFormattedIssueAction.split('-').reverse().join('') : '';
        b = b ? b.madeb.dtFormattedIssueAction.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.dtIssueAction"
      //     name="ISSUE ACTION DATE"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.dtIssueAction"}
      //   />,
     // render: rowData => rowData['madeb']['dtIssueAction'] ? Moment(rowData['madeb']['dtIssueAction']).format(sDateFormat) : undefined
    },
    {
      width: "8%",
      field: "madeb.dtFormattedReject",
      title: "REJECT DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      customSort: (a, b) => {
        //console.log(a, b);
        if(!a.madeb.dtFormattedReject){
          return -1;
        }
        if(!b.madeb.dtFormattedReject){
          return 1;
        }
        a = a.madeb.dtFormattedReject.split('-').reverse().join('');
        b = b.madeb.dtFormattedReject.split('-').reverse().join('');
        return a.localeCompare(b);
      },
     // render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : undefined,
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.dtReject"
      //     name="REJECT DATE"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.dtReject"}
      //   />
    },
    {
      width: "8%",
      field: "sTypeIssued",
      title: "ISSUE ACTION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="sTypeIssued"
      //     name="ISSUE ACTION"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"sTypeIssued"}
      //   />
    },

   
    {
      width: "8%",
      field: "madeb.dtFormattedReturnEmail",
      title: "RETURN DATE",
      //type: 'date',
      //dateSetting: {locale: 'en-IN'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      customSort: (a, b) => {
        //console.log(a, b);
        if(!a.madeb.dtFormattedReturnEmail){
          return -1;
        }
        if(!b.madeb.dtFormattedReturnEmail){
          return 1;
        }
        a = a.madeb.dtFormattedReturnEmail.split('-').reverse().join('');
        b = b.madeb.dtFormattedReturnEmail.split('-').reverse().join('');
        return a.localeCompare(b);
      },
  //    render: rowData => rowData['madeb']['dtReturnEmail'] ? Moment(rowData['madeb']['dtReturnEmail']).format(sDateFormat) : undefined,
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.dtReturnEmail"
      //     name="RETURN DATE"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.dtReturnEmail"}
      //   />
    },
    
    {
      field: "madeb.dtFormattedEmailSend",
      title: "EMAIL SENT",
      width: "8%",
    // render: rowData => rowData['madeb']['dtReject'] ? Moment(rowData['madeb']['dtReject']).format(sDateFormat) : '',
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
	      border: '1px solid black',
        textAlign: "right",
        padding: '5px'
      },
      customSort: (a, b) => {
        //console.log(a, b);
        if(!a.madeb.dtFormattedEmailSend){
          return -1;
        }
        if(!b.madeb.dtFormattedEmailSend){
          return 1;
        }
        a = a.madeb.dtFormattedEmailSend.split('-').reverse().join('');
        b = b.madeb.dtFormattedEmailSend.split('-').reverse().join('');
        return a.localeCompare(b);
      },
    },
    {
      width: "5%",
      field: "email",
      title: "EMAIL",
      filtering: false,
      sorting: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { emailClick(rowData) }} style={{ padding: '0px' }}
      >
        <EmailIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      width: "5%",
      field: "edit",
      title: "EDIT",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <>{<IconButton color="primary" aria-label="upload picture" component="span" onClick={() => { editClick(rowData) }}  style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>}

      </>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      width: "10%",
      field: "madeb.sMadebStatusRemark",
      title: "STATUS REMARK",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      },
      // filterComponent: () =>
      //   <MyComp
      //     field="madeb.sMadebStatusRemark"
      //     name="STATUS REMARK"
      //     changeHandler={changeHandler}
      //     myarray={myarray}
      //     updateArray={updateArray}
      //     currId={currId}
      //     key={"madeb.sMadebStatusRemark"}
      //   />
    },
    {
      width: "2%",
      field: 'Verified By',
      title: 'VERIFIED BY',
      sorting: false,
      export: true,
      filtering: false,
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      width: "2%",
      field: 'Re-Verified By',
      title: 'RE-VERIFIED BY',
      sorting: false,
      export: true,
      filtering: false,
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
       cellStyle: {
	border: '1px solid black',
        textAlign: "left",
        padding: '5px'
      }
    },
  ];

  useEffect(() => {
    console.log("Searching useEffect. Searching is", searching);

    if (searching) {
      let searchObj = {};
      let shouldSearch = true;
      let value;
      myarray.map(item => {

        // items to ignore
        if (item.id === "madeb.id" || item.id === 'Re-Verified By' || item.id === 'Verified By' || item.id === 'edit' || item.id === 'email') {
          return;
        };
        // date items
        if (item.id.startsWith('madeb.dt')) {
          //console.log("Value in ", item.id, " is", item.val);
          if (item.val) {
            const date = Moment(item.val, 'D-M-YYYY', true);
            if (!date._isValid) {
              shouldSearch = false;
              return;
            }
            else {

              value = Moment(item.val, 'D-M-YYYY').format('YYYY-MM-DD');
              //console.log("date is valid?", date._isValid, value);
            }
          }
        }
        // integer items
        else if (item.id === 'madeb.nCurrentGBSno' || item.id === 'madeb.nFormNumber' || item.id === 'madeb.nPreviousGBSno' || item.id === 'madeb.nSaneyFormNo') {
          value = parseInt(item.val) || null;
        }
        else {
          value = item.val;
        }

        var id = item.id;

        if (item.id.startsWith('madeb')) {
          id = item.id.substring(6);
        }
        searchObj = { ...searchObj, [id]: value };
      });
      console.log("Should search:", shouldSearch);
      console.log("Search Object: Inside useEffect", searchObj);
      if (shouldSearch) {
        setBackdrop(true);
        axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=5`, searchObj)
          .then(resp => {
            if (resp.status === 200) {
              //debugger
              console.log("Got filter Data");
              setdataAPI([...resp.data]);
              setSearching(false);
              setBackdrop(false);
              //setTimeout(() => ele.focus(), 2000);

            }
            if (resp.status === 204) {
              console.log("Got  Empty data set");
              setBackdrop(false);
              setdataAPI([...resp.data]);
              setSearching(false);
            }
          })
          .catch(error => {
            setBackdrop(false);
            console.log(error.message);
            //handleError(error, history);
          })
      }

    }
  }, [myarray]);

  const emailClick = (tableRowArray) => {

    //setId(tableRowArray['madeb']['id']);
    //setFormNumber(tableRowArray['madeb']['nFormNumber']);
    //setName(tableRowArray['madeb']['sName']);

    setEmailInObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      sName: tableRowArray['madeb']['sName'],
      madebName: 'BookFull GreenBook',
      nMadebTypeId: 5
    });

    setEmailModal(true);
  };

  const editClick = (tableRowArray) => {

    // setId(tableRowArray['madeb']['id']);
    // setFormNumber(tableRowArray['madeb']['nFormNumber']);
    // setReceivedDate(tableRowArray['madeb']['dtReceived']);
    // setAuthority(tableRowArray['sAuthRegion']);
    // setName(tableRowArray['madeb']['sName']);
    // setGbId(tableRowArray['madeb']['sGBID']);
    // setFname(tableRowArray['madeb']['sFathersName']);
    // setSaney(tableRowArray['madeb']['nSaneyFormNo']);
    // setCurrentGBSNo(tableRowArray['madeb']['nCurrentGBSNo']);
    // setPreviousGBSNo(tableRowArray['madeb']['nPreviousGBSNo']);
    // setIssueActionDate(tableRowArray['madeb']['dtIssueAction']);
    // setIssueAction(tableRowArray['madeb']['nIssuedOrNotID']);
    // setRejectDate(tableRowArray['madeb']['dtReject']);
    // setReturnDate(tableRowArray['madeb']['dtReturnEmail']);

    setBookFullObj({
      id: tableRowArray['madeb']['id'],
      nFormNumber: tableRowArray['madeb']['nFormNumber'],
      dtReceived: tableRowArray['madeb']['dtReceived'],
      nAuthRegionID: tableRowArray['madeb']['nAuthRegionID'],
      sName: tableRowArray['madeb']['sName'],
      sGBID: tableRowArray['madeb']['sGBID'],
      sFathersName: tableRowArray['madeb']['sFathersName'],
      nSaneyFormNo: tableRowArray['madeb']['nSaneyFormNo'],
      nCurrentGBSno: tableRowArray['madeb']['nCurrentGBSno'],
      nPreviousGBSno: tableRowArray['madeb']['nPreviousGBSno'],
      dtIssueAction: tableRowArray['madeb']['dtIssueAction'],
      nIssuedOrNotID: tableRowArray['madeb']['nIssuedOrNotID'],
      dtReject: tableRowArray['madeb']['dtReject'],
      dtReturnEmail: tableRowArray['madeb']['dtReturnEmail'],
      dtEmailSend: tableRowArray['madeb']['dtEmailSend'],
      nMadebStatusID: tableRowArray['madeb']['nMadebStatusID'],
      sMadebStatusRemark: tableRowArray['madeb']['sMadebStatusRemark']
    });
    //console.log(tableRowArray);
    setEditModal(true);
  };

  const editAPICall = (madeb) => {
    madeb.dtReject = madeb.dtReject === "" ? null : madeb.dtReject;
    madeb.dtReceived = madeb.dtReceived === "" ? null : madeb.dtReceived;
    madeb.dtIssueAction = madeb.dtIssueAction === "" ? null : madeb.dtIssueAction;
    madeb.dtReturnEmail = madeb.dtReturnEmail === "" ? null : madeb.dtReturnEmail;
    setBackdrop(true);
    axios.post(`Madeb/EditMadeb/Id=` + madeb.id, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=5`)
          //   .then(resp => {
          //     if (resp.status === 200) {
          //       resp.data.forEach((element) => {
          //         element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          //         element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          //         element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
          //       })
          //       setdataAPI(resp.data);
          //       selectDatafunction();
          //     }
          //   })
          //   .catch(error => {
          //     setBackdrop(false);
          //     console.log(error.config);
          //     console.log(error.message);
          //   })
          //loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch );
        }
      })
      .catch(error => {
        console.log("Error", error.message);
        setAlertMessage(`Error editing record`);
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
      })
  };

  const selectDatafunction = () => {
    setBackdrop(true);
    axios.get(`Madeb/GetNewEmptyMadeb/?nMadebTypeId=5`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
          setAuthRegionsList(resp.data.authRegions);
          setBackdrop(false);
        }
      })
      .catch(error => {
        setBackdrop(false);
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
    setBackdrop(true);
    axios.post(`Madeb/AddMadeb/`, madeb)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          setAlertMessage('Created new record successfully.');
          setAlertType('success');
          snackbarOpen();
          // axios.get(`MadebAuthRegionVM/GetMadebsByType/MadebType=5`)
          //   .then(resp => {
          //     if (resp.status === 200) {
          //       resp.data.forEach((element) => {
          //         element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          //         element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          //         element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          //         element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
          //       })
          //       setdataAPI(resp.data);
          //       selectDatafunction();
          //     }
          //   })
          //   .catch(error => {
          //     setBackdrop(false);
          //     console.log(error.message);
          //     console.log(error.config);
          //   })
          //loadData();
          searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch );
        }
      })
      .catch(error => {
        console.log(error.message);
        setAlertMessage(`Error adding record`);
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
      })
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const tableRef = React.useRef();

  const loadData = () => {
    setBackdrop(true);
    let text = tableRef.current.dataManager.searchText;
    axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${text}&madebType=5`)
    .then(resp => {
      if (resp.status === 200) {
        resp.data.forEach((element) => {
          element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
        })
        setdataAPI(resp.data);
        setBackdrop(false);
        modifyHeaders();
        selectDatafunction();
      }
    })
    .catch(error => {
      setBackdrop(false);
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
    //buildArray();
    loadData();    
  }, []);

  // useEffect(() => {
  //   const bar = document.getElementById("searchbar").getElementsByTagName('input');
  //   if(bar){
  //     bar[0].focus();
  //   };
  // }, [dataAPI]);
  const searchFunction = (form, date, region, name, fname, sgbid) => {
    const searchObj = {
      nFormNumber: form ? form : null,
      dtReceived: date ? date : null,
      sAuthRegion: region ? region : null,
      sName: name ? name : null,
      sGBID: sgbid ? sgbid : null,
      sFathersName: fname ? fname : null
    }
    console.log("Search Object", searchObj);
    //setBackdrop(true);
    axios.post(`/MadebAuthRegionVM/ColumnSearchMadeb/madebType=5`, searchObj)
    .then(resp => {
      if(resp.status === 200){
        console.log("Search result", resp.data);
        resp.data.forEach((element) => {
          element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
          element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
          element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
          element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
          element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
        });
        setdataAPI(resp.data);
        modifyHeaders();
        selectDatafunction();
        setBackdrop(false);
      }
      if(resp.status === 204){
        setBackdrop(false);
        console.log("Got 204, Empty result");
        setdataAPI([]);
        setAlertMessage("No Data Found...");
        setAlertType('info');
        snackbarOpen();
      }
    })
    .catch(error =>{
      setBackdrop(false);
      // setAlertMessage("Error in searching...");
      // setAlertType('error');
      // snackbarOpen();
    });
  };

  return (
    <>
    <Paper style={{borderRadius: '10px'}}>
        <Grid container spacing={1} alignContent='flex-start' style={{paddingLeft: '40px',paddingRight: '40px'}} >


        

          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField label={'Form No'}
            fullWidth
             onChange={(e) => {
            if(e.target.value){
              setFormNumber(parseInt(e.target.value)); 
              searchFunction(parseInt(e.target.value), dtReceived, sAuthRegion, sName, sFathersName, sGBIDForSearch);
            }
            if(e.target.value === ''){
              setFormNumber(null);
              searchFunction(null, dtReceived, sAuthRegion, sName, sFathersName,sGBIDForSearch);
            }
            
          }

          } />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
              label={'Full Name'} 
              fullWidth
              onChange={(e) => {
                if(e.target.value){
                  setName(e.target.value); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, e.target.value,sFathersName, sGBIDForSearch); 
                }
                if(e.target.value === ''){
                  setName(null); 
                  searchFunction(nFormNumber, dtReceived, sAuthRegion, null,sFathersName, sGBIDForSearch); 
                }
                }} 
            />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <Autocomplete
              openOnFocus
              fullWidth
              clearOnEscape
              autoComplete={true}
              autoHighlight={true}
              onChange={
                (e, value) => {
                  if (value !== null) {
                    setAuthRegion(value.sAuthRegion);
                    searchFunction(nFormNumber, dtReceived, value.sAuthRegion, sName, sFathersName, sGBIDForSearch);
                  }
                  else {
                    setAuthRegion(null);
                    searchFunction(nFormNumber, dtReceived, null, sName,sFathersName,  sGBIDForSearch);
                  }
                }
              }
              //style={{ width: 180 }}
              //value={valueAuthRegion}
              id="id_nAuthorityId"
              options={authRegions}
              getOptionLabel={(option) => option.sAuthRegion}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{option.sAuthRegion}</span>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Authority Region"
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'off', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            {/* <TextField
              label={'Authority '}
              onChange={(e) => {
                setAuthRegion(e.target.value);
                searchFunction(nFormNumber, dtReceived, e.target.value, sName, sFathersName);
              }}
            /> */}
          </Grid>

         
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
            label={"Father's Name"} 
            fullWidth
            onChange={(e) => {
              if(e.target.value){
                setFathersName(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, e.target.value, sGBIDForSearch);
              }
              
              if(e.target.value === ''){
                setFathersName(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName, null, sGBIDForSearch); 
              }
               }}
            />
          </Grid>
          <Grid item xs={2} lg={2} style={{paddingTop: '9px'}}>
            <TextField 
            label={"Green Book ID"} 
            fullWidth
            onChange={(e) => {
              if(e.target.value){
                setGBIDForSearch(e.target.value); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, e.target.value);
              }
              
              if(e.target.value === ''){
                setGBIDForSearch(null); 
                searchFunction(nFormNumber, dtReceived, sAuthRegion, sName,sFathersName, null); 
              }
               }}
            />
          </Grid>
          <Grid item xs={2} lg={2} >
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    placeholder="DD-MM-YYYY"
                    variant="dialog"
                    fullWidth
                    margin="dense"
                    id="dtReceived"
                    name="dtReceived"
                    autoOk
                    label='Received Date'
                    format={sDateFormatMUIDatepicker}
                    returnMoment={true}
                    onChange={(date) => {
                      console.log("Date object", date);
                      if (Moment(date, true).isValid()) {
                        console.log("Valid Date", date);
                        setReceivedDate(Moment(date, true).format(sISODateFormat));
                        searchFunction(nFormNumber, Moment(date, true).format(sISODateFormat), sAuthRegion, sName, sFathersName, sGBIDForSearch);
                      }
                      if(date === null){
                        console.log("Empty Date", date);
                        setReceivedDate(null);
                        searchFunction(nFormNumber, null, sAuthRegion, sName, sFathersName, sGBIDForSearch);    
                      }
                      // if (date) {
                      //   setStartDate(date);
                      //   setValue('startDate', date, { shouldValidate: true });
                      // };
                    }}
                    value={dtReceived}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    
                    // fullWidth
                    //className={classes.dateField}
                    // inputRef={register({
                    //   required: true,
                    //   pattern:
                    //   {
                    //     value: new RegExp(sDDMMYYYYRegex),
                    //     message: "Invalid Date"
                    //   }
                    // })}
                  />
                </MuiPickersUtilsProvider>
              
              
              {/* <TextField
                label={'Received Date'}
                onChange={(e) => {
                  if (Moment(e.target.value, 'DD-MM-YYYY', true).isValid()) {
                    console.log("Valid Date", e.target.value);
                    setReceivedDate(Moment(e.target.value, 'DD-MM-YYYY', true).format(sISODateFormat));
                    searchFunction(nFormNumber, Moment(e.target.value, 'DD-MM-YYYY', true).format(sISODateFormat), sAuthRegion, sName, sFathersName);
                  }
                  if (e.target.value === '') {
                    searchFunction(nFormNumber, null, sAuthRegion, sName, sFathersName);
                  }
  
                }}
              /> */}
            </Grid>
        </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable 
          style={{ 
            padding: '10px', 
            width: '100%', 
            boxShadow: 'none',
            fontSize:'1rem',
            color:'#000000',
            fontWeight:'bold' }}
            //isLoading={isLoading}
            tableRef={tableRef}
            icons={oTableIcons}
            title="Book Full Madeb"
            columns={columns}
            data={dataAPI}
            options={{ 
              ...oOptions, 
              //tableLayout: "fixed",
              exportFileName: 'Book Full Madeb',
              search: false
             }}
            //  components={{
            //   Toolbar: props => (<div id='searchbar'><MTableToolbar
            //               {...props}
            //               onSearchChanged={searchText => {
            //               console.log(searchText);
            //               axios.get(`/MadebAuthRegionVM/SearchMadebsAlternate?parameter=${searchText}&madebType=5`)
            //               .then(resp => {
            //                 setBackdrop(false);
            //                 if(resp.status === 200){
            //                   console.log("Search result", resp.data);
            //                   resp.data.forEach((element) => {
            //                     element.madeb.dtFormattedReceived = element.madeb.dtReceived ? Moment(element.madeb.dtReceived).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedIssueAction = element.madeb.dtIssueAction ? Moment(element.madeb.dtIssueAction).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedReturnEmail = element.madeb.dtReturnEmail ? Moment(element.madeb.dtReturnEmail).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedReject = element.madeb.dtReject ? Moment(element.madeb.dtReject).format(sDateFormat) : null;
            //                     element.madeb.dtFormattedEmailSend = element.madeb.dtEmailSend ? Moment(element.madeb.dtEmailSend).format(sDateFormat) : null;
            //                   });
            //                   setdataAPI(resp.data);
            //                 }
            //                 if(resp.status === 204){
            //                   console.log("Got 204, Empty result");
            //                   setdataAPI([]);
            //                 }
            //               })
            //               .catch(error =>{
            //                 setBackdrop(false);
            //                 setAlertMessage("Error in searching...");
            //                 setAlertType('error');
            //                 snackbarOpen();
            //               });
            //               //commonSearch(searchText);
            //               //props.onSearchChanged(searchText);
            //               }}
            //           /></div>)
            // }}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Book Full Madeb',
                isFreeAction: true,
                onClick: () => setAddModal(true)
              },
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
          {viewModal && <ViewDialog
            viewModal={viewModal}
            classes={classes}
            handleViewClickClose={handleViewClickClose}
            sGBID={gbId}
            openRelationGB={openRelationGB}
          />}
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
            bookFullObj={bookFullObj}
          />}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
          {emailModal && <EmailDialog
            emailModal={emailModal}
            emailInObj={emailInObj}
            //selectData={selectData}
            classes={classes}
            handleEmailClickClose={handleEmailClickClose}
          //emailAPICall={emailAPICall}
          />}
          {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
        </Grid>
      </Grid>
      </Paper>
    </>
  );
}