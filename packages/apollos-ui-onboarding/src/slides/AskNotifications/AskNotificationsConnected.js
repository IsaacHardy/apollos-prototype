import React, { memo } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
// This query is also found in core/permissionUtils. We should refactor into a notifications module.
import { GET_NOTIFICATIONS_ENABLED } from '@apollosproject/ui-notifications';

import AskNotifications from './AskNotifications';
// eslint-disable-next-line react/display-name
const AskNotificationsConnected = memo(
  ({ Component, onSwipe, onRequestPushPermissions, onCompleted, ...props }) => {
    const complete = async () => {
      await onCompleted();
      onSwipe();
    };
    return (
      <Query query={GET_NOTIFICATIONS_ENABLED}>
        {({ data: { notificationsEnabled = false } = {} }) => (
          <Component
            onPressButton={() => onRequestPushPermissions()}
            buttonDisabled={notificationsEnabled}
            buttonText={
              notificationsEnabled
                ? 'Notifications Enabled!'
                : 'Yes, enable notifications'
            }
            onPressPrimary={notificationsEnabled ? complete : null}
            onPressSecondary={notificationsEnabled ? null : onSwipe}
            pressPrimaryEventName={'Ask Notifications Completed'}
            pressSecondaryEventName={'Ask Notifications Skipped'}
            {...props}
          />
        )}
      </Query>
    );
  }
);

AskNotificationsConnected.propTypes = {
  Component: PropTypes.node, // Custom component to be rendered. Defaults to AskNotifications
  onSwipe: PropTypes.func,
  onRequestPushPermissions: PropTypes.func.isRequired,
  onCompleted: PropTypes.func,
};

AskNotificationsConnected.defaultProps = {
  Component: AskNotifications,
};

AskNotificationsConnected.displayName = 'AskNotificationsConnected';

export default AskNotificationsConnected;
