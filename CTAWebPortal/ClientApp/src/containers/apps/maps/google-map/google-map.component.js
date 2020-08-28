import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
// Material UI
import Avatar from '@material-ui/core/Avatar';

import scss from './google-map.module.scss';

const styles = [{
  featureType: 'administrative.country',
  elementType: 'geometry',
  stylers: [
    {
      visibility: 'simplified'
    },
    {
      hue: '#ff0000'
    }
  ]
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
      markers, onMarkerClick, activeMarker
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
            key={marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={onMarkerClick(marker)}
          >
            {marker === activeMarker &&
            <InfoWindow>
              <div className={scss['portal-maps-info-window']}>
                <Avatar alt={marker.name} src={`${process.env.PUBLIC_URL}/${marker.photo}`} />
                <strong>{`${marker.name} - ${marker.surname}`}</strong>
              </div>
            </InfoWindow>}
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
  onMarkerClick: PropTypes.func.isRequired
};


export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXVUKDvaxn13Atl_SPuQj2g5MK-C1RYRs&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(GoogleMaps);
