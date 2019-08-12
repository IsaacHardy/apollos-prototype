/* eslint no-bitwise: [2, { allow: ["|"] }] */
import React, { useState, useEffect } from 'react';

import { GradientOverlayImage, styled } from '@apollosproject/ui-kit';
import { ApolloConsumer } from 'react-apollo';

import {
  AskNotificationsConnected,
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
  OnboardingSwiper,
  setOnboardingComplete,
} from '@apollosproject/ui-onboarding';

import { requestPushPermissions } from '@apollosproject/ui-notifications';

const StyledGradient = styled({
  maxHeight: '40%',
})(GradientOverlayImage);

const Onboarding = ({ navigation }) => {
  // bitwise flags for each screen
  // NOTE: if a screen is added, a new flag needs to be accounted for
  const [completed, setCompleted] = useState(0);

  // if every screen has been completed, skip onboarding
  useEffect(() => {
    if (completed === 15) {
      navigation.replace('Tabs');
      // TODO async store the user ID
    }
  }, [completed]);

  return (
    <OnboardingSwiper>
      {({ swipeForward }) => (
        <>
          <AskNameConnected
            onPressPrimary={swipeForward}
            onCompleted={() => setCompleted(completed | 1)}
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
            onCompleted={() => setCompleted(completed | 2)}
            BackgroundComponent={
              <StyledGradient
                source={'https://picsum.photos/640/640/?random'}
              />
            }
          />
          <LocationFinderConnected
            onPressPrimary={swipeForward}
            onCompleted={() => setCompleted(completed | 4)}
            onNavigate={() => {
              navigation.navigate('Location', {
                onFinished: swipeForward,
              });
            }}
            BackgroundComponent={
              <StyledGradient
                source={'https://picsum.photos/640/640/?random'}
              />
            }
          />
          <ApolloConsumer>
            {(client) => (
              <AskNotificationsConnected
                onPressPrimary={() => {
                  if (completed === 15) setOnboardingComplete({ client });
                  navigation.replace('Tabs');
                }}
                onCompleted={() => setCompleted(completed | 8)}
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
            )}
          </ApolloConsumer>
        </>
      )}
    </OnboardingSwiper>
  );
};

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default Onboarding;
