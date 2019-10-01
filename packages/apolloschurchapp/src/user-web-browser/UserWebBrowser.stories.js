import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import UserWebBrowser from '.';

storiesOf('ui-kit/UserWebBrowser', module).add('Example', () => (
  <UserWebBrowser
    navigation={{ getParam: (uri, fallback) => fallback }}
    url={
      'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending'
    }
  />
));
