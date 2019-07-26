import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { ScrollView } from 'react-native';

import BackgroundView from '../BackgroundView';
import CenteredView from '../CenteredView';
import { CardLabel } from '../Card';

import HorizontalHighlightCard from '.';

storiesOf('ui-kit/HorizontalHighlightCard', module)
  .addDecorator((story) => (
    <BackgroundView>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <CenteredView style={{ alignItems: 'stretch' }}>{story()}</CenteredView>
    </BackgroundView>
  ))
  .add('default', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
    />
  ))
  .add('actionIcon', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      actionIcon={'umbrella'}
      hasAction
    />
  ))
  .add('hasAction', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      hasAction
    />
  ))
  .add('isLoading', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      hasAction
      labelText={'Custom Label'}
      isLoading
    />
  ))
  .add('LabelComponent', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      LabelComponent={<CardLabel title={'Custom LabelComponent'} />}
    />
  ))
  .add('labelText', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      labelText={'Quote'}
    />
  ))
  .add('theme', () => (
    <HorizontalHighlightCard
      title={
        'Are you telling me that you built a time machine out of a DeLorean?'
      }
      coverImage={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      theme={{
        colors: {
          primary: 'salmon',
        },
      }}
    />
  ))
  .add('theme', () => (
    <ScrollView>
      <HorizontalHighlightCard
        title={
          'Are you telling me that you built a time machine out of a DeLorean?'
        }
        coverImage={[
          {
            uri: 'https://picsum.photos/800/1600/?random',
          },
        ]}
        theme={{
          colors: {
            primary: 'salmon',
          },
        }}
      />
      <HorizontalHighlightCard
        title={
          'Are you telling me that you built a time machine out of a DeLorean?'
        }
        coverImage={[
          {
            uri: 'https://picsum.photos/800/1600/?random',
          },
        ]}
        labelText={'Quote'}
        hasAction
        isLiked
        theme={{
          type: 'light',
          colors: {
            primary: 'yellow',
            white: 'dodgerblue',
            text: {
              primary: 'dodgerblue',
            },
          },
        }}
      />
    </ScrollView>
  ));
