import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

import colors from '../../style-guide/colors';
import textSizes from '../../style-guide/textSizes';

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  dottedText: TextStyle;
  center: ViewStyle;
  noUnderline: ViewStyle;
  dottedLine: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    alignSelf: 'flex-start',
    borderColor: colors.yellows.default,
    borderBottomWidth: 2,
    overflow: 'hidden',
  },
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    color: colors.greys.dark,
    fontSize: textSizes.default,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  dottedText: {
    fontWeight: 'normal',
    color: colors.greys.black,
  },
  noUnderline: {
    borderBottomWidth: 0,
  },
  dottedLine: {
    borderRadius: 1,
    height: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.greys.black,
    marginBottom: -3,
  },
});
