import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LIKE, UNLIKE} from '../../assets';
import {Button, Text} from '../../component-library';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ItemObject} from '../../redux/model/itemObject';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Keys, saveToAsyncStorage,loadFromAsyncStorage} from '../../async-storage';
import style from './style';

interface Props {
  route: RouteProp<ScreenRouteAndParam, ScreenRoute.DETAIL_SCREEN>;
  navigation: StackNavigationProp<
    ScreenRouteAndParam,
    ScreenRoute.DETAIL_SCREEN
  >;
}

export default function DetailScreen({route, navigation}: Props) {
  const item = route.params.itm as ItemObject;
  const [isLikeUnlike, setLikeUnlike] = useState('Like');
  const btnClick = () => {
    navigation.pop();
  };

  useEffect(() => {
    (async function updateUI() {
      let itemArray = (await loadFromAsyncStorage(
        Keys.LIKE_UNLIKE,
      )) as ItemObject[];
      if (itemArray === undefined || itemArray === null) {
        itemArray = [];
      }

      const index = itemArray.findIndex(o => o.id === item.id);
      if (index != -1) {
        setLikeUnlike('UnLike');
      }
    })();
  }, [isLikeUnlike]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => likeUnlikeLogic()}>
          <Image
            style={{
              width: '50%',
              height: '50%',
              padding: '10%',
            }}
            resizeMethod="resize"
            source={isLikeUnlike === 'Like' ? LIKE : UNLIKE}
          />
        </TouchableOpacity>
      ),
    });
  });

  function likeUnlikeLogic() {
    if (isLikeUnlike == 'Like') {
      likeLogic();
    } else {
      unLikeLogic();
    }
  }

  async function likeLogic() {
    if (item.id) {
      let itemArray = (await loadFromAsyncStorage(
        Keys.LIKE_UNLIKE,
      )) as ItemObject[];

      if (itemArray === undefined || itemArray === null) {
        itemArray = [];
      }
      itemArray.push(item);
      saveToAsyncStorage(Keys.LIKE_UNLIKE, itemArray)
        .then(o1 => {
          console.log('<><><>UnLike Success');
          setLikeUnlike('UnLike');
        })
        .catch(error => console.log('<><><>Error', error));
    }
  }

  async function unLikeLogic() {
    let itemArray = (await loadFromAsyncStorage(
      Keys.LIKE_UNLIKE,
    )) as ItemObject[];
    if (itemArray === undefined || itemArray === null) {
      itemArray = [];
    }
    const index = itemArray.findIndex(o => o.id === item.id);
    if (index != -1) {
      itemArray.splice(index, 1);
      saveToAsyncStorage(Keys.LIKE_UNLIKE, itemArray)
        .then(o1 => {
          console.log('<><><>Like Success', o1);
          setLikeUnlike('Like');
        })
        .catch(e => console.log('<><><>Error', e));
    }
  }

  return (
    <View
      style={
        (style.containerMain,
        {marginLeft: '6%', marginRight: '6%', marginBottom: '3%', flex: 1})
      }>
      <View style={{flex: 9}}>
        <Image
          source={{uri: item.url}}
          style={{height: '50%', width: '100%'}}
          resizeMode="cover"
        />
        <Text h3 style={{marginTop: '5%'}}>
          {item.description}
        </Text>
      </View>

      <Button text={'Okay'} onPress={btnClick} />
    </View>
  );
}
