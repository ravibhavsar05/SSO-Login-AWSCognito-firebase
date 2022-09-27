import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import TabNavigation from '../TabNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsLogin,
  setLoginWith,
  setUserData,
} from '../../redux/slices/LoginReducer';
import {UserObject} from '../../redux/model/userTypes';
import {RootState} from '../../redux/rootReducer';
import {RouteProp} from '@react-navigation/native';
import {Keys} from '../../async-storage';
import {Input, TextLink, Button} from '../../component-library';
import {FirebaseErrorCode} from '../../config/FirebaseErrorCode';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {colors} from '../../style-guide';
interface Props {
  route: RouteProp<ScreenRouteAndParam, ScreenRoute.FIREBASE_LOGIN>;
  navigation: StackNavigationProp<
    ScreenRouteAndParam,
    ScreenRoute.FIREBASE_LOGIN
  >;
}
export default function FirebaseLoginScreen({navigation, route}: Props) {
  const emailAddressInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [afterLogin, setAfterLogin] = useState(false);

  const [password, setPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const {loginUser} = useSelector((state: RootState) => state);
  const {isLogin} = loginUser;

  useEffect(() => {
    setAfterLogin(isLogin as boolean);
  }, [afterLogin]);

  const onLoginContinue = () => {
    if (validation()) {
      (async function name() {
        setLoading(true);
        const signIn = await auth()
          .signInWithEmailAndPassword(emailAddress, password)
          .then(response => {
            console.log('response' + response.user.email);

            const values: UserObject = {
              id: response.user.uid,
              name: response?.user?.displayName!!,
              email: response?.user?.email!!,
              photo: response.user?.photoURL!!,
              familyName: response.user?.displayName!!,
              givenName: response?.user?.displayName!!,
              isLogin: false,
              loginWith: Keys.FIREBASE_LOGIN,
            };
            dispatch(setLoginWith({loginWith: Keys.GOOGLE_LOGIN}));
            dispatch(setUserData({user: values}));
            dispatch(setIsLogin({isLogin: true}));
            setAfterLogin(true);
          })
          .catch(e => {
            console.log('Error => ', e.code);
            manageErrorCode(e.code);
          });
        setLoading(false);
      })();
    }
  };

  function manageErrorCode(code: string) {
    switch (code) {
      case FirebaseErrorCode.USER_NOT_FOUND:
        setEmailError('User Not Found');
        break;
      case FirebaseErrorCode.WRONG_PASSWORD:
        setPasswordError('You enter wrong password!!!');
        break;
      case FirebaseErrorCode.INVALID_EMAIL:
        setEmailError('You enter a wrong email please double check the email.');
      case FirebaseErrorCode.DISABLE_ACCOUNT:
        setEmailError(
          'Your account is deactivate please contact to administration.',
        );
        break;
      default:
        setEmailError('' + code);
        break;
    }
  }

  function validation() {
    if (emailAddress === '') {
      setEmailError("Email address can't be empty");
      return;
    } else if (password === '') {
      setPasswordError("Password can't be empty");
      return;
    }
    return true;
  }
  const newUserClick = () => {
    navigation.navigate(ScreenRoute.FIREBASE_SIGN_UP);
  };

  const updateEmailAddress = (newEmailAddress: string) => {
    if (newEmailAddress === '') {
      setEmailError("Email address can't be empty");
    } else {
      setEmailError('');
    }
    setEmailAddress(newEmailAddress);
  };

  const updatePassword = (password: string) => {
    if (password === '') {
      setPasswordError("Password can't be empty");
    } else {
      setPasswordError('');
    }
    setPassword(password);
  };

  if (afterLogin) {
    return <TabNavigation />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{height: '10%'}} />
        <Input
          ref={emailAddressInputRef}
          label="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          onChange={updateEmailAddress}
          value={emailAddress}
          error={emailError}
        />
        <View style={{height: '5%'}} />
        <Input
          ref={passwordInputRef}
          label="Password"
          autoCapitalize="none"
          onChange={updatePassword}
          style={{borderColor: colors.greys.black}}
          value={password}
          error={passwordError}
          secureTextEntry={true}
          keyboardType="default"
        />
        <View style={{height: '5%'}} />

        <Button text="Login" onPress={onLoginContinue} loading={loading} />
        <View style={{height: '5%'}} />
        <TextLink center text={'New User?'} onPress={newUserClick} />
      </View>
    );
  }
}
