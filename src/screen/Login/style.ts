import {StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../style-guide';

interface Style {
  containerMain: ViewStyle;
  containerTop: ViewStyle;
  containerBottom: ViewStyle;
  container: ViewStyle;
  circleBase: ViewStyle;
  emptyCircle: ViewStyle;
  indicator: ViewStyle;
}

export default StyleSheet.create<Style>({
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  containerBottom: {
    height: '60%',
  },
  containerMain: {
    flex: 1,
  },
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  circleBase: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 50 / 9,
  },

  emptyCircle: {
    borderColor: '#FF0000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  indicator: {
    position: 'absolute',
    borderTopColor: '#575757',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: 40,
  },
});
