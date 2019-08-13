import React from 'react';

import { ApolloConsumer } from 'react-apollo';
import Onboarding from './Onboarding';

const OnboardingConnected = ({ ...props }) => (
  <ApolloConsumer>
    {(client) => <Onboarding client={client} {...props} />}
  </ApolloConsumer>
);

export default OnboardingConnected;
