import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  GradientOverlayImage,
  styled,
  BackgroundView,
} from '@apollosproject/ui-kit';
import { ApolloConsumer } from 'react-apollo';

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

const Onboarding = ({ navigation }) => {
  // bitwise flags for each screen
  // NOTE: if a screen is added, a new flag needs to be accounted for
  const [completed, setCompleted] = useState(0);
  const [user, setUser] = useState('');

  // if every screen has been completed, skip onboarding
  useEffect(() => {
    const fetch = async () => {
      const users = await AsyncStorage.getItem('onboardedUsers');
      console.log('users', users);
      console.log('completed', completed);
      const userSet = new Set(users ? users.split(',') : []);
      if (completed === 15 || userSet.has(user)) {
        await AsyncStorage.setItem(
          'onboardedUsers',
          Array.from(userSet.add(user)).join(',')
        );
        navigation.replace('Tabs');
      }
    };
    fetch();
  }, [completed]);

  const complete = async (client, flag) => {
    const { data } = await client.query({
      query: GET_USER_PROFILE,
    });
    setUser(data.currentUser.id);
    /* eslint-disable-next-line no-bitwise */
    setCompleted(completed | flag);
  };

  return (
    <>
      <FullscreenBackgroundView />
      <ApolloConsumer>
        {(client) => (
          <OnboardingSwiper>
            {({ swipeForward }) => (
              <>
                <AskNameConnected
                  onSwipe={swipeForward}
                  onCompleted={async () => complete(client, 1)}
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
                  onCompleted={async () => complete(client, 2)}
                  BackgroundComponent={
                    <StyledGradient
                      source={'https://picsum.photos/640/640/?random'}
                    />
                  }
                />
                <LocationFinderConnected
                  onSwipe={swipeForward}
                  onCompleted={async () => complete(client, 4)}
                  onNavigate={() => navigation.navigate('Location')}
                  BackgroundComponent={
                    <StyledGradient
                      source={'https://picsum.photos/640/640/?random'}
                    />
                  }
                />
                <AskNotificationsConnected
                  onSwipe={() => navigation.replace('Tabs')}
                  onCompleted={async () => complete(client, 8)}
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
        )}
      </ApolloConsumer>
    </>
  );
};

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default Onboarding;
