import React from 'react';
import {View, ViewStyle} from 'react-native';
import colors from '../../style-guide/colors';
import Icon from '../Icon';
import Input from '../Input';


import styles from './styles';

interface Props {
  search: string;
  setSearch(newSearch: string): void;
  placeholder: string;
  style?: ViewStyle;
}

export default function SearchInput({
  search,
  setSearch,
  placeholder,
  style,
}: Props) {
  const hasSearchText = search !== '';

  const onPressCross = () => setSearch('');

  return (
    <View style={style && style}>
      <Input placeholder={placeholder} onChange={setSearch}  value={search} style={{height:70}}/>
      <View style={styles.iconContainer}>
        {hasSearchText ? (
          <Icon
            name="times"
            color={colors.greys.default}
            size={18}
            onPress={onPressCross}
          />
        ) :
        //  (
        //   <Icon name="search" color={colors.greys.default} size={16} />
        // )
        null
        }
      </View>
    </View>
  );
}
