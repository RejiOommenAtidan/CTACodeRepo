import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
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
// import { useNavigate } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// function a(){const naviagate = useNavigate();}

// const history = useHistory();


// const handleClickOpen = () => {
//   // this.setState({
//   //   modal: true
//   // });
// };

// const initiateNav = ()=>{
//   let navigate = useNavigate();
// };

const useStyles = (theme) => ({
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

});






class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
  }
  options = {
    filterType: 'checkbox',
    selectableRows: false,
    jumpToPage: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30]
  };
  state = {
    dataAPI: [],
    loadingProp: true,
    modal: false,
    selectedUser: '',
    selectedUserName:''
  };

  editClick(user_Id) {
    // alert(user_Id);
    //TODO: remove usage of window.location
    window.location = 'editUser/' + user_Id.toString();
  }

  deleteClick(user_Id,userName) {
    console.log(user_Id)
    this.setState({
      modal: true,
      selectedUser: user_Id,
      selectedUserName: userName
    });
  }

  columns = [
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
          // console.log(value,tableMeta)
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
              onClick={() => { this.editClick(tableMeta.rowData[0]) }}
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
              onClick={() => { this.deleteClick(tableMeta.rowData[0],tableMeta.rowData[1]) }}
            >Delete
            </Button>
          )
        }
      }
    }
  ];


  handleClose = () => {
    this.setState({
      modal: false,
      selectedUser: '',
      selectedUserName:''
    });
  };

  deleteCallAPI = () => {

    console.log(this.state.selectedUser);
    const config = { headers: { "Content-Type": "application/json" } };
    var userID = this.state.selectedUser.toString();
    axios.post(`http://localhost:52013/api/Users/DeleteUser`, userID, config)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          this.handleClose();
          //TODO: remove window.location
          // this.props.history.push(`/`)
          window.location = window.location
        }
      })
      .catch(error => {
        if (error.response) {
          //The request was made and the server responded 
          //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received 
          //`error.request` is an instance of XMLHttpRequest in the browser 
          //and an instance of http.ClientRequest in node.js
          console.warn(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //always executed
        //console.log(release); => udefined
      });
    // window.location = window.location
    // this.props.history.push('/manageuser');
  };
  componentDidMount(prevProps) {
    axios.get(`http://localhost:52013/api/Users/GetUsers`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          this.setState({
            dataAPI: resp.data,
            loadingProp: false
          });
        }
      })
      .catch(error => {
        if (error.response) {
          //The request was made and the server responded 
          //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received 
          //`error.request` is an instance of XMLHttpRequest in the browser 
          //and an instance of http.ClientRequest in node.js
          console.warn(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //always executed
        //console.log(release); => udefined
      });
  }
  componentWillReceiveProps() {
    axios.get(`http://localhost:52013/api/Users/GetUsers`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data)
          this.setState({
            dataAPI: resp.data,
            loadingProp: false
          });
        }
      })
      .catch(error => {
        if (error.response) {
          //The request was made and the server responded 
          //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received 
          //`error.request` is an instance of XMLHttpRequest in the browser 
          //and an instance of http.ClientRequest in node.js
          console.warn(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //always executed
        //console.log(release); => udefined
      });
  }
  render() {
    const { classes } = this.props;
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
                    data={this.state.dataAPI}
                    columns={this.columns}
                    options={this.options}
                  />
                </Grid>
              </Grid>
              <Dialog
                open={this.state.modal}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
              // aria-labelledby="alert-dialog-slide-title"
              // aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">Confirm Operation</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete user {this.state.selectedUserName} ?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="default">
                    No
          </Button>
                  <Button onClick={this.deleteCallAPI} color="secondary">
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
}


export default withStyles(useStyles(theme))(EnhancedTable)
// export default RegisterView