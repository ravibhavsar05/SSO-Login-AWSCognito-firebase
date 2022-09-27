import colors from '../../style-guide/colors';
import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
  container: ViewStyle;
  textDesign: ViewStyle;
  imageDesign: ViewStyle;
  bottomTextDesign: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex:1,
    justifyContent: 'space-around',
    backgroundColor:colors.greys.white,
    flexDirection: 'row',
    margin: '1%',
  },
  textDesign: {
    flex: 7,
  },
  imageDesign: {
    flex: 2,
    justifyContent:'center'
  },
  bottomTextDesign: {
    flex: 1,
    textAlignVertical:'center'
  },
});
