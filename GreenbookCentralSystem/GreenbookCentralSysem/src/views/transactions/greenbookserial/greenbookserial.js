import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import MaterialTable, { MTableToolbar } from 'material-table';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sDateFormatMUIDatepicker, sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { EditDialog } from './dialog';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import handleError from "../../../auth/_helpers/handleError";

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
    marginBottom: theme.spacing(1),
    paddingRight: '10px'
  },
  dateBoxes: {
    //border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '10px'
  },
  dateField: {
    paddingRight: '10px'
  },
  searchButton: {
    marginTop: '15px',
    paddingLeft: '5px'
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
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchBook, setSearchBook] = useState(null);
  const [isBookSearch, setIsBookSearch] = useState(false);
  const [isDateSearch, setIsDateSearch] = useState(false);
  const [gbSerialObj, setGBSerialObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  let history = useHistory();

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
  const columns = [
    {
      field: "greenBookSerialNumber.id",
      title: "Sr No.",
      hidden: true,
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
      field: "greenBookSerialNumber.dtFormattedDate",
      title: "DATE",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px'
      },
      //render: rowData => rowData['greenBookSerialNumber']['dtDate'] ? Moment(rowData['greenBookSerialNumber']['dtDate']).format(sDateFormat) : undefined
    },
    {
      field: "greenBookSerialNumber.nBookNo",
      title: "BOOK SERIAL NO",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "12%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "12%"
      }
    },
    {
      field: "greenBookSerialNumber.sName",
      title: "NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "12%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "12%"
      }
    },
    {
      field: "greenBookSerialNumber.sCountryID",
      title: "COUNTRY CODE",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "2%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "2%"
      }
    },
    {
      field: "greenBookSerialNumber.sGBID",
      title: "GB ID",
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
      field: "sMadebType",
      title: "MADEB TYPE",
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
      field: "greenBookSerialNumber.nFormNumber",
      title: "FORM NUMBER",
      //filterPlaceholder: "Search...",
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
      field: "sAuthRegion",
      title: "AUTHORITY",
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
      field: "greenBookSerialNumber.remarks",
      title: "REMARKS",
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
      field: "edit",
      title: "EDIT",
      sorting: false,
      export: false,
      filtering: false,
      render: rowData => <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => {
          editClick(rowData)
        }}
        style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
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
    }
  ];

  const selectDatafunction = () => {
    axios.get(`GreenBookSerialNumber/GetNewEmptyGreenBookSerialRecord`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);
          console.log("New Record Data\n", resp.data);
          // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            setAlertMessage("You have been logged out of the system. Login again.");
            setAlertType("error");
            snackbarOpen();
          }
        }
        console.log(error.config);
        console.log(error.message);
      })
  };

  const handleEditClickClose = () => {
    setEditModal(false);
  };
  // const handleAddClickClose = () => {
  //   setAddModal(false);
  // };


  // const addAPICall = (gbSerialObj) => {
  //   debugger
  //   console.log(gbSerialObj);
  //   axios.post(`GreenBookSerialNumber/AddGreenbookSerialNumber/`, gbSerialObj)
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         console.log(resp.data);
  //         setAddModal(false);
  //         selectDatafunction();
  //         axios.get(`GreenBookSerialNumber/GetgreenBookSerialNumbers/`)
  //           .then(resp => {
  //             if (resp.status === 200) {
  //               console.log(resp.data);
  //               setdataAPI(resp.data)
  //             }
  //           })
  //           .catch(error => {
  //             console.log(error.message);
  //             console.log(error.config);
  //           })
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //       console.log(error.config);
  //     })
  // };


  const editClick = (tableRowArray) => {
    setGBSerialObj({
      id: tableRowArray['greenBookSerialNumber']['id'],
      nBookNo: tableRowArray['greenBookSerialNumber']['nBookNo'],
      sGBID: tableRowArray['greenBookSerialNumber']['sGBID'],
      remarks: tableRowArray['greenBookSerialNumber']['remarks'],
      dtDate: tableRowArray['greenBookSerialNumber']['dtDate'],
      sName: tableRowArray['greenBookSerialNumber']['sName'],
      sCountryID: tableRowArray['greenBookSerialNumber']['sCountryID'],
      nMadebTypeId: tableRowArray['greenBookSerialNumber']['nMadebTypeId'],
      nFormNumber: tableRowArray['greenBookSerialNumber']['nFormNumber'],
      nAuthRegionId: tableRowArray['greenBookSerialNumber']['nAuthRegionId'],
    });
    console.log("Table Array: ", tableRowArray);
    console.log("gbSerialObj: ", gbSerialObj);
    setEditModal(true);
  };

  const editAPICall = (gbSerialObj) => {
    setBackdrop(true);
    setLoading(true);
    axios.post(`GreenBookSerialNumber/EditGreenbookSerialNumber/Id=` + gbSerialObj.id, gbSerialObj)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          setEditModal(false);
          setAlertMessage('Record updated successfully.');
          setAlertType('success');
          snackbarOpen();
          if(isDateSearch){
            filterDates();
            return;
          }
          if(isBookSearch){
            searchByBookNo();
            return;
          }
          loadData();
        }
      })
      .catch(error => {
        setBackdrop(false);
        setLoading(false);
        setAlertMessage(`Record Updation Failed. \nError:${error.message}.`);
        setAlertType('error');
        snackbarOpen();
        console.log(error.config);
        console.log(error.message);
      })
  };

  const loadData = (dateFrom = null, dateUpto = null, nBookNo = null) => {
    let str = '';
    if(dateFrom !== null && dateUpto !== null){
      str = `?dtFrom=${dateFrom}&dtUpto=${dateUpto}`;
    }
    if(nBookNo !== null){
      str = `?nBookNo=${nBookNo}`
    }
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/${str}`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.greenBookSerialNumber.dtFormattedDate = element.greenBookSerialNumber.dtDate ? Moment(element.greenBookSerialNumber.dtDate).format(sDateFormat) : null;
          })
          setdataAPI(resp.data);
          setLoading(false);
        }
        else {
          setBackdrop(false);
          setLoading(false);
          console.log("Response received:\n", resp);
        }
      })
      .catch(error => {
        setBackdrop(false);
        setLoading(false);
        console.log(error.config);
        console.log(error.message);
      })

  }

  const filterDates = () => {

    let dateFrom = Moment(startDate).isValid() ? Moment(startDate).format("YYYY-MM-DD") : null;
    let dateUpto = Moment(endDate).isValid() ? Moment(endDate).format("YYYY-MM-DD") : null;
    console.log("Start Date:", dateFrom);
    console.log("Upto Date:", dateUpto);
    
    if(dateFrom && dateUpto){
      setIsDateSearch(true);
      setLoading(true);
      loadData(dateFrom, dateUpto);
    }
    else{
      setAlertMessage("Enter Valid Dates");
      setAlertType("error");
      snackbarOpen();
    }

  };

  const searchByBookNo = () => {
    console.log("book no. to search", searchBook);
    setIsBookSearch(true);
    setLoading(true);
    loadData(null, null, searchBook);
  };

  useEffect(() => {
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.greenBookSerialNumber.dtFormattedDate = element.greenBookSerialNumber.dtDate ? Moment(element.greenBookSerialNumber.dtDate).format(sDateFormat) : null;
          });
          setdataAPI(resp.data);
          selectDatafunction();
          setLoading(false);
          modifyHeaders();
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            setAlertMessage("You have been logged out of the system. Login again.");
            setAlertType("error");
            snackbarOpen();
          }
        }
        console.log(error.config);
        console.log(error.message);
        setLoading(false);
      })
  }, []);

  return (
    <>
      <div className={classes.dateBoxes}>
       
          <form onSubmit={(e) => {e.preventDefault(); filterDates();}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.dateField}
            clearable
            variant="dialog"
            //openTo="year"
            //views={["year", "month", "date"]}
            margin="dense"
            id="startDate"
            name="startDate"
            label='Date From'
            format={sDateFormatMUIDatepicker}
            returnMoment={true}
            onChange={(date) => {
              //console.log(date.toISOString().split("T")[0]);
              //console.log(date.toDateString());
              // console.log(date.toLocaleDateString());
              //console.log(date);
              setStartDate(date);
            }}
            value={startDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          // fullWidth
          //className={classes.dateField}

          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.dateField}
            variant="dialog"
            //openTo="year"
            //views={["year", "month", "date"]}
            margin="dense"
            id="endDate"
            name="endDate"
            label='Date Upto'
            format={sDateFormatMUIDatepicker}
            returnMoment={true}
            onChange={(date) => {
              //console.log(date.toISOString().split("T")[0]);
              //console.log(date.toDateString());
              // console.log(date.toLocaleDateString());
              //console.log(date);
              setEndDate(date);
            }}
            value={endDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          // fullWidth
          //className={classes.dateField}

          />
        </MuiPickersUtilsProvider>
        <Button
          type='submit'
          //onClick={(filterDates)}
          variant={sButtonVariant}
          color={sButtonColor}
          size='small'
          className={classes.searchButton}
        //size={sButtonSize}
        > Search
        </Button>
        </form>
        </div>
        
        <div className={classes.dateBoxes}>
          <form onSubmit={(e) => {e.preventDefault(); searchByBookNo()}}>
          <TextField
            id='serialBookNo'
            name='serialBookNo'
            type='number'
            label='Enter Book Number'
            InputProps={{
              pattern: /[0-9]/,
              inputProps: { min: 1 }
            }}
            className={classes.textField}
            onChange={(e) => setSearchBook(e.target.value)}
          />
          <Button
          type='submit'
          //onClick={searchByBookNo}
          variant={sButtonVariant}
          color={sButtonColor}
          size='small'
          className={classes.searchButton}
        //size={sButtonSize}
        > Search
        </Button>
          </form>
        </div>

      
      <Grid container spacing={1}>

        <Grid item xs={12}>
          {/*<Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" >
              Home
            </Link>
            <Typography color="textPrimary">Edit GreenBook Serial Number</Typography>
  </Breadcrumbs>*/}
          <MaterialTable
            style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            isLoading={loading}
            icons={oTableIcons}
            title="Edit Green Book Serial Number"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            // components={{
            //   Toolbar: props => (
            //     <div>
            //       <MTableToolbar {...props} />

            //     </div>
            //   ),
            // }}
            actions={
              [
                // {
                //   icon: AddBox,
                //   tooltip: 'Add GreenBook Serial Number',
                //   isFreeAction: true,
                //   onClick: () => setAddModal(true)
                // },
                {
                  icon: oTableIcons.Search,
                  tooltip: 'Toogle Filter',
                  isFreeAction: true,
                  onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
                }
              ]
            }
          />
          {/* {addModal && <AddDialog
              addModal={addModal}
              selectData={selectData}
              classes={classes}
              handleAddClickClose={handleAddClickClose}
              addAPICall={addAPICall}
            />} */}
          {editModal && <EditDialog
            editModal={editModal}
            selectData={selectData}
            classes={classes}
            handleEditClickClose={handleEditClickClose}
            editAPICall={editAPICall}
            gbSerialObj={gbSerialObj}
          />}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
          {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
        </Grid>
      </Grid>
    </>
  );
}