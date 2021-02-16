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
            //hidesWhenStopped={true}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.Opacity40Color,
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.white,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
