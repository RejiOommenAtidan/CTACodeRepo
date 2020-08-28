import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import PropTypes from 'prop-types';
// Material UI
import { withStyles } from '@material-ui/core/styles';

import themeStyles from './google-map.theme.style';

const styles = [{
  featureType: 'administrative.country',
  elementType: 'geometry',
  stylers: [{
    visibility: 'simplified'
  }, {
    hue: '#ff0000'
  }]
}];

class GoogleMaps extends React.Component {
  state = {
    mapRef: null
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.activeMarker !== nextProps.activeMarker) {
      this.state.mapRef.panTo(nextProps.activeMarker);
    }
  }

  onMapMounted = (ref) => {
    this.setState({ mapRef: ref });
  };

  render() {
    const {
      markers, onMarkerClick, classes
    } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 51.678418, lng: 7.809007 }}
        defaultOptions={{ scrollwheel: false, styles }}
        ref={this.onMapMounted}
      >
        {markers.map(marker => (
          <Marker
            key={marker.sales}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={onMarkerClick(marker)}
          >
            <InfoBox options={{ pixelOffset: { width: -60, height: -80 }, closeBoxURL: '' }}>
              <div className={classes['portal-maps-info-box']}>
                <strong>{`${marker.sales} Sales`}</strong>
              </div>
            </InfoBox>
          </Marker>
        ))}
      </GoogleMap>
    );
  }
}


GoogleMaps.defaultProps = {
  activeMarker: null
};

GoogleMaps.propTypes = {
  activeMarker: PropTypes.shape({}),
  markers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired
};


export default compose(
  withStyles(themeStyles, { withTheme: true }),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXVUKDvaxn13Atl_SPuQj2g5MK-C1RYRs&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(GoogleMaps);
