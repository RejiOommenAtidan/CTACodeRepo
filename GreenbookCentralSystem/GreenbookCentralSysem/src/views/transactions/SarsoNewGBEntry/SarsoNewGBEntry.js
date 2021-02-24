import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import handleError from '../../../auth/_helpers/handleError';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders } from '../../../config/commonConfig';

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingBottom: 3,
    paddingTop: 3,
    flexGrow: 1,
    'label + &': {
      marginTop: 3
    }
  },
  selectEmpty: {
    marginTop: 1.5,
  },
  formControl: {
    margin: 2,
    width: '95%'
  },
  paper: {
    padding: 2,
    textAlign: 'center'
  },
  textField: {
    marginTop: 0.15,
    marginBottom: 0.15
  },
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25
  },
  box: {
    marginBottom: 1.5,
    marginTop: 1.5
  },
  button: {
    margin: 1,
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  heading: {
    fontSize: 15,
    fontWeight: 10,
    flexBasis: '33.33%',
    flexShrink: 0
  },
  border: '1px solid rgba(0, 0, 0, .125)',
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&$expanded': {
    margin: 'auto'
  }
});

export default function SarsoNewGBEntry() {
  Moment.locale('en');
  let history = useHistory();
  const classes = useStyles();
  const [dataAPI, setdataAPI] = useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  const columns = [
    {
      field: "nGBId",
      title: "GREEN BOOK ID",
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
      field: "nFormNo",
      title: "FORM NUMBER",
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
      }
    },
    {
      //defaultSort: 'desc',
      field: "dtDateFormatted",
      title: "DATE",
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
      render: rowData => Moment(rowData.dtDate).format(sDateFormat)
    },
    {
      align: "center",
      field: 'gbentry',
      title: 'GB ENTRY',
      filtering: false,
      sorting: false,
      export: false,
      render: rowData =>
        <Button
          color={sButtonColor}
          variant={sButtonVariant}
          size={sButtonSize}
          onClick={() => { history.push('/NewEntry/' + rowData.nFormNo); }}
          className="btn-neutral-primary btn-icon btn-animated-icon btn-transition-none d-40 p-0 m-2">
          <span className="btn-wrapper--icon">
            <AddIcon />
          </span>
        </Button>,
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "10%"
      },
    cellStyle: {
        textAlign: "center",
        padding: '5px',
	borderRight: '1px solid grey',	borderRight: '1px solid grey',        width: "10%"
      }
    },
  ];

  useEffect(() => {
    axios.get(`/GivenGBID/GetGivenGBIDs`)
      .then(resp => {
        if (resp.status === 200) {
          resp.data.forEach((element) => {
            element.dtDateFormatted = element.dtDate ? Moment(element.dtDate).format(sDateFormat) : null;
          });
          setdataAPI(resp.data);
          setisLoading(false);
          modifyHeaders();
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
    <Container maxWidth="lg" disableGutters={true}><br />
      {/*<Typography variant="h4" gutterBottom>New Entry</Typography>*/}
      <Grid container className={classes.box}>
        <Grid item xs={12}>
          <MaterialTable
            isLoading={isLoading}
            style={{ padding: '10px', border: '2px solid grey', borderRadius: '10px' }}
            icons={oTableIcons}
            title="New Entry"
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
