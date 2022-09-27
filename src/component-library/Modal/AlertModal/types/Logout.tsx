import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {hideAlert} from '../../../../redux/slices/LogoutREducer';

import styles from './styles';
import {Button, Text} from '../../..';
import {RootState} from '../../../../redux/rootReducer';
import {resetUser} from '../../../../redux/slices/LoginReducer';
import {Keys} from '../../../../async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk';
import navigationRef from '../../../../navigationRef';
import {CommonActions} from '@react-navigation/native';
import {ScreenRoute} from '../../../../Navigation/ScreenRoute';

export default function AlertModalLogOut() {
  const dispatch = useDispatch();

  const hideModal = useCallback(() => dispatch(hideAlert()), [dispatch]);
  const {loginUser} = useSelector((state: RootState) => state);
  const {loginWith, isLogin, email} = loginUser;

  const onPressLogOut = useCallback(async () => {
    (async function logout() {
      dispatch(resetUser());
      dispatch(hideAlert());
      if (loginWith === Keys.GOOGLE_LOGIN) {
        GoogleSignin.signOut();
      } else if (loginWith === Keys.FACEBOOK_LOGIN) {
        LoginManager.logOut();
      }
      navigationRef?.current?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: ScreenRoute.LOGIN_SCREEN}],
        }),
      );
    })();
  }, [dispatch]);

  return (
    <View style={styles.modal}>
      <Text h3 bold center style={styles.headerNoImage}>
        Logout
      </Text>
      <Text center style={styles.message}>
        Are you sure you want to logout?
      </Text>

      
      <Button
        text="Yes, log me out"
        type="secondary"
        onPress={onPressLogOut}
        style={styles.button}
      />
      <Button text="Cancel" onPress={hideModal} style={styles.button} />
    </View>
  );
}
