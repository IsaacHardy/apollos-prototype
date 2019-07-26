import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { ScrollView } from 'react-native';

import BackgroundView from '../BackgroundView';
import CenteredView from '../CenteredView';
import { CardLabel } from '../Card';

import TileCard from '.';

storiesOf('ui-kit/TileCard', module)
  .addDecorator((story) => (
    <BackgroundView>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <CenteredView style={{ alignItems: 'stretch' }}>{story()}</CenteredView>
    </BackgroundView>
  ))
  .add('default', () => (
    <TileCard
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
    <TileCard
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
    <TileCard
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
    <TileCard
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
    <TileCard
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
    <TileCard
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
    <TileCard
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
      <TileCard
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
      <TileCard
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
