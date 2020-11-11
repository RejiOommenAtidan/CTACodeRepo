import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button
} from '@material-ui/core';
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
import { EmailDialog } from '../email';
import { Alerts } from '../../alerts';
import { AddDialog, EditDialog } from './dialog';
import { ViewDialog } from '../../search/dialog';
import { oOptions, oTableIcons, sDateFormat } from '../../config/commonConfig';
import MyComp from '../../common/filtercomponent';

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

export default function ChatrelTable(){

  const classes = useStyles();
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
      field: "sGBId",
      title: "GreenBook Id",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sFirstName",
      title: "First Name",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sAuthRegion",
      title: "Authority Region",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPaymentCurrency",
      title: "Additional Donation",
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
      field: "nChatrelAmount",
      title: "Chatrel Basic",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelMeal",
      title: "Meal",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelSalaryAmt",
      title: "Salary",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "dtArrearsFrom",
      title: "Arrears From",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "dtArrearsTo",
      title: "Arrears To",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nArrearsAmount",
      title: "Arrears",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelBusinessDonationAmt",
      title: "Business Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelAdditionalDonationAmt",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelTotalAmount",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "nChatrelRecieptNumber",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sCountryID",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPaymentStatus",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    {
      field: "sPaymentMode",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px'
      },
    },
    
    
    
    

  ];


  useEffect(() => {
    axios.get(``)
    .then(resp => {
      if (resp.status === 200) {
        setdataAPI(resp.data);
        selectDatafunction();
        setisLoading(false);
      }
    })
    .catch(error => {
      console.log(error.config);
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
            title="Book Full Madeb"

            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Book Full Madeb',
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
          />}
        </Grid>
      </Grid>
    </>
    );
}