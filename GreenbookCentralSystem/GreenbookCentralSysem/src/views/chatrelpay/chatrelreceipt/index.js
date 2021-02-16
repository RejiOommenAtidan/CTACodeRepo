import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button
} from '@material-ui/core';
import {useHistory, NavLink, useLocation} from 'react-router-dom';

import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
import Moment from 'moment';
import MaterialTable, { MTableToolbar } from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

import { Alerts } from '../../alerts';
//import { AddDialog, EditDialog } from './dialog';
//import { ViewDialog } from '../../search/dialog';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders } from '../../../config/commonConfig';
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

export default function ChatrelReceipt(props){
  const location = useLocation();
  //console.log("Props contains:", props);
  ////console.log("location contains:", location.state);
  //console.log("location object", location);
  const search = location.search;
  const sReceiptNumber = search.substr(search.indexOf('=')+1);
  //console.log("Receipt Number", sReceiptNumber);
  const classes = useStyles();
  const history = useHistory();
  

  const [dataAPI, setdataAPI] = useState([]);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [isLoading, setisLoading] = React.useState(true);

  const [dtPymtDate, setPymntDate] = useState();
  const [sGBID, setGBID ] = useState();
  const [sGBIDPaidBy, setGBIDPaidBy] = useState();
  const [nReceiptTotal, setReceiptTotal] = useState();
  const [sPaymentCurrency, setPaymentCurrency] = useState();
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

  const columns = [
    {
      field: "id",
      title: "SR NO.",
      hidden: true,
    },
    // {
    //   field: "dtPayment",
    //   title: "Payment Date",
    //   cellStyle: {
    //     padding: '5px',
    //     textAlign: "right",
    //     borderRight: '1px solid grey'
    //   },
    //   render: rowData => rowData['dtPayment'] ? Moment(rowData['dtPayment']).format(sDateFormat) : undefined,
    // },
    // {
    //   field: "sGBID",
    //   title: "GreenBook Id",
    //   cellStyle: {
    //     padding: '5px',
    //     borderRight: '1px solid grey'
    //   },
    // },
    // {
    //   field: "sChatrelReceiptNumber",
    //   title: "Receipt Number",
    //   cellStyle: {
    //     padding: '5px',
    //     borderRight: '1px solid grey'
    //   },
    // },
    {
      field: "sFinancialYear",
      title: "YEAR",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    // {
    //   field: "sPaidByGBId",
    //   title: "Paid By",
    //   cellStyle: {
    //     padding: '5px',
    //     borderRight: '1px solid grey'
    //   },
    // },
    
    {
      field: "sPaymentCurrency",
      title: "CURRENCY",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      //hidden: true
    },
    {
      field: "nChatrelAmount",
      title: "CHATREL",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['nChatrelAmount'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelAmount']}` : `$ ${rowData['nChatrelAmount']}` : ''
    },
    {
      field: "nChatrelMeal",
      title: "MEAL",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['nChatrelMeal'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelMeal']}` : `$ ${rowData['nChatrelMeal']}` : ''
    },
    {
      field: "nCurrentChatrelSalaryAmt",
      title: "EMPLOYMENT",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['nCurrentChatrelSalaryAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nCurrentChatrelSalaryAmt']}` : `$ ${rowData['nCurrentChatrelSalaryAmt']}` : ''
    },
    {
      field: "nChatrelLateFeesValue",
      title: "LATE FEES",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['nChatrelLateFeesValue'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelLateFeesValue']}` : `$ ${rowData['nChatrelLateFeesValue']}` : ''
    },
    // {
    //   field: "dtCurrentChatrelFrom",
    //   title: "Chatrel From",
    //   cellStyle: {
    //     padding: '5px',
    //     textAlign: "right",
    //     borderRight: '1px solid grey'
    //   },
    //   render: rowData => rowData['dtCurrentChatrelFrom'] ? Moment(rowData['dtCurrentChatrelFrom']).format(sDateFormat) : undefined,
    // },
    // {
    //   field: "dtCurrentChatrelTo",
    //   title: "Chatrel To",
    //   cellStyle: {
    //     padding: '5px',
    //     textAlign: "right",
    //     borderRight: '1px solid grey'
    //   },
    //   render: rowData => rowData['dtCurrentChatrelTo'] ? Moment(rowData['dtCurrentChatrelTo']).format(sDateFormat) : undefined,
    // },

    {
      field: "nArrears",
      title: "ARREARS + LATEFEES",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
    },

    {
      field: "dtArrearsFrom",
      title: "ARREARS FROM",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtArrearsFrom'] ? Moment(rowData['dtArrearsFrom']).format(sDateFormat) : undefined,
    },
    {
      field: "dtArrearsTo",
      title: "ARREARS TO",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtArrearsTo'] ? Moment(rowData['dtArrearsTo']).format(sDateFormat) : undefined,
    },
    {
      field: "nChatrelBusinessDonationAmt",
      title: "BUSINESS DONATION",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['nChatrelBusinessDonationAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelBusinessDonationAmt']}` : `$ ${rowData['nChatrelBusinessDonationAmt']}`: ''
    },
    {
      field: "nChatrelAdditionalDonationAmt",
      title: "ADDITIONAL DONATION",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['nChatrelAdditionalDonationAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelAdditionalDonationAmt']}` : `$ ${rowData['nChatrelAdditionalDonationAmt']}` : ''
    },
    {
      field: "nChatrelTotalAmount",
      title: "TOTAL",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render : rowData => rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelTotalAmount']}` : `$ ${rowData['nChatrelTotalAmount']}`
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    {
      field: "sPaymentMode",
      title: "PAYMENT MODE",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    
    

  ];
  useEffect(() => {
    axios.get(`ChatrelPayment/GetPaymentBreakup/${props.location.search}`)
    .then(resp => {
      setisLoading(false);
      if (resp.status === 200) {
        //console.log("Payment Breakup", resp.data);
        resp.data.forEach((element) => {
        element.dtArrearsFrom = element.dtArrearsFrom ? Moment(element.dtArrearsFrom).format(sDateFormat) : null;
          element.dtArrearsTo = element.dtArrearsTo ? Moment(element.dtArrearsTo).format(sDateFormat) : null;
        });
        setdataAPI(resp.data);
        setPymntDate(resp.data[0].dtPayment);
        setGBID(resp.data[0].sGBID);
        setGBIDPaidBy(resp.data[0].sPaidByGBId);
        setReceiptTotal(resp.data[0].nReceiptTotal);
        setPaymentCurrency(resp.data[0].sPaymentCurrency === 'INR' ? '₹' : '$');
        modifyHeaders();
      }
    })
    .catch(error => {
      //console.log(error.message);
      setisLoading(false);
    });
    
  },[]);
  
  return (
    <>
    <Grid container spacing={1}>
        
         {/* {dataAPI && 
            <>
              <Grid item xs={4}>Receipt Number: {sReceiptNumber}</Grid> 
              
              <Grid item xs={4}>Greenbook ID: {sGBID}</Grid>
              <Grid item xs={4}>Total: {nReceiptTotal}</Grid>
            
              <Grid item xs={4}>Payment Date: {Moment(dtPymtDate).format(sDateFormat)}</Grid>
              <Grid item xs={4}>Paid By: {sGBIDPaidBy}</Grid>
              
            </>
         } */}
         <Grid item xs={12}>
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={isLoading}
            icons={tableIcons}
            // title= {(<>
            // <Grid container spacing={1}>
            //   <Grid item xs={4}>Receipt Number: {sReceiptNumber}</Grid> 
              
            //   <Grid item xs={4}>Greenbook ID: {sGBID}</Grid>
            //   <Grid item xs={4}>Total: {`${sPaymentCurrency}${nReceiptTotal}`}</Grid>
            
            //   <Grid item xs={4}>Payment Date: {Moment(dtPymtDate).format(sDateFormat)}</Grid>
            //   <Grid item xs={4}>Paid By: {sGBIDPaidBy}</Grid>
            // </Grid>
            // </>)}
            title='Chatrel Receipt'
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{padding: '0px 10px'}}></div>
                  <Grid container style={{maxWidth: '700px'}} spacing={1}>
                    <Grid item xs={4} lg={4}><b>Receipt Number: {sReceiptNumber}</b></Grid> 
              
                    <Grid item xs={4} lg={4}><b>Greenbook ID: {sGBID}</b></Grid>
                    <Grid item xs={4} lg={4}><b>Total: {`${sPaymentCurrency}${nReceiptTotal}`}</b></Grid>
                  
                    <Grid item xs={4} lg={4}><b>Payment Date: {Moment(dtPymtDate).format(sDateFormat)}</b></Grid>
                    <Grid item xs={4} lg={4}><b>Paid By: {sGBIDPaidBy}</b></Grid>
                  </Grid>
                </div>
              ),
            }}
            // title={'Receipt Number: '+ sReceiptNumber +' \t\t\t\t Greenbook ID: '+sGBID+' \t\t\t\tTotal: ' +sPaymentCurrency+nReceiptTotal+'\nPayment Date: ' + `${Moment(dtPymtDate).format(sDateFormat)}` + '\t\t\t\tPaid By: '+ sGBIDPaidBy}
            columns={columns}
            data={dataAPI}
            options={{
              ...oOptions,
              exportButton: {
                csv: true,
                pdf: true
              },
              exportFileName: `Receipt Number: ${sReceiptNumber} \t\t\t\tGreenbook ID: ${sGBID} \t\t\t\tTotal: ${sPaymentCurrency}${nReceiptTotal}\nPayment Date: ${Moment(dtPymtDate).format(sDateFormat)}\t\t\t\tPaid By: ${sGBIDPaidBy}`
            }}
            actions={[
              
              {
                icon: Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
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
