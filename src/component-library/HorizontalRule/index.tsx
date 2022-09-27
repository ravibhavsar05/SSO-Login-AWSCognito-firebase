import React from 'react';
import {View, ViewStyle} from 'react-native';

import styles from './styles';

interface Props {
  style?: ViewStyle;
}

export default function HorizontalRule({style}: Props) {
  return <View style={[styles.horizontalRule, style]} />;
}
