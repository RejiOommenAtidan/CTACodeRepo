import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import classNames from 'classnames';
// Material UI
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withWidth from '@material-ui/core/withWidth';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

import Map from './google-map/google-map.component';

import markers from '../../../assets/data/apps/maps/maps.json';


import themeStyles from './maps.theme.style';
import scss from './maps.module.scss';

class Maps extends React.Component {
  state = {
    activeMarker: null
  };

  onPersonClick = marker => () => {
    this.setState({ activeMarker: marker });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={scss['portal-map-page-wrapper']}>
        <Map markers={markers} activeMarker={this.state.activeMarker} onMarkerClick={this.onPersonClick} />
        <Grid
          container
          spacing={16}
          className={scss['portal-map-cards']}
          alignItems="stretch"
          direction="column"
          justify="space-around"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={4}>
              <List className={classNames(scss['portal-map-card-list'], 'portal-hide-scrollbars')}>
                {markers.map(marker => (
                  <ListItem onClick={this.onPersonClick(marker)} key={marker.name}>
                    <ListItemAvatar>
                      <Avatar alt={marker.name} src={`${process.env.PUBLIC_URL}/${marker.photo}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${marker.name} ${marker.surname}`}
                      secondary={marker.profession}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Delete"
                        className={marker === this.state.activeMarker ?
                          classes['portal-maps-contact-item--active'] : ''}
                      >
                        <PersonPinCircleIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={4}
              className={classNames(
                scss['portal-maps-contact-detail-card'],
                classes['portal-maps-contact-detail-card'],
                'portal-hide-scrollbars'
              )}
            >
              {this.state.activeMarker ?
                <div>
                  <Typography variant="body2" component="h3" color="inherit" gutterBottom>
                    {this.state.activeMarker.name} - {this.state.activeMarker.surname} -
                    {this.state.activeMarker.age} - {this.state.activeMarker.profession}
                  </Typography>
                  <Typography color="inherit">
                    {this.state.activeMarker.bio}
                    {this.state.activeMarker.bio}
                  </Typography>
                </div>
                :
                <div>
                  <div className={classNames(
                    scss['portal-maps-contact-detail-card__pin'],
                    classes['portal-maps-contact-detail-card__pin']
                  )}
                  />
                  <div className={classNames(
                    scss['portal-maps-contact-detail-card__pulse'],
                    classes['portal-maps-contact-detail-card__pulse']
                  )}
                  />
                  <Typography color="inherit" className={scss['portal-maps-contact-detail-card__explainer']}>
                    Click on one of the map markers or the avatars above in order to view that person&apos;s details.
                  </Typography>
                </div>
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Maps.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(Maps);
