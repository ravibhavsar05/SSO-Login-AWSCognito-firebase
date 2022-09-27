import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {getStyles} from './style';
import LinearGradient from 'react-native-linear-gradient';

const Speedometer = props => {
  const {
    value,
    totalValue,
    style,
    innerCircleStyle,
    outerCircleStyle,
    halfCircleStyle,
    showText,
    text,
    textStyle,
    showLabels,
    labelStyle,
    labelTextStyle,
    labelFormatter,
    showPercent,
    percentStyle,
    showIndicator,
  } = props;

  const percentValue = parseInt(
    String((value * 100) / totalValue).split('.')[0],
  );
  const degreesValue = value > totalValue ? totalValue : value;
  const degrees =
    (degreesValue * 180) / (totalValue === 0 ? 1 : totalValue) - 90;

  const styles = getStyles(props, degrees, degreesValue);

  const percentElement = showPercent ? (
    <Text style={[styles.percentText, percentStyle]} numberOfLines={1}>
      {percentValue}
    </Text>
  ) : null;

  const textElement =
    showText && text ? (
      <Text style={[styles.text, textStyle]} numberOfLines={1}>
        {text}
      </Text>
    ) : null;

  const labelsElement = showLabels ? (
    <View style={[styles.labelsView, labelStyle]}>
      <Text style={labelTextStyle} numberOfLines={1}>
        {labelFormatter(0)}
      </Text>
      <Text style={labelTextStyle} numberOfLines={1}>
        {labelFormatter(totalValue)}
      </Text>
    </View>
  ) : null;

  const indicadorElement =
    !showText && showIndicator && totalValue ? (
      <View style={styles.indicator}>
        <View style={styles.pointIndicator} />
      </View>
    ) : null;

  return (
    <View style={[styles.content, style]}>
      <View>
        <View style={[styles.mainCircle]}>
          <LinearGradient
            colors={['white','green', 'yellow', 'red' ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View style={[styles.outerCircle, outerCircleStyle]}>
              <View style={[styles.innerCircle, innerCircleStyle]}>
                {percentElement}
                {textElement}
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      {indicadorElement}
      {labelsElement}
    </View>
  );
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
  internalColor: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  showText: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  showLabels: PropTypes.bool,
  labelStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  labelFormatter: PropTypes.func,
  labelTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  showPercent: PropTypes.bool,
  percentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  innerCircleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  outerCircleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  halfCircleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  percentSize: PropTypes.number,
  showIndicator: PropTypes.bool,
  indicatorColor: PropTypes.string,
};

Speedometer.defaultProps = {
  size: 200,
  outerColor: '#e6e6e6',
  innerColor: '#ffffff',
  internalColor: 'transparent',
  style: {},
  showText: false,
  text: '',
  textStyle: {},
  showLabels: false,
  labelStyle: {},
  labelFormatter: number => number,
  labelTextStyle: {},
  showPercent: false,
  percentStyle: {},
  innerCircleStyle: {},
  outerCircleStyle: {},
  halfCircleStyle: {},
  percentSize: 0.5,
  showIndicator: false,
  indicatorColor: 'grey',
};

export default Speedometer;
