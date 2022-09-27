import React from 'react';
import {Text as RNText, TouchableOpacity, ViewStyle, View} from 'react-native';

import styles from './styles';

interface Props {
  text: string;
  onPress(): void;
  center?: boolean;
  style?: ViewStyle;
  dotted?: boolean;
}

function TextLink({
  text,
  onPress,
  center = false,
  dotted = false,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        center && styles.center,
        dotted && styles.noUnderline,
        style && style,
      ]}
      onPress={onPress}
      activeOpacity={0.5}>
      <RNText
        textBreakStrategy="simple"
        allowFontScaling={false}
        style={[styles.text, dotted && styles.dottedText]}>
        {text}
      </RNText>
      {dotted && <View style={styles.dottedLine} />}
    </TouchableOpacity>
  );
}

export default TextLink;
