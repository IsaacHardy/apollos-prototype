import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Splash from '.';

storiesOf('Splash', module)
  .add('default', () => <Splash />)
  .add('slideTitle', () => <Splash slideTitle={'Custom title text'} />)
  .add('description', () => <Splash description={'Custom description text'} />)
  .add('textColor', () => <Splash textColor={'salmon'} />)
  .add('Slide props', () => <Splash onPressPrimary={() => {}} />);
