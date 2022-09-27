import React from 'react';
import {TextStyle, TouchableOpacity} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Props {
  name: string;
  size: number;
  color: string;
  onPress?(): void;
  solid?: boolean;
  style?: TextStyle;
}

function MaterialIcon({onPress, ...props}: Props) {
  if (!onPress) {
    return <FontAwesomeIcon {...props} />;
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <FontAwesomeIcon {...props} />
    </TouchableOpacity>
  );
}

export default MaterialIcon;
