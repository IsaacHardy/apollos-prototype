import React from 'react';
import { NativeModules } from 'react-native';

jest.mock('../apollos-ui-kit/node_modules/react-native-safe-area-context/', () => ({
  SafeAreaConsumer: ({ children }) => children({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
}));

jest.mock('@apollosproject/ui-analytics', () => ({
  track: () => '',
  AnalyticsProvider: ({ children }) => children,
  AnalyticsConsumer: ({ children }) => children({ track: jest.fn() }),
  withTrackOnPress: (Component) => (props) => <Component {...props} />,
}));

jest.mock('react-navigation', () => {
  const ActualNavigation = require.requireActual('react-navigation');
  return {
    ...ActualNavigation,
    SafeAreaView: require.requireActual('SafeAreaView'),
  };
});

jest.mock('DatePickerIOS', () => 'DatePicker');

NativeModules.RNGestureHandlerModule = {};
