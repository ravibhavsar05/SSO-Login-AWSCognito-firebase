import {Text, View} from 'react-native';
import React from 'react';
import style from './style';
import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ScreenRoute} from '../../Navigation/ScreenRoute';

interface Props {
  navigation: StackScreenProps<ScreenRouteAndParam, ScreenRoute.NEW_SCREEN>;
}

export default function NewScreen({navigation}: Props) {
  return (
    <View style={style.container}>
      <Text style={style.textColor}>New Screen</Text>
    </View>
  );
}
