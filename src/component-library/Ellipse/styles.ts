import {StyleSheet, ViewStyle} from 'react-native';

import colors from '../../style-guide/colors';

interface Styles {
  container: ViewStyle;
  containerActive: ViewStyle;
  ellipse: ViewStyle;
  ellipseActive: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    marginHorizontal: 8,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: colors.yellows.light,
    borderRadius: 10,
  },
  ellipse: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.greys.light,
  },
  ellipseActive: {
    backgroundColor: colors.yellows.default,
  },
});
