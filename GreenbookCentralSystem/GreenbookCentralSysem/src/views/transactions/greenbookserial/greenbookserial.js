import React, { useEffect, useState, useRef } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Refresh from '@material-ui/icons/Refresh';
import Moment from 'moment';
import MaterialTable, { MTableToolbar } from 'material-table';
import { oOptions, oTableIcons, sDateFormat, modifyHeaders, sDateFormatMUIDatepicker, sButtonColor, sButtonSize, sButtonVariant, sDDMMYYYYRegex } from '../../../config/commonConfig';
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
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
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
    marginLeft: '5px'
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
  const startDateTextField = useRef(null);
  const searchButton = useRef(null);

  const endDateTextField = useRef(null);
  const { register, handleSubmit, errors, setValue, clearErrors } = useForm();
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
    clearErrors: clearErrors2
  } = useForm();
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
        padding: '5px',
        borderRight: '1px solid grey'
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
        width: "12%",
        borderRight: '1px solid grey'
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
        width: "12%",
        borderRight: '1px solid grey'
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
        width: "2%",
        borderRight: '1px solid grey'
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
      field: "greenBookSerialNumber.nFormNumber",
      title: "FORM NUMBER",
      // 
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
      title: "AUTHORITY",
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
      field: "greenBookSerialNumber.remarks",
      title: "REMARKS",
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
        disabled={!rowData['greenBookSerialNumber']['nFormNumber']}
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
        padding: '5px',
        borderRight: '1px solid grey'
      }
    }
  ];

  const selectDatafunction = () => {
    axios.get(`GreenBookSerialNumber/GetNewEmptyGreenBookSerialRecordForEdit`)
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

  const editAPICall = (gbSerialObj, damaged) => {
    setBackdrop(true);
    setLoading(true);
    axios.post(`GreenBookSerialNumber/EditGreenbookSerialNumber/Id=` + gbSerialObj.id, gbSerialObj)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          setEditModal(false);
          setLoading(false);
          if(damaged){
            setAlertMessage(`Greenbook Serial Number ${gbSerialObj.nBookNo} marked as Damaged`);
            setAlertType('warning');
          }
          else{
            setAlertMessage(`Greenbook Serial Number ${gbSerialObj.nBookNo} assigned to Form No. ${gbSerialObj.nFormNumber} for ${gbSerialObj.sMadebType} madeb.`);
            setAlertType('success');            
          }
          snackbarOpen();
          if (isDateSearch) {
            filterDates();
            return;
          }
          if (isBookSearch) {
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
    if (dateFrom !== null && dateUpto !== null) {
      str = `?dtFrom=${dateFrom}&dtUpto=${dateUpto}`;
    }
    if (nBookNo !== null) {
      str = `?nBookNo=${nBookNo}`
    }
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/${str}`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.greenBookSerialNumber.dtFormattedDate = element.greenBookSerialNumber.dtDate ? Moment(element.greenBookSerialNumber.dtDate).format(sDateFormat) : null;
          });
          //setBackdrop(false);
          setdataAPI(resp.data);
          setLoading(false);
        }
        else {
          //setBackdrop(false);
          setLoading(false);
          console.log("Response received:\n", resp);
        }
      })
      .catch(error => {
        //setBackdrop(false);
        setLoading(false);
        console.log(error.config);
        console.log(error.message);
      })

  };

  const filterDates = () => {
    clearErrors2(['serialBookNo']);
    let dateFrom = Moment(startDate).isValid() ? Moment(startDate).format("YYYY-MM-DD") : null;
    let dateUpto = Moment(endDate).isValid() ? Moment(endDate).format("YYYY-MM-DD") : null;
    console.log("Start Date:", dateFrom);
    console.log("Upto Date:", dateUpto);

    if (dateFrom && dateUpto) {
      setIsDateSearch(true);
      //setBackdrop(true);
      setLoading(true);
      loadData(dateFrom, dateUpto);
    }
    else {
      setAlertMessage("Enter Valid Dates");
      setAlertType("error");
      snackbarOpen();
    }

  };

  const searchByBookNo = () => {
    clearErrors(['startDate', 'endDate']);
    console.log("book no. to search", searchBook);
    setIsBookSearch(true);
    //setBackdrop(true);
    setLoading(true);
    loadData(null, null, searchBook);
  };

  const initialLoad = () => {
    setLoading(true);
    clearErrors(['startDate', 'endDate']);
    clearErrors2(['serialBookNo']);
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
          // setStartDateTextField(document.getElementById('startDate'));
          // setEndDateTextField(document.getElementById('endDate'));
          // setSearchButton(document.getElementById('searchButton'));

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
  }

  useEffect(() => {

    initialLoad();

  }, []);

  return (
    <>
      <div className={classes.dateBoxes}>

        <form
          onSubmit={handleSubmit(filterDates)}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              placeholder="DD-MM-YYYY"
              ref={startDateTextField}
              className={classes.dateField}
              clearable
              variant="dialog"
              error={errors.startDate}
              margin="dense"
              id="startDate"
              name="startDate"
              label={<span style={{ color: errors.startDate && 'red' }}>Date From</span>}
              format={sDateFormatMUIDatepicker}
              returnMoment={true}
              inputRef={register({
                required: true,
                pattern:
                {
                  value: new RegExp(sDDMMYYYYRegex),
                  message: "Invalid Date"
                }
              })}
              onChange={(date) => {
                if (date) {
                  setValue('startDate', date, { shouldValidate: true });
                  setStartDate(date);
                }
              }}
              value={startDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            // fullWidth
            //className={classes.dateField}

            />
            {/* {_.get("startDate.type", errors) === "required" && (
              <span style={{ color: "red" }}>
                Date From is required
              </span>
            )} */}
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider ref={endDateTextField} utils={DateFnsUtils}>
            <KeyboardDatePicker
              placeholder="DD-MM-YYYY"
              className={classes.dateField}
              variant="dialog"
              error={errors.endDate}
              //openTo="year"
              //views={["year", "month", "date"]}
              margin="dense"
              id="endDate"
              name="endDate"
              label={<span style={{ color: errors.endDate && 'red' }}>Date Upto</span>}
              format={sDateFormatMUIDatepicker}
              returnMoment={true}
              inputRef={register({
                required: true,
                pattern:
                {
                  value: new RegExp(sDDMMYYYYRegex),
                  message: "Invalid Date"
                }
              })}
              onChange={(date) => {
                if (date) {
                  setValue('endDate', date, { shouldValidate: true });
                  setEndDate(date);
                }
              }}
              value={endDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            // fullWidth
            //className={classes.dateField}

            />
            {/* {_.get("endDate.type", errors) === "required" && (
              <span style={{ color: "red" }}>
                Date Upto is required
              </span>
            )} */}
          </MuiPickersUtilsProvider>
          <Button
            id='searchButton'
            type='submit'
            //onClick={(filterDates)}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
            className={classes.searchButton}
          //size={sButtonSize}
          > Search
        </Button>
        </form>
      </div>

      <div className={classes.dateBoxes}>
        <form onSubmit={handleSubmit2(searchByBookNo)}>

          <TextField
            id='serialBookNo'
            name='serialBookNo'
            type='number'
            label={<span style={{ color: errors2.serialBookNo && 'red' }}>Enter Book Serial No</span>}
            InputProps={{
              pattern: /[0-9]/,
              inputProps: { min: 1 }
            }}
            inputRef={register2({
              required: true
            })}
            className={classes.textField}
            onChange={(e) => setSearchBook(e.target.value)}
            //variant={errors2.serialBookNo && 'outlined'}
            error={errors2.serialBookNo}
          //helperText={errors2.serialBookNo && 'This field is required'}
          />


          <Button
            type='submit'
            ref={searchButton}
            //onClick={searchByBookNo}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
            className={classes.searchButton}
          //size={sButtonSize}
          > Search
        </Button>
        </form>
      </div>
      {/* <div className={classes.dateBoxes}>
          {_.get("serialBookNo.type", errors2) === "required" && (
            <span style={{ color: 'red', fontSize: '0.5vw' }}>This field is required</span>
          )}
      </div> */}


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
            //         <Button
            //           variant={sButtonVariant}
            //           color={sButtonColor}
            //           onClick={() => initialLoad()}
            //           className={classes.button}
            //           startIcon={<Refresh />}
            //           >
            //             Get Recent Records
            //         </Button>
            //     </div>
            //   ),
            // }}
            actions={
              [
                {
                  icon: oTableIcons.Refresh,
                  // icon: () => <Button
                  // variant={sButtonVariant}
                  // color={sButtonColor}
                  // //onClick={() => initialLoad()}
                  // className={classes.button}
                  // startIcon={<Refresh />}
                  // >

                  //</Button>,
                  tooltip: 'Show Recent',
                  isFreeAction: true,
                  onClick: () => initialLoad()
                },
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