import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
// Local import
import { AddDialog, DeleteDialog, EditDialog } from './dialog';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons } from '../../../config/commonConfig';
import { useHistory } from 'react-router-dom';
import handleError from "../../../auth/_helpers/handleError";

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

export default function EnhancedTable() {
  const classes = useStyles();
  const [editModal, setEditModal] = React.useState(false);
  const [dataAPI, setdataAPI] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  //VAR
  const [province, setProvince] = React.useState('');
  const [provincePK, setProvincePK] = React.useState(0);
  const [provinceObj, setProvinceObj] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  let history = useHistory();
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
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "15%"
      },
      export: true
    },
    {
      field: "sProvince",
      title: "Province",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "70%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "70%"
      }
    },

    {
      field: "edit",
      title: "Edit",
      filtering: false,
      sorting: false,
      export: false,
      render: rowData => <IconButton color="primary" aria-label="upload picture" component="span"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        <EditOutlinedIcon />
      </IconButton>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "15%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "15%"
      }
    },
  ];

  const editClick = (tableRowArray) => {
    setProvincePK(tableRowArray["id"]);
    setProvince(tableRowArray["sProvince"]);
    setEditModal(true);
    setProvinceObj({
      id: tableRowArray["id"],
      province: tableRowArray["sProvince"]
    });
  };

  const editAPICall = (provinceObj) => {
    // let ProvinceID = provincePK;
    // let provinceToUpdate = {
    //   ID : provincePK,
    //   sProvinceID: provinceID,
    //   sProvince: provinceName,
    // };
    axios.post(`/Province/EditProvince/ProvinceID=` + provincePK, provinceObj/*provinceToUpdate*/)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          setEditModal(false);
          axios.get(`/Province/GetProvinces`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data);
                setDataChanged(true);
              }
            })
            .catch(error => {
              handleError(error, history);
            });

        }
      })
      .catch(error => {
        handleError(error, history);
      });
  };

  const addAPICall = (provinceObj) => {
    axios.post(`/Province/AddProvince/`, provinceObj)
      .then(resp => {
        if (resp.status === 200) {
          setAddModal(false);
          axios.get(`/Province/GetProvinces`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              handleError(error, history);
            });
        }
      })
      .catch(error => {
        handleError(error, history);
      });
  };

  const deleteClick = (tableRowArray) => {
    setDeleteModal(true);
    setProvincePK(tableRowArray["id"]);
    setProvince(tableRowArray["sProvince"]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const deleteAPICall = () => {
    const provinceToDelete = {
      ID: provincePK,
      sProvince: province
    };
    axios.post(`/Province/DeleteProvince/`, provinceToDelete)
      .then(resp => {
        console.log(provinceToDelete);
        if (resp.status === 200) {
          setDeleteModal(false);
          axios.get(`/Province/GetProvinces`)
            .then(resp => {
              if (resp.status === 200) {
                setdataAPI(resp.data)
              }
            })
            .catch(error => {
              handleError(error, history);
            });
        }
      })
      .catch(error => {
        handleError(error, history);
      });
  };

  useEffect(() => {
    axios.get(`/Province/GetProvinces`)
      .then(resp => {
        if (resp.status === 200) {
          setdataAPI(resp.data)
        }
      })
      .catch(error => {
        handleError(error, history);
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {/* <Typography variant="h4" gutterBottom>Province
             <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
                //onClick={addClick()}
                onClick={() => { setAddModal(true) }}
              >
                <AddCircleIcon />
              </IconButton>
            </Typography> */}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="Province"
            data={dataAPI}
            columns={columns}
            options={oOptions}
            actions={[
              {
                icon: oTableIcons.Add,
                tooltip: 'Add Province',
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
        provinceObj={provinceObj}
        classes={classes}
        handleEditClickClose={handleEditClickClose}
        editAPICall={editAPICall}
      />}
      {deleteModal && <DeleteDialog
        deleteModal={deleteModal}
        province={province}
        handleClose={handleClose}
        deleteAPICall={deleteAPICall}
      />}
    </Container>
  );
}
