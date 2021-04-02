import React, { forwardRef } from 'react';
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
import Refresh from '@material-ui/icons/Refresh';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import EmailIcon from '@material-ui/icons/Email';
//Local
export const sAPIBASEURL = "http://localhost:52013/api";
//export const sAPIBASEURL = "http://172.28.21.2:9001/api";

//QA
//export const sAPIBASEURL = "https://cta-portal-webapi.azurewebsites.net/api";

//UAT
//export const sAPIBASEURL = "https://cta-portal-webapi-uat.azurewebsites.net/api";

export const sAdminEmail = "tcrcsupport@tibet.net";
export const sSnackbarAddMessage = "Record added successfully";
export const sSnackbarUpdateMessage = "Record updated successfully";
export const sDateFormat = "DD-MM-YYYY";
export const sISODateFormat = "YYYY-MM-DD";
export const sDateFormatMUIDatepicker = "dd-MM-yyyy";
export const sDateFormatChatrel = "dd/MM/yyyy";
export const sDateFormatChatrelMoment = "DD/MM/YYYY";
export const errorText = <span style={{ color: "red" }}>
  This field is required
</span>
export const asterisk = <span style={{ color: 'red' }}> *</span>;
export const aPageSizeArray = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100];
export const nPageSize = 15;
export const oOptions = {
  // loadingType:"linear",
  // searchFieldAlignment:"left",
  // selection:true,
  tableLayout: "auto",
  //padding: "dense",
  //emptyRowsWhenPaging: false,
  draggable: true,
  maxBodyHeight: 750,
  columnsButton: true,
  filtering: true,
  exportButton: {
    csv: true,
    pdf: true,
  },
  exportAllData: true,
  headerStyle: {
    backgroundColor: '#253053',
    color: '#FFFFFF',
    fontSize: '15px',
    padding: '0px',
    margin: '0px',
    border: '1.25px solid lightgrey',
    height: '30px',
    fontWeight: 'bold'
  },
  cellStyle: {
    textAlign: "left",
    padding: '5px',
    border: '1px solid black'

  },
  pageSize: nPageSize,
  pageSizeOptions: aPageSizeArray,
  rowStyle: x => {
    if (x.tableData.id % 2) {
      return { color: "#000000", backgroundColor: "#f2f2f2", padding: '0' }
    }
    else {
      return { color: "#000000", padding: '0' }
    }
  }
};

export const modifyHeaders = () => {

  const headers = document.getElementsByClassName('MuiTableSortLabel-root');
  const arrows = document.getElementsByClassName('MuiTableSortLabel-icon');
  for (var i = 0; i < headers.length; i++) {
    headers[i].style.color = 'white';
    // var color = headers[i].style.color;
    // headers[i].addEventListener('mouseenter', e => {
    //   headers[i].style.color = 'cyan';
    // });
    // headers[i].addEventListener('mouseleave', e => {
    //   headers[i].style.color = 'white';
    // });
  }
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].style.color = 'cyan';
  }
};

export const oTableIcons = {
  Refresh: forwardRef((props, ref) => <Refresh {...props} color={"primary"} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBox {...props} color={"primary"} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} color={"primary"} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} color={"primary"} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} color={"primary"} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} color={"primary"} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} color={"primary"} ref={ref} />),
  Email: forwardRef((props, ref) => <EmailIcon {...props} color={"primary"} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} color={"primary"} ref={ref} />),
  //Filter: forwardRef((props, ref) => <FilterList {...props} color={"primary"} ref={ref} />),
  Filter: forwardRef((props, ref) => <div />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} color={"primary"} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} color={"primary"} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} color={"primary"} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} color={"primary"} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} color={"primary"} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} color={"primary"} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} color={"primary"} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} color={"primary"} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} color={"primary"} ref={ref} />)
};

export const sButtonColor = "primary";

export const sButtonVariant = "contained";

export const sButtonSize = "small";

export const sDDMMYYYYRegex = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/;


export const MadebReportColumns = [
  {
    field: "no",
    title: "Sr. No.",
    
    width: '5%',
    //hidden:true,
   sorting:false,
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },
  {
    field: "sPlaceName",
    title: "REGION/COUNTRY",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.sPlaceName.localeCompare(b.sPlaceName);
    },


    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'left',
      border: '1px solid black'


    },
  },
  {
    field: "madebPending",
    title: "MADEB PENDING",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebPending.toString().localeCompare(b.madebPending.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },
  {
    field: "madebIssued",
    title: "MADEB ISSUED",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebIssued.toString().localeCompare(b.madebIssued.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },
  {
    field: "madebRejected",
    title: "MADEB REJECTED",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebRejected.toString().localeCompare(b.madebRejected.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },
  {
    field: "madebDouble",
    title: "MADEB DOUBLE",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebDouble.toString().localeCompare(b.madebDouble.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },
  {
    field: "madebCancelled",
    title: "MADEB CANCELLED",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebCancelled.toString().localeCompare(b.madebCancelled.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },

  {
    field: "madebClosed",
    title: "MADEB CLOSED/DELETED",
    
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebClosed.toString().localeCompare(b.madebClosed.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },

  {
    field: "madebTotalReceived",
    title: "TOTAL RECEIVED",
    customSort: (a, b) => {
      if (a.sPlaceName==='Total' || b.sPlaceName==='Total') {  
        return 1
      }
      return a.madebTotalReceived.toString().localeCompare(b.madebTotalReceived.toString(), 'en', {numeric: true});
    },
    headerStyle: {
      padding: '5px',

      textAlign: 'center'
    },
    cellStyle: {
      // padding:'0px',
      padding: '5px',

      textAlign: 'center',
      border: '1px solid black'


    },
  },

]
