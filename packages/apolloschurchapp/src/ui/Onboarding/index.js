import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

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

  const complete = async (client, flag) => {
    const { data } = await client.query({
      query: GET_USER_PROFILE,
    });
    /* eslint-disable-next-line no-bitwise */
    setCompleted(completed | flag);
    setUser(data.currentUser.id);
  };

  // if every screen has been completed, skip onboarding
  useEffect(async () => {
    const users = await AsyncStorage.getItem('onboardedUsers');
    const userSet = new Set(users.split(','));
    if (completed.flags === 15 || userSet.has(user)) {
      await AsyncStorage.setItem(
        'onboardedUsers',
        userSet
          .add(user)
          .values()
          .join(',')
      );
      navigation.replace('Tabs');
    }
  }, [completed]);

  return (
    <>
      <FullscreenBackgroundView />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <ApolloConsumer>
            {(client) => (
              <>
                <AskNameConnected
                  onPressPrimary={swipeForward}
                  onCompleted={() => complete(client, 1)}
                />
                <FeaturesConnected
                  onPressPrimary={swipeForward}
                  BackgroundComponent={
                    <StyledGradient
                      source={'https://picsum.photos/640/640/?random'}
                    />
                  }
                />
                <AboutYouConnected
                  onPressPrimary={swipeForward}
                  onCompleted={() => complete(client, 2)}
                  BackgroundComponent={
                    <StyledGradient
                      source={'https://picsum.photos/640/640/?random'}
                    />
                  }
                />
                <LocationFinderConnected
                  onPressPrimary={swipeForward}
                  onCompleted={() => complete(client, 4)}
                  onNavigate={() => navigation.navigate('Location')}
                  BackgroundComponent={
                    <StyledGradient
                      source={'https://picsum.photos/640/640/?random'}
                    />
                  }
                />
                <AskNotificationsConnected
                  onPressPrimary={() => navigation.replace('Tabs')}
                  onCompleted={() => complete(client, 8)}
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
          </ApolloConsumer>
        )}
      </OnboardingSwiper>
    </>
  );
};

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default Onboarding;
