import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  iconContainer: ViewStyle;
}

export default StyleSheet.create<Styles>({
  iconContainer: {
    position: 'absolute',
    right: 15,
    height: 70,
    justifyContent: 'center',
  },
});
