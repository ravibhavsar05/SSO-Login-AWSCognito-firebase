import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {Keys, loadFromAsyncStorage} from '../../async-storage';
import {ItemObject} from '../../redux/model/itemObject';
import SingleItemView from '../Home/SingleItemView';

interface Props {
  navigation: StackScreenProps<ScreenRouteAndParam, ScreenRoute.LIKE_SCREEN>;
}

export default function LikeScreen({navigation}: Props) {
  const [listResponse, setFavListData] = useState([]);

  useEffect(() => {
    (async function name() {
      let itemArray = (await loadFromAsyncStorage(
        Keys.LIKE_UNLIKE,
      )) as ItemObject[];
      if (itemArray === undefined || itemArray === null) {
        itemArray = [];
      }
      setFavListData(itemArray);
    })();
  }, [listResponse]);

  if (listResponse && listResponse.length !== 0) {
    return (
      <View style={style.container}>
        <FlatList
          keyExtractor={(_item: ItemObject, index: number) => `${index}`}
          data={listResponse as ItemObject[]}
          renderItem={({item, index}) => (
            <SingleItemView item={item} index={index} />
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={style.container}>
        <Text style={style.textColor}>Data Not Found!</Text>
      </View>
    );
  }
}
