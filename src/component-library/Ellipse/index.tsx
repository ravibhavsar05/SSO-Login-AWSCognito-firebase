import React from 'react';
import {View} from 'react-native';

import styles from './styles';

interface Props {
  active: boolean;
}

function Ellipse({active}: Props) {
  return (
    <View style={[styles.container, active && styles.containerActive]}>
      <View style={[styles.ellipse, active && styles.ellipseActive]} />
    </View>
  );
}

export default Ellipse;
