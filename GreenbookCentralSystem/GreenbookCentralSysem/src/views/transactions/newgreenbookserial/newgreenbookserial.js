import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Moment from 'moment';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders } from '../../../config/commonConfig';
import { useHistory } from 'react-router-dom';
import { Alerts } from '../../alerts';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog } from './dialog';
import handleError from "../../../auth/_helpers/handleError";
import { Assign } from './assign';
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
  
}));

export default () => {
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectData, setSelectData] = useState([]);
  const [filtering, setFiltering] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [gbSerialObj, setGBSerialObj] = useState({});
  oOptions.filtering = filtering;

  let history = useHistory();

  //Alerts
  const [alertMessage, setAlertMessage] = useState("");
  const [backdrop, setBackdrop] = React.useState(false);
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

  //Data columns
  const columns = [
    {
      field: "id",
      title: "#",
      hidden: true,
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
      field: "nFormNumber",
      title: "FORM NUMBER",
      // 
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sGBID",
      title: "  GB ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      field: "dtFormattedReceived",
      title: "RECEIVED ON",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        borderRight: '1px solid grey'
      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtFormattedReceived){
          return -1;
        }
        if(!b.dtFormattedReceived){
          return 1;
        }
        a = a ? a.dtFormattedReceived.split('-').reverse().join('') : '';
        b = b ? b.dtFormattedReceived.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
      //render: rowData => rowData['dtReceived'] ? Moment(rowData['dtReceived']).format(sDateFormat) : undefined
    },
    {
      field: "sName",
      title: "NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sMadebType",
      title: "MADEB TYPE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      field: "sAuthRegion",
      title: "AUTHORITY REGION",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        borderRight: '1px solid grey'
      }
    },
    {
      field: "edit",
      title: "GENERATE",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData =>
        //<Button onClick={(e) => {
        //                                e.preventDefault();
        //                                e.stopPropagation();
        //                                 addClick(rowData);
        //                              }}   className="btn-neutral-primary btn-icon btn-animated-icon btn-transition-none d-40 p-0 m-2">
        //       <span className="btn-wrapper--icon">
        //         <CreateNewFolderIcon />
        //       </span>
        // </Button>,
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addClick(rowData);
          }}
          style={{ padding: '0px' }}
        >
          <CreateNewFolderIcon />
        </IconButton>,
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
    // {
    //   field: "Assign",
    //   title: "Assign",
    //   sorting: false,
    //   export:false,
    //   filtering:false,
    //   render: rowData => <Assign />,
    //   cellStyle: {
    //     padding:'5px',
    //   },
    // }
  ];

  const addClick = (tableRowArray) => {
    setGBSerialObj({
      id: tableRowArray['id'],
      nFormNumber: tableRowArray['nFormNumber'],
      sGBID: tableRowArray['sGBID'],
      dtReceived: tableRowArray['dtReceived'],
      sName: tableRowArray['sName'],
      sMadebType: tableRowArray['sMadebType'],
      sAuthRegion: tableRowArray['sAuthRegion'],
    });
    //console.log("Table Array: ", tableRowArray);
    //console.log("gbSerialObj: ", gbSerialObj);
    setAddModal(true);
    //alert("Opening modal...");
  };

  const addAPICall = (obj, clicked, damaged) => {
    //console.log("Serial number save called.");
    setBackdrop(true);
    axios.post(`GreenBookSerialNumber/AddGreenbookSerialNumber/`, obj)
      .then(resp => {
        if (resp.status === 200) {
          if(damaged){
            setAlertMessage(`Greenbook Serial Number ${obj.nBookNo} marked as Damaged`);
            setAlertType('warning');
          }
          else{
            setAlertMessage(`Greenbook Serial Number ${obj.nBookNo} assigned to Form No. ${obj.nFormNumber} for ${gbSerialObj.sMadebType} madeb.`);
            setAlertType('success');            
          }
          snackbarOpen();
          setAddModal(false);
          setBackdrop(false);
          setLoading(true);
          if (clicked) {
            setTimeout(() => {
              history.push("/GreenBookSerial");
            }, 3000);
            return;
          }
          axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumberAssignList`)
            .then(resp => {
              if (resp.status === 200) {
                resp.data.forEach((element) => {
                  element.dtFormattedReceived = element.dtReceived ? Moment(element.dtReceived).format(sDateFormat) : null;
                });
                setdataAPI(resp.data)
                selectDatafunction();
                setLoading(false);
              }
            })
            .catch(error => {
              setLoading(false);
              //console.log(error.message);
              //console.log(error.config);
            })
        }
      })
      .catch(error => {
        setBackdrop(false);
        setAlertMessage(`Assigning Serial Number Failed. \nError:${error.message}.`);
        setAlertType('error');
        snackbarOpen();
        //console.log(error.message);
        //console.log(error.config);
      })
  };

  const selectDatafunction = () => {
    axios.get(`GreenBookSerialNumber/GetNewEmptyGreenBookSerialRecordForAdd`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
          //console.log("New Record Data\n", resp.data);
          // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        //console.log(error.config);
        //console.log(error.message);
      })
  };

  const handleAddClickClose = () => {
    setAddModal(false);
  };



  useEffect(() => {
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumberAssignList`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.dtFormattedReceived = element.dtReceived ? Moment(element.dtReceived).format(sDateFormat) : null;
          });
          setdataAPI(resp.data);
          selectDatafunction();
          setLoading(false);
        }
      })
      .catch(error => {
        //console.log(error.config);
        //console.log(error.message);
        setLoading(false);
      })
    modifyHeaders();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/*<Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Give GreenBook Serial Number</Typography>
  </Breadcrumbs>*/}
          <MaterialTable
            style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={loading}
            icons={oTableIcons}
            title="Give Green Book Serial Number"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={
              [
                {
                  icon: oTableIcons.Search,
                  tooltip: 'Toggle Filter',
                  isFreeAction: true,
                  onClick: (event) => {
                    setFiltering(currentFilter => !currentFilter)
                  }
                }
              ]
            }
            onRowClick={(event, rowData) => {
              //alert ("Row clicked");
              event.preventDefault();
              event.stopPropagation();
            }}
          />
          {addModal && <AddDialog
            addModal={addModal}
            selectData={selectData}
            classes={classes}
            gbSerialObj={gbSerialObj}
            handleAddClickClose={handleAddClickClose}
            addAPICall={addAPICall}
          />}
          {/*{editModal && <EditDialog
              editModal={editModal}
              selectData={selectData}
              classes={classes}
              handleEditClickClose={handleEditClickClose}
              editAPICall={editAPICall}
              gbSerialObj={gbSerialObj}
            />} */}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />}
          {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
        </Grid>
      </Grid>
    </>
  );
}