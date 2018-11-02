import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'apolloschurchapp/src/ui/Icon';

const newLocal = 24;
const tabBarIcon = (name) => {
  const tabName = `${name}Tab`;
  function TabBarIcon({ tintColor }) {
    return (
      <View testID={tabName}>
        <Icon name={name} fill={tintColor} size={newLocal} />
      </View>
    );
  }
  TabBarIcon.propTypes = {
    tintColor: PropTypes.string,
  };
  return TabBarIcon;
};

export default tabBarIcon;
