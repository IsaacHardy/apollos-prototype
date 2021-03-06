import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import AskName from '.';

storiesOf('ui-onboarding/slides/AskName', module)
  .add('default', () => <AskName setFieldValue={() => {}} />)
  .add('slideTitle', () => (
    <AskName slideTitle={'Custom title text'} setFieldValue={() => {}} />
  ))
  .add('description', () => (
    <AskName description={'Custom description text'} setFieldValue={() => {}} />
  ))
  .add('firstName and lastName', () => (
    <AskName
      values={{ firstName: 'Marty', lastName: 'McFly' }}
      setFieldValue={() => {}}
    />
  ))
  .add('isLoading', () => (
    <AskName
      values={{ firstName: 'Marty', lastName: 'McFly' }}
      setFieldValue={() => {}}
      isLoading
    />
  ))
  .add('SlideWrapper props', () => (
    <AskName setFieldValue={() => {}} onPressPrimary={() => {}} />
  ));
