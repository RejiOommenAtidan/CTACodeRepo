import React, { useEffect, useState } from 'react';
import { Grid, Button, Paper, } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { InputParams } from './inputparams';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MaterialTable, { MTableToolbar } from 'material-table';
import {
  oOptions, oTableIcons,
  sButtonColor, sButtonSize, sButtonVariant, modifyHeaders
} from "../../config/commonConfig";
import { Alerts } from '../alerts';
import Moment from 'moment';
import { NavigateBeforeSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
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
  const [noRecords, setNoRecords] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  const [makeListParams, setMakeListParams] = useState({});
  const [addToTitle, setAddToTitle] = useState('');
  const [sAuthRegion, setAuthRegion] = useState('');
  const [sMadebType, setMadebType] = useState('');

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



  const columns = [
    {
      field: "nSerialNo",
      title: "SR. NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "5%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "5%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sFirstName",
     // render: rowData => (rowData['sFirstName'] ? rowData['sFirstName'] : '') + " " + (rowData['sLastName'] ? rowData['sLastName'] : ''),
      title: "NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sFathersName",
      title: "FATHER'S NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sCity",
      title: "CITY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sOldGreenBkNo",
      title: "OLD BOOK NO",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "5%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "5%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sGBID",
      title: "NEW GB NO.",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "10%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "signature",
      title: "SIGNATURE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "15%",
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sAddress1",
      title: "ADDRESS",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "25%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "25%",
        borderRight: '1px solid grey'
      }
    }
  ];

  function setPrinted() {
    console.log("Set Printed called.");
    axios.post(`MakeList/SetPrinted`, makeListParams)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Printed marked. ", resp.data);
          setAlertMessage('Marked Records Printed.');
          setAlertType('success');
          snackbarOpen();
          setdataAPI([]);
        }
      })
      .catch(error => {
        setAlertMessage(`Failed to Mark Printed. \nError:${error.message && error.message}.`);
        setAlertType('error');
        snackbarOpen();
        console.log(error.config);
        console.log(error.message);
      });
  }

  const makeList = (makeListParams, sAuthRegion, sMadebType) => {
    setLoading(true);
    setNoRecords(false);
    setdataAPI([]);
    console.log("Make List Params recd. \n", makeListParams);
    console.log("Authregion & madebtype", sAuthRegion, sMadebType);
    setAuthRegion(sAuthRegion);
    setMadebType(sMadebType);
    setAddToTitle(`Authority Region: ${sAuthRegion}, Madeb Type: ${sMadebType}`);
    axios.post(`MakeList/MakeList`, makeListParams)
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data === 'No Records') {
            setNoRecords(true);
            setdataAPI([]);
            setLoading(false);

            return;
          }
          //console.log(resp.data);
          setNoRecords(false);
          let i = 1;
          resp.data.forEach((element) => {
            element.nSerialNo = i;
            element.sFirstName=element.sFirstName+(element.sLastName? ' '+ element.sLastName : '');
            i++;
          })
          setdataAPI(resp.data);
          if (!makeListParams.bPrinted) {
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
  };

  useEffect(() => {
    axios.get(`Madeb/GetNewEmptyMadebMakeList`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
          console.log("Got List of AuthRegions & MadebTypes\n", resp.data);
          setDataReady(true);
          // setdataAPI(resp.data)
          modifyHeaders();
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      })
  }, []);
  useEffect(() => {
    dataAPI.length > 0 && modifyHeaders()
  }, [dataAPI]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/*<Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Make List</Typography>
  </Breadcrumbs>*/}
          <br />
          <Paper style={{ padding: '15px', paddingTop: '20px',textAlign:'center' }}>
            <h2>Make List</h2>
            {dataReady && (<InputParams
              selectData={selectData}
              classes={classes}
              makeList={makeList}
            />)}
            <br />
            {loading &&
              <div className={classes.root}>
                <CircularProgress />
                {noRecords && <h4>No Records Found</h4>}
              </div>
            }
            {noRecords &&
              <div className={classes.root}>
                {<h4>No Records Found</h4>}
              </div>
            }
            {dataAPI.length != 0 &&

              <MaterialTable
                style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
                //isLoading = {loading}
                // ${sAuthRegion}, Madeb Type: ${sMadebType}
                icons={oTableIcons}
              //  title={<h5><b> Authority Region: </b> {sAuthRegion} &nbsp; &nbsp; &nbsp;  <b>Madeb Type:</b> {sMadebType} </h5>}
              title={`${sAuthRegion} (${sMadebType})`}
                columns={columns}
                data={dataAPI}
                components={{
                  Toolbar: props => (
                   <>
                      
                      <MTableToolbar {...props} />
                      {makeTable && (<div>
                        <Button
                          variant={sButtonVariant}
                          color={sButtonColor}
                          size={sButtonSize}
                          className={classes.button}
                          startIcon={<DoneAllIcon />}
                          onClick={() => {
                            setPrinted();
                          }}
                        >
                          Mark Printed
              </Button>
              
               </div>)}
               <div style={{display: 'flex', justifyContent:'left'}}>
               <p style={{fontSize: '1.05rem'}}>{`Total No. of Books: ${dataAPI.length}`}</p>     </div> 
                    </>
                  ),
                }}
                options={{...oOptions, exportButton: {csv: true, pdf: true}, exportFileName: `Total No. of Books: ${dataAPI.length}`}}
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
            {snackbar && <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
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