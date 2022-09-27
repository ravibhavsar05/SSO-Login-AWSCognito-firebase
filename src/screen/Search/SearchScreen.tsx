import {FlatList, View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import style from './style';
import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import SearchInput from '../../component-library/SearchInput';
import useAxios from 'axios-hooks';
import {ItemObject} from '../../redux/model/itemObject';
import SingleItemView from '../Home/SingleItemView';
import {LoadingSpinner} from '../../component-library';
import isNetworkConnect from '../../config/NetworkConnection';
import {useDispatch} from 'react-redux';
import {showNoInternetAlert} from '../../redux/slices/LogoutREducer';

interface Props {
  navigation: StackScreenProps<ScreenRouteAndParam, ScreenRoute.SEARCH_SCREEN>;
}

export default function SearchScreen({navigation}: Props) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const [total_count, setTotalCount] = useState(0);
  const [searchKeyWord, setSearchKeyword] = useState('');
  const dispatch = useDispatch();
  const [{data, loading}, getUserList] = useAxios(
    {
      url: 'search/repositories',
      method: 'get',
      headers: {Accept: 'application/vnd.github.v3+json'},
    },
    {manual: true},
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchKeyWord !== '') {
        callApiSearch(searchKeyWord, currentPageNumber, false);
      }
    }, 2000);
    return () => clearTimeout(delayDebounce);
  }, [searchKeyWord]);

  async function callApiSearch(
    keyword: string,
    pageNumber: number,
    isLoadMore: boolean,
  ) {
    if (isNetworkConnect) {
      const response: any = await getUserList({
        params: {
          q: keyword,
          per_page: 15,
          page: pageNumber,
        },
      });
      if (response) {
        const arrayValue = [];
        setTotalCount(response?.data?.total_count);
        response?.data?.items.filter(o1 => {
          arrayValue.push({
            id: o1.id,
            name: o1.login,
            description: o1.description,
            url: o1.owner.avatar_url,
          } as ItemObject);
        });
        if (isLoadMore) {
          setResponseData(responseData => [...responseData, ...arrayValue]);
        } else {
          setResponseData(arrayValue);
        }
      }
    } else {
      dispatch(showNoInternetAlert());
    }
  }

  // to handle search text change.
  const onChangeSearchText = useCallback((newSearchText: string) => {
    if (newSearchText === '') {
      setResponseData([]);
    }
    setSearchKeyword(newSearchText);
  }, []);

  const fetchMoreResult = useCallback(async () => {
    if (!loading) {
      if (responseData.length <= total_count) {
        const nextPageNumber = currentPageNumber + 1;
        setCurrentPageNumber(nextPageNumber);
        callApiSearch(searchKeyWord, nextPageNumber, true);
      }
    }
  }, [currentPageNumber, loading, total_count]);

  if (responseData) {
    return (
      <View style={style.container}>
        <SearchInput
          search={searchKeyWord}
          setSearch={onChangeSearchText}
          placeholder="Search..."
          style={style.searchDesign}
        />
        <FlatList
          keyExtractor={(_item: ItemObject, index: number) => `${index}`}
          data={responseData as ItemObject[]}
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
        <Text>Testing.....</Text>
      </View>
    );
  }
}
