import React from 'react';
import {
  Text as RNText,
  TouchableOpacity,
  View,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../../style-guide';


import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import styles from './styles';

export interface Props extends TouchableOpacityProps {
  text: string;
  type?: 'primary' | 'secondary' | 'danger' | 'tertiary';
  onPress(): void;
  loading?: boolean;
  style?: ViewStyle;
  leftIcon?: string;
  rightIcon?: string;
}

function BlackButton({
  text,
  type = 'primary',
  onPress,
  loading = false,
  style,
  leftIcon,
  rightIcon,
  disabled = false,
}: Props) {
  const onPressButton = loading ? () => { } : onPress;
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], style && style]}
      onPress={onPressButton}
      activeOpacity={0.5}
      disabled={disabled}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.row}>
          <View style={styles.leftIcon}>
            {leftIcon && (
              <Icon name={leftIcon} size={18} color={colors.greys.black} />
            )}
          </View>
          <RNText
            textBreakStrategy="simple"
            allowFontScaling={false}
            style={[styles.text, type === 'danger' && styles.dangerText]}>
            {text}
          </RNText>
          <View style={styles.rightIcon}>
            {rightIcon && (
              <Icon name={rightIcon} size={18} color={colors.greys.black} />
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default BlackButton;
