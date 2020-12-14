import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Table
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import { SaveDialog, EditDialog } from './dialog';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import SaveIcon from '@material-ui/icons/Save';
import { sDateFormat, sSnackbarAddMessage, sSnackbarUpdateMessage } from "../../../config/commonConfig";

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        color: 'blue',
        fontSize: 15
      }
    },
    MUIDataTableBodyCell: {
      root: {
        // backgroundColor: "#FFF",
        // width: "50px"
      }
    },
    MuiTableCell: {
      root: {
        padding: '0px',
        paddingLeft: '10px',
        paddingRight: '10px',
      }
    },
  }
});

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
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25,
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

export const IssueBookTable = (props) => {
  const [editModal, setEditModal] = React.useState(false);
  const [saveModal, setSaveModal] = React.useState(false);
  const [selectData, setSelectData] = useState([]);
  const [saveObj, setSaveObj] = useState([]);
  const [editObj, setEditObj] = useState([]);

  const hi = () => {
    console.log(props.gbId)
  };

  Moment.locale('en');
  const classes = useStyles();
  // const navigate = useNavigate();

  const [dataAPI, setdataAPI] = useState([]);

  const [historyData, setHistoryData] = useState([]);
  const [pendingData, setPendingData] = useState([]);


  //VAR

  const [historyTable, setHistoryTable] = React.useState(false);

  const [id, setId] = React.useState('');
  const [gbId, setGbId] = React.useState(props.gbId);
  const [formNumber, setFormNumber] = React.useState(0);
  const [authority, setAuthority] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const snackbarOpen = () => {
    console.log('alert');
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const historyGbId = () => {
    console.log('GBID:' + props.gbId);
    axios.get(`IssueBook/GetIssueBookJoin/GBId=` + props.gbId)
      .then(resp => {
        if (resp.status === 200) {
          setHistoryData(resp.data);
          //   setHistoryTable(true);
          // console.log(resp.data);
          // setdataAPI(resp.data)
          pendingGbId();
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const pendingGbId = () => {
    axios.get(`Madeb/GetMadebforIssueBook/GBId=` + props.gbId)
      .then(resp => {
        if (resp.status === 200) {
          setPendingData(resp.data);
          setHistoryTable(true);
          console.log(resp.data);
          // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const selectDatafunction = () => {
    axios.get(`Madeb/GetNewEmptyMadeb`)
      .then(resp => {
        if (resp.status === 200) {
          setSelectData(resp.data);

          // setdataAPI(resp.data)
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  };

  const saveClick = (row) => {
    // selectDatafunction();
    setSaveObj(row);
    setSaveModal(true);
  };
  const editClick = (row) => {
    // selectDatafunction();
    setEditObj(row);
    setEditModal(true);
  };
  const hello = () => {
    console.log(selectData);
    console.log(saveObj);
  };
  const editModalClose = () => {
    setEditModal(false);
  };
  const saveModalClose = () => {
    setSaveModal(false);
  };

  const saveAPICall = (obj, changeObj) => {
    setBackdrop(true);
    setSaveModal(false);
    console.log(obj);
    axios.post(`IssueBook/AddIssueBook/MadebId=` + changeObj.id + `&nIssuedOrNotID=` + changeObj.nIssuedOrNotID + `&dtIssuedDate=` + changeObj.dtIssuedDate, obj)
      .then(resp => {
        if (resp.status === 200) {
          saveModalClose();
          setBackdrop(false);
          setAlertMessage(sSnackbarAddMessage);
          setAlertType('success');
          snackbarOpen();
          historyGbId();
        }
      })
      .catch(error => {
        setBackdrop(false);
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });


  }

  const changeIssueTypeAPICall = (changeObj) => {
    axios.post(`Madeb/EditMadeb/Id=` + changeObj.id, changeObj)
      .then(resp => {
        if (resp.status === 200) {
          saveModalClose();
          setAlertMessage('Record Successfully Saved');
          setAlertType('success');
          snackbarOpen();
          historyGbId();
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }

  const editAPICall = (obj) => {
    setBackdrop(true);
    axios.post(`IssueBook/EditIssueBook/Id=` + obj.id, obj)
      .then(resp => {
        if (resp.status === 200) {
          editModalClose();
          setBackdrop(false);
          setAlertMessage(sSnackbarUpdateMessage);
          setAlertType('success');
          snackbarOpen();
          historyGbId();
        }
      })
      .catch(error => {
        setBackdrop(false);
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
        alert(error.message);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }
  useEffect(() => {
    setGbId(props.gbId);
    selectDatafunction();
    historyGbId();
  }, [props.gbId]);

  return (
    <>
      {
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <br />
            {historyTable && <>
              {historyData.length != 0 &&
                <Table className="table table-hover table-striped table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SR</th>
                      <th > Book Issued </th>
                      <th > Entered </th>
                      <th > Why </th>
                      <th > Where </th>
                      <th > Form No </th>
                      <th > Issued Yet? </th>
                      <th > Remark </th>
                      <th > Edit </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((row, index) => (
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td scope="row">{row.dtIssuedDate ? Moment(row.dtIssuedDate).format(sDateFormat) : ''}</td>
                        <td scope="row">{row.dtEntered ? Moment(row.dtEntered).format(sDateFormat) : ''}</td>
                        <td scope="row">{row.sMadebDisplayName}</td>
                        <td scope="row">{row.sAuthRegion}</td>
                        <td scope="row">{row.sFormNumber}</td>
                        <td scope="row">{row.sTypeIssued}</td>
                        <td scope="row">{row.sRemarks}</td>
                        <td scope="row">
                          <IconButton color="primary" onClick={() => { editClick(row) }} aria-label="upload picture" component="span" style={{ padding: '0px' }}>
                            <EditOutlinedIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>}
              {pendingData.length != 0 &&
                <Table className="table table-hover table-striped table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th > Madeb Date </th>
                      <th > Why </th>
                      <th > Where </th>
                      <th > Form No </th>
                      <th > Issued Yet? </th>
                      <th > Issue Book </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingData.map((row1, index) => (
                      <tr>
                        <td scope="row">{row1.dtReceived ? Moment(row1.dtReceived).format(sDateFormat) : ''}</td>
                        <td scope="row">{row1.sMadebDisplayName}</td>
                        <td scope="row">{row1.sAuthRegion}</td>
                        <td scope="row">{row1.nFormNumber}</td>
                        <td scope="row">{row1.sTypeIssued == null ? 'On Progress' : row1.sTypeIssued}</td>
                        <td scope="row">
                          <IconButton color="primary" onClick={() => { saveClick(row1) }} aria-label="upload picture" component="span" style={{ padding: '0px' }}>
                            <SaveIcon />
                          </IconButton>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </Table>}
            </>}
            {saveModal && <SaveDialog
              saveModal={saveModal}
              classes={classes}
              saveObj={saveObj}
              selectData={selectData}
              saveAPICall={saveAPICall}
              saveModalClose={saveModalClose}
            //addAPICall={addAPICall}
            />}
            {editModal && <EditDialog
              editModal={editModal}
              editObj={editObj}
              selectData={selectData}
              classes={classes}
              editModalClose={editModalClose}
              editAPICall={editAPICall}
            />}
            {snackbar && <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />}
            {backdrop && <BackdropComponent
              backdrop={backdrop}
            />}
          </Grid>
        </Grid>}
    </>
  );
}