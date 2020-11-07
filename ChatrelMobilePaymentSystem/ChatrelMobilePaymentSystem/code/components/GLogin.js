import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { sClientIDAndroid } from '../constants/CommonConfig';
import { useSelector, useDispatch } from 'react-redux';
import {storeGoogleCreds} from '../store/actions/GLoginAction';

export const GLogin = (props) => {
  const dispatch = useDispatch();
  const oGoogle = useSelector(state => state.GLoginReducer.oGoogle);
  //console.log(oGoogle);
  const [user, setUser] = useState({});
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: sClientIDAndroid,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    isSignedIn();
    // if(oGoogle!==null){
    //   getCurrentUserInfo();
    // }
  }, [])
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log(userInfo);
      setUser(userInfo);
      dispatch(storeGoogleCreds(userInfo));
      props.props.navigation.navigate({
        routeName: 'GBDetail'
      });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      //console.log(userInfo);
      setUser(userInfo);
      dispatch(storeGoogleCreds(userInfo));
      props.props.navigation.navigate({
        routeName: 'GBDetail'
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setUser({}); // Remember to remove the user from your app's state as well
  //     props.props.navigation.navigate({
  //       routeName: 'Login'
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <View style={styles.main}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  }
});