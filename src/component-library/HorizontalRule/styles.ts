import {StyleSheet, ViewStyle} from 'react-native';

import colors from '../../style-guide/colors';

interface Styles {
  horizontalRule: ViewStyle;
}

export default StyleSheet.create<Styles>({
  horizontalRule: {
    width: '100%',
    height: 1,
    backgroundColor: colors.greys.lightest,
  },
});
