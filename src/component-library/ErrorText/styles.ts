import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import colors from '../../style-guide/colors';
import textSizes from '../../style-guide/textSizes';

interface Styles {
  error: TextStyle;
  container: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    minHeight: 30,
    paddingVertical: 10,
  },
  error: {
    fontSize: textSizes.default,
    lineHeight: 18,
    color: colors.reds.default,
  },
});
