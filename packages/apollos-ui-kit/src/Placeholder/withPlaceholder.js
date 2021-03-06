import React from 'react';

import { getIsLoading } from '../isLoading';

import Line from './Line';

const withPlaceholder = (PlaceholderComponent = Line, getProps = {}) => (
  Component
) =>
  getIsLoading(({ isLoading = false, style, ...props }) => {
    const propInput =
      typeof getProps === 'function' ? getProps(props) : getProps;
    return (
      <PlaceholderComponent onReady={!isLoading} style={style} {...propInput}>
        <Component style={style} {...props} />
      </PlaceholderComponent>
    );
  });

export default withPlaceholder;
