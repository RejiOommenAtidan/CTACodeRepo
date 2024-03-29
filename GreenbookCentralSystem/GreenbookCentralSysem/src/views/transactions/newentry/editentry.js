import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  TextField,
  Table,
  IconButton
} from "@material-ui/core";
import stock from '../../../assets/images/No_person.jpg';
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddDocumentDialog, EditDocumentDialog } from "./dialogDocument";
import { AddChildDialog, EditChildDialog } from "./dialogChildren";
import { AddNoteDialog, EditNoteDialog } from "./dialogNote";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash/fp";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DateFnsUtils from "@date-io/date-fns";
import Moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import handleError from "../../../auth/_helpers/handleError";
import {
  sDateFormat,
  sDateFormatMUIDatepicker,
  sButtonColor,
  sButtonSize,
  sButtonVariant,
  sSnackbarAddMessage,
  sSnackbarUpdateMessage,
  sDDMMYYYYRegex,
  asterisk
} from "../../../config/commonConfig";
import { IssueBookTable } from "../issuebooktable";
import { Alerts } from '../../alerts';
import { BackdropComponent } from "../../backdrop/pageBackDrop";
import { BackdropComponent as BackdropDialogComponent } from "../../backdrop/index";

const useStyles = makeStyles({
  root: {
    height: "100%",
    paddingBottom: 3,
    paddingTop: 3,
    flexGrow: 1,
    "label + &": {
      marginTop: 3,
    },
  },
  selectEmpty: {
    marginTop: 1.5,
  },
  formControl: {
    margin: 2,
    width: "95%",
  },
  paper: {
    padding: 2,
    textAlign: "center",
  },
  textField: {
    marginTop: 0.15,
    marginBottom: 0.15,
  },
  textFieldLabel:{
    fontSize: '1.05rem'
  },
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25,
  },
  box: {
    marginBottom: 1.5,
    marginTop: 1.5,
  },
  button: {
    margin: 1,
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: "#11cb5f",
    },
  },
  heading: {
    fontSize: 15,
    fontWeight: 10,
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  border: "1px solid rgba(0, 0, 0, .125)",
  boxShadow: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&$expanded": {
    margin: "auto",
  },
  option: {
    fontSize: 10,
    "& > span": {
      marginRight: 5,
      fontSize: 16,
    },
  },
  expansionPanel: {
    backgroundColor: "#4e5287",
  },
  expansionHeading: {
    color: "#ffffff",
  },
});

