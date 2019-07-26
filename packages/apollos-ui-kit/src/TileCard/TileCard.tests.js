import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../Providers';
import { CardLabel } from '../Card';

import TileCard from '.';

describe('TileCard', () => {
  it('should render in a "tall" aspect ratio (maxAspectRatio)', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in a "wide" aspect ratio', () => {
    const tree = renderer.create(
      <Providers>
        <TileCard
          title={
            'Are you telling me that you built a time machine out of a DeLorean?'
          }
          coverImage={[
            {
              uri: 'https://picsum.photos/1600/800/?random',
            },
          ]}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a custom actionIcon', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should should render with an action "button"', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should should render as isLiked', () => {
    const tree = renderer.create(
      <Providers>
        <TileCard
          title={
            'Are you telling me that you built a time machine out of a DeLorean?'
          }
          coverImage={[
            {
              uri: 'https://picsum.photos/800/1600/?random',
            },
          ]}
          isLiked
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should should render as isLive', () => {
    const tree = renderer.create(
      <Providers>
        <TileCard
          title={
            'Are you telling me that you built a time machine out of a DeLorean?'
          }
          coverImage={[
            {
              uri: 'https://picsum.photos/800/1600/?random',
            },
          ]}
          isLive
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state with isLoading', () => {
    const tree = renderer.create(
      <Providers>
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
          isLoading
          labelText={'Loading!'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with custom LabelComponent', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with custom labelText', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a custom theme', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
