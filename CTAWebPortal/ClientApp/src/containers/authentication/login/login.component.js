import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import themeStyles from './login.theme.style';
import scss from './login.module.scss';

import logoImage from '../../../assets/images/portal-logo.png';

const Login = (props) => {
  const {
    classes,
    width
  } = props;

  // Flip container to column on mobile screens.
  const panelDirection = width === 'xs' ? 'column' : 'row';

  return (
    <Grid
      container
      direction="row"
      spacing={0}
      justify="center"
      alignItems="center"
      className={classes.background}
    >
      <Grid item sm={10} xs={12} className={scss.panel}>
        <Grid direction={panelDirection} container spacing={0}>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <Card className={classNames(scss.card, classes['primary-card'])}>
              <CardContent className={scss['signup-content']}>
                <img src={logoImage} className={scss['signup-logo']} alt="logo" />
                <Typography variant="headline" component="h2" gutterBottom>
                  Portal Admin Panel
                </Typography>
                <Typography component="p" gutterBottom>
                  Welcome to our admin panel. Please login using the form or register for a new account using the button below.
                </Typography>
                <Typography component="p" gutterBottom>
                  Portal is an amazing and easy to use Admin template. If you have any questions feel free to contact us in our support forum.
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth href="/register" color="secondary" variant="raised">Create an account</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <Card className={scss.card}>
              <CardContent>
                <TextField
                  label="Email Address"
                  fullWidth
                />
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                />
              </CardContent>
              <CardActions className={scss['login-actions']}>
                <Button href="/login" color="primary" variant="raised">Login</Button>
                <Button href="/forgot-password">Forgot Password</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(Login);
