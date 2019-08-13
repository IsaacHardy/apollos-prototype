/* eslint no-bitwise: [2, { allow: ["|"] }] */
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
  const [completed, setCompleted] = useState(['', 0]);

  const complete = async (client, flag) => {
    const { data } = await client.query({
      query: GET_USER_PROFILE,
    });
    setCompleted([data.currentUser.id, completed | flag]);
  };

  // if every screen has been completed, skip onboarding
  useEffect(async () => {
    const usersStr = await AsyncStorage.getItem('onboardedUsers');
    const users = JSON.parse(usersStr);
    if (completed[1] === 15) {
      await AsyncStorage.setItem(
        'onboardedUsers',
        JSON.stringify(users.concat([completed[0]]))
      );
    }
    if (JSON.parse(users).includes([completed[0]])) {
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
