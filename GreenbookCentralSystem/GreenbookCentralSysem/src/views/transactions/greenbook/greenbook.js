import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MaterialTable from 'material-table';
import handleError from '../../../auth/_helpers/handleError';
import IconButton from '@material-ui/core/IconButton';
import {
  oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessages,
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";
import Moment from 'moment';

const useStyles = makeStyles(() => ({
}));

export default function GBList(props) {
  Moment.locale('en');
  const classes = useStyles();
  let history = useHistory();
  const [dataAPI, setdataAPI] = useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  const columns = [
    {
      field: "sGBID",
      title: "Green Book ID",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "5%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "5%"
      },
      export: true,
      render: rowData => <Button size="small" color="primary"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        {rowData["sGBID"]}
      </Button>,
    },
    {
      title: "Full Name",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "20%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "20%"
      },
      export: true,
      render: rowData => (rowData["sFirstName"] === null ? "" : rowData["sFirstName"]) + " " + (rowData["sMiddleName"] === null ? "" : rowData["sMiddleName"]) + " " + (rowData["sLastName"] === null ? "" : rowData["sLastName"]),
    },
    {
      title: "Age",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "3%"
      },
      cellStyle: {
        textAlign: "right",
        padding: '5px',
        width: "3%"
      },
      export: true,
      render: rowData => rowData["dtDOB"] === null ? "NA" : Moment().diff(rowData["dtDOB"], 'years')
    },
    {
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
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "2%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "2%"
      }
    }
  ];

  const editClick = (tableRowArray) => {
    history.push("/EditEntry/" + tableRowArray.id);
  };

  useEffect(() => {
    axios.get(`/Greenbook/GetGreenbooks`)
      .then(resp => {
        if (resp.status === 200) {
          //sCountryID
          console.log(resp.data);
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
      {/* <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary"> Country</Typography>
        </Breadcrumbs> */}
      <Grid container className={classes.box} >
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="Green Book"
            columns={columns}
            data={dataAPI}
            options={oOptions}
            actions={[
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
    </Container>
  );
}
