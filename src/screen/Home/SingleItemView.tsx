import {Image, View} from 'react-native';
import React from 'react';
import style from './single_item_style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ItemObject} from '../../redux/model/itemObject';
import {Text} from '../../component-library';

interface Props {
  item: ItemObject;
  index: any;
}

type UseNavigation = StackNavigationProp<
  ScreenRouteAndParam,
  ScreenRoute.DETAIL_SCREEN
>;

export default function SingleItemView({item, index}: Props) {
  const navigation = useNavigation<UseNavigation>();
  function redirectionDetail(item: any) {
    navigation.navigate(ScreenRoute.DETAIL_SCREEN, {itm: item});
  }

  return (
    <TouchableOpacity
      onPress={() => {
        redirectionDetail(item);
      }}>
      <View style={style.container}>
        <View style={style.imageDesign}>
          <Image
            source={{uri: item.url}}
            style={{height: 80, width: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View style={style.textDesign}>
          <Text h3 style={{padding: '1%', marginTop: '1%', marginBottom: '1%'}}>
            {item.name}
          </Text>
          <Text h3 style={{padding: '1%', marginTop: '1%', marginBottom: '1%'}}>
            {item.description}
          </Text>
        </View>
        <Text h3 style={style.bottomTextDesign}>
          {index + 1}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