export default function EditEntry(props) {
  Moment.locale("en");
  const classes = useStyles();
  let history = useHistory();
  const [expanded, setExpanded] = React.useState("");
  //Master List from API
  const [lAuthRegion, setlAuthRegion] = useState([]);
  const [lCountry, setlCountry] = useState([]);
  const [lDOBApprox, setlDOBApprox] = useState([]);
  const [lOccupation, setlOccupation] = useState([]);
  const [lProvince, setlProvince] = useState([]);
  const [lQualification, setlQualification] = useState([]);
  const [lMaritalStatus, setlMaritalStatus] = useState([]);

  //Linking Lists from API
  const [lGBChildren, setlGBChildren] = useState([]);
  const [lGBDocument, setlGBDocument] = useState([]);
  const [lGBNote, setlGBNote] = useState([]);

  //Note
  const [addNoteModal, setaddNoteModal] = useState(false);
  const [editNoteModal, seteditNoteModal] = useState(false);
  const [oNote, setoNote] = useState({});

  //Child
  const [addChildModal, setaddChildModal] = useState(false);
  const [editChildModal, seteditChildModal] = useState(false);
  const [oChild, setoChild] = useState({});

  //Document
  const [addDocumentModal, setaddDocumentModal] = useState(false);
  const [editDocumentModal, seteditDocumentModal] = useState(false);
  const [oDocument, setoDocument] = useState({});
  const [openDeleteDialog, setopenDeleteDialog] = React.useState(false);
  const [oDelete, setoDelete] = React.useState({});
  const handleDeleteDialogClickOpen = (rowObject) => {
    setopenDeleteDialog(true);
    setoDelete(rowObject);
  };

  //#region Alert & Snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(true);
  const [dialogBackdrop, setdialogBackdrop] = React.useState(false);
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

  const handleDeleteDialogClose = () => {
    setopenDeleteDialog(false);
    setoDelete({});
  };

  //Modal Functions - Note
  const handleEditNoteRowClick = (row) => {
    setoNote({
      id: row.id,
      sNote: row.sNote,
      sGBID: sGBID,
    });
    seteditNoteModal(true);
  };

  const handleAddNoteClickClose = () => {
    setaddNoteModal(false);
  };

  const addNoteAPICall = (sNote) => {
    let noteObj = {
      sGBID: sGBID,
      sNote: sNote,
      nEnteredBy: userId,
      nUpdatedBy: userId
    };
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/AddNote`, noteObj)
      .then((resp) => {
        if (resp.status === 200) {
          setlGBNote(resp.data);
          setaddNoteModal(false);
          setAlertMessage(sSnackbarAddMessage);
          setAlertType('success');
          snackbarOpen();
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  const handleEditNoteClickClose = () => {
    seteditNoteModal(false);
  };

  const editNoteAPICall = (oNote) => {
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/EditNote/Id=` + oNote.id, oNote)
      .then((resp) => {
        if (resp.status === 200) {
          setlGBNote(resp.data);
          seteditNoteModal(false);
          setAlertMessage(sSnackbarUpdateMessage);
          setAlertType('success');
          snackbarOpen();
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  //Modal Functions - Child
  const handleEditChildRowClick = (row) => {
    setoChild({
      id: row.id,
      sGBIDParent: row.sGBIDParent,
      sName: row.sName,
      dtDOB: row.dtDOB,
      sGender: row.sGender,
      sChildID: row.sChildID,
      sGBIDChild: row.sGBIDChild,
    });
    seteditChildModal(true);
  };

  const handleAddChildClickClose = () => {
    setaddChildModal(false);
  };

  const addChildAPICall = (childObj) => {
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/AddChild`, childObj)
      .then((resp) => {
        if (resp.status === 200) {
          setlGBChildren(resp.data);
          setaddChildModal(false);
          setAlertMessage(sSnackbarAddMessage);
          setAlertType('success');
          snackbarOpen();
          childObj.sGender === "M" ? setnChildrenM(nChildrenM + 1) : setnChildrenF(nChildrenF + 1);
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  const handleEditChildClickClose = () => {
    seteditChildModal(false);
  };

  const editChildAPICall = (childObj) => {
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/EditChild/Id=` + childObj.id, childObj)
      .then((resp) => {
        if (resp.status === 200) {
          setlGBChildren(resp.data);
          seteditChildModal(false);
          setAlertMessage(sSnackbarUpdateMessage);
          setAlertType('success');
          snackbarOpen();
          if (childObj.sGender === "M" && oChild.sGender === "F") {
            setnChildrenM(nChildrenM + 1);
            setnChildrenF(nChildrenF - 1);
          }
          if (childObj.sGender === "F" && oChild.sGender === "M") {
            setnChildrenM(nChildrenM - 1);
            setnChildrenF(nChildrenF + 1);
          }
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  //Modal Functions  - Document
  const handleEditDocumentRowClick = (row) => {
    setoDocument({
      id: row.id,
      sGBID: row.sGBID,
      sTitle: row.sTitle,
      sDocType: row.sDocType,
      binFileDoc: row.binFileDoc,
      sFileExtension: row.sFileExtension,
      nRegisterDate: row.nRegisterDate,
    });
    seteditDocumentModal(true);
  };

  const handleDeleteDocumentRowClick = () => {
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/DeleteDocument`, oDelete)
      .then((resp) => {
        if (resp.status === 200) {
          setlGBDocument(resp.data);
          handleDeleteDialogClose();
          setAlertMessage("Document Deleted Successfully");
          setAlertType('success');
          snackbarOpen();
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  const handleAddDocumentClickClose = () => {
    setaddDocumentModal(false);
  };

  const addDocumentAPICall = (documentObject) => {
    //console.log(documentObject);
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/AddDocumentForEdit`, documentObject)
      .then((resp) => {
        if (resp.status === 200) {
          if(resp.data === 'Invalid File'){
            setdialogBackdrop(false);
            setAlertMessage("Invalid File format. Please upload a valid file.");
            setAlertType('error');
            snackbarOpen();
            return;
          }
          setlGBDocument(resp.data);
          setaddDocumentModal(false);
          setAlertMessage(sSnackbarAddMessage);
          setAlertType('success');
          snackbarOpen();
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  const handleEditDocumentClickClose = () => {
    seteditDocumentModal(false);
  };

  const editDocumentAPICall = (documentObject) => {
    setdialogBackdrop(true);
    axios
      .post(`/Greenbook/EditDocument/Id=` + documentObject.id, documentObject)
      .then((resp) => {
        if (resp.status === 200) {
          if(resp.data === 'Invalid File'){
            setdialogBackdrop(false);
            setAlertMessage("Invalid File format. Please upload a valid file.");
            setAlertType('error');
            snackbarOpen();
            return;
          }
          setlGBDocument(resp.data);
          seteditDocumentModal(false);
          setAlertMessage(sSnackbarUpdateMessage);
          setAlertType('success');
          snackbarOpen();
          setdialogBackdrop(false);
        }
      })
      .catch((error) => {
        setdialogBackdrop(false);
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  //VARS to track
  const [Id, setnId] = useState("");
  const [sGBID, setsGBID] = useState("");
  const [nAuthRegionID, setnAuthRegionID] = useState("");
  const [sFirstName, setsFirstName] = useState("");
  const [sLastName, setsLastName] = useState("");
  const [sFamilyName, setsFamilyName] = useState("");
  const [sGender, setsGender] = useState("");
  const [dtDOB, setdtDOB] = useState(new Date());
  const [sDOBApprox, setsDOBApprox] = useState("");
  const [sBirthPlace, setsBirthPlace] = useState("");
  const [sBirthCountryID, setsBirthCountryID] = useState("");
  const [sOriginVillage, setsOriginVillage] = useState("");
  const [sOriginProvinceID, setsOriginProvinceID] = useState("");
  const [sMarried, setsMarried] = useState("");
  const [sOtherDocuments, setsOtherDocuments] = useState("");
  const [sResidenceNumber, setsResidenceNumber] = useState("");
  const [sQualificationID, setsQualificationID] = useState("");
  const [sOccupationID, setsOccupationID] = useState("");
  const [sAliasName, setsAliasName] = useState("");
  const [sOldGreenBKNo, setsOldGreenBKNo] = useState("");
  const [sFstGreenBkNo, setsFstGreenBkNo] = useState("");
  const [dtFormDate, setdtFormDate] = useState(new Date());
  const [sFathersName, setsFathersName] = useState("");
  const [sFathersID, setsFathersID] = useState("");
  const [sFathersGBID, setsFathersGBID] = useState("");
  const [sMothersName, setsMothersName] = useState("");
  const [sMothersID, setsMothersID] = useState("");
  const [sMothersGBID, setsMothersGBID] = useState("");
  const [sSpouseName, setsSpouseName] = useState("");
  const [sSpouseID, setsSpouseID] = useState("");
  const [sSpouseGBID, setsSpouseGBID] = useState("");
  const [nChildrenM, setnChildrenM] = useState();
  const [nChildrenF, setnChildrenF] = useState();
  const [sAddress1, setsAddress1] = useState("");
  const [sAddress2, setsAddress2] = useState("");
  const [sCity, setsCity] = useState("");
  const [sState, setsState] = useState("");
  const [sPCode, setsPCode] = useState("");
  const [sCountryID, setsCountryID] = useState("");
  const [sEmail, setsEmail] = useState("");
  const [sPhone, setsPhone] = useState("");
  const [sFax, setsFax] = useState("");
  const [dtDeceased, setdtDeceased] = useState(new Date());
  const [sBookIssued, setsBookIssued] = useState("");
  const [dtValidityDate, setdtValidityDate] = useState(new Date());
  const [sPaidUntil, setsPaidUntil] = useState("");
  const [sEnteredDateTime, setsEnteredDateTime] = useState("");
  const [TibetanName, setTibetanName] = useState("");
  const [TBUPlaceOfBirth, setTBUPlaceOfBirth] = useState("");
  const [TBUOriginVillage, setTBUOriginVillage] = useState("");
  const [TBUFathersName, setTBUFathersName] = useState("");
  const [TBUMothersName, setTBUMothersName] = useState("");
  const [TBUSpouseName, setTBUSpouseName] = useState("");
  const [enterUserId, setEnterUserId] = useState();
  const [enterUserName, setEnterUserName] = useState();
  const [sLoginGmail, setLoginGmail] = useState(null);
  

  const [enteredOn, setEnteredOn] = useState();
  const [allDone, setAllDone] = useState(false);

  const [profilePic, setProfilePic] = React.useState(null);
  const userId = useSelector(
    (state) => state.UserAuthenticationReducer.oUserAuth.oUser.id
  );

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios
      .get(`/Greenbook/GetGBDataEditEntry/`)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          //Masters
          setlAuthRegion(resp.data.lAuthRegion);
          setlCountry(resp.data.lCountry);
          setlDOBApprox(resp.data.lDOBApprox);
          setlOccupation(resp.data.lOccupation);
          setlProvince(resp.data.lProvince);
          setlQualification(resp.data.lQualification);
          setlMaritalStatus(resp.data.lMaritalStatuses);
          //Get GB Details
          //axios.get(`/Greenbook/GetGreenbook/Id=` + props.match.params.GBID.toString())
          //axios.get(`/Greenbook/GetGreenbook/sGBID=`+props.match.params.GBID.toString())
          axios.get(`/Greenbook/GetGreenbook/Id=` + props.location.state.Id.toString())
            .then((resp) => {
              if (resp.status === 200) {
                console.log("Resp.data object ", resp.data);
                setnId(resp.data.id);
                setsGBID(resp.data.sGBID);
                setnAuthRegionID(resp.data.nAuthRegionID);
                setsFirstName(resp.data.sFirstName);
                setsLastName(resp.data.sLastName);
                setsFamilyName(resp.data.sFamilyName);
                setsGender(resp.data.sGender);
                setdtDOB(resp.data.dtDOB);
                setsDOBApprox(resp.data.sDOBApprox);
                setsBirthPlace(resp.data.sBirthPlace);
                setsBirthCountryID(resp.data.sBirthCountryID);
                setsOriginVillage(resp.data.sOriginVillage);
                setsOriginProvinceID(resp.data.sOriginProvinceID);
                setsMarried(resp.data.sMarried === "Y" ? "M" : resp.data.sMarried);
                setsOtherDocuments(resp.data.sOtherDocuments);
                setsResidenceNumber(resp.data.sResidenceNumber);
                setsQualificationID(resp.data.sQualificationID);
                setsOccupationID(resp.data.sOccupationID);
                setsAliasName(resp.data.sAliasName);
                setsOldGreenBKNo(resp.data.sOldGreenBKNo);
                setsFstGreenBkNo(resp.data.sFstGreenBkNo);
                setdtFormDate(resp.data.dtFormDate);
                setsFathersName(resp.data.sFathersName);
                setsFathersID(resp.data.sFathersID);
                setsFathersGBID(resp.data.sFathersGBID);
                setsMothersName(resp.data.sMothersName);
                setsMothersID(resp.data.sMothersID);
                setsMothersGBID(resp.data.sMothersGBID);
                setsSpouseName(resp.data.sSpouseName);
                setsSpouseID(resp.data.sSpouseID);
                setsSpouseGBID(resp.data.sSpouseGBID);
                setnChildrenM(resp.data.nChildrenM);
                setnChildrenF(resp.data.nChildrenF);
                setsAddress1(resp.data.sAddress1);
                setsAddress2(resp.data.sAddress2);
                setsCity(resp.data.sCity);
                setsState(resp.data.sState);
                setsPCode(resp.data.sPCode);
                setsCountryID(resp.data.sCountryID);
                setsEmail(resp.data.sEmail);
                setsPhone(resp.data.sPhone);
                setsFax(resp.data.sFax);
                setdtDeceased(resp.data.dtDeceased);
                setsBookIssued(resp.data.sBookIssued);
                setdtValidityDate(resp.data.dtValidityDate);
                setsPaidUntil(resp.data.sPaidUntil);
                setsEnteredDateTime(resp.data.sEnteredDateTime);
                setTibetanName(resp.data.tibetanName);
                setTBUPlaceOfBirth(resp.data.tbuPlaceOfBirth);
                setTBUOriginVillage(resp.data.tbuOriginVillage);
                setTBUFathersName(resp.data.tbuFathersName);
                setTBUMothersName(resp.data.tbuMothersName);
                setTBUSpouseName(resp.data.tbuSpouseName);
                setLoginGmail(resp.data.sLoginGmail);
                setEnterUserId(resp.data.nEnteredBy);
                setEnteredOn(resp.data.dtEntered);
                //debugger;
                axios
                  .get(
                    `/Greenbook/GetGBLinkDataByGBID/sGBID=` + resp.data.sGBID
                  )
                  .then((resp) => {
                    if (resp.status === 200) {
                      console.log(resp.data)
                      setlGBChildren(resp.data.lGBChildren);
                      setlGBDocument(resp.data.lGBDocument);
                      if (resp.data.lGBDocument) {
                        resp.data.lGBDocument.map((row, index) => {
                          if (row.sDocType === "Photo Identity") {
                            setProfilePic("data:image/" + row.sFileExtension + ";base64," + row.binFileDoc);
                          }
                        })
                      }
                      setlGBNote(resp.data.lGBNote);
                      setExpanded("panel1");
                      setAllDone(true);
                      setBackdrop(false);
                     
                    }
                  })
                  .catch((error) => {
                    handleError(error, history);
                  })
                  .then((release) => {
                    //console.log(release); => udefined
                  });
              }
            })
            .catch((error) => {
              console.log(error.message);
              handleError(error, history);
            })
            .then((release) => {
              //console.log(release); => udefined
            });
        }
      })
      .catch((error) => {
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  }, []);

  useEffect(() => {
    if (allDone && enterUserId) {
      axios.get(`/User/GetUserForEditGB/?Id=${enterUserId}`)
      .then(resp => {
        if (resp.status === 200) {
          console.log("User fetched:", resp.data);
          setEnterUserName(resp.data);
        }
      })
      .catch(error => {
        console.log(error.message);
      })
    }


  }, [allDone, enterUserId]);

  const { register, handleSubmit, errors, setValue, formState } = useForm();


  const RelationObj = [
    {
      sGBID: sGBID,
      sGBIDRelation: sFathersGBID,
      nRelationID: 1
    },
    {
      sGBID: sGBID,
      sGBIDRelation: sMothersGBID,
      nRelationID: 2
    },
    {
      sGBID: sGBID,
      sGBIDRelation: sSpouseGBID,
      nRelationID: 3
    }
  ]
  const onSubmit = () => {
    //e.preventDefault();
    setBackdrop(true);
    const RelationObj = [
      {
        sGBID: sGBID,
        sGBIDRelation: sFathersGBID,
        nRelationID: 1,
        nUpdatedBy: userId
      },
      {
        sGBID: sGBID,
        sGBIDRelation: sMothersGBID,
        nRelationID: 2,
        nUpdatedBy: userId,
      },
      {
        sGBID: sGBID,
        sGBIDRelation: sSpouseGBID,
        nRelationID: 3,
        nUpdatedBy: userId
      }
    ]
    console.log(nChildrenF);
    console.log(nChildrenM);
    debugger;
    let greenbook = {
      Id,
      sGBID,
      nAuthRegionID,
      sFirstName,
      sLastName,
      sFamilyName,
      sGender,
      dtDOB: Moment(dtDOB).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtDOB).format('YYYY-MM-DD') : null,
      //dtDOB,
      sDOBApprox,
      sBirthPlace,
      sBirthCountryID,
      sOriginVillage,
      sOriginProvinceID,
      sMarried,
      sOtherDocuments,
      sResidenceNumber,
      sQualificationID,
      sOccupationID,
      sAliasName,
      sOldGreenBKNo,
      sFstGreenBkNo,
      dtFormDate: Moment(dtFormDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtFormDate).format('YYYY-MM-DD') : null,
      //dtFormDate,
      sFathersName,
      sFathersID,
      sFathersGBID,
      sMothersName,
      sMothersID,
      sMothersGBID,
      sSpouseName,
      sSpouseID,
      sSpouseGBID,
      nChildrenM,
      nChildrenF,
      sAddress1,
      sAddress2,
      sCity,
      sState,
      sPCode,
      sCountryID,
      sEmail,
      sLoginGmail,
      sPhone,
      sFax,
      dtDeceased: Moment(dtDeceased).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtDeceased).format('YYYY-MM-DD') : null,
      //dtDeceased,
      sBookIssued,
      dtValidityDate: Moment(dtValidityDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtValidityDate).format('YYYY-MM-DD') : null,
      //dtValidityDate,
      sPaidUntil,
      sEnteredDateTime,
      TibetanName,
      TBUPlaceOfBirth,
      TBUOriginVillage,
      TBUFathersName,
      TBUMothersName,
      TBUSpouseName,
      nUpdatedBy: userId,
    };
    console.log(greenbook);
    debugger;
    axios
      .post(
        `/Greenbook/EditGreenbook/Id=` + props.location.state.Id.toString(),
        greenbook
      )
      .then((resp) => {
        if (resp.status === 200) {
          axios.post(`/GBRelation/HandleGreenBookUpdate`, RelationObj)
            .then((resp) => {
              if (resp.status === 200) {
                setAlertMessage(sSnackbarUpdateMessage + " Hold on being Redirected");
                setAlertType('success');
                snackbarOpen();
                setBackdrop(false);
                setTimeout(() => { history.push("/Greenbooks"); }, 1500);
              }
            })
            .catch((error) => {
              handleError(error, history);
            })
            .then((release) => {
              //console.log(release); => udefined
            });
        }
      })
      .catch((error) => {
        handleError(error, history);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  return (
    <Container maxWidth="lg" disableGutters={true}>
      <br />
      <Typography variant="h5" gutterBottom>
        Edit Green Book - {sGBID} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Entered By: {enterUserName} &nbsp;&nbsp;&nbsp;On: {Moment(enteredOn).format('DD-MM-YYYY')})
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.box}>
        <Grid container className={classes.box}>
          <Grid item xs={12}>
            <ExpansionPanel
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionHeading} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography className={classes.expansionHeading}>
                  Personal Information
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sGBID"
                        name="name_sGBID"

                        label={<>Green Book ID <span style={{ color: 'red' }}> *</span></>}
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem',
                          }
                        }}
                        type="text"
                        value={sGBID}
                        onChange={(e) => {
                          setsGBID(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        inputRef={register({
                          required: true,
                          //minLength: 7,
                          maxLength: 7,
                        })}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      {_.get("name_sGBID.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                      {_.get("name_sGBID.type", errors) === "maxLength" && (
                        <span style={{ color: "red" }}>
                          GBID cannot exceed 7 characters
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lAuthRegion.find(
                          (authRegion) => authRegion.id === nAuthRegionID
                        )}
                        openOnFocus
                        clearOnEscape
                        onChange={(e, value) => {
                          if (value !== null) {
                            setnAuthRegionID(value.id);
                          } else {
                            setnAuthRegionID(0);
                          }
                        }}
                        id="id_nAuthRegionID"
                        options={lAuthRegion}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sAuthRegion}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sAuthRegion}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={<>Authority Region <span style={{ color: 'red' }}> *</span></>}
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem',
                              }
                            }}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                            name="name_nAuthRegionID"
                            inputRef={register({
                              required: true,
                            })}
                          />
                        )}
                      />
                      {_.get("name_nAuthRegionID.type", errors) ===
                        "required" && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sFirstName"

                        label={<>First Name {asterisk}</>}
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem',
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsFirstName(e.target.value);
                        }}
                        fullWidth
                        autoFocus
                        margin="dense"
                        className={classes.textField}
                        value={sFirstName}
                        name="name_sFirstName"
                        inputRef={register({
                          required: true,
                        })}
                      />
                      {_.get("name_sFirstName.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sLastName"
                        label={<span style={{fontSize: '1.05rem'}}>Last Name</span>}
                        type="text"
                        onChange={(e) => {
                          setsLastName(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        value={sLastName}
                        className={classes.textField}
                        inputProps={{

                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sFamilyName"
                        label="Family Name"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsFamilyName(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        value={sFamilyName}
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sAliasName}
                        id="id_sAliasName"
                        label={<span style={{fontSize: '1.05rem'}}>Alias Name</span>}
                        type="text"
                        onChange={(e) => {
                          setsAliasName(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        value={sAliasName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TibetanName"
                        name="name_TibetanName"
                        label={<>མིང་།</>}
                        type="text"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.8rem',
                          }
                        }}
                        inputProps={{
                          style:{
                            fontSize: '1.4rem'
                          }
                        }}
                        onChange={(e) => {
                          setTibetanName(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        value={TibetanName}
                        className={classes.textField}
                        // inputRef={register({
                        //   required: true,
                        // })}
                      />
                      {/* {_.get("name_TibetanName.type", errors) ===
                        "required" && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )} */}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUPlaceOfBirth"

                          //label={<>སྐྱེས་ཡུལ།<span style={{ color: 'red' }}> *</span></>}
                          label={<>སྐྱེས་ཡུལ།</>}
                          InputLabelProps={{
                            style:{
                              fontSize: '1.8rem'
                            }
                          }}
                          inputProps={{
                            style:{
                              fontSize: '1.4rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setTBUPlaceOfBirth(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          value={TBUPlaceOfBirth}
                          className={classes.textField}
                          // inputRef={register({
                          //   required: true,
                          // })}
                          name="name_TBUPlaceOfBirth"
                        />
                        {/* {_.get("name_TBUPlaceOfBirth.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_TBUOriginVillage"

                          //label={<> ཕ་ཡུལ།<span style={{ color: 'red' }}> *</span></>}
                          label={<> ཕ་ཡུལ།</>}
                          InputLabelProps={{
                            style:{
                              fontSize: '1.8rem'
                            }
                          }}inputProps={{
                            style:{
                              fontSize: '1.4rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setTBUOriginVillage(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          name="name_TBUOriginVillage"
                          // inputRef={register({
                          //   required: true,
                          // })}
                          value={TBUOriginVillage}
                        />
                        {/* {_.get("name_TBUOriginVillage.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            placeholder="DD-MM-YYYY"
                            autoOk
                            variant="dialog"
                            //openTo="year"
                            //views={["year", "month", "date"]}
                            margin="dense"
                            id="id_dtDOB"
                            name="name_dtDOB"
                            inputRef={register({
                              required: true,
                              pattern:
                              {
                                value: new RegExp(sDDMMYYYYRegex),
                                message: "Invalid Date"
                              }
                            })}
                            label={<> Date of Birth<span style={{ color: 'red' }}> *</span></>}
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            format={sDateFormatMUIDatepicker}
                            returnMoment={true}
                            onChange={date => {
                              //console.log(date.toISOString().split("T")[0]);
                              //console.log(date.toDateString());
                              // console.log(date.toLocaleDateString());
                              //console.log(date);
                              if (date) {
                                setdtDOB(date);
                                setValue('name_dtDOB', date, { shouldValidate: true });
                              }
                            }}
                            value={dtDOB}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                            fullWidth
                            className={classes.dateField}
                          />
                        </MuiPickersUtilsProvider>
                        {_.get("name_dtDOB.type", errors) === "required" && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <Autocomplete
                          value={lDOBApprox.find(
                            (dobapprox) => dobapprox.sDOBApproxID === sDOBApprox
                          )}
                          openOnFocus
                          clearOnEscape
                          onChange={(e, value) => {
                            if (value !== null) {
                              setsDOBApprox(value.sDOBApproxID);
                            } else {
                              setsDOBApprox("");
                            }
                          }}
                          id="id_sDOBApprox"
                          options={lDOBApprox}
                          classes={{
                            option: classes.option,
                          }}
                          className={classes.textField}
                          autoHighlight
                          getOptionLabel={(option) => option.sDOBApproxName}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{option.sDOBApproxName}</span>
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="DOB Approx"
                              variant="standard"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                              }}
                              InputLabelProps={{
                                style:{
                                  fontSize: '1.05rem'
                                }
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <Autocomplete
                          value={lCountry.find(
                            (birthCountry) =>
                              birthCountry.sCountryID === sBirthCountryID
                          )}
                          openOnFocus
                          clearOnEscape
                          onChange={(e, value) => {
                            if (value !== null) {
                              setsBirthCountryID(value.sCountryID);
                            } else {
                              setsBirthCountryID("");
                            }
                          }}
                          id="id_sBirthCountryID"
                          options={lCountry}
                          classes={{
                            option: classes.option,
                          }}
                          className={classes.textField}
                          autoHighlight
                          getOptionLabel={(option) => option.sCountry}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{option.sCountry}</span>
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose a Birth Country"
                              //label={<>Choose a Birth Country <span style={{ color: 'red' }}> *</span></>}
                              label={<>Choose a Birth Country</>}
                              InputLabelProps={{
                                style:{
                                  fontSize: '1.05rem'
                                }
                              }}
                              variant="standard"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                              }}
                              name="name_sBirthCountryID"
                              // inputRef={register({
                              //   required: true,
                              // })}
                            />
                          )}
                        />
                        {/* {_.get("name_sBirthCountryID.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sBirthPlace}
                          id="id_sBirthPlace"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          //label={<>Place of Birth <span style={{ color: 'red' }}> *</span></>}
                          label={<>Place of Birth</>}
                          type="text"
                          onChange={(e) => {
                            setsBirthPlace(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          name="name_sBirthPlace"
                          // inputRef={register({
                          //   required: true,
                          // })}
                        />
                        {/* {_.get("name_sBirthPlace.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <Autocomplete
                          value={lCountry.find(
                            (country) => country.sCountryID === sCountryID
                          )}
                          openOnFocus
                          clearOnEscape
                          onChange={(e, value) => {
                            if (value !== null) {
                              setsCountryID(value.sCountryID);
                            } else {
                              setsCountryID("");
                            }
                          }}
                          id="id_sCountryID"
                          options={lCountry}
                          classes={{
                            option: classes.option,
                          }}
                          className={classes.textField}
                          autoHighlight
                          getOptionLabel={(option) => option.sCountry}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{option.sCountry}</span>
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              InputLabelProps={{
                                style:{
                                  fontSize: '1.05rem'
                                }
                              }}
                              label={<>Country <span style={{ color: 'red' }}> *</span></>}
                              variant="standard"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                              }}
                              name="name_sCountryID"
                              inputRef={register({
                                required: true,
                              })}
                            />
                          )}
                        />
                        {_.get("name_sCountryID.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sPCode}
                          id="id_sPCode"
                          label="Pin Code"
                          type="text"
                          onChange={(e) => {
                            setsPCode(e.target.value);
                          }}
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sCity}
                        id="id_sCity"
                        label="City"
                        type="text"
                        onChange={(e) => {
                          setsCity(e.target.value);
                        }}
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD-MM-YYYY"
                          disabled={true}
                          variant="dialog"
                          //openTo="year"
                          //views={["year", "month", "date"]}
                          margin="dense"
                          id="id_dtFormDate"
                          name="name_dtFormDate"

                          //label={<>Application Date <span style={{ color: 'red' }}> *</span></>}
                          label={<>Application Date</>}
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          format={sDateFormatMUIDatepicker}
                          onChange={(date) => {
                            setdtFormDate(date);
                          }}
                          value={dtFormDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          // inputRef={register({
                          //   required: true,
                          // })}
                          fullWidth
                          className={classes.dateField}
                        />
                      </MuiPickersUtilsProvider>
                      {/* {_.get("name_dtFormDate.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )} */}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} >
                    <div className="avatar-icon-wrapper  mx-auto">
                      <div className="d-block p-0 avatar-icon-wrapper m-0 border-3">
                        <div className=" border-3 border-white overflow-hidden">
                          <img alt="..." className="img-fluid" style={{ width: '95px', height: '135px' }} src={profilePic ? profilePic : stock} />
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sFathersName}
                          id="id_sFathersName"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          //label={<>Father's Name <span style={{ color: 'red' }}> *</span></>}
                          label={<>Father's Name</>}
                          type="text"
                          onChange={(e) => {
                            setsFathersName(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          // inputRef={register({
                          //   required: true,
                          // })}
                          value={sFathersName}
                          name="name_sFathersName"
                        />
                        {/* {_.get("name_sFathersName.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sFathersGBID}
                          id="id_sFathersGBID"
                          name="name_sFathersGBID"
                          label="Father's GB No"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setsFathersGBID(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          inputRef={register({
                            //minLength: 7,
                            maxLength: 7,
                            //pattern: /^[1-9][0-9]+$/
                          })}
                        />
                        {/*{_.get("name_sFathersGBID.type", errors) ===
                          "minLength" && (
                            <span style={{ color: "red" }}>
                              Father's GB ID cannot subceed 7 characters
                            </span>
                          )}*/}
                        {_.get("name_sFathersGBID.type", errors) ===
                          "maxLength" && (
                            <span style={{ color: "red" }}>
                              Father's GB ID cannot exceed 7 characters
                            </span>
                          )}
                          {/* {_.get("name_sFathersGBID.type", errors) ===
                          "pattern" && (
                            <span style={{ color: "red" }}>
                              Only numbers allowed
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TBUFathersName"
                        //label={<>ཕ་མིང་།<span style={{ color: 'red' }}> *</span></>}
                        label={<>ཕ་མིང་</>}
                        type="text"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.8rem'
                          }
                        }}
                        onChange={(e) => {
                          setTBUFathersName(e.target.value);
                        }}
                        inputProps={{
                          style:{
                            fontSize: '1.4rem'
                          }
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_TBUFathersName"
                        value={TBUFathersName}
                        // inputRef={register({
                        //   required: true,
                        // })}
                      />
                      {/* {_.get("name_TBUFathersName.type", errors) ===
                        "required" && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )} */}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="id_sMothersName"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          //label={<>Mother's Name <span style={{ color: 'red' }}> *</span></>}
                          label={<>Mother's Name</>}
                          type="text"
                          onChange={(e) => {
                            setsMothersName(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          name="name_sMothersName"
                          value={sMothersName}
                          // inputRef={register({
                          //   required: true,
                          // })}
                        />
                        {/* {_.get("name_sMothersName.type", errors) ===
                          "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sMothersGBID}
                          id="id_sMothersGBID"
                          name="name_sMothersGBID"
                          label="Mother's GB No"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setsMothersGBID(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          inputRef={register({
                            //minLength: 7,
                            maxLength: 7,
                            //pattern: /^[0-9][1-9]+$/
                          })}
                        />
                        {/*{_.get("name_sMothersGBID.type", errors) ===
                          "minLength" && (
                            <span style={{ color: "red" }}>
                              Mother's GB ID cannot subceed 7 characters
                            </span>
                          )}*/}
                        {_.get("name_sMothersGBID.type", errors) ===
                          "maxLength" && (
                            <span style={{ color: "red" }}>
                              Mother's GB ID cannot exceed 7 characters
                            </span>
                          )}
                          {/* {_.get("name_sMothersGBID.type", errors) ===
                          "pattern" && (
                            <span style={{ color: "red" }}>
                              Only numbers allowed
                            </span>
                          )} */}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_TBUMothersName"

                        //label={<>མ་མིང་།<span style={{ color: 'red' }}> *</span></>}
                        label={<>མ་མིང་</>}
                        InputLabelProps={{
                          style:{
                            fontSize: '1.8rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setTBUMothersName(e.target.value);
                        }}
                        inputProps={{
                          style:{
                            fontSize: '1.4rem'
                          }
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_TBUMothersName"
                        value={TBUMothersName}
                        // inputRef={register({
                        //   required: true,
                        // })}
                      />
                      {/* {_.get("name_TBUMothersName.type", errors) ===
                        "required" && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )} */}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sFathersID}
                          id="id_sFathersID"
                          label="Father's Old GB No"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setsFathersID(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sMothersID}
                          id="id_sMothersID"
                          label="Mother's Old GB No"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setsMothersID(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sAddress1"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        //label={<>Address 1 <span style={{ color: 'red' }}> *</span></>}
                        label={<>Address 1</>}
                        type="text"
                        onChange={(e) => {
                          setsAddress1(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        multiline={true}
                        rows={1}
                        rowsMax={3}
                        name="name_sAddress1"
                        value={sAddress1}
                        // inputRef={register({
                        //   required: true,
                        // })}
                      />
                      {/* {_.get("name_sAddress1.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )} */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sAddress2}
                        id="id_sAddress2"
                        label="Address 2"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsAddress2(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        multiline={true}
                        rows={1}
                        rowsMax={3}
                      />
                    </FormControl>
                  </Grid>


                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="id_sState"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        //label={<>State <span style={{ color: 'red' }}> *</span></>}
                        label={<>State</>}
                        type="text"
                        onChange={(e) => {
                          setsState(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        name="name_sState"
                        // inputRef={register({
                        //   required: true,
                        // })}
                        value={sState}
                      />
                      {/* {_.get("name_sState.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )} */}
                    </FormControl>
                  </Grid>


                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12}>
            <ExpansionPanel
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel2"}
              onChange={handleAccordionChange("panel2")}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionHeading} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography className={classes.expansionHeading}>
                  Basic Personal Information
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={6}>
                  {/* <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sAliasName}
                        id="id_sAliasName"
                        label="Alias Name"
                        type="text"
                        onChange={(e) => {
                          setsAliasName(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                        value={sAliasName}
                      />
                    </FormControl>
                  </Grid>*/}
                  <Grid xs={12} style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="id_sGender">Gender</InputLabel>
                        <Select
                          value={sGender}
                          id="id_sGender"
                          label="Gender"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                          onChange={(e) => {
                            setsGender(e.target.value);
                          }}
                        >
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sPaidUntil}
                          id="id_sPaidUntil"
                          label="Paid Until"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setsPaidUntil(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lProvince.find(
                          (province) =>
                            province.id.toString() === sOriginProvinceID
                        )}
                        openOnFocus
                        clearOnEscape
                        onChange={(e, value) => {
                          if (value !== null) {
                            setsOriginProvinceID(value.id.toString());
                          } else {
                            setsOriginProvinceID("0");
                          }
                        }}
                        id="id_sOriginProvinceID"
                        options={lProvince}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sProvince}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sProvince}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Province Name"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sFstGreenBkNo}
                        id="id_sFstGreenBkNo"
                        label="First GB Number"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsFstGreenBkNo(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        value={sFstGreenBkNo}
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lQualification.find(
                          (qualification) =>
                            qualification.sQualificationID === sQualificationID
                        )}
                        openOnFocus
                        clearOnEscape
                        onChange={(e, value) => {
                          if (value !== null) {
                            setsQualificationID(value.sQualificationID);
                          } else {
                            setsQualificationID("");
                          }
                        }}
                        id="id_sQualificationID"
                        options={lQualification}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sQualification}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sQualification}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Qualification"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sOtherDocuments}
                        id="id_sDocuments"
                        label="Other Documents"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsOtherDocuments(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        value={sOtherDocuments}
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="id_sMarried">Marital Status</InputLabel>
                      <Select
                        value={sMarried}
                        id="id_sMarried"
                        label="Marital Status"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsMarried(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                      >

                        {lMaritalStatus.map((element, index) => (
                          <MenuItem value={element.sMaritalStatusId}>{element.sMaritalStatusText}</MenuItem>

                        ))}

                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD-MM-YYYY"
                          variant="dialog"
                          //openTo="year"
                          //views={["year", "month", "date"]}
                          autoOk
                          margin="dense"
                          id="id_dtValidityDate"
                          name="name_dtValidityDate"
                          label="Validity Date"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          format={sDateFormatMUIDatepicker}
                          onChange={date => {
                            if (date) {
                              setdtValidityDate(date);
                              setValue('name_dtValidityDate', date, { shouldValidate: true });
                            }
                          }
                          }
                          value={dtValidityDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          inputRef={register({
                            pattern:
                            {
                              value: new RegExp(sDDMMYYYYRegex),
                              message: "Invalid Date"
                            }
                          })}
                          fullWidth
                          className={classes.dateField}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  {/*<Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lDOBApprox.find(
                          (dobapprox) => dobapprox.sDOBApproxID === sDOBApprox
                        )}
                        openOnFocus
                        clearOnEscape
                        onChange={(e, value) => {
                          if (value !== null) {
                            setsDOBApprox(value.sDOBApproxID);
                          } else {
                            setsDOBApprox("");
                          }
                        }}
                        id="id_sDOBApprox"
                        options={lDOBApprox}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sDOBApproxName}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sDOBApproxName}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="DOB Approx"
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                    </FormControl>
                          </Grid>*/}
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sOriginVillage}
                        id="id_sOriginVillage"
                        label="Origin Village"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsOriginVillage(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sOldGreenBKNo}
                        id="id_sOldGreenBKNo"
                        label="Old GB Number"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsOldGreenBKNo(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={sResidenceNumber}
                        id="id_sResidenceNumber"
                        label="RC Number"
                        InputLabelProps={{
                          style:{
                            fontSize: '1.05rem'
                          }
                        }}
                        type="text"
                        onChange={(e) => {
                          setsResidenceNumber(e.target.value);
                        }}
                        fullWidth
                        margin="dense"
                        className={classes.textField}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        value={lOccupation.find(
                          (occupation) =>
                            occupation.id.toString() === sOccupationID
                        )}
                        openOnFocus
                        clearOnEscape
                        onChange={(e, value) => {
                          if (value !== null) {
                            setsOccupationID(value.id.toString());
                          } else {
                            setsOccupationID("0");
                          }
                        }}
                        id="id_sOccupationID"
                        options={lOccupation}
                        classes={{
                          option: classes.option,
                        }}
                        className={classes.textField}
                        autoHighlight
                        getOptionLabel={(option) => option.sOccupationDesc}
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{option.sOccupationDesc}</span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Occupation"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD-MM-YYYY"
                          variant="dialog"
                          //openTo="year"
                          //views={["year", "month", "date"]}
                          autoOk
                          margin="dense"
                          id="id_dtDeceased"
                          name="name_dtDeceased"
                          label="Deceased Date"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          format={sDateFormatMUIDatepicker}
                          onChange={date => {
                            debugger;
                            if (date) {
                              setdtDeceased(date);
                              setValue('name_dtDeceased', date, { shouldValidate: true });
                            }
                            // else{
                            //   setdtDeceased(date);
                            // }
                          }
                          }
                          inputRef={register({
                            pattern:
                            {
                              value: new RegExp(sDDMMYYYYRegex),
                              message: "Invalid Date"
                            }
                          })}
                          value={dtDeceased}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          className={classes.dateField}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          {/*Relation Details*/}
          <Grid item xs={12}>
            <ExpansionPanel
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel3"}
              onChange={handleAccordionChange("panel3")}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionHeading} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography className={classes.expansionHeading}>
                  Relation & Contact Details
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={6}>

                    <Grid xs={12} style={{ display: "flex" }}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            value={sSpouseName}
                            id="id_sSpouseName"
                            label="Spouse Name"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            type="text"
                            onChange={(e) => {
                              setsSpouseName(e.target.value);
                            }}
                            fullWidth
                            margin="dense"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            value={sSpouseGBID}
                            id="id_sSpouseGBID"
                            name="name_sSpouseGBID"
                            label="Spouse GB No"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            type="text"
                            onChange={(e) => {
                              setsSpouseGBID(e.target.value);
                            }}
                            fullWidth
                            margin="dense"
                            className={classes.textField}
                            inputRef={register({
                              //minLength: 7,
                              maxLength: 7,
                            })}
                          />
                          {/*{_.get("name_sSpouseGBID.type", errors) ===
                            "minLength" && (
                              <span style={{ color: "red" }}>
                                Spouse's GB ID No cannot subceed 7 characters
                              </span>
                            )}*/}
                          {_.get("name_sSpouseGBID.type", errors) ===
                            "maxLength" && (
                              <span style={{ color: "red" }}>
                                Spouse's GB No cannot exceed 7 characters
                              </span>
                            )}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sSpouseID}
                          id="id_sSpouseID"
                          label="Spouse's Old GB No"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setsSpouseID(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={TBUSpouseName}
                          id="id_TBUSpouseName"
                          label="བཟའ་ཟླའི་མིང་།"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.8rem'
                            }
                          }}
                          inputProps={{
                            style:{
                              fontSize: '1.4rem'
                            }
                          }}
                          type="text"
                          onChange={(e) => {
                            setTBUSpouseName(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} style={{ display: "flex" }}>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            value={sFax}
                            id="id_sFax"
                            label="Fax Number"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            type="text"
                            onChange={(e) => {
                              setsFax(e.target.value);
                            }}
                            fullWidth
                            margin="dense"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            value={sPhone}
                            id="id_sPhone"
                            label="Phone Number"
                            InputLabelProps={{
                              style:{
                                fontSize: '1.05rem'
                              }
                            }}
                            type="text"
                            onChange={(e) => {
                              setsPhone(e.target.value);
                            }}
                            fullWidth
                            margin="dense"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}style={{ display: "flex" }}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sEmail}
                          id="id_sEmail"
                          label="Email"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="email"
                          onChange={(e) => {
                            setsEmail(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          value={sLoginGmail}
                          id="id_sLoginGmail"
                          label="Google Email"
                          InputLabelProps={{
                            style:{
                              fontSize: '1.05rem'
                            }
                          }}
                          type="email"
                          onChange={(e) => {
                            setLoginGmail(e.target.value);
                          }}
                          fullWidth
                          margin="dense"
                          className={classes.textField}
                        />
                      </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {lGBChildren.length === 0 && (
                      <Typography align="center" variant="h6" color="primary">
                        No Records Found
                      </Typography>
                    )}
                    {lGBChildren.length != 0 && (
                      <div>
                        <Typography align="center" variant="h6" color="primary">
                          Children of - {sGBID}
                        </Typography>
                        <Table className="table table-hover table-striped table-bordered ">
                          <thead className="thead-dark" style={{ padding: 0 }}>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">DOB</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Old GB Number</th>
                              <th scope="col">GB Number</th>
                              <th scope="col">Edit</th>
                              {/*<th style={{ width: '15%' }} > Date</th>*/}
                            </tr>
                          </thead>
                          <tbody style={{ padding: 0 }}>
                            {lGBChildren.map((row, index) => (
                              <tr>
                                <td scope="row">{row.sName}</td>
                                <td scope="row">
                                  {row.dtDOB
                                    ? Moment(row.dtDOB).format(sDateFormat)
                                    : ""}
                                </td>
                                <td scope="row">{row.sGender}</td>
                                <td scope="row">{row.sChildID}</td>
                                <td scope="row">{row.sGBIDChild}</td>
                                <td scope="row">
                                  <IconButton
                                    color="primary"
                                    onClick={() => {
                                      handleEditChildRowClick(row);
                                    }}
                                    component="span"
                                    style={{ padding: "0px" }}
                                  >
                                    <EditOutlinedIcon />
                                  </IconButton>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                    <Button
                      color={sButtonColor}
                      variant={sButtonVariant}
                      size={sButtonSize}
                      onClick={() => {
                        setaddChildModal(true);
                      }}
                    >
                      Add a Child
                    </Button>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel4"}
              onChange={handleAccordionChange("panel4")}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionHeading} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography className={classes.expansionHeading}>
                  Book Issued Details
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <IssueBookTable gbId={sGBID} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel6"}
              onChange={handleAccordionChange("panel6")}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionHeading} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography className={classes.expansionHeading}>
                  Notes of - {sGBID}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid xs={12}>
                  {lGBNote.length === 0 && (
                    <Typography align="center" variant="h6" color="primary">
                      No Records Found
                    </Typography>
                  )}
                  {lGBNote.length != 0 && (
                    <div>
                      {/*<Typography 
                align='center' 
                variant="h6"
                color="primary"
                >Notes of - {sGBID}</Typography>*/}
                      <Table className="table table-hover table-striped table-bordered">
                        <thead className="thead-dark" style={{ padding: 0 }}>
                          <tr>
                            <th scope="col" style={{ width: "70%" }}>
                              Notes
                            </th>
                            <th scope="col">Entered</th>
                            <th scope="col">Edit</th>
                          </tr>
                        </thead>
                        <tbody style={{ padding: 0 }}>
                          {lGBNote.map((row, index) => (
                            <tr>
                              <td scope="row">{row.sNote}</td>
                              <td scope="row">
                                {row.dtEntered
                                  ? Moment(row.dtEntered).format(sDateFormat)
                                  : ""}
                              </td>
                              <td scope="row">
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    handleEditNoteRowClick(row);
                                  }}
                                  component="span"
                                  style={{ padding: "0px" }}
                                >
                                  <EditOutlinedIcon />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                          <br />
                        </tbody>
                      </Table>
                    </div>
                  )}
                  <Button
                    color={sButtonColor}
                    variant={sButtonVariant}
                    size={sButtonSize}
                    onClick={() => {
                      setaddNoteModal(true);
                    }}
                  >
                    Add a Note
                  </Button>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel7"}
              onChange={handleAccordionChange("panel7")}
            >
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionHeading} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanel}
              >
                <Typography className={classes.expansionHeading}>
                  Photo &amp; Documents
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid xs={12}>
                  {lGBDocument.length === 0 && (
                    <Typography align="center" variant="h6" color="primary">
                      No Records Found
                    </Typography>
                  )}
                  {lGBDocument.length !== 0 && (
                    <div>
                      {/*<Typography 
                align='center' 
                variant="h6"
                color="primary"
                >Notes of - {sGBID}</Typography>*/}
                      <Table className="table table-hover table-striped table-bordered ">
                        <thead className="thead-dark" style={{ padding: 0 }}>
                          <tr>
                            <th scope="col" style={{ width: "70%" }}>
                              Title
                            </th>
                            {/*<th scope="col">Register Date</th>*/}
                            {/*<th scope="col">Entered By</th>*/}
                            <th scope="col">Type</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody style={{ padding: 0 }}>
                          {lGBDocument.map((row, index) => (
                            <tr>
                              <td scope="row">{row.sTitle}</td>
                              <td scope="row">{row.sDocType}</td>
                              {/*<td scope="row">{row.nRegisterDate}</td>*/}
                              {/*<td scope="row">{row.nEnteredBy}</td>*/}
                              <td scope="row">
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    handleEditDocumentRowClick(row);
                                  }}
                                  component="span"
                                  style={{ padding: "0px" }}
                                >
                                  <EditOutlinedIcon />
                                </IconButton>
                              </td>
                              <td scope="row">
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    handleDeleteDialogClickOpen(row);
                                  }}
                                  component="span"
                                  style={{ padding: "0px" }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  <Button
                    color={sButtonColor}
                    variant={sButtonVariant}
                    size={sButtonSize}
                    onClick={() => {
                      setaddDocumentModal(true);
                    }}
                  >
                    Add a Photo/Document
                  </Button>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <br />
            <Grid item xs={12}>
              <Button
                variant={sButtonVariant}
                size={sButtonSize}
                color={sButtonColor}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  props.history.goBack();
                  // history.push(props.location);
                }}
              >
                Cancel
              </Button>
              <Button
                //disabled={formState.isSubmitting && formState.isValid}
                variant={sButtonVariant}
                size={sButtonSize}
                color={sButtonColor}
                disabled={formState.isSubmitting && formState.isValid}
                type="submit"
                onClick={() => { setExpanded('panel1') }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onEscapeKeyDown={handleDeleteDialogClose}
      >
        <DialogTitle id="alert-dialog-title">{"Delete "}{oDelete.sDocType === "Photo Identity" ? "Photo" : "Support Document"}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete this {oDelete.sDocType === "Photo Identity" ? "Photo" : "Support Document"}? (Document Name:{" "}{oDelete.sTitle})
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >
            No
          </Button>
          <Button
            onClick={handleDeleteDocumentRowClick}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}

            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/*Note*/}
      {addNoteModal && (
        <AddNoteDialog
          addNoteModal={addNoteModal}
          sGBID={sGBID}
          classes={classes}
          handleAddNoteClickClose={handleAddNoteClickClose}
          addNoteAPICall={addNoteAPICall}
        />
      )}
      {editNoteModal && (
        <EditNoteDialog
          editNoteModal={editNoteModal}
          oNote={oNote}
          classes={classes}
          handleEditNoteClickClose={handleEditNoteClickClose}
          editNoteAPICall={editNoteAPICall}
        />
      )}
      {/*Child*/}
      {addChildModal && (
        <AddChildDialog
          addChildModal={addChildModal}
          sGBID={sGBID}
          classes={classes}
          handleAddChildClickClose={handleAddChildClickClose}
          addChildAPICall={addChildAPICall}
        />
      )}
      {editChildModal && (
        <EditChildDialog
          editChildModal={editChildModal}
          oChild={oChild}
          classes={classes}
          handleEditChildClickClose={handleEditChildClickClose}
          editChildAPICall={editChildAPICall}
        />
      )}
      {/*Document*/}
      {addDocumentModal && (
        <AddDocumentDialog
          lGBDocument={lGBDocument}
          addDocumentModal={addDocumentModal}
          sGBID={sGBID}
          classes={classes}
          handleAddDocumentClickClose={handleAddDocumentClickClose}
          addDocumentAPICall={addDocumentAPICall}
        />
      )}
      {editDocumentModal && (
        <EditDocumentDialog
          editDocumentModal={editDocumentModal}
          oDocument={oDocument}
          lGBDocument={lGBDocument}
          classes={classes}
          handleEditDocumentClickClose={handleEditDocumentClickClose}
          editDocumentAPICall={editDocumentAPICall}
        />
      )}
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />
      }
      {backdrop && <BackdropComponent
        backdrop={backdrop}
      />}
      {dialogBackdrop && <BackdropDialogComponent
        backdrop={dialogBackdrop}
      />}
    </Container>
  );
}
