import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { Providers as UIProviders } from '@apollosproject/ui-kit';

export const render = async (component) => {
  const tree = renderer.create(component);
  await wait(0);
  return tree;
};

export const TestProvider = ({ children, mocks = [], ...props }) => (
  <UIProviders {...props}>
    <MockedProvider mocks={mocks}>{children}</MockedProvider>
  </UIProviders>
);

TestProvider.propTypes = {
  children: PropTypes.element,
  mocks: PropTypes.arrayOf(
    PropTypes.shape({
      request: PropTypes.shape({}),
      response: PropTypes.shape({}),
    })
  ),
};
