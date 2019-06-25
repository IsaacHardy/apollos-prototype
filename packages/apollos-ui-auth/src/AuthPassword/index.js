/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import {
  TabView,
  PaddedView,
  TabSceneMap as SceneMap,
} from '@apollosproject/ui-kit';
import { SafeAreaView } from 'react-navigation';

import { PromptText } from '../styles';
import { AuthConsumer } from '../Provider';
import { PasswordLoginConnected } from '../PasswordLogin';
import { PasswordSignupConnected } from '../PasswordSignup';

class AuthPassword extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  tabRoutes = [
    { title: 'Sign In', key: 'login' },
    { title: 'Register', key: 'signup' },
  ];

  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    onFinish: PropTypes.func,
    passwordPromptText: PropTypes.string,
    screenProps: PropTypes.shape({}), // we'll funnel screenProps into props
  };

  static defaultProps = {
    passwordPromptText: 'Login with your email and password.',
  };

  get flatProps() {
    return { ...this.props, ...(this.props.screenProps || {}) };
  }

  render() {
    return (
      <AuthConsumer>
        {({ closeAuth }) => (
          <KeyboardAvoidingView
            style={StyleSheet.absoluteFill}
            behavior="padding"
          >
            <SafeAreaView style={StyleSheet.absoluteFill}>
              <PaddedView>
                <PromptText>{this.flatProps.passwordPromptText}</PromptText>
              </PaddedView>

              <TabView
                routes={this.tabRoutes}
                renderScene={SceneMap({
                  login: () => <PasswordLoginConnected onLogin={closeAuth} />,
                  signup: () => (
                    <PasswordSignupConnected onSignup={closeAuth} />
                  ),
                })}
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
        )}
      </AuthConsumer>
    );
  }
}

export default AuthPassword;