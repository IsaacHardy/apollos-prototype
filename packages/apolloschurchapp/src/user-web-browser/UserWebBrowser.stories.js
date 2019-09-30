import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import UserWebBrowser from '.';

storiesOf('ui-kit/UserWebBrowser', module)
  .add('Example', () => (
    <UserWebBrowser
      modal={false}
      navigation={{ getParam: (uri, fallback) => fallback }}
      url={
        'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending'
      }
    />
  ))
  .add('Modal', () => (
    <UserWebBrowser
      navigation={{ getParam: (uri, fallback) => fallback }}
      modal
      url={
        'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending'
      }
    />
  ));
