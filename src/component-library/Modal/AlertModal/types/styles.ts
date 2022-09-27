import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import colors from '../../../../style-guide/colors';

interface Styles {
  modal: ViewStyle;
  image: ImageStyle;
  message: TextStyle;
  button: ViewStyle;
  buttonSecondary: ViewStyle;
  headerNoImage: TextStyle;
}

export default StyleSheet.create<Styles>({
  modal: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  image: {
    width: 180,
    height: 180,
  },
  message: {
    color: colors.greys.default,
    marginTop: 5,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  buttonSecondary: {
    width: '100%',
    marginTop: 10,
  },
  headerNoImage: {
    marginTop: 20,
  },
});
