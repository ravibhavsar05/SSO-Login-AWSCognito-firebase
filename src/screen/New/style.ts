import {StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../style-guide';

interface Style {
  container: ViewStyle;
  textColor: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textColor: {
    color: colors.greys.black,
  },
});
