import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import Geolocation from 'react-native-geolocation-service';
import hasLocationPermission from './hasLocationPermission';
import GET_USER_CAMPUS from './getUserCampus';
import LocationFinder from './LocationFinder';

class LocationFinderConnected extends PureComponent {
  state = { locationPermission: false };

  async componentDidMount() {
    // TODO no other way (that I've found) to check for location
    // permissions without using react-native-permissions
    // which requires declaring ALL permissions in manifest
    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({ skipPermissionRequests: true });
      Geolocation.getCurrentPosition(
        () => this.setState({ locationPermission: true }),
        () => null
      );
    } else {
      const locationPermission = await hasLocationPermission();
      this.setState({ locationPermission });
    }
  }

  complete = async () => {
    this.props.onSwipe();
    this.props.onCompleted();
  };

  render() {
    return (
      <Query query={GET_USER_CAMPUS} fetchPolicy="cache-and-network">
        {({
          data: { currentUser: { profile: { campus } = {} } = {} } = {},
        }) => (
          <AnalyticsConsumer>
            {({ track }) => {
              const { onSwipe, ...otherProps } = this.props;
              const showNextBtn = !!(campus && this.state.locationPermission);

              return (
                <this.props.Component
                  onPressButton={() => {
                    this.props.onNavigate();
                    track({ eventName: 'LocationFinder Opened MapView' });
                  }}
                  onPressPrimary={showNextBtn ? this.complete : null}
                  onPressSecondary={showNextBtn ? null : onSwipe}
                  pressPrimaryEventName={'Ask Location Completed'}
                  pressSecondaryEventName={'Ask Location Skipped'}
                  buttonText={'Yes, find my local campus'}
                  campus={showNextBtn ? campus : null}
                  {...otherProps}
                />
              );
            }}
          </AnalyticsConsumer>
        )}
      </Query>
    );
  }
}

LocationFinderConnected.propTypes = {
  Component: PropTypes.shape({}),
  onSwipe: PropTypes.func,
  onNavigate: PropTypes.func.isRequired,
  onCompleted: PropTypes.func,
};

LocationFinderConnected.defaultProps = {
  Component: LocationFinder,
};

LocationFinderConnected.displayName = 'LocationFinderConnected';

export default LocationFinderConnected;
