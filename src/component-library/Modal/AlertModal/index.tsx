import React, {memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import AlertModalLogOut from './types/Logout';
import AlertModalNoInternet from './types/NoInternet';
import {RootState} from '../../../redux/rootReducer';
import {hideAlert} from '../../../redux/slices/LogoutREducer';
import {AlertType} from '../../../redux/slices/LogoutREducer/type';
import CenteredModal from '../CenterModel/CenteredModal';

function AlertModal() {
  const {alert} = useSelector((state: RootState) => state.alertSlice);
  const dispatch = useDispatch();

  const isVisible = !!alert;

  const hideModal = () => dispatch(hideAlert());

  const renderAlertModalType = () => {
    switch (alert?.type) {
      case AlertType.NO_INTERNET:
        return <AlertModalNoInternet />;
      case AlertType.LOGOUT:
        return <AlertModalLogOut />;
      default:
        return null;
    }
  };

  return (
    <CenteredModal isModalVisible={isVisible} hideModal={hideModal}>
      {renderAlertModalType()}
    </CenteredModal>
  );
}

export default memo(AlertModal);
