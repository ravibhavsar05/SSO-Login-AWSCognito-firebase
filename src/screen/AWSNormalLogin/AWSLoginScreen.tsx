import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Auth} from 'aws-amplify';
import styles from './styles';
import {RootState} from '../../redux/rootReducer';
import {colors} from '../../style-guide';
import { Text,Input,Button } from '../../component-library';

export default function AWSLoginScreen() {
  const emailAddressInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState('');

  const [sucessToken, setAwsLoginToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [afterLogin, setAfterLogin] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {loginUser} = useSelector((state: RootState) => state);
  const {isLogin} = loginUser;

  useEffect(() => {
    setAfterLogin(isLogin as boolean);
  }, [afterLogin]);

  const onLoginContinue = () => {
    if (validation()) {
      setLoading(true);
      Auth.signIn(emailAddress, password)
        .then(result => {
          console.log('<><><>Cognito Result ==>', JSON.stringify(result));
          setEmailError('');
          setAwsLoginToken(
            result['signInUserSession']['refreshToken']['token'],
          );
          setLoading(false);
        })
        .catch(err => {
          setAwsLoginToken('');
          setEmailError(err.message);
          setLoading(false);
        });
    }
  };

  function validation() {
    if (emailAddress === '') {
      setEmailError("Email address can't be empty");
      setAwsLoginToken('');
      return;
    } else if (password === '') {
      setPasswordError("Password can't be empty");
      setAwsLoginToken('');
      return;
    }
    return true;
  }

  const updateEmailAddress = (newEmailAddress: string) => {
    if (newEmailAddress === '') {
      setEmailError("Email address can't be empty");
      setAwsLoginToken('');
    } else {
      setEmailError('');
    }
    setEmailAddress(newEmailAddress);
  };

  const updatePassword = (password: string) => {
    if (password === '') {
      setPasswordError("Password can't be empty");
      setAwsLoginToken('');
    } else {
      setPasswordError('');
    }
    setPassword(password);
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
      <ScrollView>
        <Text h3>{sucessToken}</Text>
      </ScrollView>
    </View>
  );
}
