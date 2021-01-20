import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {removeGBDetails} from '../store/actions/GBDetailsAction';

export const GLogout = (props) => {
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(removeGBDetails);
      dispatch(removeCurrentGBDetails);
      dispatch(removeGoogleCreds);
      props.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.gSignOutContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.gSignOutComponent}
        onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  gSignOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gSignOutComponent: {
    width: 192,
    height: 48,
  },
});
