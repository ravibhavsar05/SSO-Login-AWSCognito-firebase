import React, {ReactNode} from 'react';
import {Text as RNText, View} from 'react-native';

import styles from './styles';

interface Props {
  children?: ReactNode;
}

function ErrorText({children}: Props) {
  return (
    <View style={styles.container}>
      {!!children && (
        <RNText
          textBreakStrategy="simple"
          allowFontScaling={false}
          style={styles.error}>
          {children}
        </RNText>
      )}
    </View>
  );
}

export default ErrorText;
