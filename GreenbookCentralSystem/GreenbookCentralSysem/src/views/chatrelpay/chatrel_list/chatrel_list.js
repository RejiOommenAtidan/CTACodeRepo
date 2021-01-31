import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Button
} from '@material-ui/core';
import { useHistory, NavLink, useLocation, Link } from 'react-router-dom';

import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
import Moment from 'moment';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

import { Alerts } from '../../alerts';
//import { AddDialog, EditDialog } from './dialog';
import { ViewDialog } from './dialog';

import { oOptions, oTableIcons, sDateFormat, sButtonSize, modifyHeaders, sISODateFormat } from '../../../config/commonConfig';

import AddSingleChatrel from 'views/chatrelhome/addchatrel';

//import MyComp from '../../common/filtercomponent';


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

export default function ChatrelList(){

  const classes = useStyles();
  const history = useHistory();
  
  
  

  const [profileGBID, setProfileGBID] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [isLoading, setisLoading] = React.useState(true);
  const [addModal, setAddModal] = useState(false);

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };
  
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  const viewReceipt = (sReceiptNumber) => {
    console.log("Passing receipt number:", sReceiptNumber);
    //history.push('/ChatrelPay/ChatrelReceipt', {sReceiptNumber: sReceiptNumber});
    history.push({
      pathname: '/Chatrel/ChatrelReceipt',
      state: {
        sReceiptNumber
      },
    });
  };
  const viewGb = (GBID) => {
    console.log(GBID)
    setProfileGBID(GBID);
    setViewModal(true);
  }
  const handleViewClickClose = () => {
    setViewModal(false);
  };
  

  const columns = [
    {
      field: "nSerialNo",
      title: "Sr No.",
      hidden: true,
    },
    {
      field: "dtPayment",
      title: "PAYMENT DATE",
      type: 'date', 
      //render: rowData => rowData['dtPayment'] ? Moment(rowData['dtPayment']).format(sDateFormat) : undefined,
      //dateSetting: 'en-IN',
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtPayment){
          return -1;
        }
        if(!b.dtPayment){
          return 1;
        }
        a = a ? a.dtPayment.split('-').reverse().join('') : '';
        b = b ? b.dtPayment.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "sGBID",
      title: "GREENBOOK ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      render: rowData =>  <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewGb(rowData['sGBID']) }}><span><u>{rowData['sGBID']}</u></span></Button>
    },
    {
      field: "sChatrelReceiptNumber",
      title: "RECEIPT NUMBER",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      // render: rowData => <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewReceipt(rowData['sChatrelReceiptNumber']) }}><span><u>{rowData['sChatrelReceiptNumber']}</u></span></Button>
      render: rowData => 
      <>
        <Link to={{
          pathname: '/Chatrel/ChatrelReceipt',
          search: `?receiptNumber=${rowData['sChatrelReceiptNumber']}`,
          state: {sReceiptNumber: rowData['sChatrelReceiptNumber']},
          }}
          target='_blank'
        >
          <span style={{color: 'blue'}}><u>{rowData['sChatrelReceiptNumber']}</u></span>
        </Link>
      </>

    },
    {
      width: "10%",
      field: "sName",
      title: "NAME",
      headerStyle: {
        width: "10%",
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        width: '10%',
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    {
      field: "sPaidByGBId",
      title: "PAID BY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    {
      field: "sPaymentCurrency",
      title: "CURRENCY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      //hidden: true
    },
    {
      field: "nChatrelAmount",
      title: "CHATREL",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render : rowData => rowData['nChatrelAmount'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelAmount']}` : `$ ${rowData['nChatrelAmount']}` : ''
    },
    {
      field: "nChatrelMeal",
      title: "MEAL",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render : rowData => rowData['nChatrelMeal'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelMeal']}` : `$ ${rowData['nChatrelMeal']}` : ''
    },
    {
      field: "nCurrentChatrelSalaryAmt",
      title: "EMPLOYMENT",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render : rowData => rowData['nCurrentChatrelSalaryAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nCurrentChatrelSalaryAmt']}` : `$ ${rowData['nCurrentChatrelSalaryAmt']}` : ''
    },
    {
      field: "dtCurrentChatrelFrom",
      title: "CHATREL FROM",
      type: 'date',
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtCurrentChatrelFrom'] ? Moment(rowData['dtCurrentChatrelFrom']).format(sDateFormat) : undefined,
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtCurrentChatrelFrom){
          return -1;
        }
        if(!b.dtCurrentChatrelFrom){
          return 1;
        }
        a = a ? a.dtCurrentChatrelFrom.split('-').reverse().join('') : '';
        b = b ? b.dtCurrentChatrelFrom.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "dtCurrentChatrelTo",
      title: "CHATREL TO",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtCurrentChatrelTo'] ? Moment(rowData['dtCurrentChatrelTo']).format(sDateFormat) : undefined,
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtCurrentChatrelTo){
          return -1;
        }
        if(!b.dtCurrentChatrelTo){
          return 1;
        }
        a = a ? a.dtCurrentChatrelTo.split('-').reverse().join('') : '';
        b = b ? b.dtCurrentChatrelTo.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },

    {
      field: "sFinancialYear",
      title: "YEAR",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
    },
    {
      field: "nArrears",
      title: "ARREARS + LATE FEES",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
    },

    {
      field: "dtArrearsFrom",
      title: "ARREARS FROM",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtArrearsFrom'] ? Moment(rowData['dtArrearsFrom']).format(sDateFormat) : undefined,
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtArrearsFrom){
          return -1;
        }
        if(!b.dtArrearsFrom){
          return 1;
        }
        a = a ? a.dtArrearsFrom.split('-').reverse().join('') : '';
        b = b ? b.dtArrearsFrom.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "dtArrearsTo",
      title: "ARREARS TO",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtArrearsTo'] ? Moment(rowData['dtArrearsTo']).format(sDateFormat) : undefined,
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtArrearsTo){
          return -1;
        }
        if(!b.dtArrearsTo){
          return 1;
        }
        a = a ? a.dtArrearsTo.split('-').reverse().join('') : '';
        b = b ? b.dtArrearsTo.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "nChatrelBusinessDonationAmt",
      title: "BUSINESS DONATION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render : rowData => rowData['nChatrelBusinessDonationAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelBusinessDonationAmt']}` : `$ ${rowData['nChatrelBusinessDonationAmt']}`: ''
    },
    {
      field: "nChatrelAdditionalDonationAmt",
      title: "ADDITIONAL DONATION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render : rowData => rowData['nChatrelAdditionalDonationAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelAdditionalDonationAmt']}` : `$ ${rowData['nChatrelAdditionalDonationAmt']}` : ''
    },
    {
      field: "nChatrelTotalAmount",
      title: "TOTAL",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render : rowData => rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelTotalAmount']}` : `$ ${rowData['nChatrelTotalAmount']}`
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    {
      field: "sPaymentMode",
      title: "PAYMENT MODE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        
      },
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    

  ];


  

  useEffect(() => {
    axios.get(`ChatrelPayment/GetAllChatrelPayments`)
    .then(resp => {
      setisLoading(false);
      if (resp.status === 200) {
        console.log("Chatrel List", resp.data);
        var i = 1;
        resp.data.forEach((element) => {
          element.dtPayment = element.dtPayment ? Moment(element.dtPayment).format(sDateFormat) : null;
          element.dtCurrentChatrelFrom = element.dtCurrentChatrelFrom ? Moment(element.dtCurrentChatrelFrom).format(sDateFormat) : null;
          element.dtCurrentChatrelTo = element.dtCurrentChatrelTo ? Moment(element.dtCurrentChatrelTo).format(sDateFormat) : null;
          element.dtArrearsFrom = element.dtArrearsFrom ? Moment(element.dtArrearsFrom).format(sDateFormat) : null;
          element.dtArrearsTo = element.dtArrearsTo ? Moment(element.dtArrearsTo).format(sDateFormat) : null;
          element.nSerialNo = i++;
        });
        setdataAPI(resp.data);
        modifyHeaders();
      
      }
    })
    .catch(error => {
      console.log(error.message);
      setisLoading(false);
    });
    
  },[]);
  
  
  return (
  <>
      <Grid container spacing={1}>
      
        <Grid item xs={12}>
         
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={isLoading}
            icons={tableIcons}
            title="Chatrel Payment List"

            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add a Payment',
                isFreeAction: true,
                onClick: () => setAddModal(true)
              },
              {
                icon: Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
          {/* {editModal && <EditDialog
            editModal={editModal}
            selectData={selectData}
            classes={classes}
            handleEditClickClose={handleEditClickClose}
            editAPICall={editAPICall}
            chatrelObj={chatrelObj}
          />} */}

          {addModal && <AddSingleChatrel
                      addModal={addModal}
                      handleAddClickClose = {handleAddClickClose}
                      ></AddSingleChatrel>}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />}
          {viewModal && <ViewDialog
              viewModal={viewModal}
              classes={classes}
              handleViewClickClose={handleViewClickClose}
              sGBID={profileGBID}
              />}
        </Grid>
      </Grid>
    </>
    );
}