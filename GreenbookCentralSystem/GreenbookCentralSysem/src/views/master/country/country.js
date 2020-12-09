import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Grid, TextField
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { AddDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";
import MyComp from '../../common/filtercomponent';
import { oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessage, modifyHeaders } from "../../../config/commonConfig";
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles(() => ({
  /*root: {
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
*/
}));

export default function Country() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = React.useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [authRegions, setAuthRegions] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [countryID, setCountryID] = React.useState('');
  const [countryName, setCountryName] = React.useState('');
  const [countryPK, setCountryPK] = React.useState(0);
  const [countryObj, setCountryObj] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  let history = useHistory();
  const [isLoading, setisLoading] = React.useState(true);

  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const snackbarClose = () => {
    setSnackbar(false);
  };
  //#endregion

  const handleEditClickOpen = () => {
    setEditModal(true);
  };
  const handleEditClickClose = () => {
    setEditModal(false);
  };
  const handleAddClickOpen = () => {
    setAddModal(true);
  };
  const handleAddClickClose = () => {
    setAddModal(false);
  };

  //let myElement = null;
  const [myarray, setMyArray] = useState([]);
  // const [myElement, setMyElement] = useState(null);
  // const [myValue, setMyValue] = useState({});
  const [currId, setCurrId] = useState('');
  //let ele = null;
  const [searching, setSearching] = useState(false);
  //console.log("myarray: ", myarray);

  const buildArray = () => {
    let tmp = []
    if (columns) {
      columns.forEach(col => tmp.push({ id: col.field, val: '' }));
    }
    setMyArray(tmp);
  };

  const updateArray = (newObj) => {
    const newArray = myarray.map(d => {
      if (d.id === newObj.id) {
        return newObj;
      }
      else {
        return d;
      }
    });
    setMyArray(newArray);
  };

  const changeHandler = (e) => {
    updateArray({ id: e.target.id, val: e.target.value });
    //searchColumn(e.target.value, e.target);
    setSearching(true);
    //setMyElement(e.target);
    setCurrId(e.target.id);
    //setVal(e.target.value);
  };

  let tableRef = useRef(null);

  const columns = [
    {
      field: "id",
      title: "#",
      hidden: true,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "10%"
      },
      export: true
    },
    {
      field: "sCountryID",
      title: "COUNTRY ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "15%"
      },
      filterComponent: () =>
        <MyComp
          name="Country ID"
          field="sCountryID"
          changeHandler={changeHandler}
          myarray={myarray}
          updateArray={updateArray}
          currId={currId}
          key={"sCountryID"}
        />
    },
    {
      field: "sCountry",
      title: "COUNTRY",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "60%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "60%"
      },
      filterComponent: () =>
        <MyComp
          name="Country"
          field="sCountry"
          changeHandler={changeHandler}
          myarray={myarray}
          updateArray={updateArray}
          currId={currId}
          key={"sCountry"}
        />

    },
    {
      sorting: false,
      filtering: false,
      field: 'edit',
      title: 'EDIT',
      filtering: false,
      export: false,
      render: rowData => rowData.id == 0 ? "" : <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "10%"
      }
    },
    {
      field: "verifiedby",
      title: "Verified By",
      export: true,
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
      field: "reverifiedby",
      title: "Re-verified By",
      export: true,
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
  ];

  const editClick = (tableRowArray) => {
    setCountryPK(tableRowArray['id']);
    setCountryID(tableRowArray['sCountryID']);
    setCountryName(tableRowArray['sCountry']);
    setEditModal(true);
    setCountryObj({
      id: tableRowArray['id'],
      countryId: tableRowArray['sCountryID'],
      countryName: tableRowArray['sCountry'],
      nDefaultAuthRegionID: tableRowArray['nDefaultAuthRegionID']
    });
  };

  const editAPICall = (countryObj) => {
    setBackdrop(true);
    axios.post(`/Country/EditCountry/CountryID=` + countryPK, countryObj/*countryToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          setEditModal(false);
          setAlertMessage(sSnackbarUpdateMessage);
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              handleError(error, history);
            })
            .then(release => {
              //console.log(release); => udefined
            });

        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 403){
            console.log(error);
            setAlertMessage(error.response.data.detail.substring(1));
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };
  const addAPICall = (countryObj) => {
    setBackdrop(true);
    axios.post(`/Country/AddCountry/`, countryObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          setAlertMessage(sSnackbarAddMessage);
          setAlertType('success');
          snackbarOpen();
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setBackdrop(false);
              }
            })
            .catch(error => {
              handleError(error, history);
              setBackdrop(false);
            })
            .then(release => {
              //console.log(release); => udefined
            });
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 403){
            console.log(error);
            setAlertMessage(error.response.data.detail.substring(1));
            setAlertType("error");
            snackbarOpen();
            setBackdrop(false);
            return;
          }

        }
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setCountryPK(tableRowArray[0]);
    setCountryID(tableRowArray[1]);
    setCountryName(tableRowArray[2]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const deleteAPICall = () => {
    const countryToDelete = {
      ID: countryPK,
      sCountryID: countryID,
      sCountry: countryName,
    };
    axios.post(`/Country/DeleteCountry/`, countryToDelete)
      .then(resp => {
        console.log(countryToDelete);
        if (resp.status === 200) {
          setDeleteModal(false);
          axios.get(`/Country/GetCountries`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              handleError(error, history);
            })
            .then(release => {
              //console.log(release); => udefined
            });
          //window.location = window.location;
          // setdataAPI(dataAPI.filter((data) => {
          //   return (data.id !== countryToDelete.ID);
          // }));
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  // const sRow = { 
  //   sCountryID: <input type = 'text' placeholder= "&#xF002;" onKeyDown={searchID}/>,
  //   sCountry: <input type = 'text' placeholder= "&#xF002;" onKeyDown={searchColumn}/>
  // }


  const sRow = {
    id: 0,
    // sCountryID: <input type = 'text' placeholder= "&#xF002;" onKeyDown={searchID}
    // style={{fontFamily: 'FontAwesome'}}/>,
    sCountryID: (
      <div>
        <TextField
          id="countryID"
          label="Search by ID"
          onChange={((e) => { searchID(e) })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        /></div>),
    sCountry: (
      <div>
        <TextField
          id="countryName"
          label="Search by Name"
          onChange={((e) => { searchColumn(e) })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        /></div>),
    edit: ""
  };

  const searchID = ((e) => {
    console.log("Search ID: ", e.target.value);
    console.log("Search ID is : ", e.target.value);
    if (e.target.value != '') {
      axios.get(`/Country/SearchCountries/?sCountry=` + e.target.value)
        .then(resp => {
          if (resp.status === 200) {
            setdataAPI([sRow, ...resp.data]);
            setisLoading(false);
          }
        })
        .catch(error => {
          handleError(error, history);
        })
    }
    else {
      console.log("Resetting current data");
      axios.get(`/Country/GetCountries`)
        .then(resp => {
          if (resp.status === 200) {
            setdataAPI([sRow, ...resp.data]);
            setisLoading(false);

          }
        })
        .catch(error => {
          handleError(error, history);
        })

    }
    console.log("at the end...");
    return;
  });

  useEffect(() => {
    //console.log("Searching useEffect. Searching is", searching);
    if (searching) {
      let searchObj = {};
      myarray.map(item => {
        if (item.id === "id") {
          item.val = 0;
          //console.log("Changed id to", item.val);
        };
        searchObj = { ...searchObj, [item.id]: item.val };
      });
      //console.log("Search Object: Inside useEffect" , searchObj);
      axios.post(`/Country/SearchCountries/`, searchObj)
        .then(resp => {
          if (resp.status === 200) {
            //debugger
            //    console.log("Got filter Data");
            setdataAPI([...resp.data]);
            setSearching(false);
            //setTimeout(() => ele.focus(), 2000);

          }
          if (resp.status === 204) {
            //  console.log("Got  Empty data set");
            setdataAPI([...resp.data]);
            setSearching(false);
          }
        })
        .catch(error => {
          console.log(error.message);
          handleError(error, history);
        })
    }
  }, [myarray]);

  const searchColumn = (value, element) => {
    console.log("Search Name: ", value);
    console.log("Element is ", element);
    console.log("Array has values: ", myarray);
    let searchObj = {};
    myarray.map(item => {
      searchObj = { ...searchObj, [item.id]: item.val };
    });
    console.log("Search Object:", searchObj);
    //ele = element;
    //setisLoading(true);
    if (value != '') {
      axios.get(`/Country/SearchCountries/?sCountry=` + value)
        .then(resp => {
          if (resp.status === 200) {
            debugger
            console.log("Got filter Data");
            setdataAPI([...resp.data]);
            //setTimeout(() => ele.focus(), 2000);
          }
        })
        .catch(error => {
          handleError(error, history);
        })
    }
    else {
      console.log("Resetting current data");
      axios.get(`/Country/GetCountries`)
        .then(resp => {
          if (resp.status === 200) {
            setdataAPI([...resp.data]);
            setisLoading(false);
          }
        })
        .catch(error => {
          handleError(error, history);
        })
    }
  };

  console.log("DataAPI", dataAPI);

  useEffect(() => {
    buildArray();
    axios.get(`/Country/GetCountries`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI([...resp.data]);
          axios.get(`/AuthRegion/GetAuthRegions`)
            .then(resp => {
              if (resp.status === 200) {
                setAuthRegions(resp.data);
                setisLoading(false);
                modifyHeaders();
              }
            })
            .catch(error => {
              console.log(error.message);
            });
        }
      })
      .catch(error => {
        console.log(error.message);
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/* <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary"> Country</Typography>
        </Breadcrumbs> */}
      <Grid container className={classes.box} >
        <Grid item xs={12}>
          <MaterialTable
            key="CountryTable"
            tableRef={tableRef}
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="Country"
            columns={columns}
            data={dataAPI}
            // data={query =>
            //   new Promise((resolve, reject) => {
            //     let url = 'http://localhost:52013/api/Country/SearchCountries/?sCountry='  
            //     fetch(url)  
            //       .then(response => response.json())
            //       .then(json => {console.log(json);
            //         resolve({
            //         data: json,
            //         page: 0,
            //         totalCount: json.length,                  
            //       })})

            //   })
            // }

            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Country',
                isFreeAction: true,
                onClick: (event) => setAddModal(true)
              },
              {
                icon: oTableIcons.Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          // components={{
          //   FilterRow: props => 
          //   (
          //     <>

          //       <MTableFilterRow {...props} />

          //     </>
          //   )

          // }}
          />
        </Grid>
      </Grid>
      {addModal && <AddDialog
        addModal={addModal}
        classes={classes}
        handleAddClickClose={handleAddClickClose}
        addAPICall={addAPICall}
      />}
      {editModal && <EditDialog
        editModal={editModal}
        countryObj={countryObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
        authRegions={authRegions}
      />}
      { snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />
      }
      {backdrop && <BackdropComponent
        backdrop={backdrop}
      />}
      {/*{deleteModal && <DeleteDialog
        deleteModal={deleteModal}
        countryName={countryName}
        handleClose={handleClose}
        deleteAPICall={deleteAPICall}
      />}*/}
    </Container>
  );
}
