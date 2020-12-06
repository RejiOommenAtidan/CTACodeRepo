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
import {oOptions, oTableIcons, modifyHeaders} from "../../../config/commonConfig";
import Moment from 'moment';
import MyComp from '../../common/filtercomponent';

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

  // For Custom Filter

  const [myarray, setMyArray] = useState([]);
  // const [myElement, setMyElement] = useState(null);
  // const [myValue, setMyValue] = useState({});
  const [currId, setCurrId] = useState('');
  //let ele = null;
  const [searching, setSearching] = useState(false);
  console.log("myarray: ", myarray);

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
 // end custom filter
 
  const columns = [
    {
      field: "sGBID",
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
      filterComponent: () =>
        <MyComp
          field="sGBID"
          name="GREEN BOOK ID"
          changeHandler={changeHandler}
          myarray={myarray}
          updateArray={updateArray}
          currId={currId}
          key={"sGBID"}
        />,
      export: true,
      render: rowData => <Button size="small" color="primary"
        onClick={() => { editClick(rowData) }} style={{ padding: '0px' }}
      >
        {rowData["sGBID"]}
      </Button>,
    },
    {
      field: "sFirstName",
      title: "FIRST NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "30%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "30%"
      },
      export: true,
      //render: rowData => (rowData["sFirstName"] === null ? "" : rowData["sFirstName"]) + " " + (rowData["sLastName"] === null ? "" : rowData["sLastName"]),
      filterComponent: () =>
        <MyComp
          name="FIRST NAME"
          field="sFirstName"
          changeHandler={changeHandler}
          myarray={myarray}
          updateArray={updateArray}
          currId={currId}
          key={"sFirstName"}
        />
    },
    {
      field: "sLastName",
      title: "LAST NAME",
      headerStyle: {
        textAlign: "center",
        textAlignLast: "center",
        verticalAlign: "middle",
        width: "30%"
      },
      cellStyle: {
        textAlign: "left",
        padding: '5px',
        width: "30%"
      },
      export: true,
      //render: rowData => (rowData["sFirstName"] === null ? "" : rowData["sFirstName"]) + " " + (rowData["sLastName"] === null ? "" : rowData["sLastName"]),
      filterComponent: () =>
        <MyComp
          name="LAST NAME"
          field="sLastName"
          changeHandler={changeHandler}
          myarray={myarray}
          updateArray={updateArray}
          currId={currId}
          key={"sLastName"}
        />
    },
    {
      field: 'dtDOB',
      title: "AGE",
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
      render: rowData => rowData["dtDOB"] === null ? "NA" : Moment().diff(rowData["dtDOB"], 'years')
    },
    {
      field: 'edit',
      title: 'EDIT',
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
        width: "10%"
      },
      cellStyle: {
        textAlign: "center",
        padding: '5px',
        width: "10%"
      }
    }
  ];


  useEffect(() => {
    console.log("Searching useEffect. Searching is", searching);

    if (searching) {
      let searchObj = {};
      myarray.map(item => {
        if (item.id === "madeb.id" || item.id === 'Re-Verified By' || item.id === 'Verified By' || item.id === 'edit' || item.id === 'email') {
          return;
          console.log("Changed id to", item.val);
        };

        if (item.id === 'madeb.nCurrentGBSno' || item.id === 'madeb.nFormNumber' || item.id === 'madeb.nPreviousGBSno' || item.id === 'madeb.nSaneyFormNo') {
          item.val = parseInt(item.val) || null;
        }
        var id = item.id;
        if (item.id.startsWith('madeb')) {
          id = item.id.substring(6);
        }
        searchObj = { ...searchObj, [id]: item.val };
      });
      console.log("Search Object: Inside useEffect", searchObj);

      axios.post(`/Greenbook/GetGreenbooksForEdit`, searchObj)
        .then(resp => {
          if (resp.status === 200) {
            debugger
            console.log("Got filter Data");
            setdataAPI([...resp.data]);
            setSearching(false);
            //setTimeout(() => ele.focus(), 2000);

          }
          if (resp.status === 204) {
            console.log("Got  Empty data set");
            setdataAPI([...resp.data]);
            setSearching(false);
          }
        })
        .catch(error => {
          console.log(error.message);
          //handleError(error, history);
        })
    }
  }, [myarray]);


  const editClick = (tableRowArray) => {
    history.push("/EditEntry/" + tableRowArray.id);
  };

  useEffect(() => {
    buildArray();
    axios.get(`/Greenbook/GetGreenbooks`)
      .then(resp => {
        if (resp.status === 200) {
          //sCountryID
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
