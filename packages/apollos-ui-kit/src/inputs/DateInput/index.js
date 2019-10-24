import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Animated } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Chip from '../../Chip';
import styled from '../../styled';

import InputWrapper from '../InputWrapper';
import FloatingLabel from '../FloatingLabel';
import ErrorText from '../ErrorText';

const StyledChip = styled({ marginTop: 5 }, 'DateInput.Chip')(Chip);

class DateInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any, // eslint-disable-line
    displayValue: PropTypes.string,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.any, // eslint-disable-line
  };

  state = {
    isVisible: false,
  };

  handleOpen = () => this.setState({ isVisible: true });

  handleClose = () => {
    this.setState({ isVisible: false });
    if (this.props.onBlur) this.props.onBlur();
  };

  handleConfirm = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.onChangeText) {
      this.props.onChangeText(moment(value).format('MM/DD/YYYY'));
    }
    this.handleClose();
  };

  render() {
    let date = this.props.value;
    if (typeof date === 'string') date = moment(date).toDate();
    return (
      <InputWrapper>
        <StyledChip
          title={
            this.props.displayValue ||
            this.props.placeholder ||
            this.props.label
          }
          onPress={this.handleOpen}
        />
        <DateTimePicker
          date={date || new Date()}
          isVisible={this.state.isVisible}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}
          maximumDate={new Date()}
        />
        {this.props.displayValue || this.props.placeholder ? (
          <FloatingLabel animation={new Animated.Value(1)}>
            {this.props.label}
          </FloatingLabel>
        ) : null}
        {this.props.error && typeof this.props.error === 'string' ? (
          <ErrorText>{this.props.error}</ErrorText>
        ) : null}
      </InputWrapper>
    );
  }
}

export default DateInput;
