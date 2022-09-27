import {StyleSheet, ViewStyle} from 'react-native';
import colors from '../../style-guide/colors';

interface Styles {
  container: ViewStyle;
  loadingBar: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    width: '100%',
    height: 4,
  },
  loadingBar: {
    position: 'absolute',
    left: -100,
    width: 100,
    borderRadius: 2,
    top: 0,
    bottom: 0,
    backgroundColor: colors.greys.black,
  },
});
