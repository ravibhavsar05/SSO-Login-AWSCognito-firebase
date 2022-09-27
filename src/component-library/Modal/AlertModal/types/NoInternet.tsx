import { Button,Text } from '../../../../component-library';
import { hideAlert } from '../../../../redux/slices/LogoutREducer';
import React from 'react';
import {View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from './styles';
import { NoInternet } from '../../../../assets';


export default function AlertModalNoInternet() {
  const dispatch = useDispatch();

  const hideModal = () => dispatch(hideAlert());

  return (
    <View style={styles.modal}>
      <Image source={NoInternet} style={styles.image} />
      <Text h3 bold center>
        No internet connection
      </Text>
      <Text center style={styles.message}>
        Check your network connection{'\n'}and try again.
      </Text>
      <Button text="Dismiss" onPress={hideModal} style={styles.button} />
    </View>
  );
}
  