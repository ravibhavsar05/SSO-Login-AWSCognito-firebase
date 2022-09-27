import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {Input, TextLink, Button} from '../../component-library';
import {FirebaseErrorCode} from '../../config/FirebaseErrorCode';
import {ScreenRoute} from '../../Navigation/ScreenRoute';
import {ScreenRouteAndParam} from '../../Navigation/ScreenRoutesAndParam';
import {colors} from '../../style-guide';
interface Props {
  route: RouteProp<ScreenRouteAndParam, ScreenRoute.FIREBASE_SIGN_UP>;
  navigation: StackNavigationProp<
    ScreenRouteAndParam,
    ScreenRoute.FIREBASE_SIGN_UP
  >;
}

export default function FirebaseSignUpScreen({navigation, route}: Props) {
  const emailAddressInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [emailAddress, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const alreadyLogin = () => {
    navigation.pop();
  };
  //----------------- Buttons Click --------------------------
  const onSignupContinue = () => {
    if (validation()) {
      (async function name() {
        setLoading(true);
        const signIn = await auth()
          .createUserWithEmailAndPassword(emailAddress, password)
          .then(response => {
            navigation.navigate(ScreenRoute.FIREBASE_LOGIN);
          })
          .catch(e => {
            console.log('Error code => ' + e.code);
            manageErrorCode(e.code);
          });
        setLoading(false);
      })();
    }
  };
  //---------------------------------------------------------

  function manageErrorCode(code: string) {
    switch (code) {
      case FirebaseErrorCode.EMAIL_ALREADY_USE:
        setEmailError('This email is already used');
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
    } else if (confirmPassword === '') {
      setConfirmPasswordError("Confirm password can't be empty");
      return;
    } else if (password != confirmPassword) {
      setConfirmPasswordError('Password and confirm password should be same.');
      return;
    }
    return true;
  }

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

  const updateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword === '') {
      setConfirmPasswordError("Confirm password can't be empty");
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(confirmPassword);
  };

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
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
        onChange={updatePassword}
        style={{borderColor: colors.greys.black}}
        value={password}
        error={passwordError}
      />
      <View style={{height: '5%'}} />
      <Input
        ref={confirmPasswordInputRef}
        label="Confirm Password"
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
        onChange={updateConfirmPassword}
        style={{borderColor: colors.greys.black}}
        value={confirmPassword}
        error={confirmPasswordError}
      />
      <View style={{height: '5%'}} />

      <Button text="Register" onPress={onSignupContinue} loading={loading} />
      <View style={{height: '5%'}} />
      <TextLink
        center
        text={'Already have an account?'}
        onPress={alreadyLogin}
      />
    </View>
  );
}
