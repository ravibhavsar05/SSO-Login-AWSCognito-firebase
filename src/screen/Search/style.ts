import {StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../style-guide';

interface Style {
  container: ViewStyle;
  textColor: ViewStyle;
  searchDesign: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  textColor: {
    color: colors.greys.black,
  },
  searchDesign: {
    borderColor: colors.greys.black,
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
  },
});
