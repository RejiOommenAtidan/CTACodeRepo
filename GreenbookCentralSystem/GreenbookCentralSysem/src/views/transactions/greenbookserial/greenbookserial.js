import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Typography, FormControl, TextField, Breadcrumbs, Link } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import { useHistory } from 'react-router-dom';
import { Alerts } from '../../alerts';
import handleError from "../../../auth/_helpers/handleError";
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmailIcon from '@material-ui/icons/Email';
import { AddDialog, EditDialog } from './dialog';

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

export default () => {

  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [gbSerialObj, setGBSerialObj] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  let history = useHistory();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
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
        textAlign: "center",
        padding: '5px'
      }
    },
    {
      field: "greenBookSerialNumber.dtDate",
      title: "Date",
      // type: 'date',
      // dateSetting: {locale: 'en-GB'},
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px'
      },
      render: rowData => rowData['greenBookSerialNumber']['dtDate'] ? Moment(rowData['greenBookSerialNumber']['dtDate']).format('YYYY-MM-DD') : undefined
    },
    {
      field: "greenBookSerialNumber.nBookNo",
      title: "Book Serial No",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle"
      },
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
      field: "greenBookSerialNumber.sName",
      title: "Name",
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
      field: "greenBookSerialNumber.sCountryID",
      title: "Country Code",
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
      field: "greenBookSerialNumber.sGBID",
      title: "GB Id",
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
      field: "sMadebType",
      title: "Madeb Type",
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
      field: "greenBookSerialNumber.nFormNumber",
      title: "Form Number",
      filterPlaceholder: "Search...",
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
      field: "sAuthRegion",
      title: "Authority",
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
      field: "greenBookSerialNumber.remarks",
      title: "Remarks",
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
      field: "edit",
      title: "Edit",
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
    axios.post(`GreenBookSerialNumber/EditGreenbookSerialNumber/Id=` + gbSerialObj.id, gbSerialObj)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          //setResult(true);
          setEditModal(false);
          axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setdataAPI(resp.data);
                //setDataChanged(true);
              }
              else {
                console.log("Response received:\n", resp);
              }
            })
            .catch(error => {
              console.log(error.config);
              console.log(error.message);
            })
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
      })
  };

  useEffect(() => {
    axios.get(`GreenBookSerialNumber/GetGreenBookSerialNumbers/`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setdataAPI(resp.data);
          selectDatafunction();
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.config);
        console.log(error.message);
        setLoading(false);
      })
  }, []);

  return (
    <>
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
            title="Edit GreenBook Serial Number"
            columns={columns}
            data={dataAPI}
            options={oOptions}
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
                  tooltip: 'Show Filter',
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
        </Grid>
      </Grid>
    </>
  );
}