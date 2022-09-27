import {StyleSheet, ViewStyle} from 'react-native';
import { colors } from '../../../style-guide';


interface Styles {
  container: ViewStyle;
  modal: ViewStyle;
}

export default StyleSheet.create<Styles>({
  modal: {
    padding: 20,
  },
  container: {
    backgroundColor: colors.greys.white,
    borderRadius: 10,
  },
});
