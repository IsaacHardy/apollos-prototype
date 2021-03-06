import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { H6, H5, styled } from '@apollosproject/ui-kit';

export const fieldProps = {
  label: PropTypes.string,
  value: PropTypes.string,
  textAlignment: PropTypes.oneOf(['LEFT', 'RIGHT', 'NATURAL', 'CENTER']),
  LabelComponent: PropTypes.func,
  ValueComponent: PropTypes.func,
  isLoading: PropTypes.bool,
};

const FieldTextAlignment = styled(({ textAlignment = 'LEFT' }) => {
  let textAlign = textAlignment.toLowerCase();
  if (textAlign === 'natural') textAlign = 'left';
  return { textAlign };
})(Text);

const FieldColumn = styled({
  flex: 1,
})(View);

const Field = ({
  label,
  value,
  textAlignment,
  LabelComponent = H6,
  ValueComponent = H5,
  isLoading,
}) => (
  <FieldColumn>
    {isLoading ? (
      <React.Fragment>
        <LabelComponent isLoading />
        <ValueComponent isLoading />
      </React.Fragment>
    ) : (
      <React.Fragment>
        {label ? (
          <FieldTextAlignment textAlignment={textAlignment}>
            <LabelComponent>{label}</LabelComponent>
          </FieldTextAlignment>
        ) : null}
        <FieldTextAlignment textAlignment={textAlignment}>
          <ValueComponent>{value}</ValueComponent>
        </FieldTextAlignment>
      </React.Fragment>
    )}
  </FieldColumn>
);

Field.propTypes = fieldProps;

export default Field;
