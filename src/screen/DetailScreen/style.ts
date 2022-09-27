import colors from '../../style-guide/colors';
import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
  containerMain: ViewStyle;
  imageDesign: ViewStyle;
}

export default StyleSheet.create<Style>({
  containerMain: {
    backgroundColor: colors.greys.white,
    flexDirection: 'column',
  },
  imageDesign: {
    flex: 2,
    justifyContent: 'center',
  },
});
