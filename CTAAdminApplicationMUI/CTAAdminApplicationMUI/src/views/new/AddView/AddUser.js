import React,{useState} from 'react';
import Input from '@material-ui/core/Input';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  makeStyles,
  InputLabel,
  ListItemText,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  box: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = ["Trainee Software Developer", "Software Developer"];

export default function RegisterView() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [role, setrole] = useState([]);
  const [region, setregion] = useState('');
  const [status, setstatus] = useState('');

  const onUsernameChange = (e) => {
    const username = e.target.value;
    setusername(username);
  };
  const onFullnameChange = (e) => {
    const fullname = e.target.value;
    setfullname(fullname);
  };
  const onEmailChange = (e) => {
    const email = e.target.value;
    setemail(email)
  };
  const onPasswordChange = (e) => {
    const password = e.target.value;
    setpassword(password);
  };
  const onConfirmPasswordChange = (e) => {
    const confirm_password = e.target.value;
    setconfirm_password(confirm_password);
  };
  const onRoleChange = (e) => {
    const role = e.target.value;
    setrole(role);
  };
  const onRegionChange = (e) => {
    const region = e.target.value;
    setregion(region);
  };
  const onStatusChange = (e) => {
    const status = e.target.value;
    setstatus(status);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      fullname: fullname,
      email: email,
      password: password,
      confirm_password: confirm_password,
      role: (role).join(),
      region: region,
      status: status
    };
    console.log(user);
    axios.post(`/Users/AddUser`, user)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          // window.location = '/app/manageuser';
          navigate('/app/manageuser')
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

  return (
    <ThemeProvider>
        <Page
          className={classes.root}
          title="Add User"
        >
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="lg" disableGutters={true}>
              <Typography variant="h4" gutterBottom>Add User</Typography>

              <Grid container className={classes.box}>
                <form className={classes.root} noValidate autoComplete="off" className={classes.box}>

                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        label="Username"
                        id="username"
                        onChange={onUsernameChange}
                        size="small"
                        fullWidth
                        className={classes.textField}
                        value={username}
                      />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        label="Fullname"
                        id="fullname"
                        onChange={onFullnameChange}
                        size="small"
                        fullWidth
                        className={classes.textField}
                        value={fullname}
                      />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        label="Email"
                        id="email"
                        onChange={onEmailChange}
                        size="small"
                        type="email"
                        fullWidth
                        className={classes.textField}
                        value={email}
                      />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        label="Password"
                        id="password"
                        onChange={onPasswordChange}
                        size="small"
                        type="password"
                        fullWidth
                        className={classes.textField}
                        value={password}
                      />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        label="Confirm Password"
                        id="confirm_password"
                        onChange={onConfirmPasswordChange}
                        size="small"
                        type="password"
                        fullWidth
                        className={classes.textField}
                        value={confirm_password}
                      // margin='normal'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="region-label">Region</InputLabel>
                      <Select
                        label="Region"
                        labelId="region-label"
                        id="region"
                        onChange={onRegionChange}
                        fullWidth
                        className={classes.textField}
                        value={region}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                        <MenuItem value={"Pune"}>Pune</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        label="Status"
                        labelId="status-label"
                        id="status"
                        onChange={onStatusChange}
                        fullWidth
                        className={classes.textField}
                        value={status}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Inactive"}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        label="Role"
                        labelId="role-label"
                        id="role"
                        onChange={onRoleChange}
                        multiple
                        value={role}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        fullWidth
                      >
                        {roles.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={role.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} ></Grid>
                &nbsp;&nbsp;&nbsp;
                <br />
                  <Button variant="outlined" color="primary" onClick={onSubmit}>Save</Button>
                &nbsp;<Button variant="outlined" onClick={() => { navigate('/app/manageuser') }}>Cancel</Button>
                </form>
              </Grid>
            </Container>
          </Box>
        </Page>
      </ThemeProvider>
  )
}
