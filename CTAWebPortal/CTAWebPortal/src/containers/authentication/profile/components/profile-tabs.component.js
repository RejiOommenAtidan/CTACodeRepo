import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonPin from '@material-ui/icons/PersonPin';
import LocationOn from '@material-ui/icons/LocationOn';
import Group from '@material-ui/icons/Group';
import Share from '@material-ui/icons/Share';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import Security from '@material-ui/icons/Security';
import Backup from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tabLabel: {
    maxWidth: '100%',
    textTransform: 'capitalize'
  },
  toggleContainer: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  }
});

class ProfileTabs extends React.Component {
  state = {
    value: 0,
    name: 'Christos',
    lastname: 'Pantazis',
    email: 'info@oxygenna.com',
    password: '',
    newpassword: '',
    confirmpassword: ''
  };

  validate(name, lastname, email) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      lastname: lastname.length === 0,
      email: email.length === 0
    };
  }
  validatePassword(password, newPassword, confirmPassword) {
    // true means invalid, so our conditions got reversed
    return {
      password: password.length === 0,
      newPassword: newPassword.length === 0,
      confirmPassword: confirmPassword.length === 0
    };
  }
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    }, () => {
      // Using the callback to make sure that the child state has been updated before updating the parent state
      this.props.isEnabled(this.state.name, this.state.lastname, this.state.email);
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { name, lastname, email, password, newpassword, confirmpassword } = this.state;
    const errors = this.validate(name, lastname, email);
    const pwdErrors = this.validatePassword(password, newpassword, confirmpassword);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="secondary"
            fullWidth
          >
            <Tab className={classes.tabLabel} label="Profile" icon={<AccountCircle />}/>
            <Tab className={classes.tabLabel} label="Change Password" icon={<Security />}/>
            <Tab className={classes.tabLabel} label="Notifications" icon={<Notifications />}/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <form className={classes.container} autoComplete="off">
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="name"
                    label="Enter your first name"
                    className={classes.textField}
                    error={errors.name}
                    value={name}
                    onChange={this.handleChange('name')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { errors.name &&
                  <FormHelperText error>This is a required field</FormHelperText>
                  }
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="lastname"
                    label="Enter your last name"
                    className={classes.textField}
                    error={errors.lastname}
                    value={lastname}
                    onChange={this.handleChange('lastname')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { errors.lastname &&
                  <FormHelperText error>We also need your last name</FormHelperText>
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Enter your email address"
                    className={classes.textField}
                    error={errors.email}
                    value={email}
                    onChange={this.handleChange('email')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { errors.email &&
                  <FormHelperText error>Please enter your email</FormHelperText>
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="location"
                    label="Enter your location"
                    className={classes.textField}
                    defaultValue="Sitia, Crete, Greece"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="website"
                    label="Website"
                    className={classes.textField}
                    defaultValue="http://www.oxygenna.com"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Describe yourself in 255 characters"
                    className={classes.textField}
                    defaultValue="We are a small creative web design agency who are passionate with our pixels."
                    fullWidth
                    multiline
                    rowsMax="4"
                    rows="4"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </form>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <form className={classes.container} autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Current password"
                    className={classes.textField}
                    error={pwdErrors.password}
                    value={password}
                    type="password"
                    onChange={this.handleChange('password')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { pwdErrors.password &&
                  <FormHelperText error>This is a required field</FormHelperText>
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="newpassword"
                    label="New password"
                    className={classes.textField}
                    error={pwdErrors.newPassword}
                    value={newpassword}
                    type="password"
                    onChange={this.handleChange('newpassword')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { pwdErrors.newPassword &&
                  <FormHelperText error>This is a required field</FormHelperText>
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="confirmpassword"
                    label="Confirm password"
                    className={classes.textField}
                    error={pwdErrors.confirmPassword}
                    value={confirmpassword}
                    type="password"
                    onChange={this.handleChange('confirmpassword')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { pwdErrors.confirmPassword &&
                  <FormHelperText error>This is a required field</FormHelperText>
                  }
                </Grid>
              </Grid>
            </form>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid
              container
              direction="row"
            >
              <Grid item sm={6} xs={12}>
                <div className={classes.toggleContainer}>
                  <LocationOn color="secondary"/>
                  <Switch />
                  <Typography component="p">Show my location</Typography>
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className={classes.toggleContainer}>
                  <PersonPin color="secondary"/>
                  <Switch checked="true" />
                  <Typography component="p">Show my avatar</Typography>
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className={classes.toggleContainer}>
                  <Group color="secondary"/>
                  <Switch checked="true" />
                  <Typography component="p">Show my connections</Typography>
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className={classes.toggleContainer}>
                  <Share color="secondary"/>
                  <Switch checked="true" />
                  <Typography component="p">Show social links</Typography>
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className={classes.toggleContainer}>
                  <NotificationsActive color="secondary"/>
                  <Switch />
                  <Typography component="p">Send Notifications</Typography>
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <div className={classes.toggleContainer}>
                  <Backup color="secondary"/>
                  <Switch />
                  <Typography component="p">Allow cloud backups</Typography>
                </div>
              </Grid>
            </Grid>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProfileTabs);
