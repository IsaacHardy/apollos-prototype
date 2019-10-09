import React from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { get } from 'lodash';
import {
  PaddedView,
  TextInput,
  BackgroundView,
  Icon,
} from '@apollosproject/ui-kit';
import { colors, sizing } from '@apollosproject/ui-kit/src/theme/defaultTheme';

import {
  FlexedSafeAreaView,
  NextButton,
  TitleText,
  PromptText,
  BrandIcon,
} from '../styles';

const styles = StyleSheet.create({
  backButton: {
    marginRight: sizing.baseUnit,
  },
  backButtonContainer: {
    width: sizing.baseUnit * 2,
    height: sizing.baseUnit * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const Verification = ({
  confirmationTitleText,
  confirmationPromptText,
  disabled,
  errors,
  isLoading,
  onPressNext,
  onPressBack,
  setFieldValue,
  values,
  BackgroundComponent,
}) => (
  <KeyboardAvoidingView
    style={StyleSheet.absoluteFill}
    behavior={'padding'}
    keyboardVerticalOffset={
      Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
  >
    <BackgroundComponent>
      <FlexedSafeAreaView>
        <ScrollView>
          <PaddedView>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.backButtonContainer}
              onPress={() => onPressBack()}
            >
              <Icon
                style={styles.backButton}
                fill={colors.primary}
                size={sizing.baseUnit * 1.5}
                name="arrow-back"
              />
            </TouchableOpacity>
            <BrandIcon />
            <TitleText>{confirmationTitleText}</TitleText>
            <PromptText padded>{confirmationPromptText}</PromptText>

            <TextInput
              autoFocus
              label={'Verification Code'}
              type={'numeric'}
              autoComplete={'password'}
              enablesReturnKeyAutomatically
              returnKeyType={'next'}
              onSubmitEditing={onPressNext}
              error={get(errors, 'code')}
              onChangeText={(text) => setFieldValue('code', text)}
              value={get(values, 'code')}
            />
          </PaddedView>
        </ScrollView>

        {onPressNext ? (
          <PaddedView>
            <NextButton
              title={'Next'}
              onPress={onPressNext}
              disabled={disabled}
              loading={isLoading}
            />
          </PaddedView>
        ) : null}
      </FlexedSafeAreaView>
    </BackgroundComponent>
  </KeyboardAvoidingView>
);

Verification.propTypes = {
  confirmationTitleText: PropTypes.string,
  confirmationPromptText: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.shape({
    code: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onPressNext: PropTypes.func,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    code: PropTypes.string,
  }),
  BackgroundComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Verification.defaultProps = {
  confirmationTitleText: 'Thanks!\nStand by…',
  confirmationPromptText:
    'We just sent you a code. Enter it below when it comes.',
  BackgroundComponent: BackgroundView,
};

export default Verification;
