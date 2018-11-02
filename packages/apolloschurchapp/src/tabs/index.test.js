import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';

import TabBar from '.';

describe('Tabs', () => {
  it('should display tab bar', () => {
    const tree = renderer.create(
      <Providers>
        <TabBar />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
