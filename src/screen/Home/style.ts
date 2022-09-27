import colors from '../../style-guide/colors';
import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
  container: ViewStyle;
  textColor: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  textColor: {
    color: colors.greys.black,
  }
});
