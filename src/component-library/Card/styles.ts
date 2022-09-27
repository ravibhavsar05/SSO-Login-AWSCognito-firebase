import {StyleSheet, ViewStyle, Platform} from 'react-native';

import colors from '../../style-guide/colors';

interface Styles {
  card: ViewStyle;
  darkCard: ViewStyle;
}

export default StyleSheet.create<Styles>({
  card: {
    backgroundColor: colors.greys.white,
    borderRadius: 10,
    shadowColor: colors.greys.light,
    shadowRadius: 3,
    shadowOpacity: 1,
    ...Platform.select({
      android: {
        borderTopWidth: 0.5,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 2.5,
        borderColor: 'rgba(151,153,155, 0.2)',
      },
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
    }),
  },
  darkCard: {
    backgroundColor: colors.greys.darker,
    shadowColor: colors.greys.darker,
  },
});
