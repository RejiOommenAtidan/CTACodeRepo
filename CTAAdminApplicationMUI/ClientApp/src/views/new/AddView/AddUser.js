import React from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import theme from '../../../theme/theme/theme'
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
  Contain, Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    width:'100%'
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
  // selectField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   marginBottom: theme.spacing(2)
  // },
  box: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  }

});

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

class RegisterView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.user ? props.user.username : '',
      fullname: props.user ? props.user.fullname : '',
      email: props.user ? props.user.email : '',
      password: props.user ? props.user.password : '',
      confirm_password: props.user ? props.user.confirm_password : '',
      role: props.user ? props.user.role : [],
      region: props.user ? props.user.region : '',
      status: props.user ? props.user.status : '',
      error: '',
    };
  }
  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  };
  onFullnameChange = (e) => {
    const fullname = e.target.value;
    this.setState(() => ({ fullname }));
  };
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };
  onConfirmPasswordChange = (e) => {
    const confirm_password = e.target.value;
    this.setState(() => ({ confirm_password }));
  };
  onRoleChange = (e) => {
    const role = e.target.value;
    this.setState(() => ({ role }));
  };
  onRegionChange = (e) => {
    const region = e.target.value;
    this.setState(() => ({ region }));
  };
  onStatusChange = (e) => {
    const status = e.target.value;
    // console.log(status);
    this.setState(() => ({ status }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      role: this.state.role,
      region: this.state.region,
      status: this.state.status
    };
    console.log(user);
  };
  getStyles(name, role, theme) {
    return {
      fontWeight:
        role.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  render() {
    const { classes } = this.props;
    const handleChange = (event) => {
      this.setState({ role: event.target.value });
    };

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
            <Grid container className={classes.box}>
              <h1>Add User</h1>
              <form className={classes.root} noValidate autoComplete="off" className={classes.box}>
                <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    label="Username"
                    id="username"
                    onChange={this.onUsernameChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.textField}
                    value={this.state.username}
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    label="Fullname"
                    id="fullname"
                    onChange={this.onFullnameChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.textField}
                    value={this.state.fullname}
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    label="Email"
                    id="email"
                    onChange={this.onEmailChange}
                    variant="outlined"
                    size="small"
                    type="email"
                    fullWidth
                    className={classes.textField}
                    value={this.state.email}
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    label="Password"
                    id="password"
                    onChange={this.onPasswordChange}
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth
                    className={classes.textField}
                    value={this.state.password}
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    label="Confirm Password"
                    id="confirm_password"
                    onChange={this.onConfirmPasswordChange}
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth
                    className={classes.textField}
                    value={this.state.confirm_password}
                    margin='normal'
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="region-label">Region</InputLabel>
                  <Select
                    label="Region"
                    labelId="region-label"
                    id="region"
                    onChange={this.onRegionChange}
                    fullWidth
                    className={classes.textField}
                    value={this.state.region}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                    <MenuItem value={"Pune"}>Pune</MenuItem>
                  </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    label="Status"
                    labelId="status-label"
                    id="status"
                    onChange={this.onStatusChange}
                    fullWidth
                    className={classes.textField}
                    value={this.state.status}
                    variant="outlined"
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
                    onChange={handleChange}
                    multiple
                    value={this.state.role}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                  >
                    {roles.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={this.state.role.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} ></Grid>
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="primary" onClick={this.onSubmit}>Save</Button>
              </form>
            </Grid>
          </Container>
        </Box>
      </Page>
    )
  }
}
export default withStyles(useStyles(theme))(RegisterView)
// export default RegisterView
