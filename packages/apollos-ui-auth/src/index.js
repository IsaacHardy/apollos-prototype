import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

import AuthPassword from './Password';
import SMSVerification, { SMSVerificationConnected } from './SMSVerification';
import SMSPhoneEntry, { SMSPhoneEntryConnected } from './SMSPhoneEntry';

export LoginButton from './LoginButton';
export ProtectedAction from './ProtectedAction';
export ProtectedTouchable from './ProtectedTouchable';
export AuthProvider, { AuthConsumer } from './Provider';
export ProtectedRoute from './ProtectedRoute';

export GET_LOGIN_STATE from './getLoginState';
export LOGOUT from './logout';
export authLink from './authLink';

export {
  SMSPhoneEntry,
  SMSPhoneEntryConnected,
  SMSVerification,
  SMSVerificationConnected,
  AuthPassword,
};

const AuthNavigator = createStackNavigator(
  {
    SMSPhoneEntryConnected,
    SMSVerificationConnected,
    AuthPassword,
  },
  {
    initialRouteName: 'SMSPhoneEntryConnected',
    headerMode: 'none',
  }
);

AuthNavigator.navigationOptions = {
  header: null,
};

AuthNavigator.propTypes = {
  screenProps: PropTypes.shape({
    alternateLoginText: PropTypes.node,
    authTitleText: PropTypes.string,
    confirmationTitleText: PropTypes.string,
    confirmationPromptText: PropTypes.string,
    onFinishAuth: PropTypes.func,
    passwordPromptText: PropTypes.string,
    smsPolicyInfo: PropTypes.node,
    smsPromptText: PropTypes.string,
  }),
};

export default AuthNavigator;
