import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, FormControl, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { isText, isBinary, getEncoding } from 'istextorbinary'
import { red } from '@material-ui/core/colors';
import SampleForBulkUpload from '../../../assets/files/SampleForBulkUpload.csv';
import Instructions from '../../../assets/files/BulkUploadInstructions.txt';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { BackdropComponent } from '../../backdrop/index';
import Moment from 'moment';
import MaterialTable from 'material-table';
import { Alerts } from '../../alerts';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders } from '../../../config/commonConfig';
import csvTojson from 'csvtojson';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    width: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  container: {
    maxHeight: 600,
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
  paragraph: {
    paddingBottom: '0px',
    marginBottom: '0px'
  }

}));

export default function BulkUpload(props) {

  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

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



  const defaultHeader = [
    "GBID",
    "Name",
    "PaidByGBId",
    "Currency",
    "Chatrel",
    "Meal",
    "Salary",
    "ChatrelFrom",
    "ChatrelTo",
    "FinancialYear",
    "ArrearsPlusLateFees",
    "ArrearsFrom",
    "ArrearsTo",
    "BusinessDonation",
    "AdditionalDonation",
    "TotalAmount",
    "ReceiptNo",
    "PaymentDate",
    "Region",
    "Country",
    "PaymentMode"
  ];

  const columns = [
    {
      field: "sStatus",
      width: '5%',
      title: 'STATUS',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "sRemarkText",
      width: '5%',
      title: 'REMARKS',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "gbid",
      width: '5%',
      title: 'GREENBOOK ID',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "name",
      width: '5%',
      title: 'NAME',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "paidByGBId",
      width: '5%',
      title: 'PAID BY',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "currency",
      width: '5%',
      title: 'CURRENCY',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "chatrel",
      width: '5%',
      title: 'CHATREL',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "meal",
      width: '5%',
      title: 'MEAL',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "salary",
      width: '5%',
      title: 'SALARY',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "chatrelFrom",
      width: '5%',
      title: 'CHATREL FROM',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "chatrelTo",
      width: '5%',
      title: 'CHATREL TO',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "financialYear",
      width: '5%',
      title: 'FINANCIAL YEAR',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      field: "arrearsPlusLateFees",
      width: '5%',
      title: 'ARREARS + LATE FEES',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "arrearsFrom",
      width: '5%',
      title: 'ARREARS FROM',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "arrearsTo",
      width: '5%',
      title: 'ARREARS TO',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "businessDonation",
      width: '5%',
      title: 'BUSINESS DONATION',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "additionalDonation",
      width: '5%',
      title: 'ADDITIONAL DONATION',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "totalAmount",
      width: '5%',
      title: 'TOTAL AMOUNT',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "receiptNo",
      width: '5%',
      title: 'RECEIPT NO',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "paymentDate",
      width: '5%',
      title: 'PAYMENT DATE',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      }
    },
    {
      field: "region",
      width: '5%',
      title: 'REGION',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "country",
      width: '5%',
      title: 'COUNTRY',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },
    {
      field: "paymentMode",
      width: '5%',
      title: 'PAYMENT MODE',
      sorting: true,
      export: true,
      filtering: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px'
      }
    },

  ];

  const responseHeader = [
    "sStatus",
    "sRemarkText",
    "GBID",
    "Name",
    "PaidByGBId",
    "Currency",
    "Chatrel",
    "Meal",
    "Salary",
    "ChatrelFrom",
    "ChatrelTo",
    "FinancialYear",
    "ArrearsPlusLateFees",
    "ArrearsFrom",
    "ArrearsTo",
    "BusinessDonation",
    "AdditionalDonation",
    "TotalAmount",
    "ReceiptNo",
    "PaymentDate",
    "Region",
    "Country",
    "PaymentMode"
  ];

  const [backdrop, setBackdrop] = React.useState(false);
  const classes = useStyles();
  const [dataAPI, setDataAPI] = useState();
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [sAccept, setsAccept] = useState(".csv");
  const [csvFile, setCSVFile] = useState();
  const [sTitle, setTitle] = useState("");
  const [headerOK, setHeaderOK] = useState(false);

  const [displayUpload, setDisplayUpload] = useState(false);
  const [jsonObj, setJsonObj] = useState();
  const [showTable, setShowTable] = useState(false);
  const [sBatchNumber, setBatchNumber] = useState();

  //Table 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  // Reading File
  const reader = new FileReader();



  reader.addEventListener("load", function () {

    const data = reader.result;
    var text = isText(null, data);
    if (!text) {
      setAlertMessage("Not a Text File");
      setAlertType('error');
      snackbarOpen();
      return;
    }
    setCSVFile(reader.result);

    //console.log(data);
    let char = '';
    if (data.indexOf('\r') > -1) {
      char = '\r';
      console.log("character is '\\r'");
    }
    if (data.indexOf('\r\n') > -1) {
      char = '\r\n';
      console.log("character is '\\r\\n'");
    }
    let header = data.split(char, 1);
    //header = header[0].slice(0, -1);
    header = header[0].split(',');
    console.log('Headers', header);
    if (JSON.stringify(header) === JSON.stringify(defaultHeader)) {
      console.log("Headers match");
      const converter = csvTojson({
        delimiter: ',',
      });
      converter.fromString(data).then((obj) => {
        console.log("Json: ", obj);
        if (obj) {
          obj.forEach(element => {
            element.nEnteredBy = userId;
            element.nUpdatedBy = userId;
          });
          setJsonObj(obj);
          setAlertMessage("File Header structure OK. Click 'Upload' Button to verify contents.");
          setAlertType('success');
          setHeaderOK(true);
          snackbarOpen();
          setDisplayUpload(true);
        }
        else {
          alert("Something went wrong in converting csv file to json");
          return;
        }
      });

    }
    else {
      console.log("Headers don't match");
      setAlertMessage("Headers don't match");
      setAlertType('error');
      setHeaderOK(false);
      snackbarOpen();
      setDisplayUpload(false);
      setTitle('');
    }

  }, false);




  const handleUpload = (e) => {
    //e.preventDefault();
    setBackdrop(true);
    axios.post(`ChatrelBulkData/VerifyBulkImport`, jsonObj)
      .then(resp => {
        setBackdrop(false);
        if (resp.status === 200) {
          console.log(resp.data);
          setBatchNumber(resp.data[0].sBatchNumber);
          setDataAPI(resp.data);
          setShowTable(true);
          setDisplayUpload(false);
          //alert("Success");
        }
      })
      .catch(error => {
        setHeaderOK(false);
        setBackdrop(false);
        setDataAPI([]);
        setShowTable(false)
        if (error.response.status === 400) {
          setAlertMessage("Invalid or Empty File");
          setAlertType('error');
          snackbarOpen();
        }
        ;
        setAlertMessage("Error while verifying CSV file with server.\n" + error.response.data);
        setAlertType('error');
        snackbarOpen();
        console.log(error.response);

      });
  };


  const handleUploadChange = (event) => {
    setHeaderOK(false);
    setDataAPI([]);
    setShowTable(false);
    const file = document.getElementById("csv").files;
    console.log("File in input is:", file);
    if (file) {
      reader.readAsText(file[0]);
      setTitle(file[0].name);

    }
    event.target.value = null; 
  }

  const handleSubmit = () => {
    console.log("Batch Number ", sBatchNumber);
    setBackdrop(true);
    axios.post(`ChatrelBulkData/SubmitBulkData/?sBatchNumber=${sBatchNumber}`)
      .then(resp => {
        setBackdrop(false);
        if (resp.status === 200) {
          if (resp.data > 0) {
            setAlertMessage('Successfully inserted: ' + resp.data + ' records');
            setAlertType('success');
            snackbarOpen();
            
          }
          if (resp.data === 0) {
            setAlertMessage("NO Records were inserted");
            setAlertType('warning');
            snackbarOpen();
          }

          setDataAPI([]);
          setShowTable(false);
          setTitle();

        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage("Error while submitting Bulk Data\n" + error.response.data);
        setAlertType('error');
        snackbarOpen();
        console.log(error.response);

      })
  };

  return (
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        <Typography paragraph variant='h5' >Chatrel Bulk Import</Typography>
        <Typography paragraph variant='subtitle1'>Instructions: 
        {/* <p className={classes.paragraph}>1. Choose a CSV File by clicking on 'Choose File' button.</p><p className={classes.paragraph}>2. After selecting the file, the file will be verified for correct headers.</p><p className={classes.paragraph}>3. If the headers are as per system requirement, the file can be uploaded for verification.</p>
          <p className={classes.paragraph}>4. During verification, file will be checked for valid data.</p><p className={classes.paragraph}> 5. A table will be populated below displaying Success or Failed status of each row.</p> */}
          <p className={classes.paragraph}>1. <a style={{ color: 'blue' }} download href={Instructions}><u>Click Here </u></a> to view Instructions file. Please read it carefully and prepare CSV file accordingly.</p>
          <p className={classes.paragraph}>2. A Sample CSV file can be downloaded from <a style={{ color: 'blue' }} download href={SampleForBulkUpload}><u>here </u></a></p>
        </Typography>
        <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
          {/* <Grid item xs={12} lg={12}>
            {message && <span>File Selected ---&gt; {sTitle}  &nbsp; &nbsp; &nbsp;{message}</span>}
            
            {message && <span></span>}  
            </Grid> */}
          <Grid item xs={6} lg={2}>
            <FormControl className={classes.formControl}>
              <label htmlFor="csv">
                <input
                  id="csv"
                  accept={sAccept}
                  className={classes.textField}
                  style={{ display: 'none' }}
                  type="file"
                  onChange={(event) => { handleUploadChange(event) }}
                />
                <Button color="secondary" variant="contained" component="span">
                  Choose File
                    </Button>
              </label>

            </FormControl>
          </Grid>
          <Grid item xs={6} lg={2}>



            <Button disabled={!displayUpload} onClick={(e) => handleUpload(e)} color="primary" variant="contained" component="span">
              Upload
                </Button>


          </Grid>

        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          {headerOK && <Typography paragraph variant='body1' style={{ color: 'green' }}>File: {sTitle}<span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&#10003;</span></Typography>} 
        </Grid>
        <Grid item xs={12}>
          {/* { showTable &&
          <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {responseHeader.map((column) => (
                <TableCell
                  key={column}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataAPI.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.gbid}>
                  {responseHeader.map((column) => {
                    const value = row[column];
                    return (
                      <TableCell key={column} >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30]}
        component="div"
        count={dataAPI.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      
    </Paper>} */}

        </Grid>
      </Grid>

      { showTable &&
        <Grid container justify='center' alignItems='center' direction='column'>

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="BULK DATA IMPORT"
            columns={columns}
            data={dataAPI}
            options={{
              ...oOptions,

            }}
            actions={[
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
          <br />
          <Button style={{ marginTop: '10px' }} onClick={() => handleSubmit()} color="primary" variant="contained" component="span">
            Submit
</Button>
          <span style={{ color: 'red' }}>*Note: Only records with status 'Validate Success' will be submitted.</span>



        </Grid>}
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />}
      {backdrop && <BackdropComponent
        backdrop={backdrop}
      />}
    </>

  );
}

