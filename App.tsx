import {firebase} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AlertModal from './src/component-library/Modal/AlertModal';
import configureAPI from './src/config/ApiConfig';
import appConfig from './src/config/appConfig';
import awsConfiguration from './src/config/awsConfiguration';
import {ScreenRoute} from './src/Navigation/ScreenRoute';
import navigationRef from './src/navigationRef';
import {persistor, store} from './src/redux/store/store';
import AWSLoginScreen from './src/screen/AWSNormalLogin/AWSLoginScreen';
import DetailScreen from './src/screen/DetailScreen/DetailScreen';
import FirebaseLoginScreen from './src/screen/FirebaseLogin/FirebaseLoginScreen';
import LoginScreen from './src/screen/Login/LoginScreen';

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    firebase.initializeApp({
      apiKey: 'AIzaSyA-sGstsEdBsiS_UQbwH2tVU9eFMcy2ceA',
      authDomain: '',
      databaseURL: '',
      projectId: 'reactnativedemo-26bff',
      storageBucket: '',
      messagingSenderId: '823958134504',
      appId: '1:823958134504:android:0ccb271968e6a2812fb35d',
      measurementId: '',
    });
    awsConfiguration();
    appConfig();
    configureAPI();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            <StatusBar hidden />
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator initialRouteName={ScreenRoute.LOGIN_SCREEN}>
                <Stack.Screen
                  component={LoginScreen}
                  options={{headerShown: false}}
                  name={ScreenRoute.LOGIN_SCREEN}
                />
                <Stack.Screen
                  component={DetailScreen}
                  options={{headerShown: true}}
                  name={ScreenRoute.DETAIL_SCREEN}
                />
                <Stack.Screen
                  component={FirebaseLoginScreen}
                  options={{headerShown: true}}
                  name={ScreenRoute.FIREBASE_LOGIN}
                />
                <Stack.Screen
                  component={AWSLoginScreen}
                  options={{headerShown: true}}
                  name={ScreenRoute.AWS_LOGIN_SCREEN}
                />
              </Stack.Navigator>
              <AlertModal />
            </NavigationContainer>
          </>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
