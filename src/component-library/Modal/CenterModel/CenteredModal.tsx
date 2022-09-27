import React, {ReactNode} from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Modal from 'react-native-modal';



import styles from './styles';

interface Props {
  children?: ReactNode;
  isModalVisible: boolean;
  hideModal?(): void;
}

function CenteredModal({children, isModalVisible, hideModal}: Props) {
  const onHideModal = () => {
    if (hideModal) {
      hideModal();
    }
  };
  return (
 
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={onHideModal}
      onBackdropPress={onHideModal}
      style={styles.modal}
      useNativeDriver
      hideModalContentWhileAnimating>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>{children}</ScrollView>
        </SafeAreaView>
      </View>
    </Modal>

  );
}

export default CenteredModal;
