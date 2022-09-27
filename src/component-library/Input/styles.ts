import {StyleSheet, ViewStyle, TextStyle, Platform} from 'react-native';
import colors from '../../style-guide/colors';

interface Styles {
  container: ViewStyle;
  textInput: ViewStyle;

  textColor: ViewStyle;
  textInputFocussed: ViewStyle;
  textInputError: ViewStyle;
  errorText: TextStyle;
  labelText: TextStyle;
  textMultiline: TextStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    margin: 1,
  },
  textColor: {
    color: colors.greys.black,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greys.light,
    backgroundColor: colors.greys.white,
    height: 48,
    paddingHorizontal: 15,
  },
  textInputFocussed: {
    borderColor: colors.yellows.default,
    shadowColor: colors.yellows.default,
    shadowRadius: 3,
    shadowOpacity: 1,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
    }),
  },
  textInputError: {
    borderColor: colors.reds.default,
  },
  errorText: {
    marginTop: 10,
    color: colors.reds.default,
  },
  labelText: {
    marginBottom: 10,
  },
  textMultiline: {
    paddingTop: 15,
    paddingBottom: 15,
    height: 144,
    textAlignVertical: 'top',
  },
});
