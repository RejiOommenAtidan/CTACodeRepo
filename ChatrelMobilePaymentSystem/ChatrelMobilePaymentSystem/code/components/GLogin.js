import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {sClientIDAndroid, sClientIDIOS} from '../constants/CommonConfig';
import {useSelector, useDispatch} from 'react-redux';
import {storeGoogleCreds} from '../store/actions/GLoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const GLogin = (props) => {
  const dispatch = useDispatch();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: sClientIDAndroid,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId: sClientIDIOS, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    isSignedIn();

    // getUserDataFromAsnycStorage().then(data => {
    //   //console.info(data);
    //   let userInfo = data;
    //   if (userInfo) {
    //     setUser(userInfo);
    //     dispatch(storeGoogleCreds(userInfo));
    //     props.props.navigation.navigate("GBDetail");
    //   }
    // });
  }, []);

  // const getUserDataFromAsnycStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('oUserInfo');
  //     console.info(jsonValue);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.info(e);
  //   }
  // };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.info(userInfo.user.email);
      // console.info(userInfo.user.givenName);
      // console.info(userInfo.user.familyName);
      // console.info(userInfo.user.name);//full name by google api
      // console.info(userInfo.user.photo);

      setUser(userInfo.user);
      dispatch(storeGoogleCreds(userInfo.user));
      const jsonUserInfoValue = JSON.stringify(userInfo.user);
      await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);
      props.props.navigation.navigate('GBDetail');
    } catch (error) {
      //alert('Error Message: '+ error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //alert('Play Services Not Available or Outdated');
      } else {
        //alert('Some Other Error Happened');
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.info('Please Login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      setUser(userInfo.user);
      dispatch(storeGoogleCreds(userInfo.user));
      const jsonUserInfoValue = JSON.stringify(userInfo.user);
      await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);
      props.props.navigation.navigate('GBDetail');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        //alert('User has not signed in yet');
      } else {
        //alert("Something went wrong. Unable to get user's info");
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
    <View style={styles.gSignInContainer}>
      <GoogleSigninButton
        style={styles.gSignInComponent}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gSignInContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gSignInComponent: {
    // width: Platform.OS === 'android' ? wp(50) : wp(47.5),
    // height: Platform.OS === 'android' ? hp(5.75) : hp(4.75),

    //Values Coded

    width: 192,
    height: 48,
  },
});
