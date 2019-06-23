import React from 'react';
import renderer from 'react-test-renderer';
import { H6 } from '@apollosproject/ui-kit';

import { Providers } from '../testUtils';

import PhoneEntry from './PhoneEntry';

describe('The Auth PhoneEntry component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a custom alternateLoginText', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry
          setFieldValue={() => {}}
          onPressAlternateLogin={() => {}}
          alternateLoginText={
            'Custom Text to direct people to an alternate login flow'
          }
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a custom authTitleText', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} authTitleText={'Custom Title'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as disabled', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} disabled />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in an error state', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry
          setFieldValue={jest.fn()}
          errors={{ phone: 'Boom Error Boom' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry
          setFieldValue={jest.fn()}
          onPressNext={jest.fn()}
          isLoading
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with an alternate login option with default text', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry
          setFieldValue={jest.fn()}
          onPressAlternateLogin={jest.fn()}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in a next button', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} onPressNext={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom smsPolicyInfo component', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry
          setFieldValue={jest.fn()}
          smsPolicyInfo={
            <H6 style={{ color: 'salmon' }}>Boom custom legalese boom</H6> // eslint-disable-line react-native/no-inline-styles, react-native/no-color-literals
          }
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
