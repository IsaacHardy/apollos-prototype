import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styled from '../../styled';

const OutlinedCircle = styled(
  ({ theme, isSelected }) => ({
    height: 20,
    width: 20,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: isSelected ? theme.colors.primary : theme.colors.darkTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  'RadioButton.OutlinedCircle'
)(View);

const FilledCircle = styled(
  ({ theme }) => ({
    height: 12,
    width: 12,
    borderRadius: 99,
    backgroundColor: theme.colors.primary,
  }),
  'RadioButton.FilledCircle'
)(View);

class RadioButtonIndicator extends PureComponent {
  static propTypes = {
    isSelected: PropTypes.bool,
  };

  static defaultProps = {
    isSelected: false,
  };

  render() {
    if (this.props.isSelected) {
      return (
        <OutlinedCircle isSelected>
          <FilledCircle />
        </OutlinedCircle>
      );
    }
    return <OutlinedCircle />;
  }
}

export default RadioButtonIndicator;
