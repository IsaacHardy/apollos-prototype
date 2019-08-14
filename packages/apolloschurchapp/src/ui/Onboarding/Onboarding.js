/* eslint no-bitwise: [2, { allow: ["|"] }] */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import {
  GradientOverlayImage,
  styled,
  BackgroundView,
} from '@apollosproject/ui-kit';

import {
  AskNotificationsConnected,
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
  OnboardingSwiper,
} from '@apollosproject/ui-onboarding';

import { requestPushPermissions } from '@apollosproject/ui-notifications';
import GET_USER_PROFILE from '../../tabs/connect/getUserProfile';

const FullscreenBackgroundView = styled({
  position: 'absolute',
  width: '100%',
  height: '100%',
})(BackgroundView);

const StyledGradient = styled({
  maxHeight: '40%',
})(GradientOverlayImage);

const Onboarding = ({ client, navigation }) => {
  // bitwise flags for each screen
  // NOTE: if a screen is added, a new flag needs to be accounted for
  const [completed, setCompleted] = useState(0);
  const [user, setUser] = useState('');

  // if every screen has been completed, skip onboarding
  useEffect(() => {
    const check = async () => {
      if (user === '') {
        const { data } = await client.query({
          query: GET_USER_PROFILE,
        });
        setUser(data.currentUser.id);
        return;
      }
      const users = await AsyncStorage.getItem('onboardedUsers');
      const userSet = new Set(users ? users.split(',') : []);
      if (completed === 15 || userSet.has(user)) {
        await AsyncStorage.setItem(
          'onboardedUsers',
          Array.from(userSet.add(user)).join(',')
        );
        navigation.replace('Tabs');
      }
    };
    check();
  }, [completed, user]);

  return (
    <>
      <FullscreenBackgroundView />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <>
            <AskNameConnected
              onSwipe={swipeForward}
              onCompleted={async () => setCompleted(completed | 1)}
            />
            <FeaturesConnected
              onSwipe={swipeForward}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <AboutYouConnected
              onSwipe={swipeForward}
              onCompleted={async () => setCompleted(completed | 2)}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <LocationFinderConnected
              onSwipe={swipeForward}
              onCompleted={async () => setCompleted(completed | 4)}
              onNavigate={() => navigation.navigate('Location')}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <AskNotificationsConnected
              onSwipe={() => navigation.replace('Tabs')}
              onCompleted={async () => setCompleted(completed | 8)}
              onRequestPushPermissions={() =>
                requestPushPermissions({ client })
              }
              primaryNavText={'Finish'}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
          </>
        )}
      </OnboardingSwiper>
    </>
  );
};

Onboarding.propTypes = {
  client: PropTypes.shape({}),
};

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default Onboarding;
