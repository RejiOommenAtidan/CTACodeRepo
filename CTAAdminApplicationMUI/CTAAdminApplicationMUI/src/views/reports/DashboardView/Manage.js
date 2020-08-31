import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../theme/theme/theme'
import Page from 'src/components/Page';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

export default function EnhancedTable() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [dataAPI, setdataAPI] = useState([]);
  // const [loadingProp, setloadingProp] = useState(true);
  const [modal, setmodal] = useState(false);
  const [selectedUser, setselectedUser] = useState('');
  const [selectedUserName, setselectedUserName] = useState('');

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30]
  };

  const columns = [
    {
      name: "user_Id",
      label: "User ID",
      options: {
        filter: true,
        sort: true,
        display: false
      }
    },
    {
      name: "fullname",
      label: "Fullname",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "region",
      label: "Region",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              size="small"
              label={value}
              color={value === "Active" ? 'primary' : 'secondary'}
              variant="outlined"
            >
            </Chip>
          )
        }
      }
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<EditOutlinedIcon />}
              onClick={() => { editClick(tableMeta.rowData[0]) }}
            >Edit
            </Button>
          )
        }
      }
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (

            <Button
              variant="outlined"
              color="secondary"
              size="small"
              endIcon={<DeleteOutlinedIcon />}
              onClick={() => { deleteClick(tableMeta.rowData[0], tableMeta.rowData[1]) }}
            >Delete
            </Button>
          )
        }
      }
    }
  ];

  const editClick = (user_Id) => {
    // //TODO: remove usage of window.location
    // window.location = 'editUser/' + user_Id.toString();
    //Done
    navigate('/app/editUser/'+user_Id.toString());
  }

  const deleteClick = (user_Id, userName) => {
    console.log(user_Id)
    setmodal(true);
    setselectedUser(user_Id);
    setselectedUserName(userName);
  };

  const handleClose = () => {
    setmodal(false);
    setselectedUser('');
    setselectedUserName('');
  };

  const deleteCallAPI = () => {
    // console.log(this.state.selectedUser);
    const config = { headers: { "Content-Type": "application/json" } };
    var userID = selectedUser.toString();
    axios.post(`/Users/DeleteUser`, userID, config)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          handleClose();
          //TODO: remove window.location
          // this.props.history.push(`/`)
          window.location = window.location
          // navigate('/app/manageuser',{ replace: true });
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

  useEffect(() => {
    axios.get(`/Users/GetUsers`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          setdataAPI(resp.data)
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
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Page
        className={classes.root}
        title="Register"
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="lg" disableGutters={true}>
            <Typography variant="h4" gutterBottom>User List</Typography>
            <Grid container className={classes.box}>
              <Grid item xs={12}>
                <MUIDataTable
                  data={dataAPI}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
            <Dialog
              open={modal}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-slide-title">Confirm Operation</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete user {selectedUserName} ?
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="default">
                  No
          </Button>
                <Button onClick={deleteCallAPI} color="secondary">
                  Yes
          </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </Page>
    </ThemeProvider>
  );
}
