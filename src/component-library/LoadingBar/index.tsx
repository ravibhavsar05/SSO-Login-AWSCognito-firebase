import React, {useEffect, useRef} from 'react';
import {View, ViewStyle, Animated, Dimensions} from 'react-native';

import styles from './styles';

interface Props {
  loading: boolean;
  style?: ViewStyle;
}

const windowWidth = Dimensions.get('window').width;

export default function LoadingBar({loading, style}: Props) {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const useNativeDriver = false;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        useNativeDriver,
        toValue: windowWidth + 100,
        duration: 1000,
      }),
    ).start();
  }, [translateX, useNativeDriver]);

  useEffect(() => {
    if (loading) {
      Animated.timing(opacity, {
        useNativeDriver,
        toValue: 0.3,
        duration: 250,
      }).start();
    } else {
      Animated.timing(opacity, {
        useNativeDriver,
        toValue: 0,
        duration: 250,
      }).start();
    }
  }, [loading, opacity, useNativeDriver]);

  return (
    <View style={[styles.container, style && style]}>
      <Animated.View
        style={[styles.loadingBar, {transform: [{translateX}], opacity}]}
      />
    </View>
  );
}
