import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';

export const Loader = (props) => {
  const {loading, ...attributes} = props;
  return (
    <Modal transparent={true} animationType={'fade'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size={Platform.OS === 'ios' ? 0 : 'large'}
            color={Colors.spinnerColor}
            hidesWhenStopped={true}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    backgroundColor: Colors.Opacity40Color,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    display: 'flex',
    height: 100,
    justifyContent: 'space-around',
    width: 100,
  },
});
