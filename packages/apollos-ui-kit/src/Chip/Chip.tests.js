import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../Providers';

import Chip from '.';

describe('The Chip component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Chip title="My Button!" onPress={() => {}} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render an icon', () => {
    const tree = renderer.create(
      <Providers>
        <Chip icon="like" title="Heart!!!" />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should be selected', () => {
    const tree = renderer.create(
      <Providers>
        <Chip title="My Button!" selected />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render positioned for a chipList', () => {
    const tree = renderer.create(
      <Providers>
        <Chip title="chipList" chipList />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
