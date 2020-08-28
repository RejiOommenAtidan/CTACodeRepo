import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Map from './google-map/google-map.component';

import themeStyles from './region-sales-widget.theme.style';

const markers = [{
  lat: 51.673858,
  lng: 7.815982,
  sales: 13265,
  label: 'Center Region'
}, {
  lat: 51.373858,
  lng: 6.085982,
  sales: 32456,
  label: 'West Region'
}, {
  lat: 52.113858,
  lng: 7.895982,
  sales: 678654,
  label: 'North Region'
}, {
  lat: 51.623858,
  lng: 9.495982,
  sales: 34645,
  label: 'East Region'
}, {
  lat: 51.143858,
  lng: 7.385982,
  sales: 27456,
  label: 'South Region'
}];

class RegionSalesWidget extends React.Component {
  state = {
    activeMarker: null,
    anchorEl: null
  };

  onPersonClick = marker => () => {
    this.setState({ activeMarker: marker, anchorEl: null });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <Card className={classes['portal-sales-widget']}>
        <CardHeader
          action={
            <IconButton
              aria-owns={anchorEl ? 'location-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title="Sales By Region"
          subheader="Shop distribution"
        />
        <CardContent className={classes['portal-sales-widget__map']}>
          <Map markers={markers} activeMarker={this.state.activeMarker} onMarkerClick={this.onPersonClick} />
        </CardContent>
        <Menu
          id="location-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {markers.map(marker => (
            <MenuItem key={marker.label} onClick={this.onPersonClick(marker)}>{marker.label}</MenuItem>
          ))}
        </Menu>
      </Card>
    );
  }
}

RegionSalesWidget.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(RegionSalesWidget);
