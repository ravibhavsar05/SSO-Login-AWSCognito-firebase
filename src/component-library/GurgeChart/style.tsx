import color from 'color';

export const getStyles = (
  {size, percentSize, internalColor, innerColor, outerColor, showIndicator},
  degrees,
  degreesValue,
) => ({
  outerCircle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: size,
    height: size / 2,
    paddingLeft: 3,
    paddingRight: 3,
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: size * (percentSize * 1.8),
    height: (size / 2) * (percentSize * 1.8),
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: innerColor,
  },

  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: size / 2,
    height: size,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: size / 2,
    backgroundColor: internalColor,
    transform: [
      {translateX: size / 4},
      {rotate: `${degrees}deg`},
      {translateX: (size / 4) * -1},
    ],
  },
  mainCircle: {
    overflow: 'hidden',
    width: size,
    height: size / 2,
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    backgroundColor: '#FFFFFF',
  },
  labelsView: {
    flexDirection: 'row',
    width: size,
    justifyContent: 'space-between',
  },
  percentText: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    backgroundColor: 'transparent',
  },
  indicator: {
    height: 0,
    zIndex: 1000,
    justifyContent: 'center',
    transform: [
      {translateX: size / 4},
      {rotate: `${degrees + 90}deg`},
      {translateX: (size / 4) * -1},
    ],
    width: size / 2,
    position: 'absolute',
    left: 0,
    top: size / 2 - 2,
  },
  pointIndicator: {
    borderRadius: 50,
    borderWidth: 3,
    width: 15,
    height: 15,
    alignSelf: 'flex-start',
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 1500,
    borderRadius: 5,
  },
  content: showIndicator
    ? {
        marginBottom: 10,
      }
    : null,
});
