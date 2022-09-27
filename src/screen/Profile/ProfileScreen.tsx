import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import style from './style';
import {Button} from '../../component-library';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {App_Logo} from '../../assets';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {useCallback} from 'react';
import { showLogOutAlert } from '../../redux/slices/LogoutREducer';

interface Props {
  navigation: StackNavigationProp<
    ScreenRouteAndParam,
    ScreenRoute.PROFILE_SCREEN
  >;
  route: RouteProp<ScreenRouteAndParam, ScreenRoute.PROFILE_SCREEN>;
}

export default function ProfileScreen({navigation, route}: Props) {
  // fetch data from redux
  const {loginUser} = useSelector((state: RootState) => state);
  const {loginWith, isLogin, email} = loginUser;
  //--------------------------------------------
  const dispatch = useDispatch();

  // const btnLogoutClick = () => {
  //   (async function logout() {
  //     dispatch(resetUser());
  //     if (loginWith === Keys.GOOGLE_LOGIN) {
  //       GoogleSignin.signOut();
  //     } else if (loginWith === Keys.FACEBOOK_LOGIN) {
  //       LoginManager.logOut();
  //     }
  //     navigationRef?.current?.dispatch(
  //       CommonActions.reset({
  //         index: 1,
  //         routes: [{name: ScreenRoute.LOGIN_SCREEN}],
  //       }),
  //     );
  //   })();
  // };

  const btnLogoutClick = useCallback(() => {
    dispatch(showLogOutAlert());
  }, [dispatch]);

  return (
    <View style={{flex: 1, marginLeft: '10%', marginRight: '10%'}}>
      <View style={{flex: 9}}>
        <View>
          <View style={{height: '10%'}} />

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: '40%', height: '50%'}} source={App_Logo} />
          </View>

          <View>
            <Text style={style.textColor}>Login With : {loginWith}</Text>
            <Text style={style.textColor}>Name : {email}</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 1}}>
        <Button text="LOGOUT" onPress={btnLogoutClick} />
      </View>
    </View>
  );
}
