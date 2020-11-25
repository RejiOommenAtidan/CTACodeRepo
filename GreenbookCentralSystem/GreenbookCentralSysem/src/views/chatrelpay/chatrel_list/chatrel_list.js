import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button
} from '@material-ui/core';
import {useHistory, NavLink} from 'react-router-dom';

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
//import { ViewDialog } from '../../search/dialog';
import { oOptions, oTableIcons, sDateFormat } from '../../../config/commonConfig';
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


  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [isLoading, setisLoading] = React.useState(true);

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
  
  const handleEditClickClose = () => {
    setEditModal(false);
  };

  const columns = [
    {
      field: "id",
      title: "Sr No.",
      hidden: true,
    },
    {
      field: "dtPayment",
      title: "Date",
      cellStyle: {
        padding: '5px'
      },
      render: rowData => rowData['dtPayment'] ? Moment(rowData['dtPayment']).format(sDateFormat) : undefined,
    },
    {
      field: "sGBId",
      title: "GreenBook Id",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPaidByGBId",
      title: "Paid By",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelYear",
      title: "Year",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPaymentCurrency",
      title: "Currency",
      cellStyle: {
        padding: '5px'
      },
      hidden: true
    },
    {
      field: "nChatrelTotalAmount",
      title: "Chatrel Amount",
      cellStyle: {
        padding: '5px'
      },
      render : rowData => rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelTotalAmount']}` : `$ ${rowData['nChatrelTotalAmount']}`
    },
    {
      field: "sChatrelReceiptNumber",
      title: "Receipt Number",
      cellStyle: {
        padding: '5px'
      },
    },
    
    {
      field: "sPaymentStatus",
      title: "Payment Status",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPaymentMode",
      title: "Payment Mode",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPayPal_ID",
      title: "PayPal ID",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPayPal_Status",
      title: "PayPal Status",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPayPal_Currency_Code",
      title: "PayPal Currency",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPayPal_Currency_Value",
      title: "PayPal Amount",
      cellStyle: {
        padding: '5px'
      },
    },
    
    
    

  ];


  useEffect(() => {
    axios.get(`ChatrelPayment/GetAllChatrelPayments`)
    .then(resp => {
      if (resp.status === 200) {
        console.log("Chatrel List", resp.data);
        setdataAPI(resp.data);
        
        setisLoading(false);
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
                onClick: () => history.push('/ChatrelPay')
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
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />}
        </Grid>
      </Grid>
    </>
    );
}