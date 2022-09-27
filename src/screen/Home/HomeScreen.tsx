import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import style from './style';
import useAxios from 'axios-hooks';
import SingleItemView from './SingleItemView';
import {RouteProp, useNavigation} from '@react-navigation/native';
import { ScreenRoute } from '../../Navigation/ScreenRoute';
import { LoadingSpinner } from '../../component-library';
import { ScreenRouteAndParam } from '../../Navigation/ScreenRoutesAndParam';
import { ItemObject } from '../../redux/model/itemObject';

interface Props {
  route: RouteProp<ScreenRouteAndParam, ScreenRoute.HOME_SCREEN>;
}

export default function HomeScreen({route}: Props) {
  const nav = useNavigation();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  const [listResponse, setListResponse] = useState([] as ItemObject[]);

  const [{data, loading}, getUserList] = useAxios(
    {
      url: 'search/repositories?q=android&per_page=15',
      method: 'get',
      headers: {Accept: 'application/vnd.github.v3+json'},
    },
    {manual: true},
  );

  // if coming from firebase login screen that time hide the header forcefully
  //--------------------------------------------------------

  useEffect(() => {
    nav.getParent()?.setOptions({header: () => null});
    (async function async() {
      let response: any = await getUserList({
        params: {
          page: currentPageNumber,
        },
      });
      if (response) {
        const arrayValue = [];
        setTotalItem(response?.data?.total_count);
        response?.data?.items.filter(o1 => {
          const values: ItemObject = {
            id: o1.id,
            name: o1.owner.login,
            description: o1.description,
            url: o1.owner.avatar_url,
          };
          arrayValue.push(values);
        });
        setListResponse(arrayValue);
      }
    })();
  }, []);

  const fetchMoreResult = useCallback(async () => {
    if (!loading) {
      if (listResponse.length <= totalItem) {
        const nextPageNumber = currentPageNumber + 1;
        const filterArray = [];
        const response: any = await getUserList({
          params: {
            page: nextPageNumber,
          },
        });

        setCurrentPageNumber(nextPageNumber);
        if (response?.data?.items) {
          (response?.data?.items as []).map((data: any) => {
            filterArray.push({
              id: data.id,
              name: data.login,
              description: data.description,
              url: data.owner.avatar_url,
            } as ItemObject);
          });
        }
        setListResponse(listResponse => [...listResponse, ...filterArray]);
      }
    }
  }, [loading, currentPageNumber, totalItem]);

  if (listResponse) {
    return (
      <View style={style.container}>
        <FlatList
          keyExtractor={(_item: ItemObject, index: number) => `${index}`}
          data={listResponse as ItemObject[]}
          renderItem={({item, index}) => (
            <SingleItemView item={item} index={index} />
          )}
          ListFooterComponent={() => (loading ? <LoadingSpinner /> : null)}
          onEndReached={fetchMoreResult}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  } else {
    return (
      <View style={style.container}>
        <LoadingSpinner />
      </View>
    );
  }
}
