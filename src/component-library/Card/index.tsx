import React, {ReactNode} from 'react';
import {ViewStyle, View, TouchableOpacity} from 'react-native';

import styles from './styles';

interface Props {
  children: ReactNode;
  dark?: boolean;
  onPress?(): void;
  style?: ViewStyle;
}

function Card({children, dark, style, onPress}: Props) {
  const cardStyles = [styles.card, dark && styles.darkCard, style && style];

  if (!onPress) {
    return <View style={cardStyles}>{children}</View>;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={cardStyles}>{children}</View>
    </TouchableOpacity>
  );
}

export default Card;
