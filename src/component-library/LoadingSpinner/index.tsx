import React from 'react';
import {ActivityIndicator, View, ViewStyle} from 'react-native';
import colors from '../../style-guide/colors';


import styles from './styles';

interface Props {
  color?: string;
  small?: boolean;
  style?: ViewStyle;
}

function LoadingSpinner({
  small = false,
  color = colors.greys.dark,
  style,
}: Props) {
  const size = small ? 'small' : 'large';
  return (
    <View style={[styles.container, style && style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default LoadingSpinner;
