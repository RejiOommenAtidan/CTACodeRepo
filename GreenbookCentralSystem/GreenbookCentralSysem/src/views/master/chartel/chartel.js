
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
// import { AddDialog, EditDialog } from './dialog';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons,sDateFormat } from '../../../config/commonConfig';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';
import Moment from 'moment';

const tableIcons = oTableIcons;

const useStyles = makeStyles(() => ({
}));

export default function Chartel() {
  Moment.locale('en');
  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = React.useState(true);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [nChartelPK, setnChartelPK] = useState(0);
  const [sChartelKey, setsChartelKey] = useState("");
  const [nChartelValue, setnChartelValue] = useState(0);
  const [dtChartelFrom, setdtChartelFrom] = useState(null);
  const [oChartel, setoChartel] = useState({});
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

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

  const columns = [
    {
      field: "id",
      title: "Sr No.",
      hidden: true,
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px'
      },
      export: true
    },
    {
      field: "sChartelKey",
      title: "Chartel Term",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      },
    },
    {
      field: "nChartelValue",
      title: "Value",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      },
    },
    {
      render: rowData => Moment(rowData['dtChartelFrom']).format(sDateFormat),
      field: "dtChartelFrom",
      title: "Starting From",
      cellStyle: {
        padding: '5px',
        paddingLeft: '10px',
        borderLeft: '0'
      },
    },
    {
      align:"center",
      field: 'edit',
      title: 'Edit',
      filtering: false,
      sorting: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      cellStyle: {
        padding: '5px',
        borderRight: '0',
        width: '10%'
      }
    },
  ];

  const editClick = (tableRowArray) => {
    setnChartelPK(tableRowArray["id"]);
    setsChartelKey(tableRowArray["sChartelKey"]);
    setnChartelValue(tableRowArray["nChartelValue"]);
    setdtChartelFrom(tableRowArray["dtChartelFrom"]);
    setoChartel({
      id:tableRowArray["id"],
      sChartelKey:tableRowArray["sChartelKey"],
      nChartelValue:tableRowArray["nChartelValue"],
      dtChartelFrom:tableRowArray["dtChartelFrom"]
    });
    //setEditModal(true);
  };

  // const editAPICall = (chartelObj) => {
  //   setisLoading(true);
  //   axios.post(`/Chartel/EditChartel/ID=` + nChartelPK, chartelObj)
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         setEditModal(false);
  //         axios.get(`/Chartel/GetAllChartel`)
  //           .then(resp => {
  //             if (resp.status === 200) {
  //               setdataAPI(resp.data);
  //               setisLoading(false);
  //             }
  //           })
  //           .catch(error => {
  //             handleError(error, history);
  //           })
  //           .then(release => {
  //             //console.log(release); => udefined
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       handleError(error, history);
  //     })
  //     .then(release => {
  //       //console.log(release); => udefined
  //     });
  // };
  // const addAPICall = (typeIssuedObj) => {
  //   setisLoading(true);
  //   axios.post(`/TypeIssued/AddTypeIssued/`, typeIssuedObj)
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         setAddModal(false);
  //         axios.get(`/TypeIssued/GetTypeIssued`)
  //           .then(resp => {
  //             if (resp.status === 200) {
  //               setdataAPI(resp.data);
  //               setisLoading(false);
  //             }
  //           })
  //           .catch(error => {
  //             handleError(error, history);
  //           })
  //           .then(release => {
  //             //console.log(release); => udefined
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       handleError(error, history);
  //     })
  //     .then(release => {
  //       //console.log(release); => udefined
  //     });
  // };

  useEffect(() => {
    axios.get(`/Chartel/GetAllChartel`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data);
          setisLoading(false);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/*<Typography variant="h4" gutterBottom>Type Issued</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={tableIcons}
            title="Chartel"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
              {
                icon: AddBox,
                tooltip: 'Add Chartel',
                isFreeAction: true,
                onClick: (event) => setAddModal(true)
              },
              {
                icon: FilterList,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
        </Grid>
      </Grid>
      {/*{addModal && <AddDialog
        addModal={addModal}
        classes={classes}
        handleAddClickClose={handleAddClickClose}
        addAPICall={addAPICall}
      />}*/}
      {/*{editModal && <EditDialog
        editModal={editModal}
        oChartel={oChartel}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}*/}
    </Container>
  );
}
