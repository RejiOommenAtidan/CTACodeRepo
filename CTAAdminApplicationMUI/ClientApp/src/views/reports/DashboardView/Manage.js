import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





// const handleClickOpen = () => {
//   // this.setState({
//   //   modal: true
//   // });
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
    jumpToPage: true
  };
  state = {
    dataAPI: [],
    loadingProp: true,
    modal: false,
    selectedUser: ''
  };

  deleteClick(user_Id) {
    console.log(user_Id)
    this.setState({
      modal: true
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
        sort: true
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
              onClick={()=>{alert(tableMeta.rowData[0])}}
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
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                endIcon={<DeleteOutlinedIcon />}
                onClick={()=>{this.deleteClick(tableMeta.rowData[0])}}
              >Delete
              </Button>
            </ThemeProvider>
          )
        }
      }
    }
  ];


  handleClose = () => {
    this.setState({
      modal: false
    });
  };


  // deleteUser = ()=>{
  //   console.log(this.state.selectedUser);
  //   // this.props.startAddUser(user);
  //   const config = { headers: {"Content-Type": "application/json"} };

  //   var userID = this.state.selectedUser.toString();
  //   // let data ={'userID':userID}
  //   // data = JSON.stringify(data);
  //   // console.log(data)
  //   // userID  =JSON.stringify(userID);
  //   axios.post(`/Users/DeleteUser`,userID,config)
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         console.log(resp.data);
  //         // console.log(this.props);
  //         this.closeModal();
  //         this.props.history.push(`/`)
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         //The request was made and the server responded 
  //         //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
  //         console.error(error.response.data);
  //         console.error(error.response.status);
  //         console.error(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received 
  //         //`error.request` is an instance of XMLHttpRequest in the browser 
  //         //and an instance of http.ClientRequest in node.js
  //         console.warn(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error('Error', error.message);
  //       }
  //       console.log(error.config);
  //     })
  //     .then(release => {
  //       //always executed
  //       //console.log(release); => udefined
  //     });
  //   this.props.history.push('/userlist');
  // };
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
            <h1>User List</h1>
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
              <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure to delete user {this.state.selectedUser}
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Disagree
          </Button>
                <Button onClick={this.handleClose} color="primary">
                  Agree
          </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </Page>
    );
  }
}


export default withStyles(useStyles(theme))(EnhancedTable)
// export default RegisterView