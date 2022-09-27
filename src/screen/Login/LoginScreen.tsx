import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import {Button} from '../../component-library';
import {Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {colors} from '../../style-guide';
import TabNavigation from '../TabNavigation';
import {App_Logo} from '../../assets';
import {
  AccessToken,
  GraphRequest,
  GraphRequestCallback,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {UserObject} from '../../redux/model/userTypes';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsLogin,
  setLoginWith,
  setUserData,
} from '../../redux/slices/LoginReducer';
import {RootState} from '../../redux/rootReducer';
import {Keys} from '../../async-storage';

interface Props {
  navigation: StackNavigationProp<
    ScreenRouteAndParam,
    ScreenRoute.LOGIN_SCREEN
  >;
}

export default function LoginScreen({navigation}: Props) {
  const [afterLogin, setAfterLogin] = useState(false);

  //--------- handle Button click events  --------------------
  const doLoginGoogle = () => {
    GoogleSignin.signOut();
    handleGoogleLogin();
  };
  const doLoginFB = () => {
    handleFacebookLogin();
  };
  const doLoginFirebase = () => {
    navigation.navigate(ScreenRoute.FIREBASE_LOGIN);
  };

  const doAwsNormalLogin = async () => {
    navigation.navigate(ScreenRoute.AWS_LOGIN_SCREEN);
  };
  //------------------------------------------------------------
  const dispatch = useDispatch();

  const {loginUser} = useSelector((state: RootState) => state);
  const {isLogin} = loginUser;

  const _responseInfoCallback: GraphRequestCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      const values: UserObject = {
        id: '',
        name: result?.name,
        email: result?.email,
        photo: result?.picture?.data?.url,
        familyName: result?.name,
        givenName: result?.name,
        isLogin: false,
        loginWith: Keys.FACEBOOK_LOGIN,
      };
      console.log('fetching data: ' + JSON.stringify(values));
      dispatch(setUserData({user: values}));
      dispatch(setIsLogin({isLogin: true}));
      dispatch(setLoginWith({loginWith: Keys.FACEBOOK_LOGIN}));

      setAfterLogin(true);
    }
  };

  useEffect(() => {
    console.log('call Use effect');

    (async function fun() {
      console.log('value', isLogin);
      setAfterLogin(isLogin as boolean);
    })();
  }, [afterLogin]);

  //--------- handle facebook login with response ---------------
  function handleFacebookLogin() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture,email',
              null,
              _responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }
  //------------------------------------------------------------

  //--------- handle Google login with response ---------------
  function handleGoogleLogin() {
    GoogleSignin.configure();
    GoogleSignin.signIn()
      .then(result => {
        console.log('Google Signin ', result);
        const userResult = result.user as UserObject;
        dispatch(setUserData({user: userResult}));
        dispatch(setLoginWith({loginWith: Keys.GOOGLE_LOGIN}));
        dispatch(setIsLogin({isLogin: true}));
        setAfterLogin(true);
      })
      .catch(err => {
        console.log('WRONG SIGNIN', err);
      });
  }
  //------------------------------------------------------------

  if (afterLogin) {
    return <TabNavigation />;
  } else {
    return (
      <View style={style.containerMain}>
        <View style={style.containerTop}>
          <Image style={{width: '30%', height: '40%'}} source={App_Logo} />
          <View style={{height: '6%'}} />

          <Text style={{textAlign: 'center', color: colors.greys.black}}>
            Welcome Back
          </Text>
          <View style={{height: '2%'}} />
        </View>

        <View style={style.containerBottom}>
          <Button
            style={{
              marginLeft: '10%',
              marginRight: '10%',
              height: '20%',
            }}
            text="LOG IN WITH GOOGLE"
            onPress={doLoginGoogle}
          />
          <View style={{height: '2%'}} />

          <Button
            style={{marginLeft: '10%', marginRight: '10%', height: '20%'}}
            text="LOG IN WITH FB"
            onPress={doLoginFB}
          />
          <View style={{height: '2%'}} />

          <Button
            style={{marginLeft: '10%', marginRight: '10%', height: '20%'}}
            text="LOG IN WITH FIREBASE"
            onPress={doLoginFirebase}
          />
          <View style={{height: '2%'}} />

          <Button
            style={{marginLeft: '10%', marginRight: '10%', height: '20%'}}
            text="AWS NORMAL LOGIN"
            onPress={doAwsNormalLogin}
          />
        </View>
      </View>
    );
  }
}
